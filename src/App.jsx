import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import AIPlanner from './components/AIPlanner';
import ItineraryPage from './components/ItineraryPage';
import ExplorePage from './components/ExplorePage';
import StaysPage from './components/StaysPage';
import HotelDetailsPage from './components/HotelDetailsPage';
import RentalsPage from './components/RentalsPage';
import SafetyPage from './components/SafetyPage';
import ProfilePage from './components/ProfilePage';
import ReelCatcher from './components/ReelCatcher';
import DestinationDetailPage from './components/DestinationDetailPage';
import CommunityPage from './components/CommunityPage';
import PageTransition from './components/PageTransition';
import { AnimatePresence } from 'framer-motion';

import HeroSection from './components/landing/HeroSection';
import DestinationGrid from './components/landing/DestinationGrid';
import FeaturesSection from './components/landing/FeaturesSection';
import StaysPreview from './components/landing/StaysPreview';
import RentalsPreview from './components/landing/RentalsPreview';
import SafetyPreview from './components/landing/SafetyPreview';

function LandingPage() {
  return (
    <>
      <HeroSection />
      <DestinationGrid />
      <FeaturesSection />
      <StaysPreview />
      <RentalsPreview />
      <SafetyPreview />
      <Footer />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/ai-planner" element={<PageTransition><AIPlanner /></PageTransition>} />
        <Route path="/itinerary" element={<PageTransition><ItineraryPage /></PageTransition>} />
        <Route path="/itinerary/:id" element={<PageTransition><ItineraryPage /></PageTransition>} />
        <Route path="/explore" element={<PageTransition><ExplorePage /></PageTransition>} />
        <Route path="/destination/:id" element={<PageTransition><DestinationDetailPage /></PageTransition>} />
        <Route path="/stays" element={<PageTransition><StaysPage /></PageTransition>} />
        <Route path="/hotel" element={<PageTransition><HotelDetailsPage /></PageTransition>} />
        <Route path="/hotel/:id" element={<PageTransition><HotelDetailsPage /></PageTransition>} />
        <Route path="/rentals" element={<PageTransition><RentalsPage /></PageTransition>} />
        <Route path="/reel-catcher" element={<PageTransition><ReelCatcher /></PageTransition>} />
        <Route path="/community" element={<PageTransition><CommunityPage /></PageTransition>} />
        <Route path="/safety" element={<PageTransition><SafetyPage /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#EAE6DF] font-sans selection:bg-[#6F93C4] selection:text-white" style={{ color: '#1F2937' }}>
        <Navbar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
