import {useQuery} from '@tanstack/react-query';
import ChatService from '../../apis/ChatService';

const useChatMessages = function (chatId: string) {
  const {isPending, error, data} = useQuery({
    queryKey: ['chat-messages', chatId],
    queryFn: () => ChatService.getMessages(chatId),
  });

  return {isPending, error, data};
};

export default useChatMessages;
