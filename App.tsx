
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LandingScreen from './screens/LandingScreen';
import DashboardScreen from './screens/DashboardScreen';
import MapScreen from './screens/MapScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import OperatorDashboardScreen from './screens/OperatorDashboardScreen';
import { ScreenId } from './types';

const App: React.FC = () => {
  // Default to Landing Page as requested
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [scenarioType, setScenarioType] = useState<'A' | 'B'>('B'); 

  // Sync scenario type with screen if navigating via internal links
  useEffect(() => {
    if (currentScreen === 'scenario-a') setScenarioType('A');
    if (currentScreen === 'scenario-b') setScenarioType('B');
  }, [currentScreen]);

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
  };

  const handleSetScenario = (type: 'A' | 'B') => {
    setScenarioType(type);
    setCurrentScreen(type === 'A' ? 'scenario-a' : 'scenario-b');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen onNavigate={handleNavigate} />;
      case 'scenario-a':
      case 'scenario-b':
        return <DashboardScreen scenarioType={scenarioType} onNavigate={handleNavigate} onSetScenario={handleSetScenario} />;
      case 'scenario-c':
        return <MapScreen onNavigate={handleNavigate} />;
      case 'chat':
        return <ChatScreen onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} />;
      case 'operator-dashboard':
        return <OperatorDashboardScreen onNavigate={handleNavigate} />;
      default:
        return <LandingScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout 
      currentScreen={currentScreen} 
      onNavigate={handleNavigate}
    >
      {renderScreen()}
    </Layout>
  );
};

export default App;