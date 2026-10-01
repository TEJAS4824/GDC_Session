import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  CheckCircle2, 
  Ticket,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { SafeImage } from '../common/SafeImage';

export const EventDetailModal: React.FC = () => {
  const { 
    selectedEventForDetail, 
    setSelectedEventForDetail, 
    currentUser, 
    rsvps, 
    rsvpForEvent, 
    openTicketPass, 
    openCheckout, 
    pricingTiers, 
    setIsRegisterModalOpen, 
    showToast 
  } = useApp();

  if (!selectedEventForDetail) return null;

  const event = selectedEventForDetail;
  const isRegistered = currentUser ? rsvps.some(r => r.eventId === event.id && r.memberId === currentUser.id) : false;
  const userRSVP = currentUser ? rsvps.find(r => r.eventId === event.id && r.memberId === currentUser.id) : null;

  const handleAction = () => {
    if (!currentUser) {
      setSelectedEventForDetail(null);
      setIsRegisterModalOpen(true);
      return;
    }

    if (isRegistered && userRSVP) {
      setSelectedEventForDetail(null);
      openTicketPass(userRSVP);
      return;
    }

    if (event.ticketType === 'member_only' && currentUser.tier === 'community') {
      setSelectedEventForDetail(null);
      openCheckout(pricingTiers.find(t => t.id === 'pro') || pricingTiers[1]);
      return;
    }

    rsvpForEvent(event.id, currentUser.id);
    setSelectedEventForDetail(null);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Event link copied to clipboard!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-[#FAF7F2] border border-[#DDD5C7] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedEventForDetail(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-stone-700 hover:text-stone-950 hover:bg-white shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Banner with Scrim & SafeImage */}
        <div className="relative h-60 w-full overflow-hidden bg-[#EFE9DF]">
          <SafeImage
            src={event.bannerImage}
            alt={event.title}
            fallbackType="event"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs text-stone-300 font-semibold mb-1">
              <span>{event.category.toUpperCase().replace('_', ' ')}</span>
              <span>·</span>
              <span className="font-mono tabular-nums text-white">{event.date}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Quick Info Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-[#E0D8CB] text-xs text-stone-700 shadow-xs">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-900">Date & Schedule</p>
                <p className="text-stone-600 font-mono tabular-nums">{event.date} · {event.time} - {event.endTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-900">{event.venue}</p>
                <p className="text-stone-600">{event.venueAddress}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-900">Attendance Quota</p>
                <p className="text-stone-600 font-mono tabular-nums">{event.rsvpCount} of {event.capacity} seats filled</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Ticket className="w-4 h-4 text-stone-800 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-stone-900">Pass Type</p>
                <p className="text-stone-600">
                  {event.ticketType === 'free' ? 'Open Student RSVP (₹0)' : event.ticketType === 'member_only' ? 'Pro Member Fast-Track' : `₹${event.priceINR} Admission`}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              Overview & Objectives
            </h4>
            <p className="text-sm text-stone-700 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Speaker Spotlight with SafeImage */}
          <div>
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
              Featured Speaker & Mentor
            </h4>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs">
              <SafeImage
                src={event.speaker.avatar}
                alt={event.speaker.name}
                fallbackType="avatar"
                fallbackText={event.speaker.name}
                className="w-12 h-12 rounded-xl object-cover border border-[#DDD5C7] bg-[#EFE9DF] shrink-0"
              />
              <div>
                <h5 className="font-bold text-stone-900 text-sm">{event.speaker.name}</h5>
                <p className="text-xs text-stone-700 font-medium">{event.speaker.role}</p>
                <p className="text-xs text-stone-500 mt-0.5">{event.speaker.company}</p>
              </div>
            </div>
          </div>

          {/* Agenda */}
          {event.agenda && event.agenda.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                Session Agenda & Timeline
              </h4>
              <div className="space-y-2 border-l-2 border-[#DDD5C7] pl-4 ml-2">
                {event.agenda.map((item, idx) => (
                  <div key={idx} className="relative text-xs">
                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-stone-900" />
                    <p className="font-mono text-stone-500 text-[11px] tabular-nums font-semibold">{item.time}</p>
                    <p className="font-semibold text-stone-900 mt-0.5">{item.topic}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-between gap-4">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl border border-[#DDD5C7] bg-white text-stone-600 hover:text-stone-900 hover:bg-[#F4EFE6] transition-colors cursor-pointer shadow-xs"
              title="Share event link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedEventForDetail(null)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
              >
                Close
              </button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAction}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors flex items-center gap-2 cursor-pointer shadow-sm whitespace-nowrap"
              >
                {isRegistered ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>View Digital Ticket Pass</span>
                  </>
                ) : event.ticketType === 'member_only' && currentUser?.tier === 'community' ? (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Upgrade to Pro to RSVP</span>
                  </>
                ) : (
                  <>
                    <Ticket className="w-4 h-4" />
                    <span>Confirm Event Registration</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
