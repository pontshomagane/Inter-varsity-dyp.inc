import React from 'react';
import type { ChallengeCategory } from '../types';

interface AnalyticsWidgetProps {
  challenges: ChallengeCategory[];
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({ challenges }) => {
    const totalXP = challenges.reduce((acc, c) => acc + c.content.tasks.reduce((tAcc, t) => t.completed ? tAcc + t.points : tAcc, 0), 0);
    const completedChallenges = challenges.filter(c => c.content.tasks.every(t => t.completed)).length;

    // Mock calculations
    const incidentsPrevented = completedChallenges * 5 + Math.floor(totalXP / 20);
    const knowledgeGained = Math.floor(totalXP / 10);
    const accountsSecured = challenges.filter(c => c.id === '2fa-setup' && c.content.tasks.every(t => t.completed)).length;


  return (
    <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-6 space-y-4 h-full">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Impact Report</h3>
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-full border border-green-500/20 text-green-500">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{incidentsPrevented}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Incidents Prevented</p>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-500">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <div>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{knowledgeGained}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Knowledge Gained</p>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-500">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <div>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{accountsSecured}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Accounts Secured</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AnalyticsWidget;