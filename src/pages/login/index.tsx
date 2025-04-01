import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useAuth } from "@/context/AuthContext";

const SCHEMA = yup.object().shape({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Campo obrigatório"),
});

export default function Login() {
  const { login } = useAuth();

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
        Login
      </Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SCHEMA}
        onSubmit={async (values, { setSubmitting }) => {
          await login(values.email, values.password);
          setSubmitting(false);
        }}
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
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                variant="outlined"
                slotProps={{
                  inputLabel: {
                    sx: {
                      color: "#FFF",
                    },
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#FFF",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#FFF",
                    },
                    "&:hover fieldset": {
                      borderColor: "#FFF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1976D2",
                    },
                  },
                }}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                type="password"
                name="password"
                label="Senha"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                variant="outlined"
                slotProps={{
                  inputLabel: {
                    sx: {
                      color: "#FFF",
                    },
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#FFF",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#FFF",
                    },
                    "&:hover fieldset": {
                      borderColor: "#FFF",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1976D2",
                    },
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
