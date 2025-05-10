import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { BottomNavigation } from "@components/.";
import { Home, Progress, Payment, Profile } from "@pages/.";
import { 
  OnboardingIntro, 
  DonationSetup, 
  GoogleSignup, 
  PaymentMethod 
} from "./pages/onboarding";

// Wrapper component to handle bottom navigation display
function AppContent() {
  const location = useLocation();
  const isOnboarding = location.pathname.includes('/onboarding');
  
  // For this demo, we can check if onboarding is completed
  // In a real app, this would come from a context or state management
  const isOnboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';

  return (
    <div className="flex flex-col">
      <div className="flex-grow pb-16">
        <Routes>
          {/* Redirect to onboarding if not completed */}
          <Route path="/" element={
            isOnboardingCompleted ? <Home /> : <Navigate to="/onboarding" />
          } />
          
          {/* Main app routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Onboarding flow */}
          <Route path="/onboarding" element={<OnboardingIntro />} />
          <Route path="/onboarding/donation" element={<DonationSetup />} />
          <Route path="/onboarding/signup" element={<GoogleSignup />} />
          <Route path="/onboarding/payment" element={<PaymentMethod />} />
        </Routes>
      </div>
      {/* Only show navigation when not in onboarding */}
      {!isOnboarding && <BottomNavigation />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
