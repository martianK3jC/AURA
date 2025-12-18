
import React, { useState } from 'react';
import { Home, Map, MessageSquare, User, Sparkles, LogOut, LayoutDashboard, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { ScreenId } from '../types';
import ConfirmationModal from './ConfirmationModal';
import auraLogo from '../img/aura_logo.png';


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

  const isLanding = currentScreen === 'landing';
  const isOperator = currentScreen === 'operator-dashboard';

  // Screens where navigation should be HIDDEN (onboarding flow)
  const isOnboardingFlow = [
    'landing',
    'traveler-login',
    'onboarding',
    'arrival-dashboard',
    'destination-input',
    'transportation-options',
    'route-tracking'
  ].includes(currentScreen);

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

  const navItemClass = (screen: string) => {
    const isActive = currentScreen === screen || (screen === 'scenario-b' && (currentScreen === 'scenario-a' || currentScreen === 'scenario-b'));

    // Operator Theme (Dark)
    if (isOperator) {
      return `flex flex-col md:flex-row md:gap-5 items-center justify-center ${isCollapsed ? 'md:justify-center md:p-3 md:w-12 md:h-12 md:mx-auto md:rounded-xl' : 'md:justify-start md:p-4 w-full md:rounded-lg'} h-full md:h-auto transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-neutral-950 ${isActive
        ? 'text-white bg-gradient-to-r from-red-600/20 to-rose-600/20 md:border md:border-red-500/30 shadow-sm'
        : 'text-neutral-400 hover:text-white md:hover:bg-neutral-800'
        }`;
    }

    // Traveler Theme (Light)
    return `flex flex-col md:flex-row md:gap-3 items-center justify-center ${isCollapsed ? 'md:justify-center md:p-1' : 'md:justify-start md:p-2'} w-full h-full md:h-auto md:rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 ${isActive
      ? 'text-red-600 bg-red-50 md:border md:border-red-100 shadow-sm font-medium'
      : 'text-neutral-600 hover:text-neutral-900 md:hover:bg-neutral-100'
      }`;
  };

  return (
    <div className={`min-h-[100dvh] font-sans flex overflow-hidden relative ${isOperator ? 'bg-neutral-950 text-white selection:bg-red-500' : 'bg-neutral-50 text-neutral-900 selection:bg-red-500'} selection:text-white`}>
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
        variant={isOperator ? 'dark' : 'light'}
      />

      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600/95 backdrop-blur text-white text-[10px] md:text-xs font-bold text-center py-1.5 z-[9999] shadow-lg animate-in slide-in-from-top duration-300">
          ⚠️ No Internet Connection. You are viewing cached data.
        </div>
      )}

      {/* Subtle Corner Accents - Red/Orange/Yellow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Top-left accent - Stronger for Glass effect */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-full blur-[100px] -translate-x-20 -translate-y-20 opacity-70" />
        {/* Bottom-right accent - Stronger for Glass effect */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-full blur-[120px] translate-x-32 translate-y-32 opacity-70" />
      </div>

      {/* DESKTOP SIDEBAR (Hidden on Mobile, Hidden during Onboarding Flow) */}
      {!isOnboardingFlow && (
        <aside className={`hidden md:flex flex-col h-[100dvh] z-50 fixed left-0 top-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] backdrop-blur-xl ${isCollapsed ? 'w-20 items-center px-2 py-6' : 'w-64 px-6 py-6'} ${isOperator ? 'border-r border-neutral-800 bg-neutral-900/95' : 'border-r border-stone-100 bg-white/95'}`}>



          {/* 2. Logo Area */}
          <div className={`flex items-center gap-3 mb-10 transition-all duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
            <img src={auraLogo} alt="AURA Logo" className="w-10 h-10 rounded-xl object-contain shadow-lg shadow-red-500/20" />
            <h1 className={`text-xl font-bold tracking-tight text-neutral-900 overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
              AURA
            </h1>
          </div>

          {/* 3. Navigation Items */}
          <div className="flex-1 flex flex-col gap-2 w-full">
            <p className={`text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 transition-all duration-300 ${isCollapsed ? 'text-center px-0' : 'px-3'}`}>
              Menu
            </p>

            {navItems.map((item) => {
              const isActive = currentScreen === item.target || (item.target === 'scenario-b' && (currentScreen === 'scenario-a' || currentScreen === 'scenario-b'));
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.target as any)}
                  className={`
                        group flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all duration-200 relative w-full
                        ${isActive ? 'bg-red-50 text-red-600 font-semibold' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50/80'}
                        ${isCollapsed ? 'justify-center' : ''}
                     `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className="relative shrink-0">
                    <item.icon
                      size={22}
                      className={`transition-colors duration-200 ${isActive ? 'text-red-600' : 'text-stone-400 group-hover:text-stone-600'}`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {item.id === 'chat' && (
                      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <span className={`text-[15px] whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                    {item.label}
                  </span>

                  {/* Active Indicator Line for Collapsed State */}
                  {isCollapsed && isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-600 rounded-r-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* 4. Footer Area (Toggle + Logout) */}
          <div className="mt-auto flex flex-col gap-2 w-full pt-4 border-t border-stone-100">

            {/* Collapse Toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`flex items-center gap-3.5 px-3 py-3 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-all duration-200 w-full ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <div className="relative shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}>
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <line x1="9" x2="9" y1="3" y2="21" />
                </svg>
              </div>
              <span className={`text-[15px] font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                Collapse
              </span>
            </button>

            {/* Logout - Operator Only (as secondary item below toggle) */}
            {isOperator && (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className={`flex items-center gap-3.5 px-3 py-3 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 w-full ${isCollapsed ? 'justify-center' : ''}`}
              >
                <LogOut size={22} className="shrink-0" />
                <span className={`text-[15px] font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>Logout</span>
              </button>
            )}
          </div>

        </aside>
      )}

      {/* MAIN CONTENT AREA */}
      <div className={`flex-1 relative flex flex-col h-[100dvh] overflow-hidden transition-all duration-300 ${!isOnboardingFlow ? (isCollapsed ? 'md:ml-20' : 'md:ml-64') : ''}`}>

        {/* Scrollable Content Wrapper */}
        <main className={`flex-1 w-full relative flex flex-col overflow-hidden ${currentScreen === 'landing' ? 'h-full' : ''} ${!isOnboardingFlow ? 'pb-20 md:pb-0' : ''}`}>
          {children}
        </main>

        {/* MOBILE NAVIGATION LOGIC - Hidden during Onboarding Flow */}
        {!isOnboardingFlow && (
          <>
            {/* UNIFIED: Standard Fixed Bottom Navigation */}
            <nav className={`md:hidden fixed bottom-0 left-0 right-0 h-20 flex justify-around items-center z-50 pb-safe px-2 backdrop-blur-xl ${isOperator ? 'bg-neutral-900/95 border-t border-neutral-800' : 'bg-white/95 border-t border-neutral-200'}`}>
              {(isOperator ? operatorNavItems : navItems).map((item) => (
                <button key={item.id} onClick={() => onNavigate(item.target as any)} className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isOperator ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'}`}>
                  <div className="relative">
                    <item.icon size={24} className={currentScreen === item.target || (item.target === 'scenario-b' && (currentScreen === 'scenario-a' || currentScreen === 'scenario-b')) ? (isOperator ? "text-red-500" : "text-red-600") : ""} />
                    {item.id === 'chat' && <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-pulse ${isOperator ? 'bg-red-500' : 'bg-red-600'}`} />}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium ${currentScreen === item.target || (item.target === 'scenario-b' && (currentScreen === 'scenario-a' || currentScreen === 'scenario-b')) ? (isOperator ? "text-red-500" : "text-red-600") : ""}`}>{item.label}</span>
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
