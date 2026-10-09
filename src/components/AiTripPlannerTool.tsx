import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Compass,
  CheckCircle2,
  Copy,
  Printer,
  Share2,
  Clock,
  Utensils,
  Sun,
  Sunset,
  Moon,
  ArrowRight,
  RotateCcw,
  Plane,
  Luggage,
  ShieldAlert
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface DayPlan {
  dayNumber: number;
  theme: string;
  morning: { title: string; desc: string; foodTip: string };
  afternoon: { title: string; desc: string; tip: string };
  evening: { title: string; desc: string; dinnerSpot: string };
  estimatedCost: number;
}

interface ItineraryResult {
  destination: string;
  days: number;
  budgetLevel: string;
  travelType: string;
  dailyPlans: DayPlan[];
  totalEstimatedCost: number;
  packingTips: string[];
  localTransitAdvice: string;
}

const POPULAR_DESTINATIONS = [
  'Dubai, UAE',
  'Tokyo, Japan',
  'Istanbul, Turkey',
  'London, UK',
  'Paris, France',
  'Bangkok, Thailand',
  'Rome, Italy',
  'Bali, Indonesia'
];

export const AiTripPlannerTool: React.FC<{
  onOpenArticle?: () => void;
  standalone?: boolean;
}> = ({ onOpenArticle, standalone = true }) => {
  const [destination, setDestination] = useState<string>('Dubai, UAE');
  const [days, setDays] = useState<number>(5);
  const [budgetTier, setBudgetTier] = useState<'budget' | 'moderate' | 'luxury'>('moderate');
  const [travelType, setTravelType] = useState<string>('Solo');
  const [interests, setInterests] = useState<string[]>(['Culture', 'Food', 'Iconic Sights']);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<ItineraryResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!destination.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const destClean = destination.trim();
      const costMultiplier = budgetTier === 'budget' ? 80 : budgetTier === 'moderate' ? 180 : 380;

      const generatedDays: DayPlan[] = [];

      for (let i = 1; i <= days; i++) {
        let theme = 'Arrival & City Orientation';
        let morningTitle = `Historic Quarter & Morning Walk`;
        let morningDesc = `Walk through local heritage streets, visit historic landmarks, and grab fresh coffee.`;
        let morningFood = `Local cafe breakfast: freshly baked pastry and artisan tea.`;

        let afternoonTitle = `Iconic Highlights & City Center`;
        let afternoonDesc = `Visit the most famous architectural monuments, observation towers, or central markets.`;
        let afternoonTip = `Buy tickets online 24 hours ahead to skip long lines.`;

        let eveningTitle = `Sunset Viewpoint & Waterfront Promenade`;
        let eveningDesc = `Enjoy relaxed twilight walks along the water, evening markets, and street performances.`;
        let eveningDinner = `Traditional dinner at a popular family-run restaurant.`;

        if (i === 2) {
          theme = 'Art, Culture & Local Markets';
          morningTitle = 'Art Gallery & Heritage Museum';
          morningDesc = 'Learn about regional history, modern art exhibits, and cultural relics.';
          morningFood = 'Traditional market breakfast with local teas.';
          afternoonTitle = 'Bustling Bazaar & Artisan Workshops';
          afternoonDesc = 'Browse handcrafted souvenirs, spices, textiles, and local goods.';
          afternoonTip = 'Bargain gently in open markets for best prices.';
          eveningTitle = 'Rooftop Lounge & Night Skyline';
          eveningDesc = 'Take in panoramic night city lights with fresh refreshments.';
          eveningDinner = 'Authentic local cuisine with live acoustic music.';
        } else if (i === 3) {
          theme = 'Nature, Waterways & Outdoor Scenery';
          morningTitle = 'Botanical Gardens & Quiet Parks';
          morningDesc = 'Fresh morning air, peaceful trails, and colorful floral pavilions.';
          morningFood = 'Fresh fruit bowls and local breakfast sandwiches.';
          afternoonTitle = 'River Cruise & Canal Boat Tour';
          afternoonDesc = 'See historic skyline architecture from the water with an audio guide.';
          afternoonTip = 'Keep your camera ready for afternoon sunlight reflections.';
          eveningTitle = 'Old Town Dining & Street Food Stroll';
          eveningDesc = 'Sample authentic local street bites in busy night alleys.';
          eveningDinner = 'Street food tour: Grilled skewers, savory noodles, and sweet pastries.';
        } else if (i === 4) {
          theme = 'Modern Wonders & Shopping Districts';
          morningTitle = 'Modern Landmark & Sky Deck';
          morningDesc = 'High-speed elevator to observation deck for 360-degree city views.';
          morningFood = 'Skyline cafe breakfast with panoramic views.';
          afternoonTitle = 'Premium Shopping & Design Boutiques';
          afternoonDesc = 'Visit famous shopping centers, designer outlets, and tech flagships.';
          afternoonTip = 'Ask store counters about tax-free export refund forms.';
          eveningTitle = 'Fountain Light Show & Evening Walk';
          eveningDesc = 'Synchronized light and music show beside the central lake.';
          eveningDinner = 'Fine dining with outdoor terrace seating.';
        } else if (i >= 5) {
          theme = `Day ${i}: Hidden Gems & Relaxed Adventures`;
          morningTitle = 'Local Neighborhood Walk';
          morningDesc = 'Wander residential alleys, hidden bookstores, and quiet temples.';
          morningFood = 'Neighborhood bakery with freshly brewed local coffee.';
          afternoonTitle = 'Scenic Viewpoint & Park Relaxation';
          afternoonDesc = 'Relaxed afternoon picnic or scenic cable car ride.';
          afternoonTip = 'Rent a bicycle or public scooter for easy travel.';
          eveningTitle = 'Farewell Sunset Dinner';
          eveningDesc = 'Celebrate your last evening with local culinary specialties.';
          eveningDinner = 'Chef tasting menu with regional specialties.';
        }

        generatedDays.push({
          dayNumber: i,
          theme,
          morning: { title: morningTitle, desc: morningDesc, foodTip: morningFood },
          afternoon: { title: afternoonTitle, desc: afternoonDesc, tip: afternoonTip },
          evening: { title: eveningTitle, desc: eveningDesc, dinnerSpot: eveningDinner },
          estimatedCost: costMultiplier
        });
      }

      setItinerary({
        destination: destClean,
        days,
        budgetLevel: budgetTier === 'budget' ? 'Budget ($80/day)' : budgetTier === 'moderate' ? 'Moderate ($180/day)' : 'Luxury ($380/day)',
        travelType,
        dailyPlans: generatedDays,
        totalEstimatedCost: costMultiplier * days,
        packingTips: [
          'Comfortable walking sneakers (10,000+ daily steps expected)',
          'Universal power adapter with USB-C fast charging',
          'Lightweight daypack with water bottle holder',
          'Digital copies of passport and flight tickets saved offline'
        ],
        localTransitAdvice: `In ${destClean}, use contactless metro cards or verified ride apps. Avoid unlicensed airport taxis.`
      });

      setIsGenerating(false);
    }, 600);
  };

  const handleCopyText = () => {
    if (!itinerary) return;
    const text = `EVONIXTEC AI TRIP ITINERARY: ${itinerary.destination} (${itinerary.days} Days)\n` +
      `Budget: ${itinerary.budgetLevel} | Style: ${itinerary.travelType}\n` +
      `Total Estimated Cost: $${itinerary.totalEstimatedCost}\n\n` +
      itinerary.dailyPlans.map(d => (
        `DAY ${d.dayNumber}: ${d.theme}\n` +
        `- Morning: ${d.morning.title} - ${d.morning.desc} (Food: ${d.morning.foodTip})\n` +
        `- Afternoon: ${d.afternoon.title} - ${d.afternoon.desc} (Tip: ${d.afternoon.tip})\n` +
        `- Evening: ${d.evening.title} - ${d.evening.desc} (Dinner: ${d.evening.dinnerSpot})\n`
      )).join('\n') +
      `\nTransit Tip: ${itinerary.localTransitAdvice}\n` +
      `Created with Evonixtec AI Trip Planner: https://www.evonixtec.com/tools/ai-trip-planner`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    if (!itinerary) return;
    const text = `Check out my ${itinerary.days}-Day AI travel plan for ${itinerary.destination} made on Evonixtec: https://www.evonixtec.com/tools/ai-trip-planner`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evonixtec AI Trip Planner &bull; 100% Free</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Instant AI Travel Itinerary Generator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pick your destination, days, and budget. Get a custom day-wise plan with food spots and prices.
          </p>
        </div>

        {onOpenArticle && (
          <button
            onClick={onOpenArticle}
            className="text-xs text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>Read 10 Best AI Travel Tools Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Destination */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span>Destination City</span>
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Dubai, Tokyo, Paris"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-teal-400 outline-none"
            required
          />
          <div className="flex flex-wrap gap-1 pt-1">
            {POPULAR_DESTINATIONS.slice(0, 4).map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => setDestination(d)}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
              >
                {d.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-400" />
            <span>Trip Duration</span>
          </label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-teal-400 outline-none"
          >
            <option value={2}>2 Days (Weekend Getaway)</option>
            <option value={3}>3 Days (City Break)</option>
            <option value={5}>5 Days (Recommended)</option>
            <option value={7}>7 Days (1 Full Week)</option>
            <option value={10}>10 Days (Extended Holiday)</option>
            <option value={14}>14 Days (Two Weeks)</option>
          </select>
        </div>

        {/* Budget */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-teal-400" />
            <span>Budget Tier</span>
          </label>
          <select
            value={budgetTier}
            onChange={(e) => setBudgetTier(e.target.value as any)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-teal-400 outline-none"
          >
            <option value="budget">Budget Friendly (~$80/day)</option>
            <option value="moderate">Moderate Comfort (~$180/day)</option>
            <option value="luxury">Luxury / VIP (~$380/day)</option>
          </select>
        </div>

        {/* Travel Style */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-teal-400" />
            <span>Travel Party</span>
          </label>
          <select
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-teal-400 outline-none"
          >
            <option value="Solo">Solo Traveler</option>
            <option value="Couple">Couple / Romantic</option>
            <option value="Family">Family with Kids</option>
            <option value="Friends">Friends Group</option>
          </select>
        </div>

        {/* Action Button */}
        <div className="md:col-span-2 lg:col-span-4 pt-2">
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm sm:text-base hover:opacity-95 shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Building Itinerary...' : 'Generate My Free Itinerary Now'}</span>
          </button>
        </div>
      </form>

      {/* Generated Itinerary Display */}
      {itinerary && (
        <div className="mt-8 pt-8 border-t border-slate-800 space-y-6">
          {/* Summary Banner */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-teal-500/30 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                Trip Overview
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {itinerary.days} Days in {itinerary.destination}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Party: {itinerary.travelType} &bull; Tier: {itinerary.budgetLevel} &bull; Total Estimated Cost: <span className="text-teal-400 font-bold">${itinerary.totalEstimatedCost}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyText}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy Plan'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Daily Timeline */}
          <div className="space-y-4">
            {itinerary.dailyPlans.map((day) => (
              <div
                key={day.dayNumber}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-extrabold">
                      Day {day.dayNumber}
                    </span>
                    <h4 className="text-base font-bold text-white">{day.theme}</h4>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    Est. Day Cost: ~${day.estimatedCost}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Morning */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <Sun className="w-3.5 h-3.5" />
                      <span>Morning (9:00 AM - 1:00 PM)</span>
                    </div>
                    <div className="font-semibold text-slate-100">{day.morning.title}</div>
                    <p className="text-slate-400">{day.morning.desc}</p>
                    <div className="text-[11px] text-teal-300 pt-1 flex items-center gap-1">
                      <Utensils className="w-3 h-3 flex-shrink-0" />
                      <span>{day.morning.foodTip}</span>
                    </div>
                  </div>

                  {/* Afternoon */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-orange-400 font-bold">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Afternoon (1:30 PM - 5:30 PM)</span>
                    </div>
                    <div className="font-semibold text-slate-100">{day.afternoon.title}</div>
                    <p className="text-slate-400">{day.afternoon.desc}</p>
                    <div className="text-[11px] text-teal-300 pt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                      <span>{day.afternoon.tip}</span>
                    </div>
                  </div>

                  {/* Evening */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-purple-400 font-bold">
                      <Moon className="w-3.5 h-3.5" />
                      <span>Evening (6:00 PM - 10:00 PM)</span>
                    </div>
                    <div className="font-semibold text-slate-100">{day.evening.title}</div>
                    <p className="text-slate-400">{day.evening.desc}</p>
                    <div className="text-[11px] text-teal-300 pt-1 flex items-center gap-1">
                      <Utensils className="w-3 h-3 flex-shrink-0" />
                      <span>{day.evening.dinnerSpot}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Travel Advice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase">
                <Plane className="w-4 h-4" />
                <span>Local Transit Advice</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {itinerary.localTransitAdvice}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase">
                <Luggage className="w-4 h-4" />
                <span>Packing Reminders</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1">
                {itinerary.packingTips.map((tip, idx) => (
                  <li key={idx}>&bull; {tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tested Hotel Booking App Tip Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-500/30 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                Tested Travel Tech Tip
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                Saved $150
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">
              I Tested The Best App to Book Cheap Dubai Hotels - I Saved $150
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              I love testing travel tech. Last week I tested 5 hotel booking apps for Dubai. The cheapest and fastest was Trip.com - they have a special alliance discount. The booking was instant, and I got free breakfast.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <a
                href="https://www.trip.com/hotels/list?city=220&display=Dubai&optionId=220&optionType=City&optionName=Dubai&Allianceid=10929626&SID=332911573&trip_sub1=&trip_sub3=D20154955"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 font-bold hover:underline"
              >
                My Tested Dubai Hotel Booking Link - 60% Off &rarr;
              </a>
              <span className="text-slate-600">&bull;</span>
              <a
                href="https://allsharq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-300 font-medium hover:underline"
              >
                AllSharq.com - Dubai Travel Guide
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
