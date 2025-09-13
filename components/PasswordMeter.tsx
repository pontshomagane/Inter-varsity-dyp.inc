import React from 'react';
import type { PasswordStrengthLevel } from '../types';

interface PasswordMeterProps {
  score: number;
  strengthLevel: PasswordStrengthLevel;
}

const PasswordMeter: React.FC<PasswordMeterProps> = ({ score, strengthLevel }) => {
  const getBarColor = (score: number) => {
    if (score < 20) return 'bg-red-500';
    if (score < 40) return 'bg-orange-500';
    if (score < 60) return 'bg-yellow-500';
    if (score < 80) return 'bg-blue-500';
    if (score < 95) return 'bg-green-500';
    return 'bg-emerald-500';
  };

  const getBarWidth = (score: number) => {
    return Math.max(score, 5); // Minimum 5% width for visibility
  };

  return (
    <div className="space-y-3">
      {/* Strength Level Display */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-300">Password Strength:</span>
        <span className={`text-lg font-bold ${strengthLevel.color}`}>
          {strengthLevel.name}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out ${getBarColor(score)}`}
          style={{ width: `${getBarWidth(score)}%` }}
        />
      </div>

      {/* Score Display */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Score: {score}/100</span>
        <span className="text-gray-400">{strengthLevel.description}</span>
      </div>

      {/* Visual Feedback */}
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          {[0, 1, 2, 3, 4].map((level) => {
            const isActive = score >= (level + 1) * 20;
            return (
              <div
                key={level}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  isActive ? getBarColor(score) : 'bg-slate-600'
                }`}
              />
            );
          })}
        </div>
        <span className="text-xs text-gray-400 ml-2">
          {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good!' : score >= 40 ? 'Fair' : 'Needs improvement'}
        </span>
      </div>
    </div>
  );
};

export default PasswordMeter;
