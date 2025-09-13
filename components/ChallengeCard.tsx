
import React from 'react';
import type { ChallengeCategory } from '../types';

interface ChallengeCardProps {
  challenge: ChallengeCategory;
  onClick: () => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onClick }) => {
  const completedTasks = challenge.content.tasks.filter(t => t.completed).length;
  const totalTasks = challenge.content.tasks.length;
  const isCompleted = completedTasks === totalTasks;

  return (
    <div 
      onClick={onClick}
      className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-1 group"
    >
      <div className="flex items-start justify-between">
        <div className="text-cyan-400 transition-colors group-hover:text-cyan-300">
            {challenge.icon}
        </div>
        {isCompleted && (
           <div className="flex items-center text-green-400 text-xs font-bold bg-green-900/50 px-2 py-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
             COMPLETED
           </div>
        )}
      </div>
      <h3 className="text-xl font-bold mt-4 text-slate-100">{challenge.title}</h3>
      <p className="text-slate-400 mt-2 text-sm h-10">{challenge.description}</p>
      <div className="mt-4">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
            <span>Progress</span>
            <span>{completedTasks} / {totalTasks}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${(completedTasks / totalTasks) * 100}%`}}></div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
