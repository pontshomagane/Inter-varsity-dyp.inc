import React from 'react';
import type { PasswordCriteria } from '../types';

interface PasswordChecklistProps {
  criteria: PasswordCriteria[];
}

const PasswordChecklist: React.FC<PasswordChecklistProps> = ({ criteria }) => {
  const totalPoints = criteria.reduce((sum, criteria) => sum + criteria.points, 0);
  const earnedPoints = criteria
    .filter(criteria => criteria.met)
    .reduce((sum, criteria) => sum + criteria.points, 0);

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">Password Checklist</h2>
        <div className="text-right">
          <div className="text-2xl font-bold text-cyan-400">{earnedPoints}/{totalPoints}</div>
          <div className="text-sm text-gray-400">points earned</div>
        </div>
      </div>

      <div className="space-y-3">
        {criteria.map((criteria) => (
          <div
            key={criteria.id}
            className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
              criteria.met
                ? 'bg-green-900/30 border border-green-500/50'
                : 'bg-slate-700 border border-slate-600'
            }`}
          >
            {/* Checkbox Icon */}
            <div className="flex-shrink-0 mr-3">
              {criteria.met ? (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6 border-2 border-slate-400 rounded-full" />
              )}
            </div>

            {/* Criteria Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={`font-medium ${criteria.met ? 'text-green-400' : 'text-gray-300'}`}>
                  {criteria.label}
                </span>
                <span className={`text-sm font-bold ${criteria.met ? 'text-green-400' : 'text-gray-500'}`}>
                  +{criteria.points}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">{criteria.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="mt-6 p-4 bg-slate-700 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">Overall Progress</span>
          <span className="text-sm font-bold text-cyan-400">
            {Math.round((earnedPoints / totalPoints) * 100)}%
          </span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-500 to-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(earnedPoints / totalPoints) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordChecklist;
