import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AuthProvider from './service/authProvider';
import DataRepository from './service/dataRepository';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
const dataRepository = new DataRepository();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <BrowserRouter>
      <App dataRepository={dataRepository} />
    </BrowserRouter>
  </AuthProvider>
);
