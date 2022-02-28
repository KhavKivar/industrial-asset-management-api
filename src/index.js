
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const dotenv = require('dotenv');

const HttpException = require('./utils/HttpExceptionUtils.js');
const errorMiddleware = require('./middleware/errorMiddleware');
const http = require('http');
const https = require('https');
const fs = require('fs');

const path = require('path');



//aws

var bodyParser = require("body-parser");

var AWS = require('aws-sdk');
const uuid = require("uuid");
//setting
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(cors());


// Enable pre-flight


// Init environment
dotenv.config();







//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));






// Error middleware
app.use(errorMiddleware);





// Routes
app.use("/api/cliente/", require('./routes/clienteRoutes'));
app.use("/api/modelo/", require('./routes/modeloRoutes'));

app.use("/api/equipo/", require('./routes/equipoRoutes'));
app.use("/api/inspeccion/", require('./routes/inspeccionRoutes'));
app.use("/api/movimiento/", require('./routes/movimientoRoutes'));

const bucketName =process.env.AWS_BUCKET_NAME;
const region =process.env.AWS_REGION; 
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY; 



AWS.config.update({ region: region });



const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region,
  signatureVersion: "v4",

  //   useAccelerateEndpoint: true
});

const getPresignedUrl = (req, res) => {
  let fileType = req.body.fileType;
  if (fileType != ".jpg" && fileType != ".png" && fileType != ".jpeg") {
    return res
      .status(403)
      .json({ success: false, message: "Image format invalid" });
  }

  fileType = fileType.substring(1, fileType.length);

  const fileName = uuid.v4();
  const s3Params = {
    Bucket: bucketName,
    Key: fileName + "." + fileType,
    Expires: 60 * 60,
    ContentType: "image/" + fileType,
    ACL: "public-read",
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      success: true,
      message: "Url generated",
      uploadUrl: data,
      downloadUrl:
        `https://${bucketName}.s3.amazonaws.com/${fileName}` + "." + fileType,
    };
    return res.status(201).json(returnData);
  });
};

app.post("/generatePresignedUrl", (req, res) => getPresignedUrl(req, res));


app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);



// Missing route 404 error
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});


// Public


//var httpsServer = https.createServer(options,app);
//httpsServer.listen(8443);


var options = {
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.pem')
};


app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
});

// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);

  