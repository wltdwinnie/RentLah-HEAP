"use client";
import { io, Socket } from "socket.io-client";

// Create a lazy singleton for socket connection
let socketInstance: Socket | null = null;

// Function to get or create socket connection
export function getSocket(): Socket {
  if (!socketInstance) {
    socketInstance = io("http://localhost:3000", {
      reconnectionAttempts: 3,
      reconnectionDelay: 5000,
      autoConnect: false,
      timeout: 10000
    });
    
    // Add error handling to prevent constant reconnection attempts
    socketInstance.on("connect_error", (err) => {
      console.warn("Socket connection failed:", err.message);
    });
  }
  
  // Only connect if not already connected
  if (!socketInstance.connected) {
    try {
      socketInstance.connect();
    } catch (err) {
      console.error("Failed to connect to socket server:", err);
    }
  }
  
  return socketInstance;
}

// Export a compatible interface for backwards compatibility
export const socket = {
  emit: (event: string, ...args: unknown[]) => getSocket().emit(event, ...args),
  on: (event: string, listener: (...args: unknown[]) => void) => getSocket().on(event, listener),
  off: (event: string, listener?: (...args: unknown[]) => void) => getSocket().off(event, listener),
  disconnect: () => socketInstance?.disconnect(),
  connect: () => getSocket(),
  connected: () => socketInstance?.connected || false
};

