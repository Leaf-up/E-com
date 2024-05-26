import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Loader from './ui/loader/loader';
import { message } from './widgets';
import App from './App';

const root = document.createElement('div');
root.id = 'root';
document.body.append(root, message.el);

ReactDOM.createRoot(root).render(
  <React.Suspense fallback={<Loader />}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </React.Suspense>,
);
