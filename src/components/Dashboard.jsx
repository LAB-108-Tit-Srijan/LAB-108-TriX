import DashboardHero from './dashboard/DashboardHero';
import UpcomingJourneys from './dashboard/UpcomingJourneys';
import AIRecommendations from './dashboard/AIRecommendations';
import SavedDestinations from './dashboard/SavedDestinations';
import TravelInsights from './dashboard/TravelInsights';
import SafetyAndActions from './dashboard/SafetyAndActions';
import AIAssistant from './dashboard/AIAssistant';
import Footer from './Footer';

export default function Dashboard() {
  return (
    <div style={{ background: '#EAE6DF', minHeight: '100vh' }}>
      <DashboardHero />
      <UpcomingJourneys />
      <AIRecommendations />
      <SavedDestinations />
      <TravelInsights />
      <SafetyAndActions />
      <Footer />
      <AIAssistant />
    </div>
  );
}
