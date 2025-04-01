// src/pages/CreateCommunicationRequest.tsx
import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useCommunicationFlow } from "@/context/CommunicationFlowContext";
import { useRouter } from "next/router";
import axiosClient from "@/api/axiosClient";

const CommunicationRequestSchema = yup.object().shape({
  visitorName: yup.string().required("Campo obrigatório"),
  visitorContact: yup.string().required("Campo obrigatório"),
  initialMessage: yup.string().required("Campo obrigatório"),
});

const CreateCommunicationRequest: React.FC = () => {
  const { provider, house } = useCommunicationFlow();
  const router = useRouter();

  if (!provider || !house) {
    router.push("/select-provider");
    return null;
  }

  const handleSubmit = async (
    values: {
      visitorName: string;
      visitorContact: string;
      initialMessage: string;
    },
    {
      setSubmitting,
      setErrors,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: any) => void;
    }
  ) => {
    try {
      const payload = {
        providerId: provider.id,
        houseId: house.id,
        visitorName: values.visitorName,
        visitorContact: values.visitorContact,
        initialMessage: values.initialMessage,
      };
      await axiosClient.post("/communication-requests", payload);
      router.push("/waiting");
    } catch (error) {
      setErrors({ initialMessage: "Erro ao criar requisição" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      px={2}
      bgcolor="#121212"
      color="#FFF"
    >
      <Typography variant="h5" gutterBottom>
        Criar Requisição de Comunicação
      </Typography>
      <Formik
        initialValues={{
          visitorName: "",
          visitorContact: "",
          initialMessage: "",
        }}
        validationSchema={CommunicationRequestSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form style={{ width: "100%", maxWidth: 400 }}>
            <Box mb={2}>
              <TextField
                fullWidth
                name="visitorName"
                label="Nome do Visitante"
                value={values.visitorName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.visitorName && Boolean(errors.visitorName)}
                helperText={touched.visitorName && errors.visitorName}
                variant="outlined"
                slotProps={{
                  inputLabel: {
                    sx: {
                      color: "#FFF",
                    },
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": { color: "#FFF" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#FFF" },
                    "&:hover fieldset": { borderColor: "#FFF" },
                    "&.Mui-focused fieldset": { borderColor: "#1976D2" },
                  },
                }}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                name="visitorContact"
                label="Contato do Visitante"
                value={values.visitorContact}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.visitorContact && Boolean(errors.visitorContact)}
                helperText={touched.visitorContact && errors.visitorContact}
                variant="outlined"
                slotProps={{
                  inputLabel: {
                    sx: {
                      color: "#FFF",
                    },
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": { color: "#FFF" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#FFF" },
                    "&:hover fieldset": { borderColor: "#FFF" },
                    "&.Mui-focused fieldset": { borderColor: "#1976D2" },
                  },
                }}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                name="initialMessage"
                label="Mensagem Inicial"
                multiline
                rows={4}
                value={values.initialMessage}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.initialMessage && Boolean(errors.initialMessage)}
                helperText={touched.initialMessage && errors.initialMessage}
                variant="outlined"
                slotProps={{
                  inputLabel: {
                    sx: {
                      color: "#FFF",
                    },
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": { color: "#FFF" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#FFF" },
                    "&:hover fieldset": { borderColor: "#FFF" },
                    "&.Mui-focused fieldset": { borderColor: "#1976D2" },
                  },
                }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              Enviar Requisição
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateCommunicationRequest;
