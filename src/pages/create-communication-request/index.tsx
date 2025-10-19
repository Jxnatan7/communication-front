import {Box, Button, Input} from '@mui/material';
import Header from '../../components/Header';
import {Formik} from 'formik';
import useCreateCommunicationRequest from '../../hooks/useCreateCommunicationRequest';
import {useNavigate} from 'react-router-dom';
import {AWAITING_COMMUNICATION_REQUEST_LINK} from '@routes';
import {useAuth} from '../../context/AuthContext';

export default function CreateCommunicationRequestPage() {
  const {setToken} = useAuth();
  const {mutateAsync} = useCreateCommunicationRequest();
  const navigate = useNavigate();
  const providerId = localStorage.getItem('providerId');
  const houseId = localStorage.getItem('houseId');

  const handleSubmit = (values: any) => {
    const payload = {
      visitorName: values.visitorName,
      visitorContact: values.visitorContact,
      initialMessage: values.initialMessage,
      providerId,
      houseId,
    };
    mutateAsync(payload).then((res: any) => {
      localStorage.setItem('communicationId', res.id);
      localStorage.setItem('visitorId', res.visitorId);
      localStorage.setItem('visitorToken', res.visitorToken);
      localStorage.setItem('visitorName', res.visitorName);
      setToken(res.visitorToken);
      navigate(AWAITING_COMMUNICATION_REQUEST_LINK(res.id));
    });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f6f0',
      }}
    >
      <Header title="Criar Comunicação" />
      <Formik
        initialValues={{
          visitorName: '',
          visitorContact: '',
          initialMessage: '',
        }}
        validate={values => {
          const errors: any = {};
          if (!values.visitorName) {
            errors.providerCode = 'Required';
          }
          if (!values.visitorContact) {
            errors.providerCode = 'Required';
          }
          if (!values.initialMessage) {
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
                placeholder="Insira o seu nome"
                type="text"
                name="visitorName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.visitorName}
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
              {errors.visitorName && touched.visitorName && errors.visitorName}
              <Input
                placeholder="Insira o seu contato (se preferir)"
                type="text"
                name="visitorContact"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.visitorContact}
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
              {errors.visitorContact &&
                touched.visitorContact &&
                errors.visitorContact}
              <Input
                placeholder="Escreva uma mensagem para o residente"
                type="text"
                multiline
                name="initialMessage"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.initialMessage}
                sx={{
                  width: '300px',
                  height: '50px',
                  border: '1px solid #000',
                  borderRadius: '5px',
                  padding: '10px',
                  fontSize: '16px',
                  color: '#000',
                  backgroundColor: '#fff',
                  overflow: 'hidden',
                }}
              />
              {errors.initialMessage &&
                touched.initialMessage &&
                errors.initialMessage}
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

// {
//     "id": "68f549255419f169eb5584b0",
//     "visitorName": "Visitante",
//     "visitorContact": "38998221425",
//     "initialMessage": "Bom dia",
//     "houseId": "undefined",
//     "providerId": "68f01a1f57bb862de5e91957",
//     "status": "PENDING",
//     "visitorId": "68f549255419f169eb5584b2",
//     "visitorToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGY1NDkyNTU0MTlmMTY5ZWI1NTg0YjIiLCJyb2xlIjoiVklTSVRPUiIsImlhdCI6MTc2MDkwNTUwOSwiZXhwIjoxNzYwOTEyNzA5fQ.3BiapViFHaRp6w4MJz4VA7mBbEbHRo4yE7QoYOLVpeE",
//     "visitorRole": "VISITOR"
// }
