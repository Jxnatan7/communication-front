import {Box, Button, Input} from '@mui/material';
import Header from '../../components/Header';
import {Formik} from 'formik';
import {useNavigate} from 'react-router-dom';
import {SELECT_HOUSE_LINK} from '@routes';
import useFindProvider from '../../hooks/useFindProvider';

export default function SelectProviderPage() {
  const navigate = useNavigate();

  const {mutateAsync, isPending} = useFindProvider();

  const handleSubmit = async (values: any) => {
    const data = await mutateAsync(values.providerCode);
    localStorage.setItem('providerId', data.id);
    navigate(SELECT_HOUSE_LINK(data.id));
  };

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
      <Header title="Selecionar Provedor" />
      <Formik
        initialValues={{providerCode: ''}}
        validate={values => {
          const errors: any = {};
          if (!values.providerCode) {
            errors.providerCode = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          handleSubmit(values);
          setSubmitting(false);
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
                placeholder="Insira o código do provedor"
                type="text"
                name="providerCode"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.providerCode}
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
              {errors.providerCode &&
                touched.providerCode &&
                errors.providerCode}
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
    </Box>
  );
}
