const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { addSocket, removeSocket } = require('./store');
const chatHandler = require('./handlers/chat');

function setupSocket(httpServer, corsOptions = { origin: 'http://localhost:5173', credentials: true }) {
  const io = new Server(httpServer, { cors: corsOptions });

  // authentication middleware for sockets
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) return next(new Error('Authentication error: Token not provided'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.data.user = { id: decoded.userId, username: decoded.name };
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    const { id: userId } = socket.data.user;

    addSocket(userId, socket.id);
    socket.join(`user:${userId}`);

    chatHandler(io, socket);

    socket.on('disconnect', () => {
      removeSocket(userId, socket.id);
    });
  });

  return io;
}

module.exports = setupSocket;

