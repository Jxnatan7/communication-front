import React, {useEffect, useRef} from 'react';
import {Box, List, ListItem, Typography, Avatar} from '@mui/material';
import {ChatMessage} from '../hooks/useChatSocket';
import useChatMessages from '../hooks/useChatMessages';

type Props = {
  messages: ChatMessage[];
  currentUserId?: string;
  chatId: string;
};

const ChatMessages: React.FC<Props> = ({messages, currentUserId, chatId}) => {
  const {data: oldMessages} = useChatMessages(chatId);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, oldMessages]);

  return (
    <Box
      ref={listRef}
      sx={{
        flex: 1,
        overflowY: 'auto',
        pr: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {oldMessages?.length > 0 && (
        <List>
          {oldMessages.map((m: any) => {
            const isMe = m.sender === currentUserId || m.sender === 'me';
            const time = new Date(m.timestamp).toLocaleTimeString();
            return (
              <ListItem
                key={`${m.id}`}
                sx={{justifyContent: isMe ? 'flex-end' : 'flex-start'}}
              >
                {!isMe && (
                  <Avatar sx={{mr: 1, width: 32, height: 32}}>
                    {String(m.sender).slice(0, 2).toUpperCase()}
                  </Avatar>
                )}

                <Box
                  sx={{
                    maxWidth: '75%',
                    bgcolor: isMe ? '#e0ffe0' : '#fff',
                    p: 1.25,
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="body2" sx={{whiteSpace: 'pre-wrap'}}>
                    {m.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{display: 'block', textAlign: 'right', mt: 0.5}}
                  >
                    {time}
                  </Typography>
                </Box>
              </ListItem>
            );
          })}
        </List>
      )}
      <List>
        {[...messages].map((m, idx) => {
          const isMe =
            m.message.sender === currentUserId || m.message.sender === 'me';
          const time = new Date(m.message.timestamp).toLocaleTimeString();
          return (
            <ListItem
              key={`${m.message.id ?? idx}-${idx}`}
              sx={{justifyContent: isMe ? 'flex-end' : 'flex-start'}}
            >
              {!isMe && (
                <Avatar sx={{mr: 1, width: 32, height: 32}}>
                  {String(m.message.sender).slice(0, 2).toUpperCase()}
                </Avatar>
              )}

              <Box
                sx={{
                  maxWidth: '75%',
                  bgcolor: isMe ? '#e0ffe0' : '#fff',
                  p: 1.25,
                  borderRadius: 1,
                  boxShadow: 1,
                }}
              >
                <Typography variant="body2" sx={{whiteSpace: 'pre-wrap'}}>
                  {m.message.content}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{display: 'block', textAlign: 'right', mt: 0.5}}
                >
                  {time}
                </Typography>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ChatMessages;
