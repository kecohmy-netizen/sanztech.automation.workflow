import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/Tiktok-Bio-Link";
import AffiliateHub from "./pages/AffiliateHub";
import TemplateShowcase from "./pages/TemplateShowcase";
import Workflow from "./pages/Workflow";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tiktok-bio-link" replace />} />
        <Route path="/tiktok-bio-link" element={<LandingPage />} />
        <Route path="/tiktok-bio-link/baju-budak" element={<AffiliateHub />} />
        <Route path="/tiktok-bio-link/showcase" element={<TemplateShowcase />} />
        <Route path="/tiktok-bio-link/workflow" element={<Workflow />} />
        <Route path="*" element={<Navigate to="/tiktok-bio-link" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
