import React from 'react';
import {List, Typography} from '@mui/material';
import CommunicationItem from './CommunicationItem';
import {useCommunicationContext} from '../context/CommunicationContext';

type Props = {
  onOpenChat: (chatId?: string) => void;
};

const styles = {
  list: {display: 'grid', gap: 2, width: '100%', maxWidth: 920, px: 2},
};

const CommunicationList: React.FC<Props> = function ({onOpenChat}) {
  const {communications, error, isLoading} = useCommunicationContext();

  if (isLoading) return <Typography>Carregando...</Typography>;
  if (error) return <Typography color="error">{error.message}</Typography>;
  if (!communications || communications.length === 0)
    return <Typography>Sem comunicações.</Typography>;

  return (
    <List sx={styles.list}>
      {communications.map(communication => (
        <CommunicationItem
          key={communication.id}
          item={communication}
          onOpenChat={onOpenChat}
        />
      ))}
    </List>
  );
};

export default CommunicationList;
