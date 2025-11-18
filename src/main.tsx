// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { HashRouter } from 'react-router-dom'   // ← cambiaste BrowserRouter por HashRouter

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>                                // ← aquí también
      <App />
    </HashRouter>
  </React.StrictMode>
)