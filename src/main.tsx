import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import SignupPage from './components/SignupPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import EmailOutreachAutomation from './components/services/EmailOutreachAutomation';
import LeadCaptureCRM from './components/services/LeadCaptureCRM';
import SocialMediaAutomation from './components/services/SocialMediaAutomation';
import WebsiteChatbot from './components/services/WebsiteChatbot';
import WebsiteBuilding from './components/services/WebsiteBuilding';
import CustomAutomations from './components/services/CustomAutomations';
import AIVoiceCalls from './components/services/AIVoiceCalls';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/services/email-outreach-automation" element={<EmailOutreachAutomation />} />
        <Route path="/services/lead-capture-crm" element={<LeadCaptureCRM />} />
        <Route path="/services/social-media-automation" element={<SocialMediaAutomation />} />
        <Route path="/services/website-chatbot" element={<WebsiteChatbot />} />
        <Route path="/services/website-building" element={<WebsiteBuilding />} />
        <Route path="/services/custom-automations" element={<CustomAutomations />} />
        <Route path="/services/ai-voice-calls" element={<AIVoiceCalls />} />
      </Routes>
    </Router>
  </StrictMode>
);
