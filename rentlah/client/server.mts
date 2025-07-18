import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-room", ({ room, username }) => {
      socket.join(room);
      console.log(`User ${username} (${socket.id}) joined room ${room}`);
      
      // Notify other users in the room that someone joined
      socket.to(room).emit("user_joined", { username });
    });

    socket.on("message", (data) => {
      console.log(`📨 Received message:`, data);
      
      const { room, message, sender, created_at } = data;
      
      if (!room || !message || !sender) {
        console.error("❌ Invalid message data:", data);
        return;
      }

      const messageData = {
        sender,
        message,
        created_at: created_at || new Date().toISOString()
      };

      console.log(`📤 Broadcasting message from ${sender} in room ${room}:`, messageData);
      io.to(room).emit("message", messageData);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  httpServer.listen(port, () => {
    console.log(`🚀 Server running on http://${hostname}:${port}`);
  });
});