import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, CheckCircle, FileText } from 'lucide-react';
import { GoogleDevLogo } from '../common/GoogleDevLogo';

export const InvoiceModal: React.FC = () => {
  const { activeInvoice, closeInvoice, currentUser } = useApp();

  if (!activeInvoice) return null;

  const txn = activeInvoice;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60 no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Tax Invoice & Receipt
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={closeInvoice}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Document Body */}
        <div className="p-8 bg-white text-slate-900 space-y-6 text-xs">
          
          {/* Invoice Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <GoogleDevLogo size="sm" />
                <span className="font-bold text-base text-slate-900 tracking-tight">
                  Google Developer Community Vadodara
                </span>
              </div>
              <p className="text-slate-600 leading-snug">
                Student Society & Innovation Lab, GSFC University<br />
                Fertilizernagar, Vadodara, Gujarat 391750, India<br />
                Email: accounts@gdc-vadodara.org
              </p>
              <p className="mt-2 font-mono text-[11px] text-slate-700">
                <strong>GSTIN:</strong> 24AABTG8821N1ZM (Gujarat State Code 24)
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-bold uppercase text-[11px] mb-2 tracking-wider">
                TAX INVOICE
              </span>
              <p className="font-mono text-slate-800 font-bold">{txn.invoiceNumber}</p>
              <p className="text-slate-500 text-[11px] mt-1">
                Date: {new Date(txn.timestamp).toLocaleDateString()}
              </p>
              <p className="text-slate-500 text-[11px]">
                Payment Mode: {txn.paymentMethod.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Billed To Details */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <p className="font-bold text-slate-500 text-[10px] uppercase">BILLED TO (MEMBER)</p>
              <p className="font-bold text-sm text-slate-900 mt-1">{txn.memberName}</p>
              <p className="text-slate-600 mt-0.5">{txn.memberEmail}</p>
              <p className="text-slate-600">{currentUser?.college || 'Student Member'}</p>
            </div>

            <div>
              <p className="font-bold text-slate-500 text-[10px] uppercase">TRANSACTION DETAILS</p>
              <p className="font-mono text-slate-800 mt-1">Txn ID: {txn.id}</p>
              <p className="font-mono text-slate-600 text-[11px] mt-0.5 truncate">
                Ref: {txn.paymentGatewayRef}
              </p>
              <div className="flex items-center gap-1 text-emerald-600 font-semibold mt-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Payment Confirmed & Verified</span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase tracking-wider border-b border-slate-200">
                  <th className="p-3">Description</th>
                  <th className="p-3">SAC Code</th>
                  <th className="p-3 text-right">Taxable Value</th>
                  <th className="p-3 text-right">CGST (9%)</th>
                  <th className="p-3 text-right">SGST (9%)</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                <tr>
                  <td className="p-3 font-sans font-medium text-slate-900">
                    {txn.tierName} Membership Fee
                    <p className="text-[10px] font-sans text-slate-500">Student Developer Access & Cloud Credits Vault</p>
                  </td>
                  <td className="p-3 text-slate-600">999293</td>
                  <td className="p-3 text-right text-slate-800 tabular-nums">₹{txn.amountINR.toFixed(2)}</td>
                  <td className="p-3 text-right text-slate-600 tabular-nums">₹{(txn.taxINR / 2).toFixed(2)}</td>
                  <td className="p-3 text-right text-slate-600 tabular-nums">₹{(txn.taxINR / 2).toFixed(2)}</td>
                  <td className="p-3 text-right font-bold text-slate-900 tabular-nums">₹{txn.totalINR.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Calculation */}
          <div className="flex justify-end">
            <div className="w-64 space-y-1.5 text-right font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal (Excl. Tax):</span>
                <span>₹{txn.amountINR.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Applicable GST (18%):</span>
                <span>₹{txn.taxINR.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t-2 border-slate-900">
                <span>Total Amount Paid:</span>
                <span>₹{txn.totalINR.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer & Signature Stamp */}
          <div className="pt-6 border-t border-slate-200 flex justify-between items-end">
            <div className="max-w-xs text-[10px] text-slate-500 leading-tight">
              <p>This is a computer-generated tax invoice issued by Google Developer Community Vadodara Student Society for official record and college reimbursement claim.</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-12 border border-dashed border-slate-300 rounded flex items-center justify-center text-[10px] text-slate-400 font-serif italic mb-1">
                Authorized Signature
              </div>
              <p className="text-[10px] font-semibold text-slate-700">GDC Vadodara Secretariat</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
