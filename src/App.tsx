import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <Header />
      <Hero />
      <Features />
      <About />
      <HowItWorks />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default App;