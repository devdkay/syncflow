import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import HowItWorks from '../components/HowItWorks';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import PopupOffer from '../components/PopupOffer';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <Portfolio />
      <Testimonials />
      <ContactForm />
      <Footer />
      <PopupOffer />
    </>
  );
}