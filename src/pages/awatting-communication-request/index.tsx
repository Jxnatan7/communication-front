import {Box, Typography} from '@mui/material';
import Header from '../../components/Header';
import useCommunicationAccepted from '../../hooks/useCommunicationAccepted';

export default function AwaitingCommunicationRequestPage() {
  const visitorName = localStorage.getItem('visitorName');
  const token = localStorage.getItem('visitorToken');

  useCommunicationAccepted({
    token: token,
    onAccepted: ({communicationRequestId, chatId}) => {
      console.log('communication accepted:', communicationRequestId, chatId);
    },
  });

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
      <Header title="Aguardando Solicitação" />
      <Typography sx={{mt: 4}}>Olá, {visitorName}</Typography>
      <Typography sx={{mt: 1, textAlign: 'center', mx: 2}}>
        Estamos aguardando a sua solicitação ser aprovada para continuar a
        conversa.
      </Typography>
    </Box>
  );
}
