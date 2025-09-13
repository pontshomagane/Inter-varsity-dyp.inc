// FIX: Implemented the missing AchievementToast component. This file was previously a placeholder. It displays a notification when a new achievement is unlocked.
import React, { useEffect } from 'react';
import type { Achievement } from '../types';
import Badge from './Badge';

interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 bg-white dark:bg-slate-900 border-2 border-cyan-500 dark:border-cyan-400 rounded-lg shadow-2xl shadow-cyan-500/10 dark:shadow-cyan-500/20 p-4 max-w-sm w-full animate-toast-in">
      <div className="flex items-start">
        <div className="flex-shrink-0 text-cyan-600 dark:text-cyan-400">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Achievement Unlocked!</p>
          <div className="mt-2">
            <Badge type={achievement.name} />
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{achievement.description}</p>
        </div>
         <div className="ml-4 flex-shrink-0 flex">
          <button onClick={onClose} className="inline-flex text-slate-400 dark:text-slate-500 rounded-md hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AchievementToast;