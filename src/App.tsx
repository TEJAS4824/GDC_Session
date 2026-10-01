/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/public/Hero';
import { EventsSection } from './components/public/EventsSection';
import { PricingSection } from './components/public/PricingSection';
import { AboutCommunity } from './components/public/AboutCommunity';
import { MemberPortal } from './components/member/MemberPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Modals
import { EventDetailModal } from './components/events/EventDetailModal';
import { EventPassModal } from './components/events/EventPassModal';
import { EventCreateModal } from './components/events/EventCreateModal';
import { PaymentGatewayModal } from './components/payment/PaymentGatewayModal';
import { InvoiceModal } from './components/payment/InvoiceModal';
import { RegistrationModal } from './components/member/RegistrationModal';
import { AdminEventCheckin } from './components/admin/AdminEventCheckin';
import { Toast } from './components/common/Toast';
import { GoogleColorBar } from './components/common/GoogleDevLogo';

import { Megaphone, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, announcements, setCurrentView } = useApp();
  const [dismissBanner, setDismissBanner] = React.useState(false);

  const latestAnnouncement = announcements[0];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans selection:bg-stone-900 selection:text-white">
      
      {/* Official Google 4-Color Signature Accent Bar */}
      <GoogleColorBar />

      {/* Community Announcement Broadcast Ribbon in warm beige */}
      {!dismissBanner && latestAnnouncement && (
        <div className="bg-[#F2ECE1] border-b border-[#E5DDD0] text-xs px-4 py-2 text-center text-stone-800 flex items-center justify-center gap-2">
          <Megaphone className="w-3.5 h-3.5 text-stone-700 shrink-0" />
          <span className="font-semibold text-stone-900">{latestAnnouncement.title}</span>
          <span className="hidden sm:inline text-stone-400">·</span>
          <span className="hidden sm:inline text-stone-600 truncate max-w-lg">{latestAnnouncement.content}</span>
          {latestAnnouncement.linkUrl && (
            <button
              onClick={() => {
                setCurrentView('public');
                const el = document.getElementById(latestAnnouncement.linkUrl?.replace('#', '') || '');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-stone-900 hover:text-blue-700 underline font-semibold ml-1 cursor-pointer"
            >
              {latestAnnouncement.linkText || 'Details →'}
            </button>
          )}
          <button 
            onClick={() => setDismissBanner(true)}
            className="p-1 text-stone-500 hover:text-stone-900 ml-2 cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar />

      {/* View Routing */}
      <main className="flex-1">
        {currentView === 'public' && (
          <>
            <Hero />
            <EventsSection />
            <PricingSection />
            <AboutCommunity />
          </>
        )}

        {currentView === 'portal' && <MemberPortal />}

        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlay & Interactive Modals */}
      <EventDetailModal />
      <EventPassModal />
      <EventCreateModal />
      <PaymentGatewayModal />
      <InvoiceModal />
      <RegistrationModal />
      <AdminEventCheckin />
      <Toast />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
