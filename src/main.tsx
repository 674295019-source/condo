/// <reference types="vite/client" />
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { App } from './App';
import './index.css';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1043122138881-uqk0upmtoagl5p30of94qd6copvoi0sb.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
