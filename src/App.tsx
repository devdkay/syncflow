import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import WebsiteDevelopment from './pages/WebsiteDevelopment';
import LeadCapture from './pages/LeadCapture';
import AppointmentBooking from './pages/AppointmentBooking';
import AIAssistant from './pages/AIAssistant';
import CustomSoftware from './pages/CustomSoftware';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import ActivityTracker from './components/ActivityTracker';
import PopupOffer from './components/PopupOffer';

function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <ActivityTracker />
      {!isAdminRoute && <PopupOffer />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/website-development" element={<WebsiteDevelopment />} />
        <Route path="/lead-capture" element={<LeadCapture />} />
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/custom-software" element={<CustomSoftware />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
