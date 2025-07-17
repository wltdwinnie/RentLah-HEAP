"use client";
import { io, Socket } from "socket.io-client";

let socketInstance: Socket | null = null;

export function getSocket(): Socket {
  if (!socketInstance) {
    socketInstance = io("http://localhost:3000", {
      reconnectionAttempts: 3,
      reconnectionDelay: 5000,
      autoConnect: false,
      timeout: 10000
    });
    
    socketInstance.on("connect_error", (err) => {
      console.warn("Socket connection failed:", err.message);
    });
  }
  
  if (!socketInstance.connected) {
    try {
      socketInstance.connect();
    } catch (err) {
      console.error("Failed to connect to socket server:", err);
    }
  }
  
  return socketInstance;
}

export const socket = {
  emit: (event: string, ...args: unknown[]) => getSocket().emit(event, ...args),
  on: (event: string, listener: (...args: unknown[]) => void) => getSocket().on(event, listener),
  off: (event: string, listener?: (...args: unknown[]) => void) => getSocket().off(event, listener),
  disconnect: () => socketInstance?.disconnect(),
  connect: () => getSocket(),
  get connected() {
    return socketInstance?.connected || false;
  }
};

