import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WebsiteDevelopment from './pages/WebsiteDevelopment';
import LeadCapture from './pages/LeadCapture';
import AppointmentBooking from './pages/AppointmentBooking';
import AIAssistant from './pages/AIAssistant';
import CustomSoftware from './pages/CustomSoftware';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0d0d0d] text-white">
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