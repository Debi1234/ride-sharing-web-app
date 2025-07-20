const { Server } = require("socket.io");
const userModel = require("./models/user.model")
const captainModel = require('./models/captain.model')

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on("join",async(data)=>{
            const {userId, userType} = data;
            try {
                console.log(`User type: ${userType}`);
                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'captain') {
                    await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                }
                socket.emit('joined', { success: true, socketId: socket.id });
            } catch (err) {
                console.error('Error updating socketId:', err);
                socket.emit('joined', { success: false, error: err.message });
            }
        })

        socket.on("update-location-captain", async (data) => {
            const { captainId, ltd, lng } = data;
            try {
                await captainModel.findByIdAndUpdate(captainId, {
                    location: { ltd, lng }
                });
                socket.emit('location-updated', { success: true });
            } catch (err) {
                console.error('Error updating captain location:', err);
                socket.emit('location-updated', { success: false, error: err.message });
            }
        })

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
            // Clear socketId from database when user disconnects
            // This prevents stale socketId issues
            userModel.updateMany({ socketId: socket.id }, { socketId: null }).catch(console.error);
            captainModel.updateMany({ socketId: socket.id }, { socketId: null }).catch(console.error);
        });
    });

    return io;
};

const sendMessageToSocket = (socketId, event, data) => {
    if (!io) {
        console.log("socket not initialized");
        return false;
    }
    
    const socket = io.sockets.sockets.get(socketId);
    if (!socket) {
        console.log(`Socket with ID ${socketId} not found`);
        return false;
    }
    
    socket.emit(event, data);
    return true;
};

const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

module.exports = {
    initializeSocket,
    sendMessageToSocket,
    getIO
}; 