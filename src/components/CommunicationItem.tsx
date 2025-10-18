import React from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Chip,
  Box,
  Typography,
  ListItemButton,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Communication} from '../@types/communication';
import {getInitials, formatPhone, statusChipProps} from '../utils/formatters';

type Props = {
  item: Communication;
  onOpenChat: (chatId?: string, communicationId?: string) => void;
};

const styles = {
  avatar: {width: 56, height: 56, color: '#fff'},
  card: {width: '100%', borderRadius: 2, boxShadow: 3},
  cardContent: {display: 'flex', alignItems: 'center', gap: 2},
  chip: {mr: 1},
};

const CommunicationItem: React.FC<Props> = function ({item, onOpenChat}) {
  const chip = statusChipProps(item.status);

  return (
    <ListItemButton
      disableGutters
      onClick={() => onOpenChat(item.chatId, item.id)}
    >
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Avatar sx={styles.avatar}>{getInitials(item.visitorName)}</Avatar>

          <Box sx={{flex: 1, minWidth: 0}}>
            <Typography variant="subtitle1" fontWeight={700} noWrap>
              {item.visitorName}
            </Typography>

            <Typography variant="body2" noWrap sx={{opacity: 0.85}}>
              {formatPhone(item.visitorContact)} · {item.initialMessage}
            </Typography>
          </Box>

          <Chip label={chip.label} color={chip.color as any} sx={styles.chip} />

          <ChevronRightIcon />
        </CardContent>
      </Card>
    </ListItemButton>
  );
};

export default CommunicationItem;
