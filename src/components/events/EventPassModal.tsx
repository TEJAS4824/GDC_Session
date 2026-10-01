import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Printer } from 'lucide-react';
import { motion } from 'motion/react';
import { GoogleDevLogo } from '../common/GoogleDevLogo';

export const EventPassModal: React.FC = () => {
  const { activeTicketPass, closeTicketPass, showToast } = useApp();

  if (!activeTicketPass) return null;

  const { rsvp, event } = activeTicketPass;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Google Developer Community Vadodara//Event Pass//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, ' ')}
LOCATION:${event.venue}, ${event.venueAddress}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.slug}-pass.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Event calendar pass downloaded (.ics)', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-[#FAF7F2] border border-[#DDD5C7] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-[#E2DBD0] bg-white no-print">
          <div className="flex items-center gap-2">
            <GoogleDevLogo size="xs" />
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
              Verified Event Pass
            </span>
          </div>
          <button
            onClick={closeTicketPass}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-[#F0EBE1] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Ticket Area in elegant cream & black */}
        <div id="printable-ticket" className="p-6 bg-[#FFFDF9] text-stone-900 space-y-5">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#E8E1D5] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <GoogleDevLogo size="xs" />
                <span className="text-xs font-bold text-stone-900">Google Developer Community</span>
              </div>
              <h3 className="text-base font-bold text-stone-900 tracking-tight leading-snug">
                {event.title}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                rsvp.checkedIn 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' 
                  : 'bg-stone-100 text-stone-800 border-stone-300 font-bold'
              }`}>
                {rsvp.checkedIn ? 'Checked-In' : 'Confirmed'}
              </span>
            </div>
          </div>

          {/* Attendee Details */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] text-xs">
            <div>
              <p className="text-[10px] uppercase font-mono text-stone-500">Attendee Name</p>
              <p className="font-semibold text-stone-900 mt-0.5 truncate">{rsvp.memberName}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono text-stone-500">Institution</p>
              <p className="font-semibold text-stone-900 mt-0.5 truncate">{rsvp.memberCollege.split(',')[0]}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono text-stone-500">Date & Time</p>
              <p className="font-mono text-stone-800 mt-0.5 tabular-nums font-medium">{event.date} · {event.time}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono text-stone-500">Venue</p>
              <p className="text-stone-800 mt-0.5 truncate">{event.venue.split(',')[0]}</p>
            </div>
          </div>

          {/* QR Code and Verification Section */}
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white text-stone-900 border border-[#E2DBD0] text-center shadow-xs">
            <div className="p-2 bg-white rounded-xl border-2 border-stone-900 mb-2">
              <div className="w-36 h-36 grid grid-cols-6 grid-rows-6 gap-1 p-1 bg-white">
                <div className="col-span-2 row-span-2 bg-stone-950 rounded-xs flex items-center justify-center">
                  <div className="w-3 h-3 bg-white" />
                </div>
                <div className="bg-stone-950" />
                <div className="bg-stone-300" />
                <div className="col-span-2 row-span-2 bg-stone-950 rounded-xs flex items-center justify-center">
                  <div className="w-3 h-3 bg-white" />
                </div>
                
                <div className="bg-stone-950" />
                <div className="bg-stone-950" />
                <div className="bg-stone-300" />
                <div className="bg-stone-950" />
                
                <div className="col-span-2 row-span-2 bg-stone-950 rounded-xs flex items-center justify-center">
                  <div className="w-3 h-3 bg-white" />
                </div>
                <div className="bg-stone-950" />
                <div className="bg-stone-950" />
                <div className="bg-stone-300" />
                <div className="bg-stone-950" />

                <div className="bg-stone-950" />
                <div className="bg-stone-300" />
                <div className="bg-stone-950" />
                <div className="bg-stone-950" />
                <div className="bg-stone-950" />
                <div className="bg-stone-300" />

                <div className="col-span-6 flex justify-around items-center pt-1">
                  <div className="w-4 h-1.5 bg-stone-950" />
                  <div className="w-8 h-1.5 bg-stone-950" />
                  <div className="w-3 h-1.5 bg-stone-950" />
                  <div className="w-6 h-1.5 bg-stone-950" />
                </div>
              </div>
            </div>

            <p className="text-[13px] font-mono font-bold tracking-widest text-stone-900 uppercase">
              {rsvp.ticketCode}
            </p>
            <p className="text-[10px] text-stone-500 mt-0.5">
              Present this code at the registration desk for badge check-in
            </p>
          </div>

          {/* Barcode */}
          <div className="pt-2 text-center">
            <div className="h-6 w-full flex items-center justify-center gap-0.5 opacity-80">
              {Array.from({ length: 36 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-full bg-stone-900 ${i % 3 === 0 ? 'w-1' : i % 5 === 0 ? 'w-1.5' : 'w-0.5'}`} 
                />
              ))}
            </div>
            <p className="text-[10px] font-mono text-stone-500 mt-1">
              REG: {new Date(rsvp.registeredAt).toLocaleDateString()} · VADODARA GUJARAT
            </p>
          </div>

        </div>

        {/* Footer Actions (hidden during print) */}
        <div className="p-4 bg-white border-t border-[#E2DBD0] flex items-center justify-between gap-3 no-print">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleDownloadICS}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-800 bg-[#FAF7F2] hover:bg-[#F0EAE0] border border-[#DDD5C7] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5 text-stone-700" />
            <span>Add to Calendar</span>
          </motion.button>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </motion.button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
