import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClubEvent, EventCategory } from '../../types';
import { Calendar, Users, Ticket, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { SafeImage } from '../common/SafeImage';

export const EventsSection: React.FC = () => {
  const { 
    events, 
    currentUser, 
    rsvpForEvent, 
    rsvps, 
    setSelectedEventForDetail, 
    openTicketPass,
    openCheckout,
    pricingTiers,
    setIsRegisterModalOpen 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(e => e.category === activeCategory);

  const getCategoryLabel = (cat: EventCategory) => {
    switch (cat) {
      case 'ai_ml': return 'AI & Machine Learning';
      case 'web_cloud': return 'Web & Cloud Architecture';
      case 'mobile_android': return 'Android & Mobile';
      case 'cybersec': return 'Cybersecurity';
      case 'open_source': return 'Open Source & Hackathons';
      default: return cat;
    }
  };

  const handleRSVPClick = (e: React.MouseEvent, event: ClubEvent) => {
    e.stopPropagation();

    if (!currentUser) {
      setIsRegisterModalOpen(true);
      return;
    }

    const existingRSVP = rsvps.find(r => r.eventId === event.id && r.memberId === currentUser.id);
    if (existingRSVP) {
      openTicketPass(existingRSVP);
      return;
    }

    if (event.ticketType === 'member_only' && currentUser.tier === 'community') {
      openCheckout(pricingTiers.find(t => t.id === 'pro') || pricingTiers[1]);
      return;
    }

    if (event.ticketType === 'paid') {
      setSelectedEventForDetail(event);
      return;
    }

    rsvpForEvent(event.id, currentUser.id);
  };

  return (
    <section id="events" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E8E1D5]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-stone-500 uppercase mb-2">
            <span>Club Calendar</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>2026 Academic Season</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Upcoming Workshops, Hackathons & Tech Jams
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-xl">
            In-person and interactive coding sessions across engineering campuses in Vadodara.
          </p>
        </div>

        {/* Functional Segmented Filter Control */}
        <div className="flex items-center gap-1 p-1 bg-[#EFE9DF] border border-[#DDD5C7] rounded-lg overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'All Sessions' },
            { id: 'ai_ml', label: 'GenAI' },
            { id: 'open_source', label: 'Hackathons' },
            { id: 'mobile_android', label: 'Android' }
          ].map(tab => (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === tab.id 
                  ? 'bg-stone-900 text-white shadow-xs' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Events Grid with motion stagger */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(event => {
          const isUserRegistered = currentUser ? rsvps.some(r => r.eventId === event.id && r.memberId === currentUser.id) : false;
          const capacityPercent = Math.min(100, Math.round((event.rsvpCount / event.capacity) * 100));

          return (
            <motion.div
              key={event.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setSelectedEventForDetail(event)}
              className="group bg-white border border-[#E2DBD0] hover:border-stone-400 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              {/* Card Banner Image */}
              <div className="relative h-48 w-full overflow-hidden bg-[#EFE9DF]">
                <SafeImage
                  src={event.bannerImage}
                  alt={event.title}
                  fallbackType="event"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />
                
                {/* Quiet Unboxed Metadata on Top */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-950/75 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] tabular-nums">
                    <Calendar className="w-3 h-3 text-stone-300" />
                    <span>{event.date}</span>
                    <span>·</span>
                    <span>{event.time}</span>
                  </div>

                  <div className="px-2.5 py-1 rounded-md bg-stone-950/75 backdrop-blur-md border border-white/10 font-medium text-[11px]">
                    {event.ticketType === 'free' ? (
                      <span className="text-emerald-300">Open Access</span>
                    ) : event.ticketType === 'member_only' ? (
                      <span className="text-amber-300">Pro Pass Required</span>
                    ) : (
                      <span className="text-white font-mono tabular-nums">₹{event.priceINR} / Seat</span>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 text-xs text-stone-200 flex items-center gap-2">
                  <span className="font-medium text-white">{getCategoryLabel(event.category)}</span>
                  <span>·</span>
                  <span className="truncate max-w-[240px] text-stone-300">{event.venue.split(',')[0]}</span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-black transition-colors tracking-tight line-clamp-1">
                    {event.title}
                  </h3>
                  
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Speaker lockup with SafeImage */}
                  <div className="mt-4 pt-3 border-t border-[#EAE3D6] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <SafeImage
                        src={event.speaker.avatar}
                        alt={event.speaker.name}
                        fallbackType="avatar"
                        fallbackText={event.speaker.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#DDD5C7] bg-[#EFE9DF]"
                      />
                      <div>
                        <p className="font-semibold text-stone-900">{event.speaker.name}</p>
                        <p className="text-[11px] text-stone-500">{event.speaker.role} · {event.speaker.company}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Capacity & Actions */}
                <div className="mt-5 pt-3 border-t border-[#EAE3D6] flex items-center justify-between gap-3">
                  <div className="flex-1 mr-2">
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                      <span>Seats Reserved</span>
                      <span className="font-mono tabular-nums text-stone-800 font-semibold">{event.rsvpCount} / {event.capacity}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#EAE3D6] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-stone-900" 
                        style={{ width: `${capacityPercent}%` }} 
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isUserRegistered ? (
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={(e) => handleRSVPClick(e, event)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#EAE5D9] text-stone-800 border border-[#DDD5C7] hover:bg-[#E2DBCF] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-stone-900" />
                        <span>Pass Ready</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={(e) => handleRSVPClick(e, event)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>{event.ticketType === 'member_only' ? 'Claim Pro Pass' : 'RSVP Free'}</span>
                      </motion.button>
                    )}
                  </div>
                </div>

              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
