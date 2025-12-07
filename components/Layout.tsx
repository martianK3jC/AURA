
import React from 'react';
import { Home, Map, MessageSquare, User, Settings } from 'lucide-react';
import { ScreenId } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onNavigate }) => {
  // Determine blob colors based on screen
  const getBlobClasses = () => {
    if (currentScreen === 'scenario-a') return ['blob-green', 'blob-blue'];
    if (currentScreen === 'scenario-b') return ['blob-red', 'blob-orange'];
    if (currentScreen === 'landing') return ['blob-violet', 'blob-indigo'];
    if (currentScreen === 'operator-dashboard') return ['blob-blue', 'blob-cyan'];
    return ['blob-violet', 'blob-blue']; // Default
  };

  const [blobTopColor, blobBottomColor] = getBlobClasses();

  const navItemClass = (screen: ScreenId) => 
    `flex flex-col items-center justify-center w-full h-full transition-colors ${
      currentScreen === screen || (screen === 'scenario-b' && (currentScreen === 'scenario-a' || currentScreen === 'scenario-b')) 
        ? 'text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' 
        : 'text-slate-500 hover:text-slate-300'
    }`;

  // Check if we should show the bottom navigation
  // Hide on Landing page AND Operator Dashboard
  const showBottomNav = currentScreen !== 'landing' && currentScreen !== 'operator-dashboard';

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex justify-center overflow-hidden">
      {/* Ambient Blobs */}
      <div className={`blob w-96 h-96 top-[-100px] left-[-100px] animate-pulse-slow ${blobTopColor}`} />
      <div className={`blob w-96 h-96 bottom-[-100px] right-[-100px] ${blobBottomColor}`} />

      <div className="w-full max-w-md relative min-h-screen z-10 flex flex-col">
        
        <main className={`flex-1 overflow-y-auto pb-20 scrollbar-hide ${currentScreen === 'landing' || currentScreen === 'chat' ? 'flex flex-col' : ''}`}>
          {children}
        </main>

        {showBottomNav && (
          <nav className="glass-nav fixed bottom-0 w-full max-w-md h-20 flex justify-around items-center z-50 pb-safe">
            <button onClick={() => onNavigate('scenario-b')} className={navItemClass('scenario-b')}>
              <Home size={24} />
              <span className="text-[10px] mt-1 font-medium">Home</span>
            </button>
            <button onClick={() => onNavigate('scenario-c')} className={navItemClass('scenario-c')}>
              <Map size={24} />
              <span className="text-[10px] mt-1 font-medium">Map</span>
            </button>
            <button onClick={() => onNavigate('chat')} className={navItemClass('chat')}>
              <div className="relative">
                <MessageSquare size={24} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-violet-500 rounded-full animate-pulse" />
              </div>
              <span className="text-[10px] mt-1 font-medium">Chat</span>
            </button>
            <button onClick={() => onNavigate('profile')} className={navItemClass('profile')}>
              <User size={24} />
              <span className="text-[10px] mt-1 font-medium">Profile</span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Layout;