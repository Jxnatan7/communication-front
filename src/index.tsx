import '@styles/index.css';

import routes from '@routes';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import {QueryClientProvider} from '@tanstack/react-query';
import {StrictMode} from 'react';
import {QUERY_CLIENT} from '@utils';
import {ThemeProvider, createTheme} from '@mui/material';
import AuthProvider from './context/AuthContext';

const root = createRoot(document.getElementById('root')!);
const theme = createTheme({
  palette: {
    background: {
      default: '#dcdfc5',
    },
  },
});

root.render(
  <StrictMode>
    <QueryClientProvider client={QUERY_CLIENT}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
