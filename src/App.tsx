import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AffiliateHub from "./pages/AffiliateHub";
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

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/baju-budak" element={<AffiliateHub />} />
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
          <Route path="/linkbio" element={<ProtectedRoute><LinkBioAutomation /></ProtectedRoute>} />
          
          {/* Catch all - redirect to homepage */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;