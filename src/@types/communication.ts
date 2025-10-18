export type Communication = {
  id: string;
  visitorName: string;
  visitorContact: string;
  initialMessage: string;
  houseId?: string;
  providerId?: string;
  status?: string;
  visitorId?: string;
  visitorToken?: string;
  visitorRole?: string;
  chatId?: string;
};

export type CommunicationContextData = {
  communications: Communication[];
  isLoading: boolean;
  error: Error | null;
};
