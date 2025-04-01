// src/pages/chat/[id].tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/context/AuthContext";

interface ChatMessage {
  sender: string;
  content: string;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const router = useRouter();
  const { id: chatId } = router.query;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    if (!chatId) return;
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      path: "/chat",
      transports: ["websocket"],
      query: { token: localStorage.getItem("jwtToken") },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
    });

    setSocket(newSocket);

    newSocket.emit("joinChat", { chatId });

    newSocket.on("newMessage", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [chatId]);

  const handleSendMessage = () => {
    if (!socket || !chatId || newMessage.trim() === "") return;
    const messageData = { chatId, sender: user?.id, content: newMessage };
    socket.emit("sendMessage", messageData);
    setMessages((prev) => [
      ...prev,
      { sender: user?.id, content: newMessage, timestamp: new Date() },
    ]);
    setNewMessage("");
  };

  return (
    <Box
      p={2}
      bgcolor="#121212"
      color="#FFF"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h5" gutterBottom>
        Chat
      </Typography>
      <List sx={{ flexGrow: 1, maxHeight: "60vh", overflowY: "auto", mb: 2 }}>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${msg.sender === user?.id ? "Você" : "Residente"}: ${
                msg.content
              }`}
              secondary={new Date(msg.timestamp).toLocaleTimeString()}
            />
          </ListItem>
        ))}
      </List>
      <Box display="flex" gap={2}>
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          variant="outlined"
          InputLabelProps={{ style: { color: "#FFF" } }}
          InputProps={{ sx: { color: "#FFF" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#FFF" },
              "&:hover fieldset": { borderColor: "#FFF" },
              "&.Mui-focused fieldset": { borderColor: "#1976D2" },
            },
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;
