import React, {useState} from 'react';
import {Box, TextField, IconButton} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

type Props = {
  onSend: (content: string) => Promise<void> | void;
  disabled?: boolean;
};

const ChatInput: React.FC<Props> = ({onSend, disabled}) => {
  const [value, setValue] = useState('');

  const handleSend = async () => {
    const text = value.trim();
    if (!text) return;
    try {
      await Promise.resolve(onSend(text));
      setValue('');
    } catch (err) {
      console.error('send failed', err);
    }
  };

  return (
    <Box sx={{display: 'flex', gap: 1, alignItems: 'center', mt: 1}}>
      <TextField
        fullWidth
        placeholder="Escreva uma mensagem..."
        value={value}
        disabled={disabled}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={disabled || value.trim().length === 0}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
