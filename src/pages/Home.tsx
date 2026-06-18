import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Demo from '../components/Demo';
import Industries from '../components/Industries';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Features />
      <Demo />
      <Industries />
      <HowItWorks />
      <Pricing />
      <Portfolio />
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
}
