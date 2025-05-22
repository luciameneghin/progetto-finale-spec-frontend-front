// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <App />
        <ToastContainer />
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);