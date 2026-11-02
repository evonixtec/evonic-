import React from 'react';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { LocalProduct } from '../../data/hyperlocalData';

interface WhatsAppOrderButtonProps {
  product: LocalProduct;
  whatsappNumber?: string;
  className?: string;
  buttonText?: string;
  showCodBadge?: boolean;
}

export const WhatsAppOrderButton: React.FC<WhatsAppOrderButtonProps> = ({
  product,
  whatsappNumber = '923263244002',
  className = '',
  buttonText = 'Order via WhatsApp (Instant COD)',
  showCodBadge = true,
}) => {
  const handleOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const message = [
      `Assalam-o-Alaikum Evonix Sialkot Depot,`,
      `I want to place an order for Same-Day COD delivery:`,
      ``,
      `*Item:* ${product.name}`,
      `*SKU:* ${product.sku}`,
      `*Category:* ${product.category}`,
      `*Price:* ${product.pricePKR}`,
      `*Warranty:* ${product.warranty || '1-Year Local Replacement'}`,
      ``,
      `*Delivery Area:* Sialkot (Cash on Delivery)`,
      `Please confirm stock and technician dispatch time.`,
    ].join('\n');

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full space-y-1.5">
      <button
        type="button"
        onClick={handleOrder}
        className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-all shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 cursor-pointer group ${className}`}
        aria-label={`Order ${product.name} on WhatsApp`}
      >
        <MessageCircle className="w-4 h-4 shrink-0 fill-current text-white transition-transform group-hover:scale-110" />
        <span className="font-semibold tracking-wide">{buttonText}</span>
      </button>

      {showCodBadge && (
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-600 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Same-Day Sialkot Dispatch • Cash on Delivery</span>
        </div>
      )}
    </div>
  );
};
