import {useEffect, useRef} from 'react';
import {io, Socket} from 'socket.io-client';
import {useNavigate} from 'react-router-dom';

type UseCommunicationAcceptedArgs = {
  token?: string | null;
  url?: string;
  path?: string;
  onAccepted?: (payload: {
    communicationRequestId: string;
    chatId: string;
  }) => void;
};

export default function useCommunicationAccepted({
  token,
  url = 'http://localhost:3001',
  path = '/ws/chat',
  onAccepted,
}: UseCommunicationAcceptedArgs) {
  const socketRef = useRef<Socket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const socket = io(url, {
      path,
      autoConnect: true,
      reconnectionAttempts: 5,
      auth: {token},
      ...({query: {token}} as any),
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    const handleConnect = () => {};

    const handleAccepted = (payload: {
      communicationRequestId: string;
      chatId: string;
    }) => {
      try {
        if (!payload) return;
        // opcional: primeiro chamar callback do usuário do hook
        if (onAccepted) onAccepted(payload);
        // redireciona para o chat
        if (payload.chatId) {
          navigate(`/chat/${payload.chatId}`);
        }
      } catch (err) {
        console.error('handleAccepted error', err);
      }
    };

    const handleError = (err: any) => {
      console.warn('waiting-socket error', err);
    };

    socket.on('connect', handleConnect);
    socket.on('communication_accepted', handleAccepted);
    socket.on('connect_error', handleError);
    socket.on('error', handleError);

    return () => {
      if (!socket) return;
      socket.off('connect', handleConnect);
      socket.off('communication_accepted', handleAccepted);
      socket.off('connect_error', handleError);
      socket.off('error', handleError);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, url, path, navigate, onAccepted]);
}
