import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { message } from './ui';
import App from './App';

const root = document.createElement('div');
root.id = 'root';
document.body.append(root, message.el);

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
);
