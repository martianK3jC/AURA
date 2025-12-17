
import React, { useState, useEffect } from 'react';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/Layout';
import ScreenTransition from './components/ScreenTransition';
import LandingScreen from './screens/LandingScreen';
import TravelerLoginScreen from './screens/TravelerLoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import MapScreen from './screens/MapScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import ArrivalDashboardScreen from './screens/ArrivalDashboardScreen';
import DestinationInputScreen from './screens/DestinationInputScreen';
import TransportationOptionsScreen from './screens/TransportationOptionsScreen';
import RouteTrackingScreen from './screens/RouteTrackingScreen';
import { ScreenId, TravelerContext } from './types';

const App: React.FC = () => {
  // Default to Landing Page as requested
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [scenarioType, setScenarioType] = useState<'A' | 'B'>('B');
  const [travelerContext, setTravelerContext] = useState<TravelerContext | null>(null);

  // Sync scenario type with screen if navigating via internal links
  useEffect(() => {
    if (currentScreen === 'scenario-a') setScenarioType('A');
    if (currentScreen === 'scenario-b') setScenarioType('B');
  }, [currentScreen]);

  const handleNavigate = (screen: ScreenId, context?: TravelerContext) => {
    if (context) {
      setTravelerContext(context);
    }
    setCurrentScreen(screen);
  };

  const handleSetScenario = (type: 'A' | 'B') => {
    setScenarioType(type);
    setCurrentScreen(type === 'A' ? 'scenario-a' : 'scenario-b');
  };

  const handleLogout = () => {
    setCurrentScreen('landing');
    setTravelerContext(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen onNavigate={handleNavigate} />;
      case 'traveler-login':
        return <TravelerLoginScreen onNavigate={handleNavigate} />;
      case 'onboarding':
        return <OnboardingScreen onNavigate={handleNavigate} travelerContext={travelerContext || undefined} />;
      case 'scenario-a':
      case 'scenario-b':
        return <DashboardScreen scenarioType={scenarioType} onNavigate={handleNavigate} onSetScenario={handleSetScenario} onLogout={handleLogout} travelerContext={travelerContext || undefined} />;
      case 'scenario-c':
        return <MapScreen onNavigate={handleNavigate} />;
      case 'chat':
        return <ChatScreen onNavigate={handleNavigate} travelerContext={travelerContext || undefined} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} travelerContext={travelerContext || undefined} />;
      case 'arrival-dashboard':
        return <ArrivalDashboardScreen onNavigate={handleNavigate} travelerContext={travelerContext || undefined} />;
      case 'destination-input':
        return <DestinationInputScreen onNavigate={handleNavigate} />;
      case 'transportation-options':
        return <TransportationOptionsScreen onNavigate={handleNavigate} />;
      case 'route-tracking':
        return <RouteTrackingScreen onNavigate={handleNavigate} />;
      case 'operator-dashboard':
        return (
          <div className="flex items-center justify-center h-full bg-slate-50">
            <div className="text-center p-8">
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Operator Dashboard</h1>
              <p className="text-slate-600">This dashboard is hosted on a separate secure portal.</p>
            </div>
          </div>
        );

      default:
        return <LandingScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <ToastProvider>
      <Layout
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
      >
        <ScreenTransition transitionKey={currentScreen}>
          {renderScreen()}
        </ScreenTransition>
      </Layout>
    </ToastProvider>
  );
};

export default App;