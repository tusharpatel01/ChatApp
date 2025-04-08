import dotenv from "dotenv";
import connectDB from "./db/dbindex.js";
import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// Connect to MongoDB
connectDB()
  .then(() => {
    const server = createServer(app); // Create an HTTP server
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:5173", // Adjust based on frontend URL
        methods: ["GET", "POST"],
      },
    });

    const userSocketMap = {};
    
    

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      const userId = socket.handshake.query.userId;

      if (userId) {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated list
      }

      console.log(userSocketMap);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        if (userId) {
          delete userSocketMap[userId];
          io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Emit updated list
        }
      });
    });

    // Start the server after setting up WebSocket events
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
