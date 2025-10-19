export const HOME_PATH = '/';
export const LOGIN_PATH = '/login';
export const CHAT_PATH = '/chat/:chatId';
export const SELECT_PROVIDER_PATH = '/select-provider';
export const SELECT_HOUSE_PATH = `${SELECT_PROVIDER_PATH}/:providerId/select-house`;
export const AWAITING_COMMUNICATION_REQUEST_PATH =
  '/communication-requests/:communicationRequestId/awaiting';
export const CREATE_COMMUNICATION_REQUEST_PATH =
  '/create-communication-request';

export const CHAT_LINK = (id: string) => `/chat/${id}`;
export const SELECT_HOUSE_LINK = (providerId: string) =>
  `/select-provider/${providerId}/select-house`;
export const AWAITING_COMMUNICATION_REQUEST_LINK = (id: string) =>
  `/communication-requests/${id}/awaiting`;
