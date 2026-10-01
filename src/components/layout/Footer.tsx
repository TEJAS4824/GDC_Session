import React from 'react';
import { useApp } from '../../context/AppContext';
import { Github, Globe, MapPin, Mail } from 'lucide-react';
import { GoogleDevLogo } from '../common/GoogleDevLogo';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="w-full bg-[#F3EDE2] border-t border-[#E5DDCF] py-12 text-stone-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <GoogleDevLogo size="sm" />
              <div className="flex flex-col leading-none">
                <span className="text-stone-900 font-bold text-sm tracking-tight">
                  Google Developer Community
                </span>
                <span className="text-[11px] font-semibold text-stone-600 tracking-wide mt-0.5">
                  Vadodara Chapter
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Google Developer Community chapter representing collegiate engineers and tech builders across Vadodara, Gujarat.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-600 pt-1">
              <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              <span>GSFC University · MSU Baroda · Parul · ITM</span>
            </div>
          </div>

          <div>
            <h4 className="text-stone-900 font-semibold text-xs tracking-wider uppercase mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('public')} className="hover:text-stone-900 transition-colors cursor-pointer">
                  Flagship Events & Schedule
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('public')} className="hover:text-stone-900 transition-colors cursor-pointer">
                  Student & Pro Membership Tiers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('portal')} className="hover:text-stone-900 transition-colors cursor-pointer">
                  Member Portal & ID Pass
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admin')} className="hover:text-stone-900 transition-colors cursor-pointer">
                  Admin Management Console
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-stone-900 font-semibold text-xs tracking-wider uppercase mb-3">Developer Tracks</h4>
            <ul className="space-y-2 text-xs">
              <li className="text-stone-600">Artificial Intelligence & Gemini</li>
              <li className="text-stone-600">Google Cloud & Serverless</li>
              <li className="text-stone-600">Android & Kotlin Multiplatform</li>
              <li className="text-stone-600">Open Source & Web Architecture</li>
            </ul>
          </div>

          <div>
            <h4 className="text-stone-900 font-semibold text-xs tracking-wider uppercase mb-3">Connect & Secretariat</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-stone-800">contact@gdc-vadodara.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-stone-800">github.com/gdc-vadodara</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-stone-800">Vadodara, Gujarat 390001</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-[#E5DDCF] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 GDC Vadodara Group. Non-profit collegiate developer community.</p>
          <div className="flex items-center gap-4">
            <span className="text-stone-600">Code of Conduct</span>
            <span>·</span>
            <span className="text-stone-600">Membership Terms</span>
            <span>·</span>
            <span className="text-stone-600">GST Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
