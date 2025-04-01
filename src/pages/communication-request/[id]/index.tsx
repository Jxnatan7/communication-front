import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import axiosClient from "@/api/axiosClient";

const ValidateCommunicationRequest: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleValidate = async (status: "ACCEPTED" | "REJECTED") => {
    try {
      await axiosClient.post(`/communication-requests/${id}/validate`, {
        status,
      });
      if (status === "ACCEPTED") {
        router.push(`/chat/${id}`);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao validar a communication request", error);
    }
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
        Validar Communication Request
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleValidate("ACCEPTED")}
        sx={{ mb: 2 }}
      >
        Aceitar
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleValidate("REJECTED")}
      >
        Rejeitar
      </Button>
    </Box>
  );
};

export default ValidateCommunicationRequest;
