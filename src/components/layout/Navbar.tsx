import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronDown, Check, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SafeImage } from '../common/SafeImage';
import { GoogleDevLogo } from '../common/GoogleDevLogo';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    currentUser, 
    members, 
    switchUser, 
    setIsRegisterModalOpen 
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleNavClick = (view: 'public' | 'portal' | 'admin', anchorId?: string) => {
    setCurrentView(view);
    if (anchorId && view === 'public') {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/92 backdrop-blur-md border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Official Google Developer Community Brand Mark */}
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavClick('public')}
          className="flex items-center gap-2.5 text-left cursor-pointer shrink-0"
        >
          <GoogleDevLogo size="sm" />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-stone-900 tracking-tight text-sm">
              Google Developer Community
            </span>
            <span className="text-[11px] font-semibold text-stone-600 tracking-wide mt-0.5">
              Vadodara
            </span>
          </div>
        </motion.button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button 
            onClick={() => handleNavClick('public', 'hero')}
            className={`transition-colors cursor-pointer hover:text-stone-900 relative ${
              currentView === 'public' ? 'text-stone-900 font-semibold' : 'text-stone-600'
            }`}
          >
            Overview
            {currentView === 'public' && (
              <motion.span 
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-stone-900 rounded-full" 
              />
            )}
          </button>
          
          <button 
            onClick={() => handleNavClick('public', 'events')}
            className="transition-colors cursor-pointer hover:text-stone-900 text-stone-600"
          >
            Events
          </button>
          
          <button 
            onClick={() => handleNavClick('public', 'pricing')}
            className="transition-colors cursor-pointer hover:text-stone-900 text-stone-600"
          >
            Membership
          </button>
          
          <button 
            onClick={() => handleNavClick('public', 'community')}
            className="transition-colors cursor-pointer hover:text-stone-900 text-stone-600"
          >
            Campuses
          </button>
          
          <button 
            onClick={() => handleNavClick('portal')}
            className={`transition-colors cursor-pointer hover:text-stone-900 relative ${
              currentView === 'portal' ? 'text-stone-900 font-semibold' : 'text-stone-600'
            }`}
          >
            Member Portal
            {currentView === 'portal' && (
              <motion.span 
                layoutId="navbar-indicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-stone-900 rounded-full" 
              />
            )}
          </button>
          
          {currentUser?.role === 'admin' && (
            <button 
              onClick={() => handleNavClick('admin')}
              className={`transition-colors cursor-pointer hover:text-stone-900 relative ${
                currentView === 'admin' ? 'text-stone-900 font-semibold' : 'text-stone-600'
              }`}
            >
              Admin Console
              {currentView === 'admin' && (
                <motion.span 
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-stone-900 rounded-full" 
                />
              )}
            </button>
          )}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          
          {/* User Profile & Role Switcher Popover */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F4EFE6] border border-[#DDD5C7] hover:border-stone-400 text-xs font-medium text-stone-800 transition-colors cursor-pointer shadow-xs"
              title="Switch user role or identity"
            >
              {currentUser ? (
                <>
                  <SafeImage 
                    src={currentUser.avatarUrl} 
                    alt={currentUser.name} 
                    fallbackType="avatar"
                    fallbackText={currentUser.name}
                    className="w-5 h-5 rounded-full object-cover border border-[#CFC5B6]" 
                  />
                  <span className="hidden sm:inline font-medium max-w-[110px] truncate">{currentUser.name}</span>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">
                    ({currentUser.role === 'admin' ? 'Lead' : currentUser.tier})
                  </span>
                </>
              ) : (
                <span>Guest</span>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
            </motion.button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-72 bg-white border border-[#DDD5C7] rounded-xl shadow-xl p-2 z-50"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-[#EAE3D6] text-xs">
                    <p className="font-semibold text-stone-900">Switch Test Profile</p>
                    <p className="text-stone-500 text-[11px]">Experience Admin vs Student perspective</p>
                  </div>
                  <div className="py-1">
                    {members.map(member => (
                      <button
                        key={member.id}
                        onClick={() => switchUser(member.id)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs hover:bg-[#F7F3EB] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <SafeImage 
                            src={member.avatarUrl} 
                            alt={member.name} 
                            fallbackType="avatar"
                            fallbackText={member.name}
                            className="w-6 h-6 rounded-full object-cover border border-[#DDD5C7]" 
                          />
                          <div className="truncate">
                            <p className="font-medium text-stone-900 truncate">{member.name}</p>
                            <p className="text-[10px] text-stone-500 truncate">
                              {member.college.split(',')[0]} · {member.role === 'admin' ? 'Club Admin' : member.tier.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        {currentUser?.id === member.id && (
                          <Check className="w-3.5 h-3.5 text-stone-900 shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                    
                    <div className="border-t border-[#EAE3D6] mt-1 pt-1">
                      <button
                        onClick={() => switchUser('guest')}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-stone-600 hover:text-stone-900 hover:bg-[#F7F3EB] cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Explore as Guest Visitor</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Primary View Action Button */}
          {currentView === 'admin' ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentView('portal')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-black rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              Member View
            </motion.button>
          ) : currentView === 'portal' ? (
            currentUser?.role === 'admin' ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentView('admin')}
                className="px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-white border border-stone-300 hover:bg-stone-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
              >
                Admin Console
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNavClick('public', 'events')}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-black rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
              >
                Browse Events
              </motion.button>
            )
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm shadow-stone-900/10"
            >
              Join Club
            </motion.button>
          )}
        </div>

      </div>

      {/* Mobile Secondary Tab Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-[#E8E1D5] bg-[#FAF7F2] py-2 px-2 text-xs">
        <button
          onClick={() => handleNavClick('public')}
          className={`px-3 py-1 rounded-md transition-colors ${currentView === 'public' ? 'text-stone-900 bg-[#EFE9DF] font-semibold' : 'text-stone-500'}`}
        >
          Public
        </button>
        <button
          onClick={() => handleNavClick('public', 'events')}
          className="px-3 py-1 text-stone-500 hover:text-stone-900"
        >
          Events
        </button>
        <button
          onClick={() => handleNavClick('portal')}
          className={`px-3 py-1 rounded-md transition-colors ${currentView === 'portal' ? 'text-stone-900 bg-[#EFE9DF] font-semibold' : 'text-stone-500'}`}
        >
          My Portal
        </button>
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => handleNavClick('admin')}
            className={`px-3 py-1 rounded-md transition-colors ${currentView === 'admin' ? 'text-stone-900 bg-[#EFE9DF] font-semibold' : 'text-stone-500'}`}
          >
            Admin
          </button>
        )}
      </div>
    </header>
  );
};
