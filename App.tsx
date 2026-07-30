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
import DesignStudio from './components/DesignStudio';
import DealershipLocator from './components/DealershipLocator';
import Testimonials from './components/Testimonials';
import About from './components/About';
import NotFound from './components/NotFound';
import Legal from './components/Legal';
import FAQ, { FAQ_SECTIONS } from './components/FAQ';
import RentToOwn from './components/RentToOwn';
import SitePrep from './components/SitePrep';
import Brochure from './components/Brochure';
import RTOSection from './components/RTOSection';
import PageSEO, { buildBreadcrumbList, SITE_URL } from './components/PageSEO';
import { MODELS } from './data/models';
import { DEALERSHIPS } from './data/dealerships';

// Pre-built once at module load — these describe static data, not per-render state.
const MODELS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: MODELS.map((model, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: model.name,
      description: model.description,
      image: `${SITE_URL}${model.imageUrl}`,
      offers: {
        '@type': 'Offer',
        price: model.startPrice,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    },
  })),
};

const LOCATIONS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: DEALERSHIPS.map((dealership, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'LocalBusiness',
      name: dealership.name,
      telephone: dealership.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: dealership.address,
        addressLocality: dealership.city,
        addressRegion: dealership.state,
        postalCode: dealership.zip,
        addressCountry: 'US',
      },
    },
  })),
};

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_SECTIONS.flatMap((section) => section.items).map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

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
    <PageSEO
      title="Lone Star Sheds | Premium Custom Buildings Texas"
      description="Design your dream shed with our AI-powered studio. Handcrafted quality, 50-year warranty, and rent-to-own options available across Central Texas."
    />
    <Navbar />
    <Hero />
    <FeaturedModels />
    <Features />
    <AIQuote />
    <RTOSection />
    <Testimonials />
    <Footer />
  </>
);

const ModelsPage: React.FC = () => (
  <>
    <PageSEO
      title="Shed, Barn & Cabin Models"
      description="Browse Lone Star Sheds' full lineup of painted, Hardie plank, and dutchlap barns, garages, cabins, and utility buildings — with sizes, specs, and pricing for every model."
      jsonLd={[buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'Models', path: '/models' }]), MODELS_JSON_LD]}
    />
    <Navbar />
    <Models />
    <Footer />
  </>
);

const ConfigurePage: React.FC = () => (
  <>
    <PageSEO
      title="Configure Your Custom Build"
      description="Build and price your custom shed, barn, or cabin online. Choose your size, siding, and features, then get an instant estimate from Lone Star Sheds."
      jsonLd={buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'Configure', path: '/configure' }])}
    />
    <Navbar />
    <ConfigureBuild />
    <Footer />
  </>
);

const DesignStudioPage: React.FC = () => (
  <>
    <PageSEO
      title="AI Design Studio"
      description="Use our AI-powered Design Studio to visualize and configure your custom Lone Star Shed before you buy."
      jsonLd={buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'Design Studio', path: '/design-studio' }])}
    />
    <Navbar />
    <DesignStudio />
    <Footer />
  </>
);

const LocationsPage: React.FC = () => (
  <>
    <PageSEO
      title="Find a Dealer Near You | Locations Across Texas"
      description="Lone Star Sheds has dealer locations across Central and East Texas, including Commerce, Denton, Tyler, Athens, and Paris. Find your nearest dealer."
      jsonLd={[buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'Locations', path: '/locations' }]), LOCATIONS_JSON_LD]}
    />
    <Navbar />
    <DealershipLocator />
    <Footer />
  </>
);

const AboutPage: React.FC = () => (
  <>
    <PageSEO
      title="About Us | Family-Owned Since 1989"
      description="Lone Star Sheds is a family-owned, Texas-based manufacturer of handcrafted storage buildings, headquartered in Commerce, TX. Learn our story and values."
      jsonLd={buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])}
    />
    <Navbar />
    <About />
    <Footer />
  </>
);

const FAQPage: React.FC = () => (
  <>
    <PageSEO
      title="Frequently Asked Questions"
      description="Answers to common questions about Lone Star Sheds' rent-to-own program, payment options, site preparation, and delivery."
      jsonLd={[buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }]), FAQ_JSON_LD]}
    />
    <Navbar />
    <FAQ />
    <Footer />
  </>
);

const RTOPage: React.FC = () => (
  <>
    <PageSEO
      title="Rent-to-Own Sheds | No Credit Check"
      description="Get your shed, barn, or cabin today with Lone Star Sheds' no-credit-check rent-to-own program. Flexible 36, 48, and 60-month terms."
      jsonLd={buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'Rent-to-Own', path: '/rto' }])}
    />
    <Navbar />
    <RentToOwn />
    <Footer />
  </>
);

const PrepPage: React.FC = () => (
  <>
    <PageSEO
      title="Site Preparation Guide"
      description="Everything you need to know about preparing your site for delivery — clearance requirements, ground leveling, and what Lone Star Sheds handles for you."
      jsonLd={buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'Site Preparation', path: '/prep' }])}
    />
    <Navbar />
    <SitePrep />
    <Footer />
  </>
);

const PrivacyPage: React.FC = () => (
  <>
    <PageSEO
      title="Privacy Policy"
      description="Read Lone Star Sheds' privacy policy covering how we collect, use, and protect your information."
      jsonLd={buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }])}
    />
    <Navbar />
    <Legal type="privacy" />
    <Footer />
  </>
);

const TermsPage: React.FC = () => (
  <>
    <PageSEO
      title="Terms of Service"
      description="Read the terms of service governing your purchase and use of Lone Star Sheds products and services."
      jsonLd={buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'Terms of Service', path: '/terms' }])}
    />
    <Navbar />
    <Legal type="terms" />
    <Footer />
  </>
);

const BrochurePage: React.FC = () => (
  <>
    <PageSEO
      title="Digital Brochure"
      description="View Lone Star Sheds' digital brochure featuring our full range of custom sheds, barns, cabins, and garages."
    />
    <Navbar />
    <Brochure />
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
          <Route path="/design-studio" element={<DesignStudioPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/rto" element={<RTOPage />} />
          <Route path="/prep" element={<PrepPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/brochure" element={<BrochurePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;