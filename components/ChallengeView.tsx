// FIX: Implemented the missing ChallengeView component. This file was previously a placeholder.
import React from 'react';
import type { ChallengeCategory } from '../types';
import PasswordGame from './PasswordGame';
import PhishingGame from './PhishingGame';
import TwoFactorGame from './TwoFactorGame';
import SocialEngineeringGame from './SocialEngineeringGame';

interface ChallengeViewProps {
  challenge: ChallengeCategory;
  onBack: () => void;
  onCompleteTask: (challengeId: string, taskId: string) => void;
}

const ChallengeView: React.FC<ChallengeViewProps> = ({ challenge, onBack, onCompleteTask }) => {

  const renderGame = () => {
    switch (challenge.content.type) {
      case 'password-game':
        return <PasswordGame challenge={challenge} onCompleteTask={onCompleteTask} />;
      case 'phishing-game':
        return <PhishingGame challenge={challenge} onCompleteTask={onCompleteTask} />;
      case '2fa-game':
        return <TwoFactorGame challenge={challenge} onCompleteTask={onCompleteTask} />;
      case 'social-engineering-game':
        return <SocialEngineeringGame challenge={challenge} onCompleteTask={onCompleteTask} />;
      default:
        return <p className="text-slate-500 dark:text-slate-400">This challenge type is not yet implemented.</p>;
    }
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Dashboard
      </button>
      <div className="bg-white/50 dark:bg-slate-800/50 p-6 sm:p-8 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-start mb-6">
            <div className="text-cyan-600 dark:text-cyan-400 mr-4 flex-shrink-0">
                {challenge.icon}
            </div>
            <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{challenge.title}</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">{challenge.description}</p>
            </div>
        </div>

        {renderGame()}

      </div>
    </div>
  );
};

export default ChallengeView;