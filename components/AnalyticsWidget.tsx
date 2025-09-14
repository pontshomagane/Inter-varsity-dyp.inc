import React from 'react';
import type { ChallengeCategory } from '../types';

interface AnalyticsWidgetProps {
  challenges: ChallengeCategory[];
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ challenges }) => {
    const totalXP = challenges.reduce((acc, c) => acc + c.content.tasks.reduce((tAcc, t) => t.completed ? tAcc + t.points : tAcc, 0), 0);
    const completedChallenges = challenges.filter(c => c.content.tasks.every(t => t.completed)).length;
    
    // Dynamic calculations based on user progress
    const scamsAvoided = completedChallenges * 5 + Math.floor(totalXP / 20);
    const moneySaved = scamsAvoided * 123.50;
    const familyProtected = 4; // Static for now, can be dynamic if family feature is expanded
    const saSaferBy = (totalXP / 5000000).toFixed(5);
    const nationalRank = Math.max(1, 20000 - Math.floor(totalXP * 7.5));


  return (
    <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-6 h-full font-mono">
        <div className="border-b border-slate-300 dark:border-slate-600 pb-2 mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Your Security Impact</h3>
        </div>
        <div className="space-y-3 text-slate-700 dark:text-slate-300">
            <div className="flex justify-between items-center">
                <span>🛡️ Scams Avoided:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{scamsAvoided}</span>
            </div>
            <div className="flex justify-between items-center">
                <span>💰 Money Saved:</span>
                <span className="font-bold text-green-600 dark:text-green-400">R{moneySaved.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center">
                <span>👨‍👩‍👧 Family Protected:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{familyProtected}</span>
            </div>
            <div className="flex justify-between items-center">
                <span>📈 SA Safer By:</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">{saSaferBy}%</span>
            </div>
            <div className="flex justify-between items-center">
                <span>🏆 National Rank:</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400">#{nationalRank.toLocaleString('en-US')}</span>
            </div>
        </div>
    </div>
  );
};

export default AnalyticsWidget;