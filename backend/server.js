const http = require('http');
const app = require('./app');
const connectDB = require('./DB/db');
const { initializeSocket } = require('./socket');

// Connect to MongoDB
connectDB();

const server = http.createServer(app);

// Initialize socket.io
initializeSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
