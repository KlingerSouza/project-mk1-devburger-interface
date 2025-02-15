import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Elements } from '@stripe/react-stripe-js';
import { ToastContainer } from 'react-toastify';

import { standardTheme } from "./styles/themes/standard";
import GlobalStyles from './styles/globalStyles';
import stripePromise from './config/stripeConfig';
import AppProvider from './hooks';
import { Router } from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={standardTheme}>
      <GlobalStyles /> 
      <AppProvider>
        <Elements stripe={stripePromise}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Elements>
        <ToastContainer theme='colored' />
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);
