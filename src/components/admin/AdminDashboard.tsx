import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Calendar, 
  IndianRupee, 
  Plus, 
  Search, 
  Download, 
  QrCode, 
  Trash2, 
  FileText,
  Megaphone
} from 'lucide-react';
import { MembershipTierId, UserRole } from '../../types';
import { motion } from 'motion/react';
import { SafeImage } from '../common/SafeImage';

export const AdminDashboard: React.FC = () => {
  const { 
    members, 
    events, 
    transactions, 
    announcements, 
    updateMemberRoleAndTier, 
    deleteMember, 
    deleteEvent,
    setIsCreateEventModalOpen, 
    setIsCheckinScannerOpen,
    createAnnouncement,
    openInvoice,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'events' | 'finance' | 'broadcast'>('overview');

  // Filters for members table
  const [memberSearch, setMemberSearch] = useState('');
  const [memberTierFilter, setMemberTierFilter] = useState<string>('all');

  // Announcement state
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annType, setAnnType] = useState<'important' | 'event' | 'achievement' | 'general'>('important');

  // Financial calculations
  const totalRevenueINR = transactions.reduce((acc, curr) => acc + curr.totalINR, 0);
  const paidMembersCount = members.filter(m => m.tier !== 'community').length;
  const totalRSVPCount = events.reduce((acc, curr) => acc + curr.rsvpCount, 0);

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(memberSearch.toLowerCase()) || 
                          m.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
                          m.college.toLowerCase().includes(memberSearch.toLowerCase());
    const matchesTier = memberTierFilter === 'all' || m.tier === memberTierFilter;
    return matchesSearch && matchesTier;
  });

  const handleExportMembersCSV = () => {
    const headers = 'ID,Name,Email,College,Branch,Year,Tier,Role,JoinedDate,BadgeCode\n';
    const rows = members.map(m => 
      `"${m.id}","${m.name}","${m.email}","${m.college}","${m.branch}","${m.year}","${m.tier}","${m.role}","${m.joinedDate}","${m.badgeCode}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `gdc-vadodara-members-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Member roster exported to CSV', 'success');
  };

  const handleCreateAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    createAnnouncement({
      title: annTitle,
      content: annContent,
      type: annType,
      author: 'Admin Desk',
      authorRole: 'GDC Vadodara Secretariat'
    });

    setAnnTitle('');
    setAnnContent('');
    showToast('Community announcement broadcasted!', 'success');
  };

  return (
    <div className="py-8 md:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Header & Context Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#E8E1D5] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
            <span>Administration Console</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Vadodara Chapter Secretariat</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Club Activity & Governance Center
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Manage registrations, campus workshops, ticket verification, and student fee collections.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsCheckinScannerOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-900 bg-white border border-stone-300 hover:bg-stone-50 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <QrCode className="w-4 h-4 text-stone-700" />
            <span>Event Entry Scanner</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsCreateEventModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Event</span>
          </motion.button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#EFE9DF] border border-[#DDD5C7] rounded-xl mb-8 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview Metrics' },
          { id: 'members', label: `Member Directory (${members.length})` },
          { id: 'events', label: `Events & Schedules (${events.length})` },
          { id: 'finance', label: `Fee Ledger (₹${totalRevenueINR.toFixed(0)})` },
          { id: 'broadcast', label: 'Announcements' }
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

      {/* Tab: Overview Metrics */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* 4 Primary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <motion.div whileHover={{ y: -2 }} className="p-5 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>Total Registered</span>
                <Users className="w-4 h-4 text-stone-800" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 tabular-nums">
                {members.length}
              </p>
              <p className="text-[11px] text-stone-500 mt-1">Across 5 partner universities</p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} className="p-5 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>Pro & Fellow Passes</span>
                <IndianRupee className="w-4 h-4 text-stone-800" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 tabular-nums">
                {paidMembersCount}
              </p>
              <p className="text-[11px] text-stone-500 mt-1">Active subscriptions</p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} className="p-5 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>Total Fee Collections</span>
                <IndianRupee className="w-4 h-4 text-stone-800" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 tabular-nums">
                ₹{totalRevenueINR.toFixed(2)}
              </p>
              <p className="text-[11px] text-stone-500 mt-1">Simulated payment gateway volume</p>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} className="p-5 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>Event RSVPs Logged</span>
                <Calendar className="w-4 h-4 text-stone-800" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-900 tabular-nums">
                {totalRSVPCount}
              </p>
              <p className="text-[11px] text-stone-500 mt-1">{events.length} sessions active on schedule</p>
            </motion.div>
          </div>

          {/* Quick Roster Preview & Activity Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 tracking-tight">Recent Registrations</h3>
                <button
                  onClick={() => setActiveTab('members')}
                  className="text-xs text-stone-900 hover:text-black font-semibold cursor-pointer underline"
                >
                  View Full Roster →
                </button>
              </div>

              <div className="divide-y divide-[#EAE3D6] text-xs">
                {members.slice(0, 5).map(m => (
                  <div key={m.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <SafeImage 
                        src={m.avatarUrl} 
                        alt={m.name} 
                        fallbackType="avatar"
                        fallbackText={m.name}
                        className="w-8 h-8 rounded-full object-cover border border-[#DDD5C7] bg-[#EFE9DF]" 
                      />
                      <div>
                        <p className="font-semibold text-stone-900">{m.name}</p>
                        <p className="text-[11px] text-stone-500">{m.college.split(',')[0]} · {m.branch}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#DDD5C7] text-stone-800 font-semibold">
                        {m.tier}
                      </span>
                      <p className="text-[10px] text-stone-400 mt-0.5 font-mono">{m.badgeCode}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-stone-900 tracking-tight">Campus Distribution</h3>
              <div className="space-y-3 text-xs">
                {[
                  { name: 'GSFC University', count: members.filter(m => m.college.includes('GSFC')).length * 75 + 120 },
                  { name: 'MSU Baroda', count: members.filter(m => m.college.includes('MSU')).length * 60 + 95 },
                  { name: 'Parul University', count: members.filter(m => m.college.includes('Parul')).length * 50 + 80 },
                  { name: 'ITM Baroda University', count: members.filter(m => m.college.includes('ITM')).length * 40 + 45 }
                ].map(c => (
                  <div key={c.name}>
                    <div className="flex justify-between text-stone-700 mb-1">
                      <span>{c.name}</span>
                      <span className="font-mono tabular-nums text-stone-900 font-bold">{c.count} builders</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#EAE3D6] rounded-full overflow-hidden">
                      <div className="h-full bg-stone-900 rounded-full" style={{ width: `${Math.min(100, (c.count / 250) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#EAE3D6]">
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Inter-university coordination managed through the Vadodara Developer Network charter.
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab: Member Directory */}
      {activeTab === 'members' && (
        <div className="space-y-4">
          
          {/* Search, Filter & CSV Export Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={memberSearch}
                  onChange={e => setMemberSearch(e.target.value)}
                  placeholder="Search by student name, college, email..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 text-xs placeholder-stone-400 focus:outline-none focus:border-stone-800"
                />
              </div>

              <select
                value={memberTierFilter}
                onChange={e => setMemberTierFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 text-xs focus:outline-none focus:border-stone-800 shrink-0"
              >
                <option value="all">All Tiers</option>
                <option value="community">Community Free</option>
                <option value="pro">Pro Developer</option>
                <option value="fellow">Core Fellow</option>
              </select>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleExportMembersCSV}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-800 bg-white border border-[#DDD5C7] hover:bg-[#F5EFE6] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV Roster</span>
            </motion.button>
          </div>

          {/* Members Table */}
          <div className="rounded-2xl border border-[#E0D8CB] overflow-hidden bg-white shadow-xs overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF7F2] text-stone-500 uppercase text-[11px] border-b border-[#E0D8CB]">
                  <th className="p-3.5">Member</th>
                  <th className="p-3.5">College & Branch</th>
                  <th className="p-3.5">Tier Plan</th>
                  <th className="p-3.5">Club Role</th>
                  <th className="p-3.5">Club ID</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D6]">
                {filteredMembers.map(m => (
                  <tr key={m.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <SafeImage 
                          src={m.avatarUrl} 
                          alt={m.name} 
                          fallbackType="avatar"
                          fallbackText={m.name}
                          className="w-7 h-7 rounded-full object-cover border border-[#DDD5C7] bg-[#EFE9DF]" 
                        />
                        <div>
                          <p className="font-semibold text-stone-900">{m.name}</p>
                          <p className="text-[11px] text-stone-500">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <p className="text-stone-800 font-medium">{m.college.split(',')[0]}</p>
                      <p className="text-[11px] text-stone-500">{m.branch} ({m.year})</p>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={m.tier}
                        onChange={e => updateMemberRoleAndTier(m.id, m.role, e.target.value as MembershipTierId)}
                        className="px-2 py-1 rounded bg-[#FAF7F2] border border-[#DDD5C7] text-[11px] font-mono uppercase text-stone-800 font-semibold focus:outline-none"
                      >
                        <option value="community">Community</option>
                        <option value="pro">Pro</option>
                        <option value="fellow">Fellow</option>
                      </select>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={m.role}
                        onChange={e => updateMemberRoleAndTier(m.id, e.target.value as UserRole, m.tier)}
                        className="px-2 py-1 rounded bg-[#FAF7F2] border border-[#DDD5C7] text-[11px] text-stone-800 focus:outline-none"
                      >
                        <option value="member">Member</option>
                        <option value="core_team">Core Team</option>
                        <option value="admin">Admin / Lead</option>
                      </select>
                    </td>
                    <td className="p-3.5 font-mono text-stone-800 tabular-nums">
                      {m.badgeCode}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => deleteMember(m.id)}
                        className="p-1 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Remove member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Tab: Events & Schedules */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 tracking-tight">Active Event Schedules</h3>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsCreateEventModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule Event</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(event => (
              <motion.div 
                key={event.id}
                whileHover={{ y: -2 }}
                className="p-5 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-mono text-stone-900 font-semibold tabular-nums">{event.date} · {event.time}</span>
                    <span className="font-mono tabular-nums text-stone-800 font-bold">
                      {event.rsvpCount} / {event.capacity} RSVPs
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-stone-900 tracking-tight leading-snug">
                    {event.title}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="mt-3 text-xs text-stone-600">
                    <span className="text-stone-900 font-medium">Speaker:</span> {event.speaker.name} ({event.speaker.company})
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EAE3D6] flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-stone-600 uppercase font-semibold">
                    {event.ticketType === 'free' ? 'Free Community' : event.ticketType === 'member_only' ? 'Pro Member' : `₹${event.priceINR}`}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsCheckinScannerOpen(true)}
                      className="px-2.5 py-1 rounded bg-[#FAF7F2] hover:bg-[#EFE9DF] text-stone-800 border border-[#DDD5C7] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <QrCode className="w-3 h-3" />
                      <span>Scanner</span>
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="p-1 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Delete event"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Fee Ledger & Payments */}
      {activeTab === 'finance' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-stone-900 tracking-tight">Payment Ledger & Invoices</h3>
              <p className="text-xs text-stone-600">Simulated Indian Payment Gateway (UPI / RuPay / NetBanking) Audit</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-stone-500">Gross Settlement: </span>
              <span className="font-mono font-extrabold text-stone-900 text-sm tabular-nums">
                ₹{totalRevenueINR.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E0D8CB] overflow-hidden bg-white shadow-xs overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF7F2] text-stone-500 uppercase text-[11px] border-b border-[#E0D8CB]">
                  <th className="p-3.5">Txn ID / Ref</th>
                  <th className="p-3.5">Member Name</th>
                  <th className="p-3.5">Tier Subscribed</th>
                  <th className="p-3.5">Payment Method</th>
                  <th className="p-3.5">Taxable + GST (18%)</th>
                  <th className="p-3.5 text-right">Total (INR)</th>
                  <th className="p-3.5 text-center">GST Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D6]">
                {transactions.map(txn => (
                  <tr key={txn.id} className="hover:bg-[#FAF7F2] transition-colors">
                    <td className="p-3.5 font-mono">
                      <p className="text-stone-900 font-semibold">{txn.id}</p>
                      <p className="text-[10px] text-stone-500 truncate max-w-[140px]">{txn.paymentGatewayRef}</p>
                    </td>
                    <td className="p-3.5">
                      <p className="font-semibold text-stone-900">{txn.memberName}</p>
                      <p className="text-[11px] text-stone-500">{txn.memberEmail}</p>
                    </td>
                    <td className="p-3.5 font-medium text-stone-900">{txn.tierName}</td>
                    <td className="p-3.5 uppercase font-mono text-stone-700">
                      {txn.paymentMethod}
                      {txn.upiId && <span className="block text-[10px] text-stone-500 lowercase">{txn.upiId}</span>}
                    </td>
                    <td className="p-3.5 font-mono text-stone-600 tabular-nums">
                      ₹{txn.amountINR.toFixed(2)} + ₹{txn.taxINR.toFixed(2)}
                    </td>
                    <td className="p-3.5 text-right font-mono font-bold text-stone-900 tabular-nums">
                      ₹{txn.totalINR.toFixed(2)}
                    </td>
                    <td className="p-3.5 text-center">
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => openInvoice(txn)}
                        className="px-2.5 py-1 rounded bg-[#FAF7F2] hover:bg-[#EFE9DF] text-stone-800 border border-[#DDD5C7] transition-colors cursor-pointer text-xs flex items-center gap-1 mx-auto"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Announcements Broadcaster */}
      {activeTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 tracking-tight flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-stone-800" />
              <span>Broadcast Announcement to Members</span>
            </h3>

            <form onSubmit={handleCreateAnnouncementSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-800 font-semibold mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  value={annTitle}
                  onChange={e => setAnnTitle(e.target.value)}
                  placeholder="e.g. HackVadodara 2026 Problem Statements Released"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#DDD5C7] text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-800"
                />
              </div>

              <div>
                <label className="block text-stone-800 font-semibold mb-1">Notice Type</label>
                <select
                  value={annType}
                  onChange={e => setAnnType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-800"
                >
                  <option value="important">Important Advisory</option>
                  <option value="event">Event Update</option>
                  <option value="achievement">Hackathon Achievement</option>
                  <option value="general">General Notice</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-800 font-semibold mb-1">Announcement Body *</label>
                <textarea
                  rows={4}
                  required
                  value={annContent}
                  onChange={e => setAnnContent(e.target.value)}
                  placeholder="Detail instructions or update for community students..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#DDD5C7] text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-800"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors cursor-pointer shadow-xs"
              >
                Broadcast Notice
              </motion.button>
            </form>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-sm font-bold text-stone-900 tracking-tight">Active Broadcasts</h3>
            <div className="space-y-3">
              {announcements.map(ann => (
                <div key={ann.id} className="p-4 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-stone-700 font-semibold uppercase tracking-wider">
                      {ann.type} · {ann.date}
                    </span>
                    <span className="text-stone-500 text-[11px]">{ann.author}</span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">{ann.title}</h4>
                  <p className="text-stone-600 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
