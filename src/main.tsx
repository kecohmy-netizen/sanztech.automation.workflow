import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { pwaService } from "./services/pwaService";
import { ThemeToggle } from "./components/ThemeToggle";

const basename = import.meta.env.BASE_URL;

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
  pwaService.register().then(() => {
    console.log('✅ PWA ready!');
    pwaService.setupInstallPrompt();
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={basename}>
        <ThemeToggle />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
