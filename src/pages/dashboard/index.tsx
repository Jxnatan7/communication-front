// src/pages/dashboard.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import axiosClient from "@/api/axiosClient";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

interface CommunicationRequest {
  id: string;
  visitorName: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [requests, setRequests] = useState<CommunicationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const { house } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      if (house) {
        try {
          const response = await axiosClient.get(
            `/communication-requests/${house}`
          );
          setRequests(response.data);
        } catch (error) {
          console.error("Erro ao buscar communication requests", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchRequests();
  }, [house]);

  useEffect(() => console.log("🚀 ~ house:", house), [house]);

  const handleValidate = (id: string) => {
    router.push(`/communication-request/${id}`);
  };

  const handleEnterChat = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <Box
      p={2}
      bgcolor="#121212"
      color="#FFF"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h5" gutterBottom>
        Communication Requests
      </Typography>
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <List>
          {requests.map((req) => (
            <ListItem
              key={req.id}
              divider
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ListItemText
                primary={`Visitante: ${req.visitorName}`}
                secondary={`Status: ${req.status}`}
                slotProps={{
                  secondary: {
                    sx: {
                      color: req.status === "ACCEPTED" ? "green" : "red",
                    },
                  },
                }}
              />
              {req.status === "PENDING" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleValidate(req.id)}
                >
                  Validar
                </Button>
              )}
              {req.status === "ACCEPTED" && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEnterChat(req.id)}
                >
                  Entrar no Chat
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Dashboard;
