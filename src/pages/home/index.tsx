import React from 'react';
import {Box, Button, Card, CardContent, Modal, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import {CHAT_LINK, LOGIN_PATH} from '../../routes';
import Header from '../../components/Header';
import CommunicationList from '../../components/CommunicationList';
import CommunicationContextProvider from '../../context/CommunicationContext';
import useValidateCommunication from '../../hooks/useValidateCommunication';

const styles = {
  container: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#dcdfc5',
    paddingBottom: 6,
  },
};

const HomePage = function () {
  const {token} = useAuth();
  const navigate = useNavigate();
  const {mutateAsync} = useValidateCommunication();
  const [openModal, setOpenModal] = React.useState(false);
  const [communicationId, setCommunicationId] = React.useState<string | null>(
    null,
  );

  const handleOpenChat = (chatId?: string, communicationId?: string) => {
    if (!chatId && communicationId) {
      setOpenModal(true);
      setCommunicationId(communicationId);
      return;
    }
    navigate(CHAT_LINK(chatId || ''));
  };

  const handleValidateCommunication = () => {
    if (communicationId) {
      mutateAsync({communicationId, status: 'ACCEPTED'})
        .then(() => {
          setOpenModal(false);
          setCommunicationId(null);
        })
        .finally(() => {
          window.location.reload();
        });
    }
  };

  if (!token) {
    navigate(LOGIN_PATH);
    return null;
  }

  return (
    <CommunicationContextProvider>
      <Box sx={styles.container}>
        <Header />
        <CommunicationList onOpenChat={handleOpenChat} />
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      >
        <Card
          sx={{
            width: '80%',
            height: 250,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CardContent>
            <Typography variant="h5" sx={{textAlign: 'center'}}>
              Deseja aceitar essa comunicação?
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mt: 6,
              }}
            >
              <Button variant="outlined" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
              <Button variant="contained" onClick={handleValidateCommunication}>
                Aceitar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Modal>
    </CommunicationContextProvider>
  );
};

export default HomePage;
