import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  Cpu,
  ShieldCheck,
  AlertCircle,
  MapPin,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  Phone,
  FileText,
  Thermometer,
  Zap,
  Printer
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export interface RepairJob {
  ticketId: string;
  customerName: string;
  companyName?: string;
  phoneEnding: string;
  device: string;
  serialNumber: string;
  intakeDate: string;
  estimatedCompletion: string;
  currentStatus: 'intake' | 'diagnosis' | 'repairing' | 'stress_test' | 'ready';
  primaryTechnician: string;
  labLocation: string;
  reportedFault: string;
  technicianNotes: string;
  benchReadings: {
    standbyCurrent: string;
    vCoreStatus: string;
    temperaturePeak: string;
    componentReplaced: string;
  };
  stages: {
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
    current?: boolean;
  }[];
}

const SAMPLE_REPAIRS: RepairJob[] = [
  {
    ticketId: 'EVX-7821',
    customerName: 'Chaudhry Nadeem',
    companyName: 'Al-Burraq Surgical Works (Daska Road)',
    phoneEnding: '8492',
    device: 'Dell Latitude 5420 Core i7',
    serialNumber: 'DL-5420-SKT-882',
    intakeDate: '24 Sep 2026, 10:15 AM',
    estimatedCompletion: '24 Sep 2026, 05:30 PM',
    currentStatus: 'stress_test',
    primaryTechnician: 'Engr. Hamza Tariq (Chief Hardware Specialist)',
    labLocation: 'Evonix Micro-electronics Lab, Daska Road & Paris Road, Sialkot',
    reportedFault: 'Complete power failure following 380V generator phase fluctuation in factory.',
    technicianNotes: 'Identified dead short on 19.5V main power rail. Replaced blown high-side Vishay MOSFET (PQ201) and adjacent decoupling ceramic capacitor. 3.3V and 5V power rails restored. Motherboard ultrasonic cleaned and dried.',
    benchReadings: {
      standbyCurrent: '0.012A (Normal factory tolerance)',
      vCoreStatus: '1.05V Stable under Cinebench load',
      temperaturePeak: '62°C (Arctic MX-6 thermal compound applied)',
      componentReplaced: 'PQ201 30V N-Channel MOSFET + 10uF 25V MLCC capacitor'
    },
    stages: [
      {
        title: 'Physical Intake & High-Res Inspection',
        description: 'Device logged into inventory, initial photos taken, DC jack tested for mechanical shorts.',
        timestamp: '10:15 AM',
        completed: true
      },
      {
        title: 'Thermal Camera Diagnosis',
        description: 'FLIR thermal camera pinpointed excessive 92°C heat signature on PQ201 MOSFET rail.',
        timestamp: '11:40 AM',
        completed: true
      },
      {
        title: 'Micro-Soldering & Component Replacement',
        description: 'Damaged MOSFET desoldered with QUICK hot-air station at 380°C. OEM replacement soldered with clean joints.',
        timestamp: '01:10 PM',
        completed: true
      },
      {
        title: 'Ultrasonic Bath & Thermal Overhaul',
        description: 'Flux residue removed via PCB solvent, heatsink polished and Arctic MX-6 applied.',
        timestamp: '02:45 PM',
        completed: true
      },
      {
        title: '24-Hour Soak & Benchmark Stress Test',
        description: 'Running looping 3D graphics test and continuous battery charge-discharge cycle.',
        timestamp: '03:30 PM (In Progress)',
        completed: false,
        current: true
      },
      {
        title: 'QC Passed & Ready for Pick-Up / Dispatch',
        description: 'Warranty seal attached, protective anti-static wrap, and SMS/WhatsApp dispatch sent to client.',
        timestamp: 'Estimated 05:30 PM',
        completed: false
      }
    ]
  },
  {
    ticketId: 'EVX-8492',
    customerName: 'Khurram Shahzad',
    companyName: 'Forward Sports Vendor Unit (Sambrial Road)',
    phoneEnding: '3310',
    device: 'Apple MacBook Pro 14 M1 Pro',
    serialNumber: 'C02G998P-MD1',
    intakeDate: '23 Sep 2026, 02:00 PM',
    estimatedCompletion: '24 Sep 2026, 04:00 PM',
    currentStatus: 'ready',
    primaryTechnician: 'Bilal Ashraf (Senior PCB & Logic Board Engineer)',
    labLocation: 'Evonix Paris Road Lab, Sialkot',
    reportedFault: 'Green tea spill on trackpad and keyboard area. System shutting down after 3 minutes.',
    technicianNotes: 'Corrosion spotted near PMIC power management IC and keyboard backlight circuit. Ultrasonic cleaning performed. Three corroded 0201 pull-up resistors replaced and one trace jumpered with 0.02mm enameled wire.',
    benchReadings: {
      standbyCurrent: '0.008A (Clean standby draw)',
      vCoreStatus: 'PPBUS_G3H at rock-solid 12.6V',
      temperaturePeak: '58°C under Final Cut 4K playback',
      componentReplaced: '0201 Resistors + Micro-jumper on PP3V3_S2 trace'
    },
    stages: [
      {
        title: 'De-energize & Battery Disconnect',
        description: 'Battery disconnected immediately to prevent galvanic copper trace decay.',
        timestamp: '23 Sep, 02:15 PM',
        completed: true
      },
      {
        title: 'Microscope Inspection & Tracing',
        description: 'Found trace break on PP3V3_S2 logic rail under 40x stereo microscope.',
        timestamp: '23 Sep, 03:30 PM',
        completed: true
      },
      {
        title: 'Micro-Jumpering & Resistor Soldering',
        description: 'Restored broken circuit with 0.02mm insulated wire and UV curable solder mask.',
        timestamp: '23 Sep, 05:00 PM',
        completed: true
      },
      {
        title: 'Ultrasonic De-oxidation',
        description: '15-minute ultrasonic cycle in pure deionized chemical bath to prevent future corrosion.',
        timestamp: '24 Sep, 10:00 AM',
        completed: true
      },
      {
        title: 'Hardware Stress Test',
        description: 'Keyboard, trackpad, display, audio, and all Thunderbolt ports tested 100% functional.',
        timestamp: '24 Sep, 01:30 PM',
        completed: true
      },
      {
        title: 'QC Passed & Ready for Pick-Up',
        description: 'Ready at Paris Road Sialkot reception. Customer notified via WhatsApp.',
        timestamp: '24 Sep, 03:00 PM',
        completed: true
      }
    ]
  },
  {
    ticketId: 'EVX-9143',
    customerName: 'Mian Usman',
    companyName: 'Hilbro International Exporters (Small Industrial Estate)',
    phoneEnding: '5577',
    device: 'HP LaserJet Enterprise M608dn',
    serialNumber: 'HP-M608-SIE-401',
    intakeDate: '24 Sep 2026, 11:30 AM',
    estimatedCompletion: '25 Sep 2026, 12:00 PM',
    currentStatus: 'repairing',
    primaryTechnician: 'Engr. Hamza Tariq',
    labLocation: 'Evonix Industrial Field Workshop, Sialkot',
    reportedFault: 'Paper jam error 13.00.00 and heavy black lines on export shipping invoices.',
    technicianNotes: 'Fuser film sleeve torn due to paper clip staple damage. Lower pressure roller melted and pickup rollers worn out. Replaced OEM fuser film, pressure roller, and cleaned laser scanner mirror.',
    benchReadings: {
      standbyCurrent: '220V AC normal standby draw',
      vCoreStatus: 'Fuser temperature holding steady at 195°C',
      temperaturePeak: 'Heater ceramic assembly within OEM standard',
      componentReplaced: 'OEM Teflon Fuser Sleeve + High-heat Silicone Pressure Roller'
    },
    stages: [
      {
        title: 'Disassembly & Gear Train Inspection',
        description: 'Paper path disassembled and cleaned of powdered toner contamination.',
        timestamp: '11:45 AM',
        completed: true
      },
      {
        title: 'Fuser Unit Overhaul',
        description: 'Replaced Teflon sleeve with Japanese OEM grade heat film and high-temp silicone grease.',
        timestamp: '01:20 PM',
        completed: true
      },
      {
        title: 'Pickup Assembly & Separation Pad Renewal',
        description: 'Installed new rubber rollers for Tray 2 to eliminate paper feed slippage.',
        timestamp: '02:40 PM',
        completed: true
      },
      {
        title: 'High-Volume Print Run Verification',
        description: 'Currently running test print of 500 duplex export invoice sheets.',
        timestamp: 'In Progress',
        completed: false,
        current: true
      },
      {
        title: 'Packaging & Return Dispatch to Small Industrial Estate',
        description: 'Technician on-site return scheduled via Evonix dispatch van.',
        timestamp: 'Pending Final Run',
        completed: false
      }
    ]
  }
];

