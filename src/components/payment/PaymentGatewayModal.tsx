import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  CreditCard, 
  Building2, 
  CheckCircle2, 
  Loader2, 
  Copy, 
  Check
} from 'lucide-react';
import { motion } from 'motion/react';
import { GoogleDevLogo } from '../common/GoogleDevLogo';

export const PaymentGatewayModal: React.FC = () => {
  const { 
    selectedTierForCheckout, 
    closeCheckout, 
    currentUser, 
    processPayment, 
    openInvoice
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  
  // UPI fields
  const [upiId, setUpiId] = useState(currentUser?.email ? `${currentUser.email.split('@')[0]}@okhdfcbank` : 'student@okaxis');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [qrCountdown, setQrCountdown] = useState(299);

  // Card fields
  const [cardNumber, setCardNumber] = useState('4532 8920 1823 4821');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('831');
  const [cardHolder, setCardHolder] = useState(currentUser?.name || 'Aarav Patel');

  // Netbanking
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Processing state
  const [processingState, setProcessingState] = useState<'idle' | 'authorizing' | 'verifying' | 'success'>('idle');
  const [createdTxn, setCreatedTxn] = useState<any>(null);

  useEffect(() => {
    if (!selectedTierForCheckout) return;
    const interval = setInterval(() => {
      setQrCountdown(prev => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedTierForCheckout]);

  if (!selectedTierForCheckout) return null;

  const tier = selectedTierForCheckout;
  const totalAmount = tier.priceINR;
  const baseAmount = (totalAmount / 1.18).toFixed(2);
  const gstAmount = (totalAmount - Number(baseAmount)).toFixed(2);

  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  const handleCopyUPI = () => {
    navigator.clipboard?.writeText('gdc.vadodara@okhdfcbank');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCardNumberChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 16);
    const formatted = clean.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    if (clean.length > 2) {
      setCardExpiry(`${clean.slice(0, 2)}/${clean.slice(2)}`);
    } else {
      setCardExpiry(clean);
    }
  };

  const handlePay = async () => {
    setProcessingState('authorizing');

    setTimeout(async () => {
      setProcessingState('verifying');
      
      setTimeout(async () => {
        const txn = await processPayment(
          tier.id, 
          paymentMethod, 
          {
            upiId: paymentMethod === 'upi' ? upiId : undefined,
            cardLast4: paymentMethod === 'card' ? cardNumber.slice(-4) : undefined
          }
        );
        setCreatedTxn(txn);
        setProcessingState('success');
      }, 1200);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-[#FAF7F2] border border-[#DDD5C7] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative text-stone-900"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Modal Top Gateway Header */}
        <div className="p-5 border-b border-[#E2DBD0] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GoogleDevLogo size="sm" />
            <div>
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <span>Google Developer Community Vadodara</span>
                <span>·</span>
                <span className="text-stone-800 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 256-bit Secure
                </span>
              </div>
              <h3 className="text-sm font-bold text-stone-900 tracking-tight">
                {tier.name} Subscription
              </h3>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-stone-500">Total Payable</p>
            <p className="text-lg font-bold font-mono text-stone-900 tabular-nums">
              ₹{totalAmount.toFixed(2)}
            </p>
          </div>

          {processingState === 'idle' && (
            <button
              onClick={closeCheckout}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-[#F0EBE1] transition-colors cursor-pointer ml-3"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content based on processing status */}
        {processingState === 'idle' && (
          <div className="p-6 space-y-6">
            
            {/* Order Summary & GST breakdown */}
            <div className="p-4 rounded-2xl bg-white border border-[#E2DBD0] text-xs shadow-xs">
              <div className="flex justify-between text-stone-600 pb-1.5 border-b border-[#EAE3D6]">
                <span>{tier.name} ({tier.billingPeriod})</span>
                <span className="font-mono tabular-nums text-stone-900 font-semibold">₹{baseAmount}</span>
              </div>
              <div className="flex justify-between text-stone-600 pt-1.5">
                <span>CGST (9%) + SGST (9%)</span>
                <span className="font-mono tabular-nums text-stone-700">₹{gstAmount}</span>
              </div>
              <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-[#EAE3D6] mt-2 text-sm">
                <span>Total Amount (Incl. GST)</span>
                <span className="font-mono tabular-nums text-stone-900 font-extrabold">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <p className="text-xs font-semibold text-stone-800 mb-2.5">Select Payment Method</p>
              <div className="grid grid-cols-3 gap-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-xs font-medium transition-colors cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                      : 'bg-white border-[#DDD5C7] text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mb-1.5" />
                  <span>UPI / QR</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-xs font-medium transition-colors cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                      : 'bg-white border-[#DDD5C7] text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-1.5" />
                  <span>Debit / Card</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-xs font-medium transition-colors cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                      : 'bg-white border-[#DDD5C7] text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Building2 className="w-5 h-5 mb-1.5" />
                  <span>Net Banking</span>
                </motion.button>
              </div>
            </div>

            {/* Payment Method Specific Body */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4 text-xs">
                
                {/* QR Section */}
                <div className="p-4 rounded-2xl bg-white border border-[#E2DBD0] flex flex-col sm:flex-row items-center gap-4 shadow-xs">
                  <div className="p-2 bg-white rounded-xl border border-stone-300 text-stone-900 shrink-0">
                    <div className="w-28 h-28 grid grid-cols-5 grid-rows-5 gap-1 p-0.5">
                      <div className="col-span-2 row-span-2 bg-stone-950 rounded-xs" />
                      <div className="bg-stone-950" />
                      <div className="col-span-2 row-span-2 bg-stone-950 rounded-xs" />
                      <div className="bg-stone-950" />
                      <div className="bg-stone-400" />
                      <div className="bg-stone-950" />
                      <div className="col-span-2 row-span-2 bg-stone-950 rounded-xs" />
                      <div className="bg-stone-950" />
                      <div className="bg-stone-950" />
                      <div className="bg-stone-400" />
                      <div className="bg-stone-950" />
                      <div className="bg-stone-950" />
                    </div>
                  </div>

                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-stone-900">Scan with any UPI App</p>
                      <span className="font-mono text-[11px] text-stone-900 font-bold tabular-nums">
                        {formatCountdown(qrCountdown)}
                      </span>
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      Google Pay, PhonePe, Paytm, BHIM or any banking app.
                    </p>
                    <div className="flex items-center gap-2 pt-1 justify-center sm:justify-start">
                      <span className="font-mono text-stone-900 bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#DDD5C7] text-[11px] font-semibold">
                        gdc.vadodara@okhdfcbank
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyUPI}
                        className="p-1 rounded text-stone-500 hover:text-stone-900 cursor-pointer"
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Or enter UPI VPA */}
                <div>
                  <label className="block text-stone-800 font-semibold mb-1">
                    Or Enter your UPI ID (VPA)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="yourname@okhdfcbank"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 font-mono focus:outline-none focus:border-stone-900"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">A payment request will be simulated and auto-verified.</p>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3.5 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-stone-800 font-semibold">Card Number</label>
                    <span className="text-[11px] text-stone-500 font-medium">RuPay / Visa / MC</span>
                  </div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => handleCardNumberChange(e.target.value)}
                    placeholder="4532 8920 1823 4821"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 font-mono text-sm tracking-wider focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-800 font-semibold mb-1">Expiry Date (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={e => handleExpiryChange(e.target.value)}
                      placeholder="08/28"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 font-mono focus:outline-none focus:border-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-800 font-semibold mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 font-mono focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-800 font-semibold mb-1">Cardholder Full Name</label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={e => setCardHolder(e.target.value)}
                    placeholder="Full name as printed on card"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#DDD5C7] text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="space-y-3 text-xs">
                <label className="block text-stone-800 font-semibold">Select Indian Banking Institution</label>
                <div className="grid grid-cols-2 gap-2">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Bank of Baroda'].map(bank => (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition-colors cursor-pointer ${
                        selectedBank === bank
                          ? 'bg-stone-900 border-stone-900 text-white'
                          : 'bg-white border-[#DDD5C7] text-stone-700 hover:text-stone-900'
                      }`}
                    >
                      {bank}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Pay Button */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handlePay}
                className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Lock className="w-4 h-4" />
                <span>Pay ₹{totalAmount.toFixed(2)} Securely</span>
              </motion.button>
              
              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 mt-3">
                <span>Instant Membership Tier Activation</span>
                <span>·</span>
                <span>Digital GST Invoice</span>
              </div>
            </div>

          </div>
        )}

        {/* Processing State */}
        {(processingState === 'authorizing' || processingState === 'verifying') && (
          <div className="p-12 text-center space-y-4">
            <Loader2 className="w-10 h-10 text-stone-800 animate-spin mx-auto" />
            <div>
              <h4 className="text-base font-bold text-stone-900">
                {processingState === 'authorizing' ? 'Connecting to NPCI Payment Gateway...' : 'Verifying Transaction with Bank...'}
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Please do not refresh or close this window.
              </p>
            </div>
            <div className="inline-block px-3 py-1 rounded bg-[#EFE9DF] border border-[#DDD5C7] text-xs font-mono text-stone-700 font-semibold">
              ORDER_REF: GDC-VAD-ORD-{Date.now().toString().slice(-6)}
            </div>
          </div>
        )}

        {/* Success State */}
        {processingState === 'success' && createdTxn && (
          <div className="p-8 text-center space-y-6">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-600 text-emerald-700 flex items-center justify-center mx-auto shadow-sm"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>

            <div>
              <h4 className="text-xl font-bold text-stone-900 tracking-tight">Payment Verified!</h4>
              <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                Congratulations! Your <strong className="text-stone-900">{tier.name}</strong> membership is now active.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E2DBD0] text-xs space-y-2 text-left shadow-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Transaction ID:</span>
                <span className="font-mono text-stone-900 font-semibold">{createdTxn.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Invoice Number:</span>
                <span className="font-mono text-stone-900">{createdTxn.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Amount Paid:</span>
                <span className="font-mono font-bold text-stone-900">₹{createdTxn.totalINR.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  closeCheckout();
                  openInvoice(createdTxn);
                }}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl text-xs font-semibold text-stone-800 bg-[#EFE9DF] hover:bg-[#E2DBCF] transition-colors cursor-pointer border border-[#DDD5C7]"
              >
                View GST Invoice
              </button>

              <button
                type="button"
                onClick={closeCheckout}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl text-xs font-semibold text-[#FAF7F2] bg-stone-900 hover:bg-black transition-colors cursor-pointer shadow-xs"
              >
                Explore Member Perks
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
