
import React from 'react';
import { Home, Map, MessageSquare, User, Activity, LogOut, LayoutDashboard } from 'lucide-react';
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

  const isLanding = currentScreen === 'landing';
  const isOperator = currentScreen === 'operator-dashboard';

  // Navigation Items
  const navItems = [
    { id: 'scenario-b', label: 'Home', icon: Home, target: 'scenario-b' },
    { id: 'scenario-c', label: 'Map', icon: Map, target: 'scenario-c' },
    { id: 'chat', label: 'Chat', icon: MessageSquare, target: 'chat' },
    { id: 'profile', label: 'Profile', icon: User, target: 'profile' },
  ];

  const operatorNavItems = [
    { id: 'operator-dashboard', label: 'Dashboard', icon: LayoutDashboard, target: 'operator-dashboard' },
    // We could add more operator screens here later like "Reports", "Settings"
  ];

  const navItemClass = (screen: string) => 
    `flex flex-col md:flex-row md:gap-3 items-center justify-center md:justify-start w-full h-full md:h-auto md:py-3 md:px-4 md:rounded-xl transition-all ${
      currentScreen === screen || (screen === 'scenario-b' && (currentScreen === 'scenario-a' || currentScreen === 'scenario-b')) 
        ? 'text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] md:bg-violet-500/10 md:border md:border-violet-500/20' 
        : 'text-slate-500 hover:text-slate-300 md:hover:bg-white/5'
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex overflow-hidden relative selection:bg-violet-500 selection:text-white">
      
      {/* Ambient Blobs - Fixed Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`blob w-[500px] h-[500px] top-[-100px] left-[-100px] md:top-[-200px] md:left-[-200px] animate-pulse-slow ${blobTopColor}`} />
        <div className={`blob w-[500px] h-[500px] bottom-[-100px] right-[-100px] md:bottom-[-200px] md:right-[-200px] ${blobBottomColor}`} />
      </div>

      {/* DESKTOP SIDEBAR (Hidden on Mobile, Hidden on Landing) */}
      {!isLanding && (
        <aside className="hidden md:flex flex-col w-64 h-screen glass-nav border-r border-white/10 z-50 p-6 fixed left-0 top-0">
          <div className="mb-8 flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">AURA</h1>
          </div>

          <div className="flex-1 space-y-2">
            {isOperator ? (
              // Operator Menu
              <>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">AOCC Controls</p>
                {operatorNavItems.map((item) => (
                  <button key={item.id} onClick={() => onNavigate(item.target as any)} className={navItemClass(item.target)}>
                    <item.icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </>
            ) : (
              // Traveler Menu
              <>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Menu</p>
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => onNavigate(item.target as any)} className={navItemClass(item.target)}>
                    <div className="relative">
                      <item.icon size={20} />
                      {item.id === 'chat' && <span className="absolute -top-1 -right-1 w-2 h-2 bg-violet-500 rounded-full animate-pulse" />}
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Logout / User Area */}
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors mt-auto border border-transparent hover:border-red-500/20"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </aside>
      )}

      {/* MAIN CONTENT AREA */}
      <div className={`flex-1 relative z-10 flex flex-col h-screen overflow-hidden ${!isLanding ? 'md:ml-64' : ''}`}>
        
        {/* Scrollable Content */}
        <main className={`flex-1 overflow-y-auto scrollbar-hide w-full ${!isLanding && !isOperator ? 'md:max-w-5xl md:mx-auto md:p-8' : ''} ${currentScreen === 'landing' ? 'h-full' : 'pb-24 md:pb-8'}`}>
          {children}
        </main>

        {/* MOBILE BOTTOM NAV (Hidden on Desktop, Hidden on Landing, Hidden on Operator) */}
        {!isLanding && !isOperator && (
          <nav className="md:hidden glass-nav fixed bottom-0 left-0 right-0 h-20 flex justify-around items-center z-50 pb-safe px-2">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => onNavigate(item.target as any)} className={navItemClass(item.target)}>
                <div className="relative">
                  <item.icon size={24} />
                  {item.id === 'chat' && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-violet-500 rounded-full animate-pulse" />}
                </div>
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Layout;
