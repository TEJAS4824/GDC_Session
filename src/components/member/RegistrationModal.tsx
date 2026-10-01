import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MembershipTierId } from '../../types';
import { X, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';

export const RegistrationModal: React.FC = () => {
  const { 
    isRegisterModalOpen, 
    setIsRegisterModalOpen, 
    registerMember, 
    openCheckout, 
    pricingTiers,
    setCurrentView 
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [college, setCollege] = useState('GSFC University, Vadodara');
  const [branch, setBranch] = useState('B.Tech Computer Science & Engineering');
  const [year, setYear] = useState('3rd Year');
  const [githubUsername, setGithubUsername] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['React', 'TypeScript', 'Python']);
  const [tier, setTier] = useState<MembershipTierId>('pro');
  const [bio, setBio] = useState('');

  if (!isRegisterModalOpen) return null;

  const availableSkills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'GenAI / LLMs', 
    'Google Cloud', 'Android / Kotlin', 'Docker', 'Go', 'Cybersecurity'
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    registerMember({
      name,
      email,
      phone,
      college,
      branch,
      year,
      githubUsername: githubUsername || name.toLowerCase().replace(/\s+/g, '-'),
      linkedinUrl: linkedinUrl || `https://linkedin.com/in/${name.toLowerCase().replace(/\s+/g, '-')}`,
      skills: selectedSkills,
      bio: bio || 'Student developer passionate about open source and community building in Vadodara.'
    }, tier);

    setIsRegisterModalOpen(false);

    if (tier !== 'community') {
      const selectedTierObj = pricingTiers.find(t => t.id === tier) || pricingTiers[1];
      openCheckout(selectedTierObj);
    } else {
      setCurrentView('portal');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-[#FAF7F2] border border-[#DDD5C7] rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-stone-900"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#E2DBD0] sticky top-0 bg-[#FAF7F2]/95 backdrop-blur-md z-10">
          <div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">Join GDC Vadodara</h3>
            <p className="text-xs text-stone-500">Register as a member of the official tech club network</p>
          </div>
          <button
            onClick={() => setIsRegisterModalOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-[#EFE9DF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-800 font-semibold mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Dev Patel"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-800 font-semibold mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@gsfcuniversity.ac.in"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          {/* College and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-800 font-semibold mb-1">College / University</label>
              <select
                value={college}
                onChange={e => setCollege(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
              >
                <option value="GSFC University, Vadodara">GSFC University, Vadodara</option>
                <option value="Maharaja Sayajirao University (MSU), Baroda">Maharaja Sayajirao University (MSU)</option>
                <option value="Parul University, Vadodara">Parul University, Vadodara</option>
                <option value="ITM (SLS) Baroda University">ITM (SLS) Baroda University</option>
                <option value="Navrachana University, Vadodara">Navrachana University, Vadodara</option>
                <option value="Other Gujarat College">Other Engineering College</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-800 font-semibold mb-1">Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 font-mono focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          {/* Branch & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-800 font-semibold mb-1">Branch / Department</label>
              <input
                type="text"
                value={branch}
                onChange={e => setBranch(e.target.value)}
                placeholder="B.Tech Computer Science"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-800 font-semibold mb-1">Academic Year</label>
              <select
                value={year}
                onChange={e => setYear(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
              >
                <option value="1st Year">1st Year (Freshman)</option>
                <option value="2nd Year">2nd Year (Sophomore)</option>
                <option value="3rd Year">3rd Year (Junior)</option>
                <option value="4th Year (Senior)">4th Year (Senior)</option>
                <option value="Postgraduate / M.Tech">Postgraduate / M.Tech</option>
              </select>
            </div>
          </div>

          {/* Social links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-stone-800 font-semibold mb-1">GitHub Username</label>
              <input
                type="text"
                value={githubUsername}
                onChange={e => setGithubUsername(e.target.value)}
                placeholder="octocat"
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 font-mono focus:outline-none focus:border-stone-900"
              />
            </div>
            <div>
              <label className="block text-stone-800 font-semibold mb-1">LinkedIn Profile</label>
              <input
                type="text"
                value={linkedinUrl}
                onChange={e => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          {/* Skills Checklist */}
          <div>
            <label className="block text-stone-800 font-semibold mb-2">Technical Skills & Interests</label>
            <div className="flex flex-wrap gap-1.5">
              {availableSkills.map(skill => {
                const active = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      active 
                        ? 'bg-stone-900 text-white shadow-xs' 
                        : 'bg-white border border-[#DDD5C7] text-stone-700 hover:text-stone-900'
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Membership Tier Preference */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#E0D8CB] space-y-2 shadow-xs">
            <label className="block text-stone-900 font-semibold">Choose Initial Membership Tier</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'community', title: 'Free Pass', price: '₹0' },
                { id: 'pro', title: 'Pro Member', price: '₹399' },
                { id: 'fellow', title: 'Core Fellow', price: '₹1,299' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTier(opt.id as MembershipTierId)}
                  className={`p-2 rounded-xl border text-center transition-colors cursor-pointer ${
                    tier === opt.id 
                      ? 'bg-stone-900 text-white border-stone-900 shadow-xs' 
                      : 'border-[#DDD5C7] text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <p className="font-semibold text-xs">{opt.title}</p>
                  <p className="font-mono text-[11px] tabular-nums mt-0.5">{opt.price}</p>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-500">
              {tier === 'community' 
                ? 'Instant activation with no payment required.' 
                : 'Will open our integrated secure payment gateway for instant activation.'}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-3 border-t border-[#E2DBD0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsRegisterModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Complete Registration</span>
            </motion.button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
