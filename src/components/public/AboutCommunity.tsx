import React from 'react';
import { GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutCommunity: React.FC = () => {
  const colleges = [
    { name: 'GSFC University', city: 'Fertilizernagar, Vadodara', students: '420+ Members', highlight: 'Host of Vadodara DevFest & AI Labs' },
    { name: 'Maharaja Sayajirao University (MSU)', city: 'Kalabhavan, Vadodara', students: '380+ Members', highlight: 'Android & Linux Systems Track' },
    { name: 'Parul University', city: 'Limda, Vadodara', students: '290+ Members', highlight: 'Hackathon & IoT Innovation Cell' },
    { name: 'ITM (SLS) Baroda University', city: 'Paldi, Vadodara', students: '150+ Members', highlight: 'Cybersecurity & Cloud Jam Lead' }
  ];

  return (
    <section id="community" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E8E1D5]">
      
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-stone-500 uppercase mb-2">
          <span>Inter-University Ecosystem</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Vadodara Tech Corridor</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Uniting engineering campuses across the cultural capital of Gujarat.
        </h2>
        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
          GDC Vadodara is not bound to a single institution. We function as a unified collegiate chapter where students from leading universities collaborate, build projects, and compete on the global stage.
        </p>
      </div>

      {/* College Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {colleges.map((col, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-5 rounded-2xl bg-white border border-[#E0D8CB] hover:border-stone-400 transition-colors shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#F4EFE6] border border-[#DDD5C7] flex items-center justify-center text-stone-900 mb-3">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-stone-900 tracking-tight leading-snug">
                {col.name}
              </h3>
              <p className="text-xs text-stone-500 mt-1">{col.city}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EAE3D6] text-xs">
              <p className="font-bold text-stone-900 font-mono tabular-nums">{col.students}</p>
              <p className="text-[11px] text-stone-500 mt-0.5">{col.highlight}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3 Pillars of GDC Vadodara */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -3 }}
          className="p-6 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs"
        >
          <div className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-2">01. Hands-on CodeLabs</div>
          <h4 className="text-base font-bold text-stone-900 mb-2">Production-grade Workshops</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            No surface-level slide lectures. Every GDC Vadodara session requires developers to open their IDE, clone a GitHub repository, and deploy running code to cloud endpoints.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -3 }}
          className="p-6 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs"
        >
          <div className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-2">02. 36-Hr Hackathons</div>
          <h4 className="text-base font-bold text-stone-900 mb-2">Prototype to Incubation</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            We partner with the Gujarat Innovation Council and industry sponsors to fund winning projects with seed grants, patent filing support, and cloud server credits.
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -3 }}
          className="p-6 rounded-2xl bg-white border border-[#E0D8CB] shadow-xs"
        >
          <div className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider mb-2">03. Career & Referrals</div>
          <h4 className="text-base font-bold text-stone-900 mb-2">Direct Tech Placements</h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Active Pro and Fellow members gain access to our alumni referral pipeline spanning Google, Microsoft, and high-growth Indian startups hiring remote and on-site.
          </p>
        </motion.div>
      </div>

    </section>
  );
};
