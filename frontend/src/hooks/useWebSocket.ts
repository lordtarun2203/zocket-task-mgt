import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8080/ws"; // Change this based on your backend

export function useWebSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      console.log("New WebSocket message:", event.data);
      setMessages((prev) => [...prev, event.data]); // Store received messages
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    
    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setSocket(null);
    };

    return () => {
      ws.close(); // Cleanup on unmount
    };
  }, []);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.send(message);
    } else {
      console.error("WebSocket not connected");
    }
  };

  return { messages, sendMessage };
}
