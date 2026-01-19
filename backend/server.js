import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http"; // Required for Socket.io
import { Server } from "socket.io";   // Signaling server
import searchRoutes from "./routes/search.js";

const app = express();
const PORT = process.env.PORT || 3001;

// __dirname replacement for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Create HTTP Server to wrap the Express app
const httpServer = createServer(app);

// 2. Initialize Socket.io for Signaling
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Allow your Vite/React frontend
    methods: ["GET", "POST"]
  }
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/api/search", searchRoutes);
app.get("/", (req, res) => {
  res.render("index", { error: null, result: null });
});

// --- WebRTC Signaling Logic ---
const roomUsers = {}; 

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join-room", (roomID) => {
    socket.join(roomID);
    console.log(`User ${socket.id} joined room: ${roomID}`);

    // Notify others in the room that a new user joined
    socket.to(roomID).emit("user-joined", { callerID: socket.id });
  });

  // Relay the WebRTC Offer
  socket.on("offer", (payload) => {
    io.to(payload.target).emit("offer", { 
      sdp: payload.sdp, 
      callerID: socket.id 
    });
  });

  // Relay the WebRTC Answer
  socket.on("answer", (payload) => {
    io.to(payload.target).emit("answer", { 
      sdp: payload.sdp, 
      callerID: socket.id 
    });
  });

  // Relay ICE Candidates (network paths)
  socket.on("ice-candidate", (incoming) => {
    io.to(incoming.target).emit("ice-candidate", { 
      candidate: incoming.candidate, 
      callerID: socket.id 
    });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// --- Error Handling ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// 3. Start the httpServer (NOT app.listen)
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Signaling Server enabled for WebRTC`);
});

export default app;