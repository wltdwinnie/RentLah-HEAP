import { createServer } from "http";
import { Server } from "socket.io";

const port = parseInt(process.env.PORT || "3000", 10);

const httpServer = createServer(); 

const io = new Server(httpServer, {
  cors: {
    origin: "rent-lah-heap.vercel.app", 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on("join-room", ({ room, username }) => {
    socket.join(room);
    console.log(`👥 ${username} (${socket.id}) joined room ${room}`);
    socket.to(room).emit("user_joined", { username });
  });

  socket.on("message", (data) => {
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

    console.log(`📤 Broadcasting message to ${room}`, messageData);
    io.to(room).emit("message", messageData);
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

httpServer.listen(port, "0.0.0.0", () => {
  console.log(`🚀 WebSocket server running on port ${port}`);
});