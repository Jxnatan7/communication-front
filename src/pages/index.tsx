import { Button, Typography, Container, Box } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Communication - System
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mb: 2, "&:hover": { bgcolor: "primary.main", color: "white" } }}
          onClick={() => router.push("/select-provider")}
        >
          Entrar em contato com residente
        </Button>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
