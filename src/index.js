
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const dotenv = require('dotenv');

const HttpException = require('./utils/HttpExceptionUtils.js');
const errorMiddleware = require('./middleware/errorMiddleware');
const https = require('https');
const fs = require('fs');


const path = require('path');

//setting
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(cors());


// Enable pre-flight
app.options("*", cors());


// Init environment
dotenv.config();







//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));






// Error middleware
app.use(errorMiddleware);





// Routes

app.use("/api/equipo/",require('./routes/equipoRoutes'));


// Missing route 404 error
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});



// Public

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var httpsServer = https.createServer(options,app);
httpsServer.listen(8443);