interface LiveRepairTrackerProps {
  onOpenQuote?: (serviceType: string) => void;
}

export const LiveRepairTracker: React.FC<LiveRepairTrackerProps> = ({ onOpenQuote }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<RepairJob>(SAMPLE_REPAIRS[0]);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    if (!query) return;

    const found = SAMPLE_REPAIRS.find(
      (job) =>
        job.ticketId.toUpperCase() === query ||
        job.phoneEnding === query ||
        job.serialNumber.toUpperCase().includes(query) ||
        job.customerName.toUpperCase().includes(query)
    );

    if (found) {
      setSelectedTicket(found);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };

  const selectSample = (job: RepairJob) => {
    setSelectedTicket(job);
    setSearchQuery(job.ticketId);
    setNotFound(false);
  };

  const getStatusBadge = (status: RepairJob['currentStatus']) => {
    switch (status) {
      case 'intake':
        return { label: 'Intake Registered', color: 'bg-slate-100 text-slate-700 border-slate-200' };
      case 'diagnosis':
        return { label: 'Microscope & Thermal Diagnostics', color: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'repairing':
        return { label: 'Active Micro-Soldering Bench', color: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'stress_test':
        return { label: '24-Hour Burn-In Stress Test', color: 'bg-purple-100 text-purple-800 border-purple-300 animate-pulse' };
      case 'ready':
        return { label: 'QC Passed & Ready for Pick-Up', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      default:
        return { label: 'In Lab', color: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  const currentBadge = getStatusBadge(selectedTicket.currentStatus);

  return (
    <section id="live-repair-tracker" className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-4 border border-red-200">
            <Wrench className="w-3.5 h-3.5" />
            <span>Evonix Hardware Lab RMA Portal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Live Repair Ticket & Bench Diagnostics Tracker
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Track your laptop, MacBook, motherboard, or industrial printer repair status in real-time. Transparent component logs, multimeter voltage readings, and thermal reports directly from our Sialkot workshop.
          </p>
        </div>

        {/* Search Bar & Fast Selector */}
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="relative flex items-center shadow-lg rounded-2xl bg-white border border-slate-300 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20 transition-all p-1.5">
            <Search className="w-5 h-5 text-slate-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (notFound) setNotFound(false);
              }}
              placeholder="Enter Ticket ID (e.g. EVX-7821) or last 4 digits of phone..."
              className="w-full px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer flex-shrink-0"
            >
              Track Ticket
            </button>
          </form>

          {/* Quick Click Samples */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-600">Sample active workshop jobs:</span>
            {SAMPLE_REPAIRS.map((job) => (
              <button
                key={job.ticketId}
                onClick={() => selectSample(job)}
                className={`px-2.5 py-1 rounded-lg border font-mono font-medium transition-all cursor-pointer ${
                  selectedTicket.ticketId === job.ticketId
                    ? 'bg-red-600 text-white border-red-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-red-300 hover:text-red-600'
                }`}
              >
                {job.ticketId} ({job.device.split(' ')[0]})
              </button>
            ))}
          </div>

          {notFound && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Ticket not found in current active queue.</p>
                <p className="mt-0.5 text-amber-700">
                  Please verify your ticket number from your printed intake receipt or SMS. You can also contact our Chief Hardware Specialist Engr. Hamza Tariq on WhatsApp at {COMPANY_INFO.contact.whatsappDisplay} for instant assistance.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Selected Ticket Active Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Top Ticket Status Bar */}
          <div className="p-6 sm:p-8 bg-slate-900 text-white border-b border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl sm:text-2xl font-black text-red-400">
                    {selectedTicket.ticketId}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentBadge.color}`}>
                    {currentBadge.label}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mt-1.5 text-slate-100">
                  {selectedTicket.device}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-2">
                  <span>Serial: <strong className="text-slate-300 font-mono">{selectedTicket.serialNumber}</strong></span>
                  <span>•</span>
                  <span>Client: <strong className="text-slate-200">{selectedTicket.customerName}</strong> {selectedTicket.companyName && `(${selectedTicket.companyName})`}</span>
                </p>
              </div>

              {/* Lab Location & Direct WhatsApp Support */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="text-left md:text-right text-xs text-slate-400">
                  <div className="text-slate-300 font-semibold flex items-center gap-1.5 md:justify-end">
                    <User className="w-3.5 h-3.5 text-red-400" />
                    <span>{selectedTicket.primaryTechnician}</span>
                  </div>
                  <div className="mt-0.5 text-slate-400 flex items-center gap-1.5 md:justify-end">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{selectedTicket.labLocation}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=${encodeURIComponent(`Assalam-o-Alaikum Engr. Hamza, I am inquiring about my Repair Ticket ${selectedTicket.ticketId} for ${selectedTicket.device}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all flex-shrink-0"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Technician</span>
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Progress Timeline */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span>Real-Time Bench Milestone Timeline</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Logged in chronological sequence as components pass micro-soldering and testing stages.
                </p>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {selectedTicket.stages.map((stage, idx) => {
                  const isDone = stage.completed;
                  const isCurrent = stage.current;

                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Circle Indicator */}
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-red-600 text-white animate-pulse'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>

                      <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-200/80 hover:border-slate-300 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h5 className={`text-xs sm:text-sm font-bold ${isCurrent ? 'text-red-700' : 'text-slate-900'}`}>
                            {stage.title}
                          </h5>
                          <span className="text-[11px] font-mono text-slate-500">
                            {stage.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reported Fault & Human Technician Review */}
              <div className="bg-red-50/60 rounded-2xl p-5 border border-red-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-red-900 uppercase tracking-wide">
                  <FileText className="w-4 h-4 text-red-600" />
                  <span>Workshop Engineering Log & Technician Report</span>
                </div>
                <div className="text-xs text-slate-700 space-y-1.5">
                  <p>
                    <strong className="text-slate-900">Client Initial Complaint:</strong> {selectedTicket.reportedFault}
                  </p>
                  <p>
                    <strong className="text-slate-900">Primary Technician Analysis:</strong> {selectedTicket.technicianNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Electrical Bench Telemetry & Warranty Card */}
            <div className="lg:col-span-5 space-y-6">
              {/* Telemetry Card */}
              <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-md border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Electrical Multimeter & Thermal Readings
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
                    Live Bench Data
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-slate-400">Standby Draw (19.5V Rail):</span>
                    <span className="font-mono font-bold text-amber-300">
                      {selectedTicket.benchReadings.standbyCurrent}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-slate-400">CPU VCore Stability:</span>
                    <span className="font-mono font-bold text-blue-300">
                      {selectedTicket.benchReadings.vCoreStatus}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    <span className="text-slate-400">Peak Thermal Load:</span>
                    <span className="font-mono font-bold text-emerald-300">
                      {selectedTicket.benchReadings.temperaturePeak}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 space-y-1">
                    <span className="text-slate-400 block text-[11px]">Hardware Silicon Replaced:</span>
                    <span className="font-mono font-bold text-red-300 text-xs block">
                      {selectedTicket.benchReadings.componentReplaced}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quality & Warranty Guarantee */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Evonix Lab Quality Guarantee</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>90-Day Written Warranty:</strong> All micro-soldered components and power ICs carry a full 90-day warranty.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Original OEM Silicon Only:</strong> We import authentic Texas Instruments, Vishay, and Richtek chips.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>No Fix, No Fee Policy:</strong> If a motherboard is diagnosed as unrepairable, diagnosis at workshop is 100% free.</span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-slate-200">
                  <button
                    onClick={() => onOpenQuote?.('Hardware Laptop Repair Intake')}
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Submit New Laptop For Repair</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
