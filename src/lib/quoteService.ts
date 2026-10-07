/**
 * Quotation & Inquiry Service
 * Generates unique reference tracking codes and manages international submission dispatch to evonixtec@gmail.com
 */

import { COMPANY_INFO } from '../data/content';

export interface QuotePayload {
  referenceId: string;
  fullName: string;
  phone: string;
  email?: string;
  serviceType: string;
  locationArea: string;
  country?: string;
  countryCode?: string;
  currency?: string;
  preferredContactMethod?: string;
  timeZone?: string;
  gpsDetected?: boolean;
  gpsCoords?: { lat: number; lng: number };
  isHomeService: boolean;
  budget?: string;
  details?: string;
  submittedAt: string;
  recipientEmail: string;
  emailDispatched?: boolean;
  emailDispatchMessage?: string;
  needsActivation?: boolean;
}

/**
 * Generate a unique, professional quotation reference code (e.g. EVX-2026-8492)
 */
export function generateReferenceId(): string {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `EVX-${year}-${randomDigits}`;
}

const QUOTES_STORAGE_KEY = 'evonix_quotes_ledger';

/**
 * Save quotation to local audit ledger and dispatch notification directly to evonixtec@gmail.com
 */
export async function dispatchQuoteNotification(
  payload: Omit<QuotePayload, 'referenceId' | 'submittedAt' | 'recipientEmail'>
): Promise<QuotePayload> {
  const referenceId = generateReferenceId();
  const recipientEmail = COMPANY_INFO.contact.email || 'evonixtec@gmail.com';

  const fullPayload: QuotePayload = {
    ...payload,
    referenceId,
    submittedAt: new Date().toISOString(),
    recipientEmail,
    emailDispatched: false,
    emailDispatchMessage: 'Dispatching notification...',
  };

  // 1. Save to local audit ledger immediately
  try {
    const existing = JSON.parse(localStorage.getItem(QUOTES_STORAGE_KEY) || '[]');
    existing.unshift(fullPayload);
    // Keep last 50 quotes in local history
    localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('Could not save to local storage ledger', err);
  }

  // 2. Real Transmission to evonixtec@gmail.com via FormSubmit AJAX Gateway
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const emailFormData: Record<string, string> = {
      _subject: `[evonix Quotation ${referenceId}] ${payload.country ? `[${payload.country}] ` : ''}${payload.serviceType} - ${payload.fullName}`,
      _template: 'table',
      _captcha: 'false',
      _replyto: payload.email || recipientEmail,
      'Reference Number': referenceId,
      'Customer Name': payload.fullName,
      'Country / Region': payload.country || 'International',
      'Phone / WhatsApp': (payload.countryCode ? `${payload.countryCode} ` : '') + payload.phone,
      'Email Address': payload.email || 'Not provided',
      'Service Requested': payload.serviceType,
      'City / Location': payload.locationArea + (payload.gpsDetected ? ' (GPS Auto-Detected)' : ''),
      'Preferred Currency': payload.currency || 'USD ($)',
      'Estimated Budget': payload.budget || 'Flexible / Best Value',
      'Preferred Contact Method': payload.preferredContactMethod || 'WhatsApp / Video Call',
      'Client Timezone': payload.timeZone || 'Not specified',
      'On-Site Doorstep Visit': payload.isHomeService ? 'Yes (Doorstep Requested)' : 'No (Global / Remote Delivery)',
      'Project Scope & Details': payload.details || 'No additional notes provided',
      'Submission Timestamp': new Date().toLocaleString(),
      'Delivered To': recipientEmail,
    };

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(emailFormData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      fullPayload.emailDispatched = true;
      if (typeof data?.message === 'string' && data.message.toLowerCase().includes('activation')) {
        fullPayload.needsActivation = true;
        fullPayload.emailDispatchMessage = 'Activation link sent to evonixtec@gmail.com. Please click Activate in your inbox.';
      } else {
        fullPayload.emailDispatchMessage = `Email successfully dispatched to ${recipientEmail}`;
      }
    } else {
      fullPayload.emailDispatched = false;
      fullPayload.emailDispatchMessage = `Email queued for ${recipientEmail}. Direct WhatsApp & Mailto available below.`;
    }
  } catch (err) {
    console.warn('Network timeout or CORS on email gateway, using resilient fallback:', err);
    fullPayload.emailDispatched = false;
    fullPayload.emailDispatchMessage = `Direct delivery ready via WhatsApp and Email copy to ${recipientEmail}`;
  }

  // Console audit confirmation
  console.log(`[evonix QUOTE DISPATCH] Reference: ${fullPayload.referenceId} -> Country: ${fullPayload.country} -> Notified: ${fullPayload.recipientEmail}`);

  return fullPayload;
}

/**
 * Formats WhatsApp confirmation URL including reference number and international context
 */
export function buildWhatsAppQuoteUrl(quote: QuotePayload): string {
  const text = `*NEW QUOTATION INQUIRY [${quote.country || 'Global'}]*
━━━━━━━━━━━━━━━━━━━━
*Reference Code:* ${quote.referenceId}
*Customer Name:* ${quote.fullName}
*Country / Region:* ${quote.country || 'International'}
*Phone / WhatsApp:* ${quote.countryCode ? `${quote.countryCode} ` : ''}${quote.phone}
${quote.email ? `*Email:* ${quote.email}\n` : ''}*Service:* ${quote.serviceType}
*City / Location:* ${quote.locationArea}${quote.gpsDetected ? ' (GPS Auto-Detected)' : ''}
${quote.currency ? `*Currency:* ${quote.currency}\n` : ''}${quote.budget ? `*Budget:* ${quote.budget}\n` : ''}${quote.preferredContactMethod ? `*Preferred Contact:* ${quote.preferredContactMethod}\n` : ''}${quote.timeZone ? `*Timezone:* ${quote.timeZone}\n` : ''}${quote.isHomeService ? '*On-Site Visit:* Yes (Requested)\n' : ''}${quote.details ? `*Requirements:* ${quote.details}\n` : ''}━━━━━━━━━━━━━━━━━━━━
_Dispatch routed to evonixtec@gmail.com_`;

  return `https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
}

/**
 * Formats a direct mailto link to evonixtec@gmail.com with prefilled quote details
 */
export function buildMailtoQuoteUrl(quote: QuotePayload): string {
  const subject = `[Quote ${quote.referenceId}] [${quote.country || 'Global'}] Inquiry for ${quote.serviceType} - ${quote.fullName}`;
  const body = `evonix technologies INTERNATIONAL QUOTATION SUBMISSION
Reference Number: ${quote.referenceId}
Date: ${new Date(quote.submittedAt).toLocaleString()}

CUSTOMER DETAILS:
- Full Name: ${quote.fullName}
- Country / Region: ${quote.country || 'International'}
- Contact Phone: ${(quote.countryCode ? `${quote.countryCode} ` : '') + quote.phone}
- Email: ${quote.email || 'N/A'}
- City / Location: ${quote.locationArea} (GPS: ${quote.gpsDetected ? 'Auto-Detected' : 'Manual'})
- Preferred Currency: ${quote.currency || 'USD'}
- Budget Preference: ${quote.budget || 'N/A'}
- Preferred Consultation Channel: ${quote.preferredContactMethod || 'WhatsApp / Video Call'}
- Client Timezone: ${quote.timeZone || 'N/A'}
- On-Site Visit Required: ${quote.isHomeService ? 'Yes' : 'No'}

REQUIREMENTS & NOTES:
${quote.details || 'None specified'}

Sent to: ${quote.recipientEmail}`;

  return `mailto:${quote.recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
