import {HomePage, LoginPage, ChatPage} from '@pages';
import {
  AWAITING_COMMUNICATION_REQUEST_PATH,
  CHAT_PATH,
  CREATE_COMMUNICATION_REQUEST_PATH,
  HOME_PATH,
  LOGIN_PATH,
  SELECT_HOUSE_PATH,
  SELECT_PROVIDER_PATH,
} from './name';
import {RouteObject, createBrowserRouter} from 'react-router-dom';
import SelectProviderPage from '@pages/select-provider';
import SelectHousePage from '@pages/select-house';
import CreateCommunicationRequestPage from '@pages/create-communication-request';
import AwaitingCommunicationRequestPage from '@pages/awatting-communication-request';

const routes: RouteObject[] = [
  {path: '*', element: <LoginPage />},
  {path: LOGIN_PATH, element: <LoginPage />},
  {path: HOME_PATH, element: <HomePage />},
  {path: CHAT_PATH, element: <ChatPage />},
  {path: SELECT_PROVIDER_PATH, element: <SelectProviderPage />},
  {path: SELECT_HOUSE_PATH, element: <SelectHousePage />},
  {
    path: CREATE_COMMUNICATION_REQUEST_PATH,
    element: <CreateCommunicationRequestPage />,
  },
  {
    path: AWAITING_COMMUNICATION_REQUEST_PATH,
    element: <AwaitingCommunicationRequestPage />,
  },
];

export default createBrowserRouter(routes);
