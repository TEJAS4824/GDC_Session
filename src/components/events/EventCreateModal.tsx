import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventCategory } from '../../types';
import { X, Plus, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export const EventCreateModal: React.FC = () => {
  const { isCreateEventModalOpen, setIsCreateEventModalOpen, createEvent, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<EventCategory>('ai_ml');
  const [date, setDate] = useState('2026-11-20');
  const [time, setTime] = useState('10:00 AM');
  const [endTime, setEndTime] = useState('02:00 PM');
  const [venue, setVenue] = useState('Vigyan Bhavan Seminar Hall, GSFC University');
  const [venueAddress, setVenueAddress] = useState('Fertilizernagar, Vadodara, Gujarat 391750');
  const [venueMapUrl, setVenueMapUrl] = useState('https://maps.google.com/?q=GSFC+University+Vadodara');
  const [speakerName, setSpeakerName] = useState('');
  const [speakerRole, setSpeakerRole] = useState('Tech Lead / Architect');
  const [speakerCompany, setSpeakerCompany] = useState('Google Developer Community');
  const [capacity, setCapacity] = useState(150);
  const [ticketType, setTicketType] = useState<'free' | 'member_only' | 'paid'>('free');
  const [priceINR, setPriceINR] = useState(0);
  const [description, setDescription] = useState('');
  const [agenda, setAgenda] = useState<{ time: string; topic: string }[]>([
    { time: '10:00 AM - 10:30 AM', topic: 'Welcome & CodeLab Overview' },
    { time: '10:30 AM - 12:30 PM', topic: 'Hands-on Building & Mentorship' },
    { time: '12:30 PM - 01:30 PM', topic: 'Showcase, Q&A and Networking' }
  ]);

  if (!isCreateEventModalOpen) return null;

  const handleAddAgenda = () => {
    setAgenda(prev => [...prev, { time: '02:00 PM - 03:00 PM', topic: 'New Session' }]);
  };

  const handleRemoveAgenda = (idx: number) => {
    setAgenda(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAgendaChange = (idx: number, field: 'time' | 'topic', val: string) => {
    setAgenda(prev => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: val };
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !speakerName.trim() || !venue.trim()) {
      showToast('Please fill in the event title, speaker name, and venue.', 'error');
      return;
    }

    const bannerImage = category === 'ai_ml' 
      ? '/src/assets/images/event_ai_workshop_1790832793077.jpg' 
      : category === 'open_source'
      ? '/src/assets/images/event_hackathon_1790832805360.jpg'
      : '/src/assets/images/hero_vadodara_tech_1790832779240.jpg';

    createEvent({
      title,
      subtitle: subtitle || 'Interactive developer workshop hosted by GDC Vadodara',
      description: description || 'Join fellow engineers and students for a focused, hands-on session exploring modern technology stacks and deployment.',
      category,
      date,
      time,
      endTime,
      venue,
      venueAddress,
      venueMapUrl,
      speaker: {
        name: speakerName,
        role: speakerRole,
        company: speakerCompany,
        avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(speakerName)}&backgroundColor=e6dfd5`
      },
      capacity: Number(capacity),
      ticketType,
      priceINR: ticketType === 'paid' ? Number(priceINR) : 0,
      bannerImage,
      agenda,
      status: 'upcoming',
      tags: ['Workshop', category.toUpperCase(), 'Vadodara']
    });

    setIsCreateEventModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-[#FAF7F2] border border-[#DDD5C7] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E2DBD0] sticky top-0 bg-[#FAF7F2]/95 backdrop-blur-md z-10">
          <div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">Schedule New Club Event</h3>
            <p className="text-xs text-stone-500">Publish a workshop, hackathon, or seminar to GDC Vadodara portal</p>
          </div>
          <button
            onClick={() => setIsCreateEventModalOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-[#EFE9DF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          
          {/* Title & Subtitle */}
          <div className="space-y-3">
            <div>
              <label className="block text-stone-800 font-semibold mb-1">Event Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Vadodara Cloud & Kubernetes CodeLab"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block text-stone-800 font-semibold mb-1">Brief Subtitle / Kicker</label>
              <input
                type="text"
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                placeholder="e.g. Master container orchestration and microservices deployment"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          {/* Category, Date & Timing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-stone-800 font-semibold mb-1">Track Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as EventCategory)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
              >
                <option value="ai_ml">AI & GenAI</option>
                <option value="web_cloud">Web & Cloud</option>
                <option value="mobile_android">Android / Mobile</option>
                <option value="open_source">Hackathon / Open Source</option>
                <option value="cybersec">Cybersecurity</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-800 font-semibold mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-stone-800 font-semibold mb-1">Time Slot</label>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="10:00 AM"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          {/* Venue & Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-800 font-semibold mb-1">Venue / Auditorium *</label>
              <input
                type="text"
                required
                value={venue}
                onChange={e => setVenue(e.target.value)}
                placeholder="Auditorium, GSFC University"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block text-stone-800 font-semibold mb-1">Capacity (Max Seats)</label>
              <input
                type="number"
                min="10"
                max="1000"
                value={capacity}
                onChange={e => setCapacity(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900 font-mono"
              />
            </div>
          </div>

          {/* Ticket Type & Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white border border-[#E0D8CB]">
            <div>
              <label className="block text-stone-800 font-semibold mb-1">Ticket Policy</label>
              <select
                value={ticketType}
                onChange={e => setTicketType(e.target.value as 'free' | 'member_only' | 'paid')}
                className="w-full px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
              >
                <option value="free">Free Community Admission</option>
                <option value="member_only">Pro / Fellow Members Only</option>
                <option value="paid">Paid Admission (₹ INR)</option>
              </select>
            </div>

            {ticketType === 'paid' && (
              <div>
                <label className="block text-stone-800 font-semibold mb-1">Ticket Price (₹ INR)</label>
                <input
                  type="number"
                  min="49"
                  value={priceINR}
                  onChange={e => setPriceINR(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900 font-mono"
                />
              </div>
            )}
          </div>

          {/* Speaker Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-stone-800 font-semibold mb-1">Speaker Name *</label>
              <input
                type="text"
                required
                value={speakerName}
                onChange={e => setSpeakerName(e.target.value)}
                placeholder="Dr. Ankit Mehta"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block text-stone-800 font-semibold mb-1">Speaker Role</label>
              <input
                type="text"
                value={speakerRole}
                onChange={e => setSpeakerRole(e.target.value)}
                placeholder="Staff Engineer"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block text-stone-800 font-semibold mb-1">Organization / Company</label>
              <input
                type="text"
                value={speakerCompany}
                onChange={e => setSpeakerCompany(e.target.value)}
                placeholder="Google / Tech Lab"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-stone-800 font-semibold mb-1">Description & Prerequisites</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Detailed description of what participants will build and requirements (laptops, IDEs, etc.)..."
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-900"
            />
          </div>

          {/* Agenda Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-stone-800 font-semibold">Session Agenda</label>
              <button
                type="button"
                onClick={handleAddAgenda}
                className="text-stone-900 hover:text-black flex items-center gap-1 font-semibold cursor-pointer underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Slot</span>
              </button>
            </div>

            <div className="space-y-2">
              {agenda.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.time}
                    onChange={e => handleAgendaChange(idx, 'time', e.target.value)}
                    className="w-1/3 px-2.5 py-1.5 rounded-lg bg-white border border-[#DDD5C7] text-stone-900 text-xs font-mono"
                  />
                  <input
                    type="text"
                    value={item.topic}
                    onChange={e => handleAgendaChange(idx, 'topic', e.target.value)}
                    className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#DDD5C7] text-stone-900 text-xs"
                  />
                  {agenda.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAgenda(idx)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#E2DBD0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreateEventModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors cursor-pointer shadow-xs"
            >
              Publish to GDC Schedule
            </motion.button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
