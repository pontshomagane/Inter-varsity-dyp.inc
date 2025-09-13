
import React from 'react';
import type { ChallengeCategory } from '../types';

interface ChallengeViewProps {
  challenge: ChallengeCategory;
  onBack: () => void;
  onCompleteTask: (challengeId: string, taskId: string) => void;
}

const ChallengeView: React.FC<ChallengeViewProps> = ({ challenge, onBack, onCompleteTask }) => {
  return (
    <div className="bg-slate-800/50 p-6 sm:p-8 rounded-lg border border-slate-700">
      <button 
        onClick={onBack}
        className="flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </button>

      <div className="flex items-center mb-4">
        <div className="text-cyan-400 mr-4">{React.cloneElement(challenge.icon, { className: "h-10 w-10" })}</div>
        <h1 className="text-3xl font-bold text-slate-100">{challenge.content.title}</h1>
      </div>

      <div className="prose prose-invert prose-p:text-slate-300 max-w-none mb-8">
        {challenge.content.details.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-slate-200 mb-4 border-b border-slate-700 pb-2">Tasks</h2>
      <div className="space-y-4">
        {challenge.content.tasks.map(task => (
          <div 
            key={task.id}
            className={`p-4 rounded-md flex justify-between items-center transition-colors ${
              task.completed ? 'bg-slate-700/50' : 'bg-slate-800'
            }`}
          >
            <div>
              <p className={` ${task.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                {task.description}
              </p>
              <span className={`text-xs font-bold ${task.completed ? 'text-green-500' : 'text-cyan-400'}`}>
                {task.points} XP
              </span>
            </div>
            <button
              onClick={() => onCompleteTask(challenge.id, task.id)}
              disabled={task.completed}
              className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${
                task.completed 
                  ? 'bg-green-500/30 text-green-400 cursor-not-allowed' 
                  : 'bg-cyan-500 text-slate-900 hover:bg-cyan-400'
              }`}
            >
              {task.completed ? 'Done' : 'Complete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeView;
