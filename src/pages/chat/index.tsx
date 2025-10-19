import React, {useEffect} from 'react';
import {Box} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import {LOGIN_PATH} from '../../routes';
import Header from '../../components/Header';
import useChatSocket from '../../hooks/useChatSocket';
import ChatMessages from '../../components/ChatMessages';
import ChatInput from '../../components/ChatInput';

const styles = {
  container: {
    width: '100vw',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    backgroundColor: '#dcdfc5',
    paddingBottom: 6,
  },
  content: {
    width: '100%',
    maxWidth: 920,
    px: 2,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
    height: 'calc(100vh - 160px)',
  },
};

const ChatScreen: React.FC = () => {
  const {token, user} = useAuth();
  const navigate = useNavigate();
  const {chatId} = useParams<{chatId: string}>();

  const {messages, sendMessage, status, participants} = useChatSocket({
    chatId: chatId,
    token: token || '',
  });

  useEffect(() => {
    console.log('🚀 ~ ChatScreen ~ status:', status);
  }, [status]);

  if (!token || !chatId) {
    navigate(LOGIN_PATH);
    return null;
  }

  return (
    <Box sx={styles.container}>
      <Header title="Chat" />

      <Box sx={styles.content}>
        <ChatMessages
          messages={messages}
          currentUserId={user?.id}
          chatId={chatId}
        />
        <ChatInput
          onSend={(content: string) => sendMessage({chatId: chatId, content})}
          disabled={status !== 'connected'}
        />
      </Box>
    </Box>
  );
};

export default ChatScreen;
