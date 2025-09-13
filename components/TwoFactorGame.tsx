// FIX: Implemented the missing TwoFactorGame component. This file was previously a placeholder.
import React, { useState } from 'react';
import type { ChallengeCategory, TwoFactorMethod } from '../types';
import Badge from './Badge';

interface TwoFactorGameProps {
  challenge: ChallengeCategory;
  onCompleteTask: (challengeId: string, taskId: string) => void;
}

const TwoFactorGame: React.FC<TwoFactorGameProps> = ({ challenge, onCompleteTask }) => {
  const [selectedMethod, setSelectedMethod] = useState<TwoFactorMethod | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  if (challenge.content.type !== '2fa-game') return null;

  const handleSelectMethod = (method: TwoFactorMethod) => {
    setSelectedMethod(method);
    const task = challenge.content.tasks.find(t => t.id === '2fa-1');
    if (task && !task.completed) {
      onCompleteTask(challenge.id, task.id);
    }
  };

  const handleEnable = () => {
    setIsCompleted(true);
    const task = challenge.content.tasks.find(t => t.id === '2fa-2');
     if (task && !task.completed) {
      onCompleteTask(challenge.id, task.id);
    }
  }

  if (isCompleted) {
      return (
        <div className="text-center bg-slate-100 dark:bg-slate-900/50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">Account Secured!</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">You've successfully enabled Two-Factor Authentication.</p>
            <div className="mt-8 flex justify-center">
                <Badge type="Shield Bearer" />
            </div>
        </div>
      )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Enable 2FA</h2>
        {!selectedMethod ? (
          <div>
            <p className="text-slate-600 dark:text-slate-300 mb-4">Choose a method to secure your account:</p>
            <div className="space-y-3">
              {challenge.content.methods.map(method => (
                <button
                  key={method.id}
                  onClick={() => handleSelectMethod(method)}
                  className="w-full text-left p-4 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-cyan-500 transition-all"
                >
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{method.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{method.description}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">{selectedMethod.name}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">{selectedMethod.description}</p>
            <button
                onClick={handleEnable}
                className="w-full px-6 py-3 text-md font-bold rounded-md transition-all bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-900 dark:hover:bg-cyan-400"
            >
                Enable this Method
            </button>
            <button
                onClick={() => setSelectedMethod(null)}
                className="w-full mt-3 text-center text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
                Choose a different method
            </button>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Your Progress</h3>
        <ul className="space-y-2">
            {challenge.content.tasks.map(task => {
                const isMet = task.completed;
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
        {selectedMethod && (
            <div className="mt-6 bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="mb-4">
                    <h4 className="font-bold text-green-600 dark:text-green-400">Pros:</h4>
                    <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 mt-1 space-y-1">
                        {selectedMethod.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold text-red-500 dark:text-red-400">Cons:</h4>
                    <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-300 mt-1 space-y-1">
                        {selectedMethod.cons.map((con, i) => <li key={i}>{con}</li>)}
                    </ul>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default TwoFactorGame;