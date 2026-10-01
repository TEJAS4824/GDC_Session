import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { SafeImage } from '../common/SafeImage';
import { GoogleDevLogo } from '../common/GoogleDevLogo';

export const Hero: React.FC = () => {
  const { setCurrentView, setIsRegisterModalOpen, members, events } = useApp();

  const handleScrollToEvents = () => {
    const el = document.getElementById('events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Text with Official Google Dev Emblem */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs font-semibold tracking-wider text-stone-600 uppercase mb-4"
        >
          <GoogleDevLogo size="xs" />
          <span className="text-stone-900 font-bold">Google Developer Community</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Vadodara Chapter</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Est. 2024</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Core CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.14]" style={{ textWrap: 'balance' }}>
              Empowering the next generation of software engineers in Vadodara.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              GDC Vadodara connects student developers, open-source contributors, and tech leaders across GSFC University, MSU Baroda, Parul, and ITM through hands-on hackathons, cloud labs, and real industry mentorship.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors shadow-md shadow-stone-900/15 flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Register for Membership</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleScrollToEvents}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-stone-900 bg-white border border-[#DDD5C7] hover:bg-[#F4EFE6] transition-colors cursor-pointer whitespace-nowrap shadow-xs"
              >
                View Upcoming Events
              </motion.button>

              <button
                onClick={handleScrollToPricing}
                className="px-4 py-2.5 rounded-lg text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
              >
                Pricing & Perks →
              </button>
            </div>

            {/* Adjacent Proof Metrics (Claim-to-Proof Adjacency) */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#E8E1D5]">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 tabular-nums">
                  {members.length * 280}+
                </p>
                <p className="text-xs text-stone-500 mt-0.5">Active Student Coders</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 tabular-nums">
                  {events.length + 14}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">Workshops & Jams</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 tabular-nums">
                  ₹1.5L+
                </p>
                <p className="text-xs text-stone-500 mt-0.5">Hackathon Prize Pool</p>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Hero Visual Anchor with Measured Scrim & SafeImage */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#DDD5C7] shadow-xl bg-white group">
              <SafeImage
                src="/src/assets/images/hero_vadodara_tech_1790832779240.jpg"
                alt="GDC Vadodara Developer Summit in modern auditorium"
                fallbackType="event"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-102 transition-transform duration-500 ease-out"
              />
              {/* High-legibility scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-center gap-2 text-xs text-stone-300 font-medium mb-1">
                  <span>Flagship Summit</span>
                  <span>·</span>
                  <span>Auditorium @ GSFC University</span>
                </div>
                <h2 className="text-lg font-bold tracking-tight text-white mb-2">
                  Vadodara DevFest & GenAI Summit 2026
                </h2>
                <div className="flex items-center justify-between text-xs text-stone-300 pt-2 border-t border-white/20">
                  <span className="font-mono tabular-nums">OCT 18 · 09:30 AM</span>
                  <button 
                    onClick={handleScrollToEvents}
                    className="text-stone-100 hover:text-white font-semibold cursor-pointer underline decoration-white/40 hover:decoration-white"
                  >
                    Reserve Pass →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
