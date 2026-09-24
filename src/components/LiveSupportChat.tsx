import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  Clock,
  MapPin,
  Sparkles,
  User,
  Wrench,
  Globe,
  Monitor,
  Printer,
  Server,
  Camera,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

// Import Generated Professional Human Profile Avatars
import engrHamzaAvatar from '../assets/images/engr_hamza_avatar_1790283136081.jpg';
import ayeshaMalikAvatar from '../assets/images/ayesha_malik_avatar_1790283154429.jpg';
import farazRazaAvatar from '../assets/images/faraz_reza_avatar_1790283171631.jpg';
import rabiaNoorAvatar from '../assets/images/rabia_noor_avatar_1790283186094.jpg';

export interface DutyEngineer {
  id: string;
  name: string;
  shortName: string;
  title: string;
  role: string;
  shiftHours: string;
  location: string;
  avatar: string;
  gender: 'male' | 'female';
}

// 4-Hour Shift Duty Engineers (Rotates every 4 hours automatically)
// 00:00 - 04:00: Rabia Noor
// 04:00 - 08:00: Faraz Raza
// 08:00 - 12:00: Engr. Hamza Tariq
// 12:00 - 16:00: Ayesha Malik
// 16:00 - 20:00: Engr. Hamza Tariq
// 20:00 - 24:00: Rabia Noor
export const DUTY_ENGINEERS: DutyEngineer[] = [
  {
    id: 'rabia',
    name: 'Rabia Noor',
    shortName: 'Rabia',
    title: 'Technical Services & Client Intake Coordinator',
    role: 'Client Care & Diagnostics Desk',
    shiftHours: 'Client Care & Service Desk',
    location: 'Evonix Support Desk, Paris Road & Daska Road, Sialkot',
    avatar: rabiaNoorAvatar,
    gender: 'female'
  },
  {
    id: 'hamza',
    name: 'Engr. Hamza Tariq',
    shortName: 'Hamza',
    title: 'Lead Hardware & Micro-Soldering Specialist',
    role: 'Workshop Bench & Motherboard Diagnostics',
    shiftHours: 'Hardware Workshop Bench',
    location: 'Evonix Hardware Lab, Daska Road & Paris Road, Sialkot',
    avatar: engrHamzaAvatar,
    gender: 'male'
  },
  {
    id: 'ayesha',
    name: 'Ayesha Malik',
    shortName: 'Ayesha',
    title: 'Senior Client Operations & Systems Advisor',
    role: 'Client Relationship & Project Support',
    shiftHours: 'Corporate Solutions & Client Desk',
    location: 'Paris Road Technology Center, Sialkot',
    avatar: ayeshaMalikAvatar,
    gender: 'female'
  },
  {
    id: 'faraz',
    name: 'Faraz Raza',
    shortName: 'Faraz',
    title: 'Principal Systems & Enterprise Infrastructure Lead',
    role: 'Server, Network & Systems Lead',
    shiftHours: 'Software & Infrastructure Desk',
    location: 'Paris Road Technology Center, Sialkot',
    avatar: farazRazaAvatar,
    gender: 'male'
  }
];

// Determine active duty engineer based on current 4-hour time block
export function getActiveDutyEngineer(): DutyEngineer {
  const hour = new Date().getHours();
  const slot = Math.floor(hour / 4);
  const cycle = [0, 3, 1, 2, 1, 0];
  const engineerIdx = cycle[slot] ?? 0;
  return DUTY_ENGINEERS[engineerIdx];
}

// Time-aware greeting helper: Good morning / Good afternoon / Good evening
export function getTimeGreeting(lang: 'english' | 'urdu'): string {
  const hour = new Date().getHours();
  if (lang === 'english') {
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    return 'Good evening';
  }
  // Urdu polite time greeting
  if (hour >= 5 && hour < 12) return 'Subah bakhair';
  if (hour >= 12 && hour < 17) return 'Dopehar bakhair';
  return 'Sham bakhair';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  agentName?: string;
  agentRole?: string;
  agentAvatar?: string;
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    whatsappText: string;
  };
}

interface UserConversationState {
  turnCount: number;
  stage:
    | 'initial'
    | 'after_name'
    | 'diagnosing_fault'
    | 'troubleshooting_options'
    | 'handover_whatsapp'
    | 'completed';
  userName?: string;
  userDeviceCategory?:
    | 'laptop'
    | 'pc'
    | 'printer'
    | 'pos'
    | 'server'
    | 'cctv'
    | 'website';
  languageMode: 'pure_english' | 'pure_urdu';
}

