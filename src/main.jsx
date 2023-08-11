import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'typeface-roboto'
import { AppContextProvider } from "./AppContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
