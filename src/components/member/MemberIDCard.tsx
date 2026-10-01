import React, { useState } from 'react';
import { Member } from '../../types';
import { RotateCw, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { SafeImage } from '../common/SafeImage';
import { GoogleDevLogo } from '../common/GoogleDevLogo';

interface MemberIDCardProps {
  member: Member;
}

export const MemberIDCard: React.FC<MemberIDCardProps> = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const getTierBadge = () => {
    switch (member.tier) {
      case 'fellow':
        return {
          bg: 'bg-amber-400 text-stone-950 font-bold',
          label: 'CORE FELLOW'
        };
      case 'pro':
        return {
          bg: 'bg-stone-200 text-stone-900 font-bold',
          label: 'PRO DEVELOPER'
        };
      default:
        return {
          bg: 'bg-stone-800 text-stone-200',
          label: 'STUDENT EXPLORER'
        };
    }
  };

  const badge = getTierBadge();

  return (
    <div className="flex flex-col items-center">
      {/* 3D Container with spring animation */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full max-w-sm h-56 cursor-pointer [perspective:1000px] select-none"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className={`relative w-full h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d] shadow-2xl border border-stone-800 ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* FRONT SIDE (Obsidian & Google Developer Branding) */}
          <div className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-[#181614] text-[#FAF7F2] [backface-visibility:hidden] flex flex-col justify-between overflow-hidden">
            
            {/* Subtle gold foil ambient gradient */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Front Header with Official Google Dev Logo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GoogleDevLogo size="xs" />
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-[11px] tracking-tight text-white">
                    Google Developer Community
                  </span>
                  <span className="text-[9px] text-stone-400 font-medium">
                    Vadodara Chapter
                  </span>
                </div>
              </div>
              <span className={`text-[9px] font-mono tracking-widest px-2 py-0.5 rounded-full ${badge.bg}`}>
                {badge.label}
              </span>
            </div>

            {/* Front Middle: Avatar & Member Info */}
            <div className="flex items-center gap-3.5 my-auto">
              <SafeImage
                src={member.avatarUrl}
                alt={member.name}
                fallbackType="avatar"
                fallbackText={member.name}
                className="w-14 h-14 rounded-xl object-cover border-2 border-white/20 shadow-md shrink-0 bg-stone-800"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-white text-base tracking-tight truncate">
                  {member.name}
                </h4>
                <p className="text-[11px] text-stone-300 truncate">
                  {member.college.split(',')[0]}
                </p>
                <p className="text-[10px] text-stone-400 truncate">
                  {member.branch} · {member.year}
                </p>
              </div>
            </div>

            {/* Front Footer: ID & Expiry */}
            <div className="pt-2 border-t border-white/10 flex items-end justify-between text-xs">
              <div>
                <p className="text-[9px] uppercase font-mono text-stone-400">Club Credential ID</p>
                <p className="font-mono font-bold text-white text-[11px] tracking-wider tabular-nums">
                  {member.badgeCode}
                </p>
              </div>

              {/* QR Thumbnail */}
              <div className="flex items-center gap-2 text-right">
                <div>
                  <p className="text-[9px] uppercase font-mono text-stone-400">Valid Season</p>
                  <p className="font-mono text-white text-[11px] tabular-nums">
                    {member.membershipExpiry ? new Date(member.membershipExpiry).getFullYear() : '2026-27'}
                  </p>
                </div>
                <div className="w-8 h-8 rounded bg-white p-0.5 shrink-0 flex items-center justify-center">
                  <div className="w-full h-full bg-stone-900 rounded-xs flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-white" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 w-full h-full rounded-2xl p-5 bg-[#1F1C1A] text-stone-300 border border-stone-800 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between text-xs">
            
            {/* Magnetic Stripe simulation */}
            <div className="w-full h-7 bg-stone-950 rounded border border-stone-800/80 -mx-5 px-5 flex items-center justify-between text-[9px] font-mono text-stone-500">
              <span>GDC GUJARAT STUDENT NETWORK</span>
              <span className="tabular-nums"># {member.id}</span>
            </div>

            <div className="space-y-1 text-[11px] text-stone-400 pt-1">
              <p>• Verified collegiate pass holder for all GDC Vadodara partner summits.</p>
              <p>• Emergency desk: <span className="text-stone-200 font-mono">+91 98250 44120</span></p>
              <p>• Secretariat: <span className="text-stone-200 font-mono">verify@gdc-vadodara.org</span></p>
            </div>

            {/* Simulated Barcode */}
            <div className="pt-2 border-t border-stone-800 text-center">
              <div className="h-5 w-48 mx-auto flex items-center justify-center gap-0.5 opacity-70">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-full bg-stone-300 ${i % 2 === 0 ? 'w-1' : 'w-0.5'}`} 
                  />
                ))}
              </div>
              <p className="text-[9px] font-mono text-stone-400 mt-1 uppercase tracking-widest">
                VERIFY: GDC-VAD-{member.id}
              </p>
            </div>

          </div>

        </div>
      </motion.div>

      {/* Control hints */}
      <div className="flex items-center gap-3 mt-3 text-xs text-stone-500">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-1.5 hover:text-stone-900 transition-colors cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5 text-stone-700" />
          <span>Click card to flip (Front / Back)</span>
        </button>
      </div>
    </div>
  );
};
