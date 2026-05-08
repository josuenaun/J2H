import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// IMPORTANTE: Asegúrate de que la ruta de tu CSS global coincida con la que ya tenías
import './ui/styles/global.css';

// JOSHUA: 1. Importamos el BrowserRouter
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* JOSHUA: 2. Envolvemos toda la App dentro del BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)