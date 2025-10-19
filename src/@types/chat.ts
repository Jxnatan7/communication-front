export type ChatMessageDTO = {
  id?: string;
  sender: string;
  content: string;
  timestamp: string | Date;
};

export type ChatMessageEnvelope = {
  chatId?: string;
  message: ChatMessageDTO;
};