// Extract human name if the user provided one (e.g. "Raza", "My name is Raza", "Muhammad Raza", "رضا")
export function extractUserName(text: string): string | null {
  const cleaned = text.trim();

  // Pattern A: "my name is Raza", "i am Raza", "this is Raza", "mera naam Raza hai", "mera nam Raza", "nam Raza"
  const phraseMatch = cleaned.match(
    /(?:my name is|i am|i'm|this is|call me|mera naam|mera nam|nam|naam)\s+([A-Za-z\u0600-\u06FF]+(?:\s+[A-Za-z\u0600-\u06FF]+)?)/i
  );
  if (phraseMatch && phraseMatch[1]) {
    const candidate = phraseMatch[1].trim();
    const banned = [
      'laptop', 'computer', 'printer', 'screen', 'repair', 'issue', 'problem',
      'hi', 'hello', 'theek', 'hai', 'not', 'working', 'dead', 'server', 'camera'
    ];
    if (!banned.includes(candidate.toLowerCase())) {
      return candidate.charAt(0).toUpperCase() + candidate.slice(1);
    }
  }

  // Pattern B: "Raza here", "Raza speaking", "Raza bhai"
  const suffixMatch = cleaned.match(/^([A-Za-z\u0600-\u06FF]{2,15})\s+(?:here|speaking|bhai|sahib|bhaiya)\b/i);
  if (suffixMatch && suffixMatch[1]) {
    const candidate = suffixMatch[1].trim();
    return candidate.charAt(0).toUpperCase() + candidate.slice(1);
  }

  // Pattern C: If user just typed their name as a standalone 1 or 2 word message (e.g. "Raza", "Muhammad Raza", "Ali Raza", "رضا")
  const words = cleaned.split(/\s+/);
  if (words.length >= 1 && words.length <= 2) {
    const ignoreList = [
      'hi', 'hello', 'hey', 'salam', 'aoa', 'assalam', 'yes', 'no', 'haan', 'theek',
      'laptop', 'pc', 'printer', 'dead', 'screen', 'kya', 'kia', 'help', 'good',
      'morning', 'evening', 'afternoon', 'price', 'cost', 'where', 'sialkot', 'evonix',
      'camera', 'server', 'wifi', 'windows', 'service', 'thanks', 'thank', 'ok', 'okay'
    ];
    const candidateWord = words[0].toLowerCase().replace(/[^a-z\u0600-\u06FF]/g, '');
    if (!ignoreList.includes(candidateWord) && candidateWord.length >= 2) {
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }

  return null;
}

// Strict pure language detector:
// - English if user greets with "hi", "hello", "hey", or English phrases
// - Urdu if user writes Urdu script or Roman Urdu phrases ("kya", "kesa", "kese", "masla", "theek", etc.)
export function detectMessageLanguage(text: string): 'pure_english' | 'pure_urdu' {
  // If Urdu script present
  if (/[\u0600-\u06FF]/.test(text)) {
    return 'pure_urdu';
  }

  const lower = text.toLowerCase().trim();

  // Clear English greetings or query starters
  if (
    /^(hi|hello|hey|good morning|good afternoon|good evening|dear|what is|how are|i have|my laptop|my computer|my printer|my screen|cost of|can you|please|thanks|thank you)\b/.test(
      lower
    )
  ) {
    return 'pure_english';
  }

  // Roman Urdu vocabulary indicators
  const romanUrduWords = [
    'kya', 'kia', 'kesa', 'kese', 'kaise', 'hoon', 'hai', 'hain', 'theek', 'bhai',
    'janab', 'janaab', 'mujhe', 'hum', 'chahiye', 'kahan', 'acha', 'jee', 'masla',
    'kharab', 'mera', 'meri', 'mere', 'karo', 'karein', 'shukriya', 'walaikum', 'salam',
    'batao', 'batayein', 'band', 'chal', 'hota', 'hoga'
  ];
  const words = lower.split(/\s+/);
  const urduMatchCount = words.filter((w) => romanUrduWords.includes(w)).length;

  if (urduMatchCount > 0) {
    return 'pure_urdu';
  }

  return 'pure_english';
}

const QUICK_TOPICS = [
  { label: 'Laptop Power / Black Screen', query: 'My laptop is completely dead and screen is black.' },
  { label: 'Printer Paper Jam / Cartridge', query: 'Printer paper jam and offline network issue.' },
  { label: 'Server & Factory Network Down', query: 'Server database is down and office LAN network disconnected.' },
  { label: 'CCTV Camera Video Loss', query: 'CCTV camera display is blank and NVR not recording.' },
  { label: 'POS Billing Software Crash', query: 'POS billing software shows database connection error.' },
  { label: 'Company Website / Corporate Email', query: 'Website is down and corporate email not receiving.' },
  { label: 'Free Bench Diagnosis Inquiry', query: 'What is your free workshop bench diagnosis policy?' }
];

interface LiveSupportChatProps {
  onOpenQuote?: (serviceType: string) => void;
}

export const LiveSupportChat: React.FC<LiveSupportChatProps> = ({ onOpenQuote }) => {
  const [activeEngineer, setActiveEngineer] = useState<DutyEngineer>(getActiveDutyEngineer);
  const [isOpen, setIsOpen] = useState(false);
  const [hasPromptedToast, setHasPromptedToast] = useState(false);
  const [showToastBanner, setShowToastBanner] = useState(false);

  const [convState, setConvState] = useState<UserConversationState>(() => {
    try {
      const savedState = localStorage.getItem('evonix_conv_state_v5');
      if (savedState) return JSON.parse(savedState);
    } catch (e) {
      // ignore
    }
    return {
      turnCount: 0,
      stage: 'initial',
      languageMode: 'pure_english'
    };
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('evonix_support_chat_v5');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }

    const currentEng = getActiveDutyEngineer();
    const timeGreeting = getTimeGreeting('english');
    return [
      {
        id: 'msg-welcome-init',
        sender: 'agent',
        agentName: currentEng.name,
        agentRole: currentEng.title,
        agentAvatar: currentEng.avatar,
        text: `Assalam-o-Alaikum & ${timeGreeting}! I am ${currentEng.name} from the Evonix Sialkot Client Desk.\n\nHow are you doing today? Everything good?\n\nSir, could you please tell me your good name, and what problem are you facing with your laptop, printer, computer, or system?`,
        timestamp: 'Just now'
      }
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // Exactly 30s overall process
  const [isTyping, setIsTyping] = useState(false); // Appears after 15s quiet hold
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check and update duty engineer on every load / interval
  useEffect(() => {
    const checkEngineer = () => {
      const eng = getActiveDutyEngineer();
      setActiveEngineer(eng);
    };
    checkEngineer();
    const interval = setInterval(checkEngineer, 60000 * 15);
    return () => clearInterval(interval);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (typeTimerRef.current) clearTimeout(typeTimerRef.current);
    };
  }, []);

  // Show friendly proactive popup after 4.5 seconds of browsing website
  useEffect(() => {
    if (!hasPromptedToast) {
      const toastTimer = setTimeout(() => {
        setShowToastBanner(true);
        setHasPromptedToast(true);
        setUnreadCount(1);
      }, 4500);
      return () => clearTimeout(toastTimer);
    }
  }, [hasPromptedToast]);

  // Persist messages and state
  useEffect(() => {
    try {
      localStorage.setItem('evonix_support_chat_v5', JSON.stringify(messages));
      localStorage.setItem('evonix_conv_state_v5', JSON.stringify(convState));
    } catch (e) {
      // ignore
    }
  }, [messages, convState]);

  // Scroll to bottom on message or typing change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowToastBanner(false);
    setUnreadCount(0);
  };

  /**
   * Human Conversational Dialogue Engine:
   * 1. 100% pure language separation (no mixing English & Urdu).
   * 2. When user introduces themselves (e.g. "Raza", "My name is Raza"):
   *    - English: "Thanks, Raza. How are you? Everything good? Assalam-o-Alaikum & Good morning/afternoon/evening! Sir, what is your problem? Can you tell me?"
   *    - Urdu: "Shukriya Raza sahib! Kese hain aap? Sab theek thaak? Assalam-o-Alaikum aur [Greeting]! Janab, aapka kya masla hai? Kya aap mujhe bata sakte hain?"
   * 3. If user doesn't give a name, don't pressure them. Acknowledge politely as "Sir" (or "Janab").
   * 4. Multi-Domain Diagnostic Support for all client systems:
   *    - Laptop / Notebook
   *    - Desktop Computer / PC
   *    - Printer / LaserJet / Barcode
   *    - POS Retail / Billing Software
   *    - Server & Factory Network
   *    - CCTV & Security Cameras
   *    - Website & Corporate Email
   * 5. Offer 3 targeted troubleshooting diagnostic questions on Turn 2.
   * 6. Reassure explicitly: "Diagnostic on our workshop bench is 100% free!"
   * 7. Zero WhatsApp pressure in early turns. Only on Turn 5+ politely transition to WhatsApp
   *    for official record-keeping, noting company hours (9:00 AM - 8:00 PM).
   */
  const generatePoliteHumanReply = (
    userText: string,
    currentTurn: number,
    state: UserConversationState
  ): {
    text: string;
    actionText?: string;
    detectedName?: string;
    deviceCategory?: UserConversationState['userDeviceCategory'];
    nextStage: UserConversationState['stage'];
    lang: 'pure_english' | 'pure_urdu';
  } => {
    const lang = detectMessageLanguage(userText);
    const timeGreetingEng = getTimeGreeting('english');
    const timeGreetingUrdu = getTimeGreeting('urdu');
    const q = userText.toLowerCase().trim();

    // Check for user name
    const newlyDetectedName = extractUserName(userText);
    const effectiveName = newlyDetectedName || state.userName;
    const nameDisplayEng = effectiveName || 'Sir';
    const nameDisplayUrdu = effectiveName ? `${effectiveName} sahib` : 'Janab';

    // Device category classification
    let category: UserConversationState['userDeviceCategory'] = state.userDeviceCategory;
    if (q.includes('camera') || q.includes('cctv') || q.includes('dvr') || q.includes('nvr') || q.includes('hikvision') || q.includes('dahua') || q.includes('recording')) {
      category = 'cctv';
    } else if (q.includes('website') || q.includes('email') || q.includes('domain') || q.includes('hosting') || q.includes('ssl') || q.includes('web page') || q.includes('portal')) {
      category = 'website';
    } else if (q.includes('pos') || q.includes('billing') || q.includes('barcode') || q.includes('retail') || q.includes('quickbooks') || q.includes('software') || q.includes('erp') || q.includes('inventory')) {
      category = 'pos';
    } else if (q.includes('server') || q.includes('network') || q.includes('wifi') || q.includes('lan') || q.includes('switch') || q.includes('router') || q.includes('firewall')) {
      category = 'server';
    } else if (q.includes('printer') || q.includes('laserjet') || q.includes('paper') || q.includes('cartridge') || q.includes('toner') || q.includes('roller') || q.includes('epson') || q.includes('hp laser')) {
      category = 'printer';
    } else if (q.includes('desktop') || (q.includes('pc') && !q.includes('laptop')) || q.includes('cpu') || q.includes('tower') || q.includes('power supply') || q.includes('smps')) {
      category = 'pc';
    } else if (q.includes('laptop') || q.includes('notebook') || q.includes('macbook') || q.includes('dell') || q.includes('lenovo') || q.includes('screen') || q.includes('hinge') || q.includes('battery') || q.includes('dead')) {
      category = 'laptop';
    }

    // Did the user just tell us their name without describing their problem yet?
    const isJustName = newlyDetectedName && !category && q.split(/\s+/).length <= 4;

    // ==========================================
    // SCENARIO 1: PURE ENGLISH
    // ==========================================
    if (lang === 'pure_english') {
      // User just introduced their name (e.g. "Raza", "My name is Raza", "Raza here")
      if (isJustName) {
        return {
          text: `Thanks, ${effectiveName}. How are you? Everything good?\n\nAssalam-o-Alaikum & ${timeGreetingEng}!\n\nSir, what is your problem? Can you tell me what issue you are facing with your laptop, printer, computer, CCTV, or server?`,
          detectedName: effectiveName,
          deviceCategory: category,
          nextStage: 'after_name',
          lang: 'pure_english'
        };
      }

      // Turn 1 greeting (e.g. "hi", "hello") with no name yet
      if (currentTurn <= 1 && !category) {
        return {
          text: `Hello and ${timeGreetingEng}! How are you doing today? Everything good?\n\nSir, may I help you? Could you please tell me your good name and what problem you are facing with your device or system?`,
          detectedName: effectiveName,
          deviceCategory: category,
          nextStage: 'after_name',
          lang: 'pure_english'
        };
      }

      // Turn 2: Problem introduction -> Present 3 Troubleshooting Diagnostic Questions
      if (currentTurn <= 2 || state.stage === 'after_name' || (state.stage === 'initial' && category)) {
        if (category === 'cctv') {
          return {
            text: `Understood, ${nameDisplayEng}.\n\nTo diagnose your CCTV / security surveillance issue accurately, which of these 3 situations is happening?\n\n1. Complete Video Loss: Cameras show 'No Video' or black screens on your TV / monitor.\n2. NVR / DVR Storage Fault: The hard disk has stopped recording, beeps continuously, or shows 'HDD Unformatted'.\n3. Remote Mobile App Offline: You cannot view live camera footage remotely on your smartphone outside the premises.\n\nWhich of these 3 is happening? (By the way, initial diagnostic consultation is 100% free!)`,
            detectedName: effectiveName,
            deviceCategory: category,
            nextStage: 'diagnosing_fault',
            lang: 'pure_english'
          };
        }

        if (category === 'website') {
          return {
            text: `Understood, ${nameDisplayEng}.\n\nTo troubleshoot your web & email systems, which of these 3 issues are you experiencing?\n\n1. Website Completely Down: Shows 500 Internal Server Error, database connection failed, or domain expired.\n2. Corporate Email Failure: Business emails (@yourcompany.com) are bouncing, failing to receive, or going into spam.\n3. Security / SSL Error: Browser warns 'Not Secure' or website was infected by malicious redirects.\n\nWhich of these 3 are you seeing? (Our initial technical review is 100% free with no obligation!)`,
            detectedName: effectiveName,
            deviceCategory: category,
            nextStage: 'diagnosing_fault',
            lang: 'pure_english'
          };
        }

        if (category === 'pos') {
          return {
            text: `Thank you for sharing, ${nameDisplayEng}.\n\nTo diagnose your POS / software issue accurately, which of these 3 situations is happening?\n\n1. Database / Crash Error: The POS software will not open, shows a database connection failure, or freezes during checkout.\n2. Thermal Receipt & Barcode Issue: The receipt printer or barcode scanner has disconnected or prints blank slips.\n3. Offline / Multi-terminal Sync: Counter terminals cannot communicate with the main back-office inventory database.\n\nWhich of these 3 are you experiencing? (Also, our initial diagnostic consultation is 100% free!)`,
            detectedName: effectiveName,
            deviceCategory: category,
            nextStage: 'diagnosing_fault',
            lang: 'pure_english'
          };
        }

        if (category === 'printer') {
          return {
            text: `Thank you for sharing, ${nameDisplayEng}.\n\nTo diagnose your printer accurately, could you please tell me which of these 3 symptoms is happening?\n\n1. Paper Jam / Roller slipping: Paper gets stuck inside or paper feed light blinks red.\n2. Print Quality: Faded print, black ink streaks, or torn fuser film sleeve.\n3. Connectivity: Printer shows 'Offline' or will not detect on your USB/LAN network.\n\nWhich of these 3 are you experiencing? (Also, our diagnostic on the bench is 100% free!)`,
            detectedName: effectiveName,
            deviceCategory: category,
            nextStage: 'diagnosing_fault',
            lang: 'pure_english'
          };
        }

        if (category === 'server') {
          return {
            text: `Understood, ${nameDisplayEng}.\n\nFor server and network systems, please check which of these 3 cases matches your situation:\n\n1. Database / Server crash: System will not boot up or software gives connection error.\n2. LAN / Sharing disconnected: Billing terminals or shared printers cannot see the host machine.\n3. Internet / Router failure: Frequent disconnection during factory export operations.\n\nWhich one is happening at your facility? (Initial diagnostic check is 100% free!)`,
            detectedName: effectiveName,
            deviceCategory: category,
            nextStage: 'diagnosing_fault',
            lang: 'pure_english'
          };
        }

        if (category === 'pc') {
          return {
            text: `Understood, ${nameDisplayEng}.\n\nTo pinpoint the hardware issue on your desktop PC, which of these 3 conditions is happening?\n\n1. Completely Dead / No Power: Pressing the power button does nothing, no CPU fan spins, and no motherboard lights turn on.\n2. CPU turns ON, fans spin at high speed, but monitor shows 'No Signal' / black screen.\n3. Blue Screen (BSOD) / Freezes: Windows crashes frequently with stop codes or restarts unexpectedly.\n\nWhich of these 3 are you facing? (Diagnostic on our workshop bench is 100% free!)`,
            detectedName: effectiveName,
            deviceCategory: category,
            nextStage: 'diagnosing_fault',
            lang: 'pure_english'
          };
        }

        // Default: Laptop & MacBook
        return {
          text: `Understood, ${nameDisplayEng}.\n\nTo help pinpoint the fault on the motherboard or screen, could you please tell me which of these 3 conditions matches your laptop?\n\n1. Completely Dead: No power lights, no fan sound, no charging indicator when plugged in.\n2. Power light ON, fan spins, but the screen stays completely black.\n3. Turns ON normally, but overheats heavily, shuts down after a few minutes, or has a broken hinge.\n\nWhich of these 3 is happening? (By the way, diagnostic on our workshop bench is 100% free—we never charge before your approval!)`,
          detectedName: effectiveName,
          deviceCategory: category || 'laptop',
          nextStage: 'diagnosing_fault',
          lang: 'pure_english'
        };
      }

      // Turn 3: Technical investigation of the underlying cause
      if (currentTurn === 3) {
        if (category === 'cctv') {
          return {
            text: `Thank you for the details, ${nameDisplayEng}.\n\nThis is typically caused by a blown 12V SMPS power channel, a corrupted NVR firmware sector, or damaged RJ45/coaxial cabling from weather exposure.\n\nCould you clarify: did this issue occur after a recent storm, thunder, or power generator switchover? And how many total cameras are installed at your premises?`,
            detectedName: effectiveName,
            deviceCategory: category,
            nextStage: 'troubleshooting_options',
            lang: 'pure_english'
          };
        }

        if (category === 'website') {
          return {
            text: `Thank you for the details, ${nameDisplayEng}.\n\nFor corporate web and mail servers, we prioritize DNS record verification (MX, SPF, DKIM) and database health checks to restore business communication immediately.\n\nCould you share: what is your website domain address, and do you currently have access to your cPanel or hosting account dashboard?`,
            detectedName: effectiveName,
            deviceCategory: category,
            nextStage: 'troubleshooting_options',
            lang: 'pure_english'
          };
        }

        if (category === 'pos') {
          return {
            text: `Thank you for the clear details, ${nameDisplayEng}.\n\nFor POS systems and database engines, data safety is our highest priority. We always secure an encrypted local backup before applying any database repair patches.\n\nCould you please clarify: is this installed locally on an offline PC server in your shop/factory, or is it cloud-hosted? Also, when was the last successful sale or backup recorded?`,
            detectedName: effectiveName,
            deviceCategory: category,
            nextStage: 'troubleshooting_options',
            lang: 'pure_english'
          };
        }

        if (category === 'printer') {
          return {
            text: `Thank you for the details, ${nameDisplayEng}.\n\nThis usually points to a worn pickup roller assembly, a torn Teflon fuser sleeve, or a defective DC controller board. We service these with genuine HP/Canon/Epson replacement parts.\n\nCould you share: roughly how many pages are printed daily on this machine, and are you using genuine cartridges or refilled toners?`,
            detectedName: effectiveName,
            deviceCategory: category,
            nextStage: 'troubleshooting_options',
            lang: 'pure_english'
          };
        }

        // Laptop / PC Default
        return {
          text: `Thank you for the clear details, ${nameDisplayEng}.\n\nBased on your description, this is typically caused by a blown main power rail MOSFET, charging controller IC, or display BIOS signal line on the motherboard. We repair these component-level faults directly on our micro-soldering bench with a 90-day written warranty.\n\nCould you tell me: did this problem start suddenly after a power fluctuation/generator trip, or did any liquid spill on it? Also, has any other technician attempted to open it before?`,
          detectedName: effectiveName,
          deviceCategory: category,
          nextStage: 'troubleshooting_options',
          lang: 'pure_english'
        };
      }

      // Turn 4: Lab capability & reassurance
      if (currentTurn === 4) {
        return {
          text: `Got it, ${nameDisplayEng}. That is very helpful, and our engineering team handles this exact technical fault daily.\n\nOur workshop lab at Paris Road & Daska Road is equipped with stereoscopic microscopes, infrared thermal cameras, and clean soldering benches to inspect circuits safely. And as a reminder, our diagnosis on the bench is 100% free with zero obligation.\n\nDo you currently have the original device charger or accessories with you, and do you require an emergency same-day turnaround?`,
          detectedName: effectiveName,
          deviceCategory: category,
          nextStage: 'troubleshooting_options',
          lang: 'pure_english'
        };
      }

      // Turn 5+: Gracefully suggest moving to WhatsApp for professional record-keeping + Business Hours
      return {
        text: `Thank you so much for explaining everything so clearly, ${nameDisplayEng}!\n\nOur company business hours are 9:00 AM to 8:00 PM (Monday through Saturday) at our Paris Road & Daska Road facilities in Sialkot.\n\nTo keep a proper official service record of your diagnostic notes and case history, we can conveniently move this conversation to WhatsApp. Whenever you are comfortable, you may share your contact number here, or click the WhatsApp button below to message our lab desk directly. Our technical advisor will review your case file promptly during business hours.`,
        actionText: `Hello Evonix, this is ${nameDisplayEng}. I am contacting you from your live chat regarding my ${category || 'hardware'} diagnostic case.`,
        detectedName: effectiveName,
        deviceCategory: category,
        nextStage: 'handover_whatsapp',
        lang: 'pure_english'
      };
    }

    // ==========================================
    // SCENARIO 2: PURE URDU / ROMAN URDU
    // ==========================================
    if (isJustName) {
      return {
        text: `Shukriya ${effectiveName} sahib! Kese hain aap? Sab theek thaak?\n\nAssalam-o-Alaikum aur ${timeGreetingUrdu}!\n\nJanab, aapka kya masla hai? Kya aap mujhe bata sakte hain ke aapke laptop, printer, computer ya system mein kya problem arahi hai?`,
        detectedName: effectiveName,
        deviceCategory: category,
        nextStage: 'after_name',
        lang: 'pure_urdu'
      };
    }

    // Turn 1 greeting in Urdu
    if (currentTurn <= 1 && !category) {
      return {
        text: `Assalam-o-Alaikum aur ${timeGreetingUrdu}! Kese hain aap? Sab theek thaak?\n\nJanab, kya main aapki madad kar sakti hoon? Aap apna shubh naam aur apne device ka masla bata sakte hain?`,
        detectedName: effectiveName,
        deviceCategory: category,
        nextStage: 'after_name',
        lang: 'pure_urdu'
      };
    }

    // Turn 2 in Urdu: 3 Troubleshooting Options
    if (currentTurn <= 2 || state.stage === 'after_name' || (state.stage === 'initial' && category)) {
      if (category === 'cctv') {
        return {
          text: `Samajh gayi ${nameDisplayUrdu}.\n\nCCTV aur security camera ke sahi checkup ke liye batayein in 3 mein se kya ho raha hai:\n\n1. Video Feed Ghayab: Screen par 'No Video' ya black screen show hoti hai.\n2. NVR / DVR Hard Drive Masla: Hard disk recording nahi kar rahi ya continuosly beeping sound de rahi hai.\n3. Mobile App Offline: Dukan ya factory se bahar mobile par camera live view open nahi hota.\n\nAapke camera system mein in 3 mein se konsi problem hai? (Hamare desk par initial consultation bilkul 100% FREE hai!)`,
          detectedName: effectiveName,
          deviceCategory: category,
          nextStage: 'diagnosing_fault',
          lang: 'pure_urdu'
        };
      }

      if (category === 'website') {
        return {
          text: `Samajh gayi ${nameDisplayUrdu}.\n\nWebsite aur corporate email ke liye batayein in 3 mein se konsa masla hai:\n\n1. Website Band: 500 error ya database connection failed araha hai.\n2. Official Email Kharab: Company ki email receive nahi ho rahi ya spam mein ja rahi hai.\n3. SSL / Security Warning: Website par 'Not Secure' ki red warning show ho rahi hai.\n\nAapko in 3 mein se konsi dikkat arahi hai? (Hamaray technical lead se initial review bilkul 100% FREE hai!)`,
          detectedName: effectiveName,
          deviceCategory: category,
          nextStage: 'diagnosing_fault',
          lang: 'pure_urdu'
        };
      }

      if (category === 'pos') {
        return {
          text: `Wazahat ka shukriya ${nameDisplayUrdu}.\n\nPOS aur software maslay ke liye batayein in 3 mein se kya ho raha hai:\n\n1. Database / Crash Error: POS software open nahi ho raha, database connection error araha hai ya sale ke waqt freeze ho jata hai.\n2. Thermal Receipt Printer & Barcode: Receipt printer ya barcode scanner disconnect ho gaya hai ya kora print nikal raha hai.\n3. Offline / Multi-terminal Sync: Counters ka main office ya inventory computer se connection drop ho gaya hai.\n\nAapke software mein in 3 mein se konsi problem hai? (Initial diagnostic consultation bilkul 100% FREE hai!)`,
          detectedName: effectiveName,
          deviceCategory: category,
          nextStage: 'diagnosing_fault',
          lang: 'pure_urdu'
        };
      }

      if (category === 'printer') {
        return {
          text: `Wazahat ka shukriya ${nameDisplayUrdu}.\n\nPrinter ki sahi tashkhees ke liye batayein in 3 mein se kya ho raha hai:\n\n1. Paper Jam / Roller slip: Kaghaz andar phans jata hai ya red error light blink karti hai.\n2. Print Kharabi: Kaghaz par kali lines ati hain ya fuser sleeve phat gayi hai.\n3. Connectivity Masla: Computer se 'Printer Offline' show hota hai ya USB detect nahi hoti.\n\nAapke printer mein in 3 mein se konsi problem hai? (Hamare workshop bench par diagnosis bilkul 100% FREE hai!)`,
          detectedName: effectiveName,
          deviceCategory: category,
          nextStage: 'diagnosing_fault',
          lang: 'pure_urdu'
        };
      }

      if (category === 'server') {
        return {
          text: `Samajh gayi ${nameDisplayUrdu}.\n\nServer aur network ke liye batayein in 3 mein se konsi situation hai:\n\n1. Database / Server crash: System start nahi ho raha ya software connection error de raha hai.\n2. LAN / Printer sharing disconnect: Doosray counters se billing printer connect nahi ho raha.\n3. Internet / Router fault: Factory mein bar bar connection drop ho raha hai.\n\nHamari workshop aur lab mein initial checkup 100% FREE hai! Aapki konsi problem hai?`,
          detectedName: effectiveName,
          deviceCategory: category,
          nextStage: 'diagnosing_fault',
          lang: 'pure_urdu'
        };
      }

      // Default: Laptop & PC (Urdu)
      return {
        text: `Samajh gayi ${nameDisplayUrdu}.\n\nMotherboard ya screen ka sahi masla janne ke liye batayein in 3 mein se kya condition hai:\n\n1. Bilkul DEAD: Charger lagane par bhi koi light nahi jalti, na hi fan chalta hai.\n2. Power light ON hoti hai aur fan chalta hai, lekin SCREEN bilkul BLACK rehti hai.\n3. Laptop chalta hai magar bohot garam ho kar khud band ho jata hai ya body hinge toot gaya hai.\n\nAapke laptop mein in 3 mein se konsi soorat-e-haal hai? (Hamare workshop bench par diagnostic bilkul 100% FREE hai—bina aapki ijazat ke hum koi charges nahi lagate!)`,
        detectedName: effectiveName,
        deviceCategory: category || 'laptop',
        nextStage: 'diagnosing_fault',
        lang: 'pure_urdu'
      };
    }

    // Turn 3 in Urdu: Technical Investigation
    if (currentTurn === 3) {
      return {
        text: `Tafseel ka bohot shukriya ${nameDisplayUrdu}.\n\nJo aap ne bataya hai, us hisab se yeh motherboard ki main power rail (MOSFET/charging IC) ka masla lagta hai ya display BIOS signal ka fault hai. Yeh hamare bench par genuine OEM parts se repair ho jata hai aur hum 90 din ki written warranty dete hain.\n\nKya yeh achanak bijli jane ya generator jhatkay ke baad hua tha, ya koi pani/chai giri thi? Aur kya pehle kisi technician ne ise open to nahi kiya?`,
        detectedName: effectiveName,
        deviceCategory: category,
        nextStage: 'troubleshooting_options',
        lang: 'pure_urdu'
      };
    }

    // Turn 4 in Urdu: Reassurance
    if (currentTurn === 4) {
      return {
        text: `Sahi farmaya aap ne ${nameDisplayUrdu}. Hamari hardware team Dell, HP, Lenovo aur MacBook boards par daily aise faults theek karti hai.\n\nHamare workshop bench par thermal camera aur micro-soldering station se safe repair ki jati hai. Aur jesa ke bataya, bench diagnostic 100% FREE hai.\n\nKya aapke paas device ka original charger mojood hai? Aur kya aapko yeh same-day emergency basis par chahiye?`,
        detectedName: effectiveName,
        deviceCategory: category,
        nextStage: 'troubleshooting_options',
        lang: 'pure_urdu'
      };
    }

    // Turn 5+ in Urdu: Transition to WhatsApp + Timings (9 AM - 8 PM)
    return {
      text: `Aapka bohot bohot shukriya ${nameDisplayUrdu} itni tafseel se batane ka!\n\nHamari company ke official working hours subah 9:00 AM se raat 8:00 PM (Monday to Saturday) hain Paris Road aur Daska Road Sialkot par.\n\nAapki file aur diagnostic notes ka professional record mehfooz rakhne ke liye hum is baat cheet ko WhatsApp par shift kar sakte hain. Aap jab munasib samjhein apna phone/WhatsApp number yahan share kar dein, ya niche diye gaye button par click kar ke hamare lab desk par direct WhatsApp kar dein. Hamara service advisor working hours mein aapke case ka foran follow up karega.`,
      actionText: `Assalam-o-Alaikum Evonix, main ${nameDisplayUrdu} hoon. Main ne website live chat par diagnostic case ke silsilay mein rabta kiya tha.`,
      detectedName: effectiveName,
      deviceCategory: category,
      nextStage: 'handover_whatsapp',
      lang: 'pure_urdu'
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsProcessing(true);
    setIsTyping(false); // Phase 1: 15 seconds hold (completely quiet, no countdown, natural human pause)

    const nextTurn = convState.turnCount + 1;
    const replyData = generatePoliteHumanReply(text, nextTurn, convState);

    // Update conversation state
    setConvState((prev) => ({
      ...prev,
      turnCount: nextTurn,
      stage: replyData.nextStage,
      userName: replyData.detectedName || prev.userName,
      userDeviceCategory: replyData.deviceCategory || prev.userDeviceCategory,
      languageMode: replyData.lang
    }));

    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (typeTimerRef.current) clearTimeout(typeTimerRef.current);

    // Phase 1: Hold for exactly 15 seconds (quiet listening / reading)
    holdTimerRef.current = setTimeout(() => {
      // Phase 2: Start typing indicator after 15 seconds pause
      setIsTyping(true);

      // Phase 2 duration: 15 seconds typing time (Total elapsed = 30 seconds)
      typeTimerRef.current = setTimeout(() => {
        setIsTyping(false);
        setIsProcessing(false);

        const currentEng = getActiveDutyEngineer();
        const agentMsg: ChatMessage = {
          id: `agent-${Date.now()}`,
          sender: 'agent',
          agentName: currentEng.name,
          agentRole: currentEng.title,
          agentAvatar: currentEng.avatar,
          text: replyData.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          // Only show actionButton on later turns (turn 5+) when gracefully suggesting WhatsApp
          actionButton:
            replyData.actionText && nextTurn >= 5
              ? {
                  label: `Continue on WhatsApp with ${currentEng.shortName}`,
                  whatsappText: replyData.actionText
                }
              : undefined
        };

        setMessages((prev) => [...prev, agentMsg]);
      }, 15000); // 15 seconds typing
    }, 15000); // 15 seconds quiet hold
  };

  return (
    <>
      {/* 1. Proactive Notification Toast Banner (Appears after 4.5s on site) */}
      {showToastBanner && !isOpen && (
        <div className="fixed bottom-24 left-4 sm:left-6 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start gap-3">
            <div className="relative flex-shrink-0">
              <img
                src={activeEngineer.avatar}
                alt={activeEngineer.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-red-600 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {activeEngineer.name}
                </h4>
                <button
                  onClick={() => setShowToastBanner(false)}
                  className="text-slate-400 hover:text-slate-600 p-0.5"
                  aria-label="Close message preview"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>On Duty at Sialkot Client Desk</span>
              </p>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-tight">
                "Hello! How are you doing today? Sir, how can I help you with your laptop, printer, or system?"
              </p>
              <button
                onClick={handleOpen}
                className="mt-2.5 w-full py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with {activeEngineer.shortName}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Floating Chat Trigger Button with Engineer Photo */}
      {!isOpen && (
        <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
          <button
            onClick={handleOpen}
            className="group flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white shadow-2xl shadow-slate-900/40 border border-slate-700/80 hover:scale-105 transition-all cursor-pointer"
            aria-label={`Open Live Sialkot Support Desk with ${activeEngineer.name}`}
          >
            {/* Real Human Avatar Photo */}
            <div className="relative flex-shrink-0">
              <img
                src={activeEngineer.avatar}
                alt={activeEngineer.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-red-500 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-900 animate-pulse" />
            </div>

            <div className="text-left hidden sm:block pr-1">
              <div className="text-xs font-bold flex items-center gap-1.5 text-white">
                <span>{activeEngineer.name}</span>
                <span className="text-[10px] text-emerald-400 font-medium">(Online)</span>
              </div>
              <div className="text-[11px] text-slate-300">
                Evonix Sialkot Lab Desk
              </div>
            </div>

            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* 3. Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-3 sm:bottom-6 left-3 sm:left-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[430px] max-h-[90vh] h-[610px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header with Human Photo & 4-Hour Shift Badge */}
          <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={activeEngineer.avatar}
                  alt={activeEngineer.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{activeEngineer.name}</h4>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800">
                    Active Desk
                  </span>
                </div>
                <div className="text-[11px] text-slate-300">
                  {activeEngineer.title}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>Daska Road & Paris Road, Sialkot</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Minimize Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader info note */}
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{convState.userName ? `Assisting ${convState.userName}` : `${activeEngineer.shortName} is assisting you personally`}</span>
            </span>
            <span className="text-slate-500 font-semibold text-emerald-700">Bench Diagnosis 100% Free</span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  {!isUser && (
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700 ml-1">
                      {msg.agentAvatar && (
                        <img
                          src={msg.agentAvatar}
                          alt={msg.agentName || 'Agent'}
                          className="w-4 h-4 rounded-full object-cover border border-slate-300"
                        />
                      )}
                      <span className="text-red-700">{msg.agentName}</span>
                      <span className="text-slate-400 font-normal">({msg.agentRole?.split(' ')[0]})</span>
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-red-600 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* WhatsApp Action Button attached to reply ONLY on late turn (5+) */}
                    {!isUser && msg.actionButton && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-1.5">
                        <a
                          href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(msg.actionButton.whatsappText)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{msg.actionButton.label}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 px-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Realistic Human Typing Indicator with live photo and clean typing animation */}
            {isTyping && (
              <div className="flex items-center gap-3 p-3 max-w-xs bg-white border border-slate-200 rounded-2xl rounded-bl-xs text-xs text-slate-700 shadow-md">
                <img
                  src={activeEngineer.avatar}
                  alt={activeEngineer.name}
                  className="w-7 h-7 rounded-full object-cover border border-red-500 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">{activeEngineer.name} is typing...</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce [animation-delay:0.4s]" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Writing a reply
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Topic Chips */}
          <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_TOPICS.map((topic, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(topic.query)}
                disabled={isProcessing}
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 disabled:opacity-50 text-slate-700 text-[11px] font-medium border border-slate-200/80 transition-colors cursor-pointer flex-shrink-0"
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isProcessing}
                placeholder={isProcessing ? `${activeEngineer.shortName} is reviewing & replying...` : `Reply to ${activeEngineer.shortName} (in English or Urdu)...`}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all disabled:bg-slate-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isProcessing}
                className="p-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white transition-colors cursor-pointer flex-shrink-0"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>Hours: 9:00 AM - 8:00 PM</span>
              <span className="text-emerald-600 font-medium">Diagnostic on the bench is 100% free</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
