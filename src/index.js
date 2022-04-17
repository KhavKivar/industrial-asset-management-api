
const getPresignedUrl = require('./utils/getPresigned')
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");

const HttpException = require('./utils/HttpExceptionUtils.js');
const errorMiddleware = require('./middleware/errorMiddleware');

const http = require('http');







//aws

var bodyParser = require("body-parser");


//setting
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(cors());


// Enable pre-flight









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

app.use("/api/usuario/", require('./routes/usuarioRoutes'));

app.use("/api/getLastUpdate/", require('./routes/infoRoutes'));
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




const server = http.createServer(app);

const {socketConnection}  = require('./utils/socket-io');

socketConnection(server);

// const { Server } = require("socket.io");
// const io = new Server(server,{
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
// }

// });

// io.on('connection', (socket) => {
//   console.log('a user connected');


//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
  
});


// Create an HTTP service.

// Create an HTTPS service identical to the HTTP service.


  