import {Box, Button, Input} from '@mui/material';
import {useAuth} from '../../context/AuthContext';
import {Formik} from 'formik';
import {useNavigate} from 'react-router-dom';
import {SELECT_PROVIDER_PATH, HOME_PATH} from '../../routes';
import Header from '../../components/Header';

const LoginPage = function () {
  const {login, token, setToken} = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(SELECT_PROVIDER_PATH);
  };

  if (token) {
    navigate(HOME_PATH);
    return;
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#dcdfc5',
      }}
    >
      <Header title="Login" />
      <Formik
        initialValues={{email: '', password: ''}}
        validate={values => {
          const errors: any = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          login(values.email, values.password).then(res => {
            setSubmitting(false);
            console.log('🚀 ~ LoginPage ~ res:', res);
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                sx={{
                  width: '300px',
                  height: '50px',
                  border: '1px solid #000',
                  borderRadius: '5px',
                  padding: '10px',
                  fontSize: '16px',
                  color: '#000',
                  backgroundColor: '#fff',
                }}
              />
              {errors.email && touched.email && errors.email}
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                sx={{
                  width: '300px',
                  height: '50px',
                  border: '1px solid #000',
                  borderRadius: '5px',
                  padding: '10px',
                  fontSize: '16px',
                  color: '#000',
                  backgroundColor: '#fff',
                }}
              />
              {errors.password && touched.password && errors.password}
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="outlined"
                sx={{
                  width: '300px',
                  height: '50px',
                  backgroundColor: '#fff',
                  color: '#000',
                  fontSize: '16px',
                  fontWeight: 700,
                  '&:hover': {backgroundColor: '#000', color: '#fff'},
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Button
        onClick={handleNavigate}
        variant="outlined"
        sx={{
          width: '300px',
          height: '50px',
          backgroundColor: '#fff',
          color: '#000',
          fontSize: '16px',
          fontWeight: 700,
          '&:hover': {backgroundColor: '#000', color: '#fff'},
          marginTop: '50px',
        }}
      >
        Falar com uma pessoa
      </Button>
    </Box>
  );
};

export default LoginPage;
