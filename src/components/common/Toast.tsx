import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const bgStyles = {
    success: 'bg-white border-stone-300 text-stone-900 shadow-xl',
    info: 'bg-white border-stone-300 text-stone-900 shadow-xl',
    warning: 'bg-amber-50 border-amber-300 text-amber-950 shadow-xl',
    error: 'bg-rose-50 border-rose-300 text-rose-950 shadow-xl'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-5 right-5 z-50 max-w-md w-full px-4"
      >
        <div className={`flex items-start gap-3 p-4 rounded-2xl border shadow-xl ${bgStyles[toast.type]}`}>
          {icons[toast.type]}
          <div className="text-xs font-semibold leading-relaxed flex-1">
            {toast.message}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
