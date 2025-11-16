import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Tiktok-Bio-Link";
import AffiliateHub from "./pages/AffiliateHub";
import TemplateShowcase from "./pages/TemplateShowcase";
import WorkflowLanding from "./pages/WorkflowLanding";
import SanzTechLanding from "./pages/SanzTechLanding";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import WorkflowBuilder from "./components/WorkflowBuilder";
import MayaAgent from "./components/MayaAgent";
import Tasks from "./components/Tasks";
import Triggers from "./components/Triggers";
import TikTokAutomation from "./pages/TikTokAutomation";
import LinkBioAutomation from "./pages/LinkBioAutomation";
import MayaPhoneSetup from "./pages/MayaPhoneSetup";
import TikTokUpload from "./pages/TikTokUpload";
import TikTokCallback from "./pages/TikTokCallback";
import { Onboarding } from "./components/Onboarding";
import { InstallPWA } from "./components/InstallPWA";
import { ScrollToTop } from "./components/ScrollToTop";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
  <Suspense fallback={<p>Loading...</p>}>
      <>
        <Sidebar />
        <ScrollToTop />
        <Onboarding />
        <InstallPWA />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tiktok-bio-link" element={<LandingPage />} />
          <Route path="/tiktok-bio-link/baju-budak" element={<AffiliateHub />} />
          <Route path="/tiktok-bio-link/showcase" element={<TemplateShowcase />} />
          <Route path="/tiktok-bio-link/workflow" element={<SanzTechLanding />} />
          <Route path="/baju-budak" element={<AffiliateHub />} />
          <Route path="/showcase" element={<TemplateShowcase />} />
          <Route path="/workflow" element={<SanzTechLanding />} />
          <Route path="/portfolio" element={<SanzTechLanding />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          
          {/* Protected Routes - Redirect to homepage if not authenticated */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/workflows" element={<ProtectedRoute><WorkflowBuilder /></ProtectedRoute>} />
          <Route path="/maya" element={<ProtectedRoute><MayaAgent /></ProtectedRoute>} />
          <Route path="/maya/phone" element={<ProtectedRoute><MayaPhoneSetup /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="/triggers" element={<ProtectedRoute><Triggers /></ProtectedRoute>} />
          <Route path="/tiktok" element={<ProtectedRoute><TikTokAutomation /></ProtectedRoute>} />
          <Route path="/tiktok-upload" element={<ProtectedRoute><TikTokUpload /></ProtectedRoute>} />
          <Route path="/tiktok/callback" element={<TikTokCallback />} />
          <Route path="/linkbio" element={<ProtectedRoute><LinkBioAutomation /></ProtectedRoute>} />
          
          {/* Catch all - redirect to homepage */}
          <Route path="*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
