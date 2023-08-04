import React from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';

import App from './App';

const domNode = document.getElementById('app');

if (domNode) {
  const accessToken = sessionStorage.getItem('access_token');

  const root = createRoot(domNode);

  root.render(
    <React.StrictMode>
      <App />      
    </React.StrictMode>,
  );
}
