import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const PricingSection: React.FC = () => {
  const { pricingTiers, currentUser, openCheckout } = useApp();

  return (
    <section id="pricing" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#E8E1D5]">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-stone-500 uppercase mb-2">
          <span>Membership Architecture</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Semester & Annual Tiers</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Invest in your developer career in Vadodara.
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
          Transparent student-friendly tiers designed to cover physical hackathon lab expenses, cloud computing vouchers, and industry expert masterclasses.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {pricingTiers.map((tier) => {
          const isCurrent = currentUser?.tier === tier.id;
          const isPopular = tier.isPopular;

          return (
            <motion.div
              key={tier.id}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl flex flex-col justify-between p-7 transition-all duration-200 ${
                isPopular
                  ? 'bg-white border-2 border-stone-900 shadow-xl'
                  : 'bg-white border border-[#E2DBD0] shadow-xs'
              }`}
            >
              {/* Popular Marker */}
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-stone-900 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#FAF7F2] shadow-sm">
                  Recommended for Students
                </div>
              )}

              <div>
                {/* Header: Title & Target Audience */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-stone-900 tracking-tight">{tier.name}</h3>
                  <p className="text-xs text-stone-500 font-medium mt-1">{tier.targetAudience}</p>
                </div>

                {/* Price Display with Tabular Figures */}
                <div className="mb-6 pb-6 border-b border-[#EAE3D6]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-stone-900 tabular-nums">
                      ₹{tier.priceINR}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      / {tier.billingPeriod}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Feature List */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                    Included Benefits:
                  </p>
                  <ul className="space-y-2.5 text-xs text-stone-700">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                        <span className="leading-snug">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#EAE3D6]">
                {isCurrent ? (
                  <div className="text-center py-2.5 px-4 rounded-xl bg-[#F0EBE1] border border-[#DDD5C7] text-xs font-semibold text-stone-900">
                    Active Plan (Member Pass Active)
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openCheckout(tier)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                      isPopular
                        ? 'bg-stone-900 hover:bg-black text-[#FAF7F2]'
                        : 'bg-[#F4EFE6] hover:bg-[#EAE3D6] text-stone-900 border border-[#DDD5C7]'
                    }`}
                  >
                    <span>{tier.priceINR === 0 ? 'Activate Free Student Pass' : `Upgrade to ${tier.name}`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                )}
                
                <p className="text-[11px] text-center text-stone-500 mt-2">
                  {tier.priceINR === 0 ? 'Instant verification with .ac.in / college email' : 'Secure UPI, RuPay, Card & Netbanking with GST receipt'}
                </p>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Security & Indian Payment Gateway Trust Strip */}
      <div className="mt-12 p-6 rounded-2xl bg-[#F4EFE6] border border-[#DDD5C7] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-600">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-stone-800 shrink-0" />
          <span>
            <strong className="text-stone-900">RBI Tokenized & NPCI UPI Compliant:</strong> Integrated payment gateway simulates instant settlement with official club invoice generation.
          </span>
        </div>
        <div className="flex items-center gap-4 text-stone-800 shrink-0 font-medium font-mono text-[11px]">
          <span>UPI / QR</span>
          <span>·</span>
          <span>Google Pay</span>
          <span>·</span>
          <span>RuPay / Visa</span>
          <span>·</span>
          <span>Net Banking</span>
        </div>
      </div>

    </section>
  );
};
