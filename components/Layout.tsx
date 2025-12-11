
import React, { useState } from 'react';
import { Home, Map, MessageSquare, User, Activity, LogOut, LayoutDashboard, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { ScreenId } from '../types';
import ConfirmationModal from './ConfirmationModal';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onNavigate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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
    `flex flex-col md:flex-row md:gap-3 items-center justify-center ${isCollapsed ? 'md:justify-center' : 'md:justify-start'} w-full h-full md:h-auto md:py-3 md:px-4 md:rounded-xl transition-all ${currentScreen === screen || (screen === 'scenario-b' && (currentScreen === 'scenario-a' || currentScreen === 'scenario-b'))
      ? 'text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] md:bg-violet-500/10 md:border md:border-violet-500/20'
      : 'text-slate-500 hover:text-slate-300 md:hover:bg-white/5'
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex overflow-hidden relative selection:bg-violet-500 selection:text-white">
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        title="Log Out"
        message="Are you sure you want to log out? You will be returned to the Landing Screen."
        onConfirm={() => {
          onNavigate('landing');
          setShowLogoutConfirm(false);
        }}
        onCancel={() => setShowLogoutConfirm(false)}
        confirmText="Log Out"
        isDangerous={true}
      />

      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600/95 backdrop-blur text-white text-[10px] md:text-xs font-bold text-center py-1.5 z-[9999] shadow-lg animate-in slide-in-from-top duration-300">
          ⚠️ No Internet Connection. You are viewing cached data.
        </div>
      )}

      {/* Ambient Blobs - Fixed Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`blob w-[350px] h-[350px] md:w-[400px] md:h-[400px] top-[-75px] left-[-75px] md:top-[-100px] md:left-[-100px] animate-pulse-slow ${blobTopColor}`} />
        <div className={`blob w-[350px] h-[350px] md:w-[400px] md:h-[400px] bottom-[-75px] right-[-75px] md:bottom-[-100px] md:right-[-100px] ${blobBottomColor}`} />
      </div>

      {/* DESKTOP SIDEBAR (Hidden on Mobile, Hidden on Landing) */}
      {!isLanding && (
        <aside className={`hidden md:flex flex-col h-screen glass-nav border-r border-white/10 z-50 fixed left-0 top-0 transition-all duration-300 ${isCollapsed ? 'w-20 p-4 items-center' : 'w-64 p-6'}`}>
          {/* Logo / Collapse Toggle Area */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`mb-8 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity group w-full bg-transparent border-none p-0 text-left ${isCollapsed ? 'justify-center px-0' : 'px-2'}`}
            title="Toggle Sidebar"
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
              <Activity size={16} className="text-white" />
            </div>
            {!isCollapsed && <h1 className="text-xl font-bold tracking-tight whitespace-nowrap">AURA</h1>}
          </button>

          <div className="flex-1 space-y-2 w-full">
            {isOperator ? (
              // Operator Menu
              <>
                {!isCollapsed && <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2 whitespace-nowrap">AOCC Controls</p>}
                {operatorNavItems.map((item) => (
                  <button key={item.id} onClick={() => onNavigate(item.target as any)} className={navItemClass(item.target)} title={isCollapsed ? item.label : undefined}>
                    <item.icon size={20} className="shrink-0" />
                    {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                  </button>
                ))}
              </>
            ) : (
              // Traveler Menu
              <>
                {!isCollapsed && <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2 whitespace-nowrap">Menu</p>}
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => onNavigate(item.target as any)} className={navItemClass(item.target)} title={isCollapsed ? item.label : undefined}>
                    <div className="relative">
                      <item.icon size={20} className="shrink-0" />
                      {item.id === 'chat' && <span className="absolute -top-1 -right-1 w-2 h-2 bg-violet-500 rounded-full animate-pulse" />}
                    </div>
                    {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Logout / User Area */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className={`flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors mt-auto border border-transparent hover:border-red-500/20 w-full ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap">Logout</span>}
          </button>
        </aside>
      )}

      {/* MAIN CONTENT AREA */}
      <div className={`flex-1 relative z-10 flex flex-col h-screen overflow-hidden transition-all duration-300 ${!isLanding ? (isCollapsed ? 'md:ml-20' : 'md:ml-64') : ''}`}>

        {/* Scrollable Content Wrapper */}
        <main className={`flex-1 w-full relative flex flex-col overflow-hidden ${currentScreen === 'landing' ? 'h-full' : ''}`}>
          {children}
        </main>

        {/* MOBILE NAVIGATION LOGIC */}
        {!isLanding && (
          <>
            {/* UNIFIED: Standard Fixed Bottom Navigation */}
            <nav className="md:hidden glass-nav fixed bottom-0 left-0 right-0 h-20 flex justify-around items-center z-50 pb-safe px-2">
              {(isOperator ? operatorNavItems : navItems).map((item) => (
                <button key={item.id} onClick={() => onNavigate(item.target as any)} className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-slate-300">
                  <div className="relative">
                    <item.icon size={24} className={currentScreen === item.target || (item.target === 'scenario-b' && (currentScreen === 'scenario-a' || currentScreen === 'scenario-b')) ? "text-violet-400" : ""} />
                    {item.id === 'chat' && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-violet-500 rounded-full animate-pulse" />}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium ${currentScreen === item.target || (item.target === 'scenario-b' && (currentScreen === 'scenario-a' || currentScreen === 'scenario-b')) ? "text-violet-400" : ""}`}>{item.label}</span>
                </button>
              ))}

              {/* Add explicit Logout for Operator on Mobile Bottom Nav since they don't have many tabs */}
              {isOperator && (
                <button onClick={() => setShowLogoutConfirm(true)} className="flex flex-col items-center justify-center w-full h-full text-slate-500 hover:text-red-400">
                  <LogOut size={24} />
                  <span className="text-[10px] mt-1 font-medium">Logout</span>
                </button>
              )}
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
