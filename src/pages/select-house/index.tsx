// src/pages/SelectHouse.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useCommunicationFlow } from "@/context/CommunicationFlowContext";
import { useRouter } from "next/router";
import axiosClient from "@/api/axiosClient";

interface House {
  id: string;
  name: string;
}

const SelectHouse: React.FC = () => {
  const { provider, setHouse } = useCommunicationFlow();
  const router = useRouter();
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!provider) {
      router.push("/select-provider");
      return;
    }
    const fetchHouses = async () => {
      try {
        const response = await axiosClient.get(
          `/houses/provider/${provider.id}`
        );
        setHouses(response.data);
      } catch (error) {
        console.error("Erro ao buscar houses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHouses();
  }, [provider, router.pathname]);

  const handleSelectHouse = (selectedHouse: House) => {
    setHouse(selectedHouse);
    router.push("/create-communication-request");
  };

  return (
    <Box
      p={2}
      bgcolor="#121212"
      minHeight="100vh"
      color="#FFF"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h5" gutterBottom>
        Selecionar House
      </Typography>
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <List>
          {houses.map((house) => (
            <ListItem
              key={house.id}
              onClick={() => handleSelectHouse(house)}
              sx={{
                cursor: "pointer",
                "&:hover": { bgcolor: "primary.main" },
                border: "1px solid #FFF",
              }}
            >
              <ListItemText primary={house.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SelectHouse;
