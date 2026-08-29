require('dotenv').config();

const cors = require('cors');
const express = require('express');
const http = require('http');
const morgan = require('morgan');

const errorMiddleware = require('./middleware/errorMiddleware');
const HttpException = require('./utils/HttpExceptionUtils');
const getPresignedUrl = require('./utils/getPresigned');
const { socketConnection } = require('./utils/socket-io');

const app = express();
app.set('port', process.env.PORT || 3000);

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3001').split(',');
app.use(cors({
  allowedHeaders: ['authorization', 'Content-Type'],
  exposedHeaders: ['authorization'],
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/cliente/', require('./routes/clienteRoutes'));
app.use('/api/modelo/', require('./routes/modeloRoutes'));
app.use('/api/equipo/', require('./routes/equipoRoutes'));
app.use('/api/inspeccion/', require('./routes/inspeccionRoutes'));
app.use('/api/movimiento/', require('./routes/movimientoRoutes'));
app.use('/api/usuario/', require('./routes/usuarioRoutes'));
app.use('/api/getLastUpdate/', require('./routes/infoRoutes'));
app.post('/generatePresignedUrl', getPresignedUrl);

app.all('*', (req, res, next) => {
  next(new HttpException(404, 'Endpoint Not Found'));
});
app.use(errorMiddleware);

const server = http.createServer(app);
socketConnection(server);
server.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
