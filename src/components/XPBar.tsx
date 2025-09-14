
import React from 'react';

interface XPBarProps {
  currentXp: number;
  minXp: number;
  maxXp: number;
}

const XPBar: React.FC<XPBarProps> = ({ currentXp, minXp, maxXp }) => {
  const xpInLevel = currentXp - minXp;
  const levelXpRange = maxXp - minXp;
  const progressPercentage = levelXpRange > 0 ? (xpInLevel / levelXpRange) * 100 : 100;

  return (
    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 relative overflow-hidden border border-slate-300 dark:border-slate-600">
      <div
        className="bg-cyan-500 h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
       <div 
        className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/40 to-cyan-400/0 w-1/4 animate-pulse-fast"
        style={{ animation: 'shimmer 2s infinite', left: `${progressPercentage - 10}%` }}
      ></div>
    </div>
  );
};

// Add a custom animation to tailwind.config.js if you have one, or use inline style for simple animations
// For this single-file setup, we can use CSS-in-JS or just rely on a simple pulse.
// For a better look, a custom animation is great. For now we will create a fake shimmer with gradients.
// FIX: Add default export for the XPBar component.
export default XPBar;