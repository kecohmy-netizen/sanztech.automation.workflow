import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import WorkflowBuilder from "./components/WorkflowBuilder";
import MayaAgent from "./components/MayaAgent";
import Tasks from "./components/Tasks";
import Triggers from "./components/Triggers";
import TikTokAutomation from "./pages/TikTokAutomation";
import LinkBioAutomation from "./pages/LinkBioAutomation";
import MayaPhoneSetup from "./pages/MayaPhoneSetup";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workflows" element={<WorkflowBuilder />} />
          <Route path="/maya" element={<MayaAgent />} />
          <Route path="/maya/phone" element={<MayaPhoneSetup />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/triggers" element={<Triggers />} />
          <Route path="/tiktok" element={<TikTokAutomation />} />
          <Route path="/linkbio" element={<LinkBioAutomation />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;