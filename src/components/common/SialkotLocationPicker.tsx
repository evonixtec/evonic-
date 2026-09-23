import React, { useState } from 'react';
import { MapPin, Navigation, Compass, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export interface SialkotArea {
  id: string;
  name: string;
  category: 'Commercial Hub' | 'Industrial & Export' | 'Cantt & Residential' | 'Peripheral';
  lat: number;
  lng: number;
  landmark: string;
  description: string;
}

export const SIALKOT_AREAS: SialkotArea[] = [
  {
    id: 'paris-road',
    name: 'Paris Road & City Center',
    category: 'Commercial Hub',
    lat: 32.4945,
    lng: 74.5229,
    landmark: 'Chamber of Commerce & Banking Strip',
    description: 'Central business & corporate offices zone.',
  },
  {
    id: 'sialkot-cantt',
    name: 'Sialkot Cantt & Saddar',
    category: 'Cantt & Residential',
    lat: 32.5100,
    lng: 74.5450,
    landmark: 'Mall Road, Garrison & Saddar Bazar',
    description: 'High-security commercial & executive residential sector.',
  },
  {
    id: 'small-industrial-estate',
    name: 'Small Industrial Estate (SIE 1 & 2)',
    category: 'Industrial & Export',
    lat: 32.4800,
    lng: 74.5500,
    landmark: 'Export Manufacturing Units & Tanneries',
    description: 'Prime hub for sports, surgical & leather manufacturers.',
  },
  {
    id: 'defense-road',
    name: 'Defense Road & Kashmir Road',
    category: 'Commercial Hub',
    lat: 32.5200,
    lng: 74.5300,
    landmark: 'Modern Commercial Plazas & Tech Outlets',
    description: 'Rapidly growing IT, retail & corporate boulevard.',
  },
  {
    id: 'daska-road',
    name: 'Daska Road & Fatehgarh',
    category: 'Industrial & Export',
    lat: 32.4600,
    lng: 74.5100,
    landmark: 'Industrial Warehousing & Auto Hub',
    description: 'Logistics corridors and major export factories.',
  },
  {
    id: 'sambrial-dryport',
    name: 'Sambrial & Dry Port Area',
    category: 'Industrial & Export',
    lat: 32.4700,
    lng: 74.3500,
    landmark: 'Sialkot Dry Port & Export Cargo Terminal',
    description: 'Customs clearing, freight forwarders & airport vicinity.',
  },
  {
    id: 'rangpura',
    name: 'Rangpura & Circular Road',
    category: 'Commercial Hub',
    lat: 32.4900,
    lng: 74.5400,
    landmark: 'Wholesale Bazaars & Retail Shops',
    description: 'High-density retail markets & trading houses.',
  },
  {
    id: 'ugoki',
    name: 'Ugoki & Wazirabad Road',
    category: 'Peripheral',
    lat: 32.5400,
    lng: 74.4500,
    landmark: 'Machinery Engineering & Cutlery Corridor',
    description: 'Heavy machinery and metal fabrication units.',
  },
  {
    id: 'hunter-pura',
    name: 'Hunter Pura & Model Town',
    category: 'Cantt & Residential',
    lat: 32.4950,
    lng: 74.5350,
    landmark: 'Medical Clinics, Schools & Plazas',
    description: 'Medical practices, schools and residential enclaves.',
  },
  {
    id: 'gohadpur',
    name: 'Gohadpur & Airport Road',
    category: 'Peripheral',
    lat: 32.5300,
    lng: 74.5600,
    landmark: 'Sialkot International Airport Road',
    description: 'Direct route to SIAL airport and upcoming logistics parks.',
  },
];

interface SialkotLocationPickerProps {
  value: string;
  onChange: (areaName: string, gpsData?: { lat: number; lng: number; detected: boolean }) => void;
  required?: boolean;
}

export const SialkotLocationPicker: React.FC<SialkotLocationPickerProps> = ({
  value,
  onChange,
  required = false,
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [sensorStatus, setSensorStatus] = useState<'idle' | 'success' | 'outside' | 'error'>('idle');
  const [detectedCoords, setDetectedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [showMiniMap, setShowMiniMap] = useState(false);

  // Haversine formula distance calculation in kilometers
  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleAutoDetectLocation = () => {
    if (!navigator.geolocation) {
      setSensorStatus('error');
      return;
    }

    setIsDetecting(true);
    setSensorStatus('idle');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setDetectedCoords({ lat: latitude, lng: longitude });

        // Find nearest Sialkot area
        let nearestArea = SIALKOT_AREAS[0];
        let minDistance = Number.MAX_VALUE;

        SIALKOT_AREAS.forEach((area) => {
          const dist = calculateDistanceKm(latitude, longitude, area.lat, area.lng);
          if (dist < minDistance) {
            minDistance = dist;
            nearestArea = area;
          }
        });

        setIsDetecting(false);

        // If distance is within 35km of Sialkot center, it's inside Sialkot District
        if (minDistance <= 35) {
          setSensorStatus('success');
          const areaLabel = `${nearestArea.name} (GPS Auto-Detected)`;
          onChange(areaLabel, { lat: latitude, lng: longitude, detected: true });
        } else {
          // Outside Sialkot (e.g. testing in simulator or other city)
          setSensorStatus('outside');
          // Still assign closest Sialkot Hub or allow manual selection
          const areaLabel = `${nearestArea.name} [Detected via GPS ~${Math.round(minDistance)}km]`;
          onChange(areaLabel, { lat: latitude, lng: longitude, detected: true });
        }
      },
      (error) => {
        console.warn('Geolocation error:', error.message);
        setIsDetecting(false);
        setSensorStatus('error');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSelectArea = (area: SialkotArea) => {
    onChange(area.name, { lat: area.lat, lng: area.lng, detected: false });
    setSensorStatus('idle');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-red-600" />
          <span>Sialkot Location / Area *</span>
        </label>

        {/* Automatic GPS Sensor Trigger Button */}
        <button
          type="button"
          onClick={handleAutoDetectLocation}
          disabled={isDetecting}
          className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer shadow-2xs ${
            isDetecting
              ? 'bg-red-50 text-red-700 border-red-200 animate-pulse'
              : 'bg-white hover:bg-red-50 text-red-600 hover:text-red-700 border-red-200'
          }`}
          title="Detect my current location via GPS sensor"
        >
          <Navigation className={`w-3 h-3 ${isDetecting ? 'animate-spin' : ''}`} />
          <span>{isDetecting ? 'Sensing GPS...' : 'Auto-Detect Location (GPS)'}</span>
        </button>
      </div>

      {/* Main Input Field */}
      <div className="relative">
        <input
          type="text"
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Paris Road, Small Industrial Estate, Sialkot Cantt..."
          className="w-full pl-3.5 pr-24 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 shadow-2xs"
        />

        <button
          type="button"
          onClick={() => setShowMiniMap(!showMiniMap)}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-[10px] font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
        >
          {showMiniMap ? 'Hide Map' : '🗺️ Area Map'}
        </button>
      </div>

      {/* Sensor feedback alerts */}
      {sensorStatus === 'success' && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span>GPS Sensor successfully pinpointed your Sialkot district!</span>
        </div>
      )}

      {sensorStatus === 'outside' && (
        <div className="flex items-start gap-1.5 text-xs text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
          <Compass className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
          <span>Sensor active. Linked to nearest Sialkot industrial hub. You can also pick an exact zone below.</span>
        </div>
      )}

      {sensorStatus === 'error' && (
        <div className="flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <span>GPS permission needed or unavailable. Please click your area below.</span>
        </div>
      )}

      {/* Interactive Mini Map & District Grid */}
      <div className="pt-1">
        <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-1.5">
          <span>Popular Sialkot Districts & Industrial Zones:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {SIALKOT_AREAS.slice(0, 7).map((area) => {
            const isSelected = value.toLowerCase().includes(area.name.toLowerCase().split('&')[0].trim());
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => handleSelectArea(area)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-medium ${
                  isSelected
                    ? 'bg-red-600 text-white border-red-600 shadow-2xs font-bold'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {area.name.split('&')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Collapsible Stylized Interactive Sialkot Area Vector Map */}
      {showMiniMap && (
        <div className="mt-2.5 p-3.5 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold text-slate-200">Sialkot District Operational Grid</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">32.49° N, 74.53° E</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SIALKOT_AREAS.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() => handleSelectArea(area)}
                className="p-2 text-left rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 hover:border-red-500/80 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white group-hover:text-red-400 transition-colors truncate">
                    {area.name}
                  </span>
                  <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {area.landmark}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
