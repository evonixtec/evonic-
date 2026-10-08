import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Plus,
  Trash2,
  CheckCircle2,
  Download,
  Building,
  DollarSign
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export const GlobalInvoiceHub: React.FC = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-0042');
  const [buyerName, setBuyerName] = useState('Apex International Surgical LLC');
  const [buyerAddress, setBuyerAddress] = useState('142 Business Bay, London, UK / Frankfurt, Germany');
  const [currency, setCurrency] = useState('USD');
  const [taxRate, setTaxRate] = useState(0); // 0% export
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Titanium Micro-Surgical Scalpel Handles Grade 5', quantity: 150, rate: 24.0 },
    { id: '2', description: 'Atraumatic Cardiovascular Forceps SS316', quantity: 80, rate: 32.5 },
  ]);

  const subtotal = items.reduce((acc, it) => acc + it.quantity * it.rate, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: 'New Surgical or IT Deliverable', quantity: 10, rate: 25.0 },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((it) => it.id !== id));
    }
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  return (
    <div className="py-8 bg-slate-100 min-h-screen text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Controls bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Global Micro-Invoice Generator</h1>
            <p className="text-xs text-slate-500">Zero-database client-side commercial export invoice</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print A4 Invoice</span>
            </button>
          </div>
        </div>

        {/* Invoice Canvas */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-md space-y-6 print:border-none print:shadow-none print:p-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-black flex items-center justify-center text-sm">
                  EX
                </div>
                <span className="text-lg font-black tracking-tight text-slate-900">{COMPANY_INFO.name}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                {COMPANY_INFO.contact.address}
                <br />
                Email: {COMPANY_INFO.contact.email} | Tel: {COMPANY_INFO.contact.phoneDisplay}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-red-600 block">COMMERCIAL INVOICE</span>
              <div className="mt-1 flex items-center gap-2 justify-end">
                <span className="text-xs text-slate-400">Invoice No:</span>
                <input
                  type="text"
                  aria-label="Invoice Number"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="px-2 py-1 text-xs font-mono font-bold border border-slate-200 rounded text-right w-36"
                />
              </div>
              <span className="text-xs text-slate-400 block mt-1">Date: {new Date().toLocaleDateString('en-GB')}</span>
            </div>
          </div>

          {/* Client Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Bill To (Consignee)</span>
              <input
                type="text"
                aria-label="Bill To Buyer Name"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full font-bold text-slate-800 bg-transparent border-b border-slate-200 pb-0.5 focus:outline-none"
              />
              <input
                type="text"
                aria-label="Bill To Buyer Address"
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
                className="w-full text-slate-500 bg-transparent focus:outline-none"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Payment Terms</span>
                <span className="font-semibold text-slate-800">Net 30 Days / TT Wire / LC at Sight</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Origin: Sialkot Dry Port / Lahore Air Cargo</span>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block">Currency</label>
                <select
                  aria-label="Invoice Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="px-2 py-1 rounded border border-slate-200 text-xs font-bold"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="PKR">PKR (Rs)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2">Item Description</th>
                  <th className="py-2 text-center w-24">Qty</th>
                  <th className="py-2 text-right w-28">Unit Rate</th>
                  <th className="py-2 text-right w-28">Amount</th>
                  <th className="py-2 text-center w-12 print:hidden"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((it) => (
                  <tr key={it.id}>
                    <td className="py-2.5">
                      <input
                        type="text"
                        aria-label="Item Description"
                        value={it.description}
                        onChange={(e) => handleUpdateItem(it.id, 'description', e.target.value)}
                        className="w-full font-medium text-slate-800 bg-transparent focus:outline-none"
                      />
                    </td>
                    <td className="py-2.5 text-center">
                      <input
                        type="number"
                        aria-label="Item Quantity"
                        value={it.quantity}
                        onChange={(e) => handleUpdateItem(it.id, 'quantity', Number(e.target.value) || 0)}
                        className="w-16 px-1 py-0.5 text-center border border-slate-200 rounded font-mono"
                        min="1"
                      />
                    </td>
                    <td className="py-2.5 text-right font-mono">
                      <input
                        type="number"
                        aria-label="Item Unit Rate"
                        value={it.rate}
                        onChange={(e) => handleUpdateItem(it.id, 'rate', Number(e.target.value) || 0)}
                        className="w-20 px-1 py-0.5 text-right border border-slate-200 rounded font-mono"
                        min="0"
                        step="0.1"
                      />
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-slate-800">
                      {currency} {(it.quantity * it.rate).toFixed(2)}
                    </td>
                    <td className="py-2.5 text-center print:hidden">
                      <button
                        onClick={() => handleRemoveItem(it.id)}
                        className="text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="print:hidden">
            <button
              onClick={handleAddItem}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          {/* Subtotals & Grand Total */}
          <div className="flex flex-col sm:flex-row justify-between items-start pt-4 border-t border-slate-200 gap-4 text-xs">
            <div className="max-w-xs space-y-1 text-slate-500 text-[11px]">
              <span className="font-bold text-slate-700 block">Banking &amp; Wire Details:</span>
              <p>Bank: Standard Chartered / Meezan Bank Sialkot</p>
              <p>IBAN: PK36MEZN00001004582910</p>
              <p>SWIFT/BIC: MEZNPKKA</p>
            </div>

            <div className="w-full sm:w-64 space-y-2 font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span>{currency} {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax / Duty:</span>
                <span>{currency} {taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Due:</span>
                <span className="text-red-600">{currency} {grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
