

import React, { useState, useEffect, useMemo } from 'react';
import type { ChallengeCategory } from '../types';
import PasswordStrengthMeter from './PasswordStrengthMeter';

interface PasswordGameProps {
  challenge: ChallengeCategory;
  onCompleteTask: (challengeId: string, taskId: string) => void;
}

const PasswordGame: React.FC<PasswordGameProps> = ({ challenge, onCompleteTask }) => {
  const [password, setPassword] = useState('');

  const criteria = useMemo(() => ({
    'ps-1': (p: string) => p.length >= 12,
    'ps-2': (p: string) => /[A-Z]/.test(p),
    'ps-3': (p: string) => /[0-9]/.test(p),
    'ps-4': (p: string) => /[^A-Za-z0-9]/.test(p),
  }), []);

  useEffect(() => {
    if (challenge.content.type !== 'password-game') return;

    for (const task of challenge.content.tasks) {
      if (!task.completed && criteria[task.id as keyof typeof criteria]?.(password)) {
        onCompleteTask(challenge.id, task.id);
      }
    }
  }, [password, challenge, onCompleteTask, criteria]);
  
  if (challenge.content.type !== 'password-game') return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Simulator</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="password-input" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
              Create a secure password
            </label>
            <input
              type="text"
              id="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md p-3 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter password here..."
              aria-label="Password strength simulator input"
            />
          </div>
          <PasswordStrengthMeter password={password} />
          <div>
            <ul className="space-y-2">
              {challenge.content.tasks.map(task => {
                const isMet = task.completed || (criteria[task.id as keyof typeof criteria] && criteria[task.id as keyof typeof criteria](password));
                return (
                  <li key={task.id} className={`flex items-center text-sm transition-colors ${isMet ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 flex-shrink-0 ${isMet ? 'text-green-500' : 'text-slate-400 dark:text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMet ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"} />
                    </svg>
                    <span>{task.description} (+{task.points} XP)</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-3">Pro Tips</h3>
        <ul className="space-y-3 list-disc list-inside text-slate-600 dark:text-slate-300 text-sm">
          {challenge.content.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PasswordGame;