import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WebsiteDevelopment from './pages/WebsiteDevelopment';
import LeadCapture from './pages/LeadCapture';
import AppointmentBooking from './pages/AppointmentBooking';
import AIAssistant from './pages/AIAssistant';
import CustomSoftware from './pages/CustomSoftware';
import Contact from './pages/Contact';
import CalendlyButton from './components/CalendlyButton';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0d0d0d] text-white">
        {/* Calendly button visible on all pages */}
        <div className="fixed bottom-6 right-6 z-[9999]">
          <CalendlyButton />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/website-development" element={<WebsiteDevelopment />} />
          <Route path="/lead-capture" element={<LeadCapture />} />
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/custom-software" element={<CustomSoftware />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;