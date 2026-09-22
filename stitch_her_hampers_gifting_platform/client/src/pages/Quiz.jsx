import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const aestheticOptions = [
  { key: 'cozy', emoji: '🧸', label: 'Cute & Cozy', desc: 'Soft knits, warm amber mugs & soothing scents', bgColor: 'bg-primary-fixed' },
  { key: 'chic', emoji: '✨', label: 'Chic & Elegant', desc: 'Rose gold trinkets, champagne hues & macarons', bgColor: 'bg-secondary-fixed' },
  { key: 'glow', emoji: '🌸', label: 'Self-Care & Glow', desc: 'Botanical bath soaks, rose mists & jade rolls', bgColor: 'bg-tertiary-fixed' },
  { key: 'dreamer', emoji: '📖', label: 'Desk & Dreamer', desc: 'Gold-foil journal, artisanal pen & mood tea', bgColor: 'bg-surface-variant' },
];

const budgetOptions = ['₹999', '₹1,499', '₹1,800+ ✨'];

export default function Quiz() {
  const [selectedVibe, setSelectedVibe] = useState('cozy');
  const [selectedBudget, setSelectedBudget] = useState(2);
  const [recommendation, setRecommendation] = useState(null);
  const [noteText, setNoteText] = useState('Happy Birthday to my favourite confidante & sister! 🌸');

  useEffect(() => {
    fetch(`${API_URL}/quiz/recommend?recipient=bestfriend&occasion=birthday&vibe=${selectedVibe}&budget=2500`)
      .then(res => res.json())
      .then(data => setRecommendation(data))
      .catch(() => setRecommendation(null));
  }, [selectedVibe]);

  return (
    <div className="px-margin space-y-space-lg">
      {/* Quiz Header & Step Tracker */}
      <div className="flex flex-col space-y-space-sm">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-widest shadow-sm">
            <span className="material-symbols-outlined text-[15px]">magic_button</span>
            Gift Concierge Quiz
          </span>
          <span className="font-label-md text-label-md text-primary font-medium">Step 3 of 4</span>
        </div>

        {/* Progress Track */}
        <div className="flex flex-col space-y-1.5">
          <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary transition-all duration-700 ease-out shadow-[0_0_12px_rgba(158,56,78,0.4)]"
              style={{ width: '75%' }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm">
            <span>75% Completed</span>
            <span className="text-tertiary font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">award_star</span> Almost ready!
            </span>
          </div>
        </div>

        {/* Previous Answers */}
        <div className="flex flex-wrap gap-space-xs pt-1">
          {[
            { label: 'For:', value: 'Best Friend 👯' },
            { label: 'Occasion:', value: 'Birthday 🎂' },
          ].map((answer) => (
            <button key={answer.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-[0_4px_16px_-2px_rgba(72,52,65,0.04)] text-on-surface font-label-sm text-label-sm transition-transform active:scale-95">
              <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="text-on-surface-variant">{answer.label}</span>
              <span className="font-bold text-primary">{answer.value}</span>
              <span className="material-symbols-outlined text-[13px] text-outline opacity-60 ml-0.5">edit</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Question Card */}
      <div className="rounded-lg bg-surface-container-lowest p-space-md shadow-[0_8px_24px_-4px_rgba(72,52,65,0.05),0_16px_36px_0_rgba(217,101,123,0.08)] flex flex-col space-y-space-md">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[16px]">sentiment_satisfied</span>
            <span>Her Personality</span>
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            What's her signature aesthetic or vibe?
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            We curate artisanal treats, keepsake jewelry &amp; textures to match her heart.
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-2.5">
          {aestheticOptions.map((opt) => {
            const isSelected = selectedVibe === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setSelectedVibe(opt.key)}
                className={`relative w-full text-left rounded-2xl p-space-sm flex items-center justify-between gap-space-sm transition-all active:scale-[0.99] ${
                  isSelected
                    ? 'bg-surface-container-high/60 shadow-[0_4px_16px_rgba(158,56,78,0.12)]'
                    : 'bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-12 h-12 rounded-xl ${opt.bgColor} flex items-center justify-center shrink-0 shadow-inner`}>
                    <span className="text-2xl">{opt.emoji}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-label-lg text-label-lg ${isSelected ? 'text-primary font-bold' : 'text-on-surface font-semibold'} truncate`}>
                        {opt.label}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-label-sm font-bold uppercase tracking-wider">
                          Her Match
                        </span>
                      )}
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">{opt.desc}</p>
                  </div>
                </div>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-primary shadow-md' : 'bg-surface-container-highest'
                }`}>
                  {isSelected ? (
                    <span className="material-symbols-outlined text-[16px] text-on-primary font-bold">check</span>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Budget Selector */}
        <div className="pt-2 flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-tertiary">payments</span>
              Target Budget
            </span>
            <span className="font-label-sm text-label-sm text-primary font-bold bg-primary-fixed px-2 py-0.5 rounded-full">Flexible</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {budgetOptions.map((budget, i) => (
              <button
                key={budget}
                onClick={() => setSelectedBudget(i)}
                className={`py-2.5 px-2 rounded-xl font-label-md text-label-md text-center transition-all ${
                  selectedBudget === i
                    ? 'bg-primary text-on-primary font-bold shadow-md shadow-primary/20'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {budget}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Match Banner */}
      <div className="rounded-xl bg-surface-container-high p-space-sm flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-label-md text-label-md text-on-surface font-semibold truncate">Curating with Handcrafted Details</span>
          <p className="font-body-sm text-body-sm text-on-surface-variant truncate">Includes personalized calligraphed wax-sealed letter 💌</p>
        </div>
      </div>

      {/* Recommendation Card */}
      {recommendation && (
        <div className="relative rounded-lg bg-surface-container-lowest p-space-md shadow-[0_8px_24px_-4px_rgba(72,52,65,0.06),0_16px_36px_0_rgba(217,101,123,0.12)] flex flex-col space-y-space-md overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-fixed/40 rounded-full blur-2xl pointer-events-none"></div>
          
          {/* Match Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h3 className="font-headline-sm text-headline-sm text-primary">We Found Her Match!</h3>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold shadow-sm">
              <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              {recommendation.recommendation.matchScore}% Match
            </span>
          </div>

          {/* Product Image */}
          <div className="relative rounded-2xl bg-surface-container-low overflow-hidden flex flex-col">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
              <img
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                alt={recommendation.recommendation.name}
                src={recommendation.recommendation.image}
              />
              <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm shadow-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[14px]">local_florist</span>
                <span>Artisan Box Edition</span>
              </div>
              <button className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary flex items-center justify-center shadow-md active:scale-90 transition-transform">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </button>
            </div>

            {/* Details */}
            <div className="p-space-md flex flex-col space-y-space-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col min-w-0">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface truncate">{recommendation.recommendation.name}</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                    For your Bestie • Birthday Bliss Collection
                  </p>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <div className="flex items-baseline gap-1">
                    <span className="font-currency-md text-currency-md text-primary font-bold text-lg">₹{recommendation.recommendation.price?.toLocaleString('en-IN')}</span>
                    <span className="font-label-sm text-label-sm text-outline line-through">₹{recommendation.recommendation.originalPrice?.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                    Save ₹{((recommendation.recommendation.originalPrice || 0) - (recommendation.recommendation.price || 0)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Why She'll Love It */}
              <div className="rounded-xl bg-surface-container-high/70 p-2.5 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">psychology_alt</span>
                <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                  <strong className="font-semibold text-primary">Why She'll Adore This:</strong> {recommendation.recommendation.whyShellLove}
                </p>
              </div>

              {/* Inclusions */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {recommendation.recommendation.inclusions?.map((inc, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm ${
                      inc.highlight
                        ? 'bg-secondary-fixed text-on-secondary-fixed font-semibold'
                        : 'bg-surface-container-lowest text-on-surface-variant'
                    }`}
                  >
                    {inc.emoji} {inc.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Handwritten Note */}
          <div className="rounded-2xl bg-surface-container-low p-space-sm flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-on-surface font-label-md text-label-md font-semibold cursor-pointer">
                <span className="material-symbols-outlined text-secondary text-[18px]">history_edu</span>
                Handwritten Note for Her
              </label>
              <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Free With Box</span>
            </div>
            <div className="relative">
              <input
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest transition-colors placeholder:text-outline"
                placeholder="Happy Birthday to the most radiant human! Love, Me ✨"
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <div className="absolute right-2.5 top-2.5 w-6 h-6 rounded-full bg-primary-container/20 flex items-center justify-center pointer-events-none">
                <span className="material-symbols-outlined text-[14px] text-primary">draw</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col space-y-2 pt-1">
            <button className="relative w-full h-14 rounded-full bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(158,56,78,0.35)] transition-all active:scale-[0.98] hover:bg-primary-container">
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span>Add to Bag &amp; Personalize</span>
              <span className="font-currency-md text-currency-md text-on-primary ml-1">• ₹{recommendation.recommendation.price?.toLocaleString('en-IN')}</span>
            </button>
            <div className="flex items-center justify-between pt-1">
              <button className="px-4 py-2 rounded-full text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[15px]">refresh</span>
                Retake Quiz
              </button>
              <button className="px-4 py-2 rounded-full text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1 hover:underline">
                <span>See 3 Alternative Matches</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trust & Delivery Banner */}
      <div className="rounded-2xl bg-surface-container-low p-space-sm flex items-center justify-around text-center">
        {[
          { icon: 'inventory_2', label: 'Keepsake Box', color: 'text-primary' },
          { icon: 'local_shipping', label: 'Express 24-48h', color: 'text-secondary' },
          { icon: 'verified', label: '100% Delight', color: 'text-tertiary' },
        ].map((trust, i) => (
          <div key={trust.label} className="flex flex-col items-center gap-0.5">
            {i > 0 && <div className="w-px h-6 bg-outline-variant/50 absolute"></div>}
            <span className={`material-symbols-outlined ${trust.color} text-[20px]`}>{trust.icon}</span>
            <span className="font-label-sm text-[10px] text-on-surface font-semibold">{trust.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
