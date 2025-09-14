
import React from 'react';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const circumference = 2 * Math.PI * 52; // 2 * pi * radius
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = (value: number) => {
    if (value < 40) return 'text-red-500';
    if (value < 75) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getStrokeColor = (value: number) => {
    if (value < 40) return 'stroke-red-500';
    if (value < 75) return 'stroke-yellow-400';
    return 'stroke-green-400';
  }

  return (
    <div className="relative w-48 h-48" role="img" aria-label={`Security score: ${score} out of 100`}>
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle
          className="stroke-slate-200 dark:stroke-slate-700"
          strokeWidth="10"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
        />
        <circle
          className={`transition-all duration-1000 ease-in-out ${getStrokeColor(score)}`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}</span>
        <span className="text-sm text-slate-500 dark:text-slate-400">Score</span>
      </div>
    </div>
  );
};

export default ScoreGauge;