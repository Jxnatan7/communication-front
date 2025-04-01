// src/pages/SelectProvider.tsx
import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useCommunicationFlow } from "@/context/CommunicationFlowContext";
import { useRouter } from "next/router";
import axiosClient from "@/api/axiosClient";

const ProviderSchema = yup.object().shape({
  code: yup.string().required("Campo obrigatório"),
});

const SelectProvider: React.FC = () => {
  const { setProvider } = useCommunicationFlow();
  const router = useRouter();

  const handleSubmit = async (
    values: { code: string },
    {
      setSubmitting,
      setErrors,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: any) => void;
    }
  ) => {
    try {
      const response = await axiosClient.get(
        `/providers/validate/${values.code}`
      );
      setProvider(response.data);
      router.push("/select-house");
    } catch (error) {
      setErrors({ code: "Código inválido ou erro ao buscar provider" });
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
    >
      <Typography variant="h5" gutterBottom>
        Selecionar Provider
      </Typography>
      <Formik
        initialValues={{ code: "" }}
        validationSchema={ProviderSchema}
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
                name="code"
                label="Código do Provider"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.code && Boolean(errors.code)}
                helperText={touched.code && errors.code}
                variant="outlined"
                slotProps={{
                  inputLabel: {
                    sx: { color: "#FFF" },
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
              Validar
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SelectProvider;
