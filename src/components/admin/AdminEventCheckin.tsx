import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, QrCode, CheckCircle2, AlertCircle, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const AdminEventCheckin: React.FC = () => {
  const { isCheckinScannerOpen, setIsCheckinScannerOpen, checkInAttendee, rsvps } = useApp();

  const [inputCode, setInputCode] = useState('');
  const [result, setResult] = useState<{ success: boolean; message: string; rsvp?: any } | null>(null);

  if (!isCheckinScannerOpen) return null;

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputCode.trim()) return;

    const res = checkInAttendee(inputCode.trim());
    setResult(res);
    if (res.success) {
      setInputCode('');
    }
  };

  const handleQuickCheckin = (code: string) => {
    const res = checkInAttendee(code);
    setResult(res);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-[#FAF7F2] border border-[#DDD5C7] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-stone-900"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E2DBD0] sticky top-0 bg-[#FAF7F2]/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-stone-900" />
            <div>
              <h3 className="text-base font-bold text-stone-900 tracking-tight">
                Event Desk Check-in Scanner
              </h3>
              <p className="text-xs text-stone-500">Scan or type attendee ticket code to mark entry</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckinScannerOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-[#EFE9DF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-xs">
          
          {/* Simulated Scanner Viewport */}
          <div className="relative rounded-2xl overflow-hidden bg-stone-950 text-white border border-stone-800 p-8 flex flex-col items-center justify-center text-center shadow-inner">
            {/* Target Reticle */}
            <div className="w-48 h-48 border-2 border-stone-400/80 rounded-2xl relative flex items-center justify-center">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white" />
              
              <div className="w-full h-0.5 bg-emerald-400 shadow-md animate-bounce" />
              <QrCode className="w-16 h-16 text-stone-600/60" />
            </div>

            <p className="text-stone-400 mt-4 text-[11px]">
              Camera barcode stream active · Center attendee QR code within the frame
            </p>
          </div>

          {/* Manual Input Form */}
          <form onSubmit={handleVerify} className="space-y-3">
            <label className="block text-stone-800 font-semibold">
              Or Manually Enter Ticket Pass ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={e => setInputCode(e.target.value)}
                placeholder="e.g. GDC-VAD-TKT-8841"
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 font-mono uppercase focus:outline-none focus:border-stone-900 text-xs"
              />
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-[#FAF7F2] font-semibold transition-colors cursor-pointer whitespace-nowrap shadow-xs"
              >
                Verify & Check In
              </motion.button>
            </div>
          </form>

          {/* Result Alert */}
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border flex items-start gap-3 ${
                result.success 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              {result.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <p className="font-semibold text-sm">{result.message}</p>
                {result.rsvp && (
                  <p className="text-xs opacity-80 font-mono">
                    Ticket: {result.rsvp.ticketCode} · Attendee: {result.rsvp.memberName}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Recent Registrations Quick Check-in Table */}
          <div className="pt-2">
            <p className="font-semibold text-stone-800 mb-2">Registered Attendees Waiting for Entry</p>
            <div className="border border-[#E0D8CB] rounded-2xl overflow-hidden divide-y divide-[#EAE3D6] max-h-48 overflow-y-auto bg-white shadow-xs">
              {rsvps.slice(0, 8).map(rsvp => (
                <div key={rsvp.id} className="p-3 flex items-center justify-between text-xs hover:bg-[#FAF7F2] transition-colors">
                  <div>
                    <p className="font-semibold text-stone-900">{rsvp.memberName}</p>
                    <p className="text-[11px] text-stone-500">{rsvp.memberCollege.split(',')[0]} · <span className="font-mono text-stone-700 font-medium">{rsvp.ticketCode}</span></p>
                  </div>

                  {rsvp.checkedIn ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-mono text-[10px] font-bold">
                      Checked In
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleQuickCheckin(rsvp.ticketCode)}
                      className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] hover:bg-stone-900 hover:text-white text-stone-800 border border-[#DDD5C7] transition-colors cursor-pointer"
                    >
                      Check In Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
