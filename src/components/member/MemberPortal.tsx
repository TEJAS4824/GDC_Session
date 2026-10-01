import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MemberIDCard } from './MemberIDCard';
import { 
  Ticket, 
  CreditCard, 
  Sparkles, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  AlertCircle,
  Copy,
  Check,
  Award
} from 'lucide-react';
import { motion } from 'motion/react';

export const MemberPortal: React.FC = () => {
  const { 
    currentUser, 
    events, 
    rsvps, 
    transactions, 
    pricingTiers, 
    openCheckout, 
    openTicketPass, 
    openInvoice, 
    cancelRSVP, 
    setIsRegisterModalOpen, 
    showToast,
    setCurrentView 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'passes' | 'card' | 'invoices' | 'perks'>('card');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 text-center bg-white border border-[#DDD5C7] rounded-2xl shadow-sm">
        <AlertCircle className="w-10 h-10 text-stone-700 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-stone-900 mb-2">Member Portal Access</h3>
        <p className="text-xs text-stone-600 mb-6 leading-relaxed">
          Please register or select an existing member profile from the top navigation to view your club ID pass and RSVP schedule.
        </p>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsRegisterModalOpen(true)}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors cursor-pointer"
        >
          Register for Membership
        </motion.button>
      </div>
    );
  }

  const userRSVPs = rsvps.filter(r => r.memberId === currentUser.id);
  const userTransactions = transactions.filter(t => t.memberId === currentUser.id || t.memberEmail === currentUser.email);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(id);
    showToast('Voucher code copied to clipboard!', 'info');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleDownloadCertificate = () => {
    showToast('Verified Certificate of GDC Vadodara Membership generated (PDF)', 'success');
  };

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Portal Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#E8E1D5] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
            <span>Member Space</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{currentUser.college.split(',')[0]}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Welcome back, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Membership ID: <span className="font-mono text-stone-900 font-semibold">{currentUser.badgeCode}</span> · Plan: <span className="text-stone-900 font-bold uppercase">{currentUser.tier}</span>
          </p>
        </div>

        {/* Tier Upgrade Banner CTA */}
        <div className="flex items-center gap-3">
          {currentUser.tier === 'community' ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openCheckout(pricingTiers.find(t => t.id === 'pro') || pricingTiers[1])}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors shadow-xs flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Upgrade to Pro Pass (₹399)</span>
            </motion.button>
          ) : currentUser.tier === 'pro' ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openCheckout(pricingTiers.find(t => t.id === 'fellow') || pricingTiers[2])}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-900 bg-white border border-stone-300 hover:bg-stone-50 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Become Core Fellow (₹1,299)</span>
            </motion.button>
          ) : (
            <div className="px-3 py-1.5 rounded-xl bg-[#F0EBE1] border border-[#DDD5C7] text-stone-800 text-xs font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-stone-900" />
              <span>Core Fellow Member</span>
            </div>
          )}
        </div>
      </div>

      {/* Segmented Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#EFE9DF] border border-[#DDD5C7] rounded-xl mb-8 overflow-x-auto">
        {[
          { id: 'card', label: 'Digital Club ID' },
          { id: 'passes', label: `My Event Passes (${userRSVPs.length})` },
          { id: 'perks', label: 'Cloud Credits & Vault' },
          { id: 'invoices', label: `Payment Receipts (${userTransactions.length})` }
        ].map(tab => (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Tab: Digital Club ID */}
      {activeTab === 'card' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white border border-[#E0D8CB] rounded-2xl p-6 flex flex-col items-center justify-center shadow-xs">
            <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">
              Official NFC & QR Club Card
            </h3>
            <MemberIDCard member={currentUser} />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs space-y-4">
              <h3 className="text-base font-bold text-stone-900 tracking-tight">
                Profile & Campus Affiliation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE3D6]">
                  <p className="text-stone-500 text-[11px]">Primary Institution</p>
                  <p className="font-semibold text-stone-900 mt-0.5">{currentUser.college}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE3D6]">
                  <p className="text-stone-500 text-[11px]">Academic Course</p>
                  <p className="font-semibold text-stone-900 mt-0.5">{currentUser.branch} ({currentUser.year})</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE3D6]">
                  <p className="text-stone-500 text-[11px]">Official Email</p>
                  <p className="font-mono text-stone-900 mt-0.5">{currentUser.email}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE3D6]">
                  <p className="text-stone-500 text-[11px]">Valid Until</p>
                  <p className="font-mono text-stone-900 font-semibold mt-0.5">{currentUser.membershipExpiry || 'Forever Active'}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-stone-700 mb-2">Technical Domains & Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {currentUser.skills.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-[#F4EFE6] border border-[#DDD5C7] text-xs text-stone-800 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-between text-xs">
                <div className="text-stone-500">
                  Need to update your campus branch or year?
                </div>
                <button
                  onClick={() => showToast('Profile update form sent to your email inbox', 'info')}
                  className="text-stone-900 hover:text-black font-semibold cursor-pointer underline"
                >
                  Edit Profile →
                </button>
              </div>
            </div>

            {/* Quick Certificate Claim */}
            <div className="p-5 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-stone-800 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Membership Credential Certificate</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Official credential suitable for LinkedIn and resume.</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleDownloadCertificate}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </motion.button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: My Event Passes */}
      {activeTab === 'passes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 tracking-tight">
              Registered Event Passes & Tickets
            </h3>
            <button
              onClick={() => setCurrentView('public')}
              className="text-xs text-stone-900 hover:text-black font-semibold cursor-pointer underline"
            >
              Browse More Events →
            </button>
          </div>

          {userRSVPs.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-[#E0D8CB] shadow-xs">
              <Ticket className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-800">No active event registrations yet</p>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto mb-4">
                Explore upcoming workshops like Vadodara DevFest and secure your digital ticket pass.
              </p>
              <button
                onClick={() => setCurrentView('public')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors cursor-pointer"
              >
                Explore Events
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userRSVPs.map(rsvp => {
                const event = events.find(e => e.id === rsvp.eventId);
                if (!event) return null;

                return (
                  <motion.div
                    key={rsvp.id}
                    whileHover={{ y: -2 }}
                    className="p-5 rounded-2xl bg-white border border-[#E0D8CB] hover:border-stone-400 transition-all shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                        <span className="font-mono text-stone-900 font-semibold tabular-nums">{event.date} · {event.time}</span>
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                          rsvp.checkedIn 
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                            : 'bg-stone-100 text-stone-800 border-stone-300'
                        }`}>
                          {rsvp.checkedIn ? 'Checked-In' : 'Confirmed'}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-stone-900 tracking-tight leading-snug">
                        {event.title}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 truncate">
                        {event.venue}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#EAE3D6] flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-stone-800">
                        {rsvp.ticketCode}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => cancelRSVP(rsvp.id)}
                          className="px-2.5 py-1 text-xs text-stone-500 hover:text-stone-900 rounded transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          onClick={() => openTicketPass(rsvp)}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Ticket className="w-3.5 h-3.5" />
                          <span>Show QR Pass</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab: Perks & Cloud Credits Vault */}
      {activeTab === 'perks' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs">
            <h3 className="text-base font-bold text-stone-900 tracking-tight mb-1">
              Member Benefits & Exclusive Vouchers
            </h3>
            <p className="text-xs text-stone-500">
              Perks unlocked based on your current tier: <strong className="text-stone-900 uppercase font-bold">{currentUser.tier}</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              
              {/* Google Cloud Sandbox voucher */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E0D8CB] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-bold text-stone-900 text-sm">Google Cloud & Gemini API Credits</h5>
                    <p className="text-xs text-stone-600 mt-0.5">50 Qwiklabs credits for Vertex AI and Cloud Run labs.</p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Active
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#DDD5C7] text-xs">
                  <span className="font-mono text-stone-800 font-semibold">GDC-VAD-CLOUD-2026-X89</span>
                  <button
                    onClick={() => handleCopy('GDC-VAD-CLOUD-2026-X89', 'cloud')}
                    className="p-1 rounded text-stone-500 hover:text-stone-900 cursor-pointer"
                  >
                    {copiedCode === 'cloud' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Discord VIP Role */}
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E0D8CB] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-bold text-stone-900 text-sm">Vadodara Core Discord Access</h5>
                    <p className="text-xs text-stone-600 mt-0.5">Exclusive channels with alumni and senior mentors.</p>
                  </div>
                  <span className="text-[10px] font-mono text-stone-800 bg-[#EFE9DF] px-2 py-0.5 rounded border border-[#DDD5C7]">
                    Unlocked
                  </span>
                </div>
                
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => showToast('Opening Discord authorization invite...', 'info')}
                  className="w-full py-2 px-3 rounded-lg bg-white hover:bg-[#F5EFE6] border border-[#DDD5C7] text-xs font-semibold text-stone-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Join Verified Member Channels</span>
                </motion.button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Tab: Invoices & Receipts */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-stone-900 tracking-tight">
            Membership Invoices & Payment Ledger
          </h3>

          {userTransactions.length === 0 ? (
            <div className="p-10 text-center rounded-2xl bg-white border border-[#E0D8CB] shadow-xs">
              <CreditCard className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-stone-800">No payment records found</p>
              <p className="text-xs text-stone-500 mt-1">
                You are currently on the Free Student Explorer pass.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-[#E0D8CB] overflow-hidden bg-white shadow-xs overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF7F2] text-stone-500 uppercase text-[11px] border-b border-[#E0D8CB]">
                    <th className="p-3.5">Invoice #</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Tier Subscribed</th>
                    <th className="p-3.5">Method</th>
                    <th className="p-3.5 text-right">Amount (INR)</th>
                    <th className="p-3.5 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D6]">
                  {userTransactions.map(txn => (
                    <tr key={txn.id} className="hover:bg-[#FAF7F2] transition-colors">
                      <td className="p-3.5 font-mono text-stone-900 font-medium">{txn.invoiceNumber}</td>
                      <td className="p-3.5 text-stone-600 font-mono tabular-nums">{new Date(txn.timestamp).toLocaleDateString()}</td>
                      <td className="p-3.5 font-semibold text-stone-900">{txn.tierName}</td>
                      <td className="p-3.5 uppercase font-mono text-stone-600">{txn.paymentMethod}</td>
                      <td className="p-3.5 text-right font-mono font-bold text-stone-900 tabular-nums">
                        ₹{txn.totalINR.toFixed(2)}
                      </td>
                      <td className="p-3.5 text-center">
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          onClick={() => openInvoice(txn)}
                          className="px-2.5 py-1 rounded bg-[#FAF7F2] hover:bg-[#F0EAE0] text-stone-800 border border-[#DDD5C7] transition-colors cursor-pointer text-xs flex items-center gap-1 mx-auto"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View GST PDF</span>
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
