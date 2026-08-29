let io;

const socketConnection = (server) => {
  const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3001').split(',');
  io = require('socket.io')(server,{
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"]
    }
  });
  io.on('connection', (socket) => {
   
    console.info(`Client connected [id=${socket.id}]`);   
    
    socket.on('disconnect', () => {
      console.info(`Client disconnected [id=${socket.id}]`);
    });
  });
};

exports.socketConnection = socketConnection;
exports.sendMessage = (key, message) => io.emit(key, message);
exports.getRooms = () => io.sockets.adapter.rooms;

