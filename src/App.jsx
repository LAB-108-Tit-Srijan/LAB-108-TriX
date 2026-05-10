import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import HostDashboard from './components/HostDashboard';
import HostPropertiesPage from './components/host/HostPropertiesPage';
import HostBookingsPage from './components/host/HostBookingsPage';
import HostEarningsPage from './components/host/HostEarningsPage';
import HostRentalsPage from './components/host/HostRentalsPage';
import HostGuestsPage from './components/host/HostGuestsPage';
import HostCommunityPage from './components/host/HostCommunityPage';
import PageTransition from './components/PageTransition';
import FloatingAI from './components/FloatingAI';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';

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

function ProtectedRoute({ children, roleRequired }) {
  const { currentUser, userRole, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen bg-[#EAE6DF] flex items-center justify-center">Loading...</div>;
  if (!currentUser) return <Navigate to="/auth" />;
  if (roleRequired && userRole !== roleRequired) {
    return <Navigate to={userRole === 'HOST' ? '/host/dashboard' : '/dashboard'} />;
  }
  return children;
}

function AppContent() {
  const location = useLocation();
  const isHostRoute = location.pathname.startsWith('/host');
  
  return (
    <div className="min-h-screen bg-[#EAE6DF] font-sans selection:bg-[#6F93C4] selection:text-white" style={{ color: '#1F2937' }}>
      {!isHostRoute && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
          <Route path="/auth" element={<PageTransition><AuthPage /></PageTransition>} />
          
          <Route path="/dashboard" element={<ProtectedRoute roleRequired="USER"><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
          <Route path="/ai-planner" element={<ProtectedRoute><PageTransition><AIPlanner /></PageTransition></ProtectedRoute>} />
          <Route path="/itinerary" element={<ProtectedRoute><PageTransition><ItineraryPage /></PageTransition></ProtectedRoute>} />
          <Route path="/itinerary/:id" element={<ProtectedRoute><PageTransition><ItineraryPage /></PageTransition></ProtectedRoute>} />
          <Route path="/explore" element={<PageTransition><ExplorePage /></PageTransition>} />
          <Route path="/destination/:id" element={<PageTransition><DestinationDetailPage /></PageTransition>} />
          <Route path="/stays" element={<PageTransition><StaysPage /></PageTransition>} />
          <Route path="/hotel" element={<PageTransition><HotelDetailsPage /></PageTransition>} />
          <Route path="/hotel/:id" element={<PageTransition><HotelDetailsPage /></PageTransition>} />
          <Route path="/rentals" element={<PageTransition><RentalsPage /></PageTransition>} />
          <Route path="/reel-catcher" element={<PageTransition><ReelCatcher /></PageTransition>} />
          <Route path="/community" element={<PageTransition><CommunityPage /></PageTransition>} />
          <Route path="/safety" element={<PageTransition><SafetyPage /></PageTransition>} />
          <Route path="/profile" element={<ProtectedRoute><PageTransition><ProfilePage /></PageTransition></ProtectedRoute>} />
          
          <Route path="/host/dashboard" element={<ProtectedRoute roleRequired="HOST"><PageTransition><HostDashboard /></PageTransition></ProtectedRoute>} />
          <Route path="/host/properties" element={<ProtectedRoute roleRequired="HOST"><PageTransition><HostPropertiesPage /></PageTransition></ProtectedRoute>} />
          <Route path="/host/bookings" element={<ProtectedRoute roleRequired="HOST"><PageTransition><HostBookingsPage /></PageTransition></ProtectedRoute>} />
          <Route path="/host/earnings" element={<ProtectedRoute roleRequired="HOST"><PageTransition><HostEarningsPage /></PageTransition></ProtectedRoute>} />
          <Route path="/host/rentals" element={<ProtectedRoute roleRequired="HOST"><PageTransition><HostRentalsPage /></PageTransition></ProtectedRoute>} />
          <Route path="/host/guests" element={<ProtectedRoute roleRequired="HOST"><PageTransition><HostGuestsPage /></PageTransition></ProtectedRoute>} />
          <Route path="/host/community" element={<ProtectedRoute roleRequired="HOST"><PageTransition><HostCommunityPage /></PageTransition></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
      <FloatingAI />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
