import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Models from './components/Models';
import FeaturedModels from './components/FeaturedModels';
import AIQuote from './components/AIQuote';
import Footer from './components/Footer';
import ConfigureBuild from './components/ConfigureBuild';
import DealershipLocator from './components/DealershipLocator';
import Testimonials from './components/Testimonials';
import About from './components/About';
import NotFound from './components/NotFound';
import Legal from './components/Legal';
import FAQ from './components/FAQ';
import RentToOwn from './components/RentToOwn';
import SitePrep from './components/SitePrep';

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const HomePage: React.FC = () => (
  <>
    <Navbar />
    <Hero />
    <FeaturedModels />
    <Features />
    <AIQuote />
    <Testimonials />
    <Footer />
  </>
);

const ModelsPage: React.FC = () => (
  <>
    <Navbar />
    <Models />
    <Footer />
  </>
);

const ConfigurePage: React.FC = () => (
  <>
    <Navbar />
    <ConfigureBuild />
    <Footer />
  </>
);

const LocationsPage: React.FC = () => (
  <>
    <Navbar />
    <DealershipLocator />
    <Footer />
  </>
);

const AboutPage: React.FC = () => (
  <>
    <Navbar />
    <About />
    <Footer />
  </>
);

const FAQPage: React.FC = () => (
  <>
    <Navbar />
    <FAQ />
    <Footer />
  </>
);

const RTOPage: React.FC = () => (
  <>
    <Navbar />
    <RentToOwn />
    <Footer />
  </>
);

const PrepPage: React.FC = () => (
  <>
    <Navbar />
    <SitePrep />
    <Footer />
  </>
);

const PrivacyPage: React.FC = () => (
  <>
    <Navbar />
    <Legal type="privacy" />
    <Footer />
  </>
);

const TermsPage: React.FC = () => (
  <>
    <Navbar />
    <Legal type="terms" />
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-wood-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route path="/configure" element={<ConfigurePage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/rto" element={<RTOPage />} />
          <Route path="/prep" element={<PrepPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;