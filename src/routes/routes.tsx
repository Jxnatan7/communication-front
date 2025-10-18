import {Home} from '@pages';
import {HOME_PATH, LOGIN_PATH} from './name';
import {RouteObject, createBrowserRouter} from 'react-router-dom';
import LoginPage from '@pages/login';

const routes: RouteObject[] = [
  {path: HOME_PATH, element: <Home />},
  {path: LOGIN_PATH, element: <LoginPage />},
];

export default createBrowserRouter(routes);
