const fs = require('fs');

const path = 'src/data/toolsRegistry.ts';
let code = fs.readFileSync(path, 'utf8');

// Replacement for 13. STRIPE FEE CALCULATOR
const stripeTarget = `  // 13. STRIPE FEE CALCULATOR
  'stripe-fee-calculator': {
    slug: 'stripe-fee-calculator',
    name: 'Stripe Fee & Payout Calculator',
    h1: 'Stripe Credit Card Processing & Payout Calculator',
    metaTitle: 'Stripe Fee Calculator | Transaction & Payout Tool',
    metaDescription: 'Model domestic and international Stripe credit card processing fees with forward and reverse payout calculation logic.',
    category: 'Finance & Tax',
    targetAudience: 'SaaS founders, freelancers, and global e-commerce merchants.',
    hardwareCta: {
      headline: 'Need Card Terminals for Retail?',
      subtext: 'Discover integrated point-of-sale card readers and thermal receipt printers with local Sialkot warranty.',
      buttonText: 'View POS Equipment',
      targetUrl: 'https://store.evonixtec.com',
    },
    howToSteps: [
      'Enter transaction amount or net payout target.',
      'Select card type (domestic 2.9% + $0.30 or international +1.5%).',
      'Use reverse calculator mode to determine exact billable charge.',
      'Review processing fee deductions and net merchant payout.',
    ],
    faqs: [
      {
        q: 'How does the reverse calculator work?',
        a: 'It calculates exactly what you must bill a client so you receive your target sum after Stripe takes its fee.',
      },
    ],
  },`;

const stripeReplacement = `  // 13. STRIPE FEE CALCULATOR
  'stripe-fee-calculator': {
    slug: 'stripe-fee-calculator',
    name: 'Stripe Fee & Payout Calculator',
    h1: 'Stripe Credit Card Processing & Payout Calculator',
    metaTitle: 'Stripe Fee Calculator | Transaction & Payout Tool',
    metaDescription: 'Model domestic and international Stripe credit card processing fees with forward and reverse payout calculation logic.',
    category: 'Finance & Tax',
    targetAudience: 'SaaS founders, freelancers, and global e-commerce merchants.',
    hardwareCta: {
      headline: 'Need Card Terminals for Retail?',
      subtext: 'Discover integrated point-of-sale card readers and thermal receipt printers with local Sialkot warranty.',
      buttonText: 'View POS Equipment',
      targetUrl: 'https://store.evonixtec.com',
    },
    howItWorks: {
      title: 'How This Calculator Works: Stripe Processing Formulas',
      explanation: 'Stripe uses a percentage-plus-fixed-fee model on every settled transaction. The base fee varies depending on whether the card is domestic or cross-border. When currency conversion is required, an extra conversion spread applies.',
      formula: 'Processing Fee = (Transaction Amount * Rate) + Fixed Fee. Reverse Charge = (Target Payout + Fixed Fee) / (1 - Rate).',
      rates: [
        'US Domestic Cards: 2.9% + $0.30 per successful charge.',
        'International Cards: Standard rate plus 1.5% cross-border assessment (total 4.4% + $0.30).',
        'Currency Conversion: An additional 1% spread if settlement currency differs from charge currency.',
        'In-Person Terminal: 2.7% + $0.05 for card-present POS transactions.'
      ]
    },
    howToSteps: [
      'Enter transaction amount or net payout target.',
      'Select card type (domestic 2.9% + $0.30 or international +1.5%).',
      'Use reverse calculator mode to determine exact billable charge.',
      'Review processing fee deductions and net merchant payout.',
    ],
    faqs: [
      {
        q: 'How does the reverse calculator formula work?',
        a: 'The reverse formula accounts for Stripe deducting fees from the gross total. It divides (Target Amount + Fixed Fee) by (1 - Fee Percentage) so your net settlement equals your target.',
      },
      {
        q: 'What is the fee difference between domestic and international cards?',
        a: 'Domestic US cards incur 2.9% + $0.30. Non-US international cards add a 1.5% fee, plus another 1% if currency conversion is involved.',
      },
      {
        q: 'Does Stripe refund processing fees when an order is cancelled?',
        a: 'No. Stripe retains the original fixed and percentage fees when you issue full or partial refunds to customers.',
      },
    ],
  },`;

if (!code.includes(stripeTarget)) {
  console.error('stripeTarget not found!');
  process.exit(1);
}
code = code.replace(stripeTarget, stripeReplacement);
fs.writeFileSync(path, code, 'utf8');
console.log('Stripe calculator updated successfully.');
