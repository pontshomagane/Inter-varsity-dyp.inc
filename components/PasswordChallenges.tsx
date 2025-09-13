import React, { useState } from 'react';
import type { PasswordChallenge } from '../types';

interface PasswordChallengesProps {
  challenges: PasswordChallenge[];
  onChallengeSelect: (challenge: PasswordChallenge) => void;
  onChallengeComplete: (challengeId: string, selectedPassword: string) => void;
}

const PasswordChallenges: React.FC<PasswordChallengesProps> = ({
  challenges,
  onChallengeSelect,
  onChallengeComplete
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<PasswordChallenge | null>(null);
  const [selectedPassword, setSelectedPassword] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleChallengeClick = (challenge: PasswordChallenge) => {
    setSelectedChallenge(challenge);
    setSelectedPassword('');
    setShowResult(false);
    onChallengeSelect(challenge);
  };

  const handlePasswordSelect = (password: string) => {
    setSelectedPassword(password);
  };

  const handleSubmit = () => {
    if (selectedChallenge && selectedPassword) {
      setShowResult(true);
      onChallengeComplete(selectedChallenge.id, selectedPassword);
    }
  };

  const isCorrect = selectedChallenge && selectedPassword === selectedChallenge.correctPassword;

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Password Challenges</h2>
      
      {!selectedChallenge ? (
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-slate-700 ${
                challenge.completed
                  ? 'bg-green-900/30 border-green-500/50'
                  : 'bg-slate-700 border-slate-600 hover:border-cyan-500/50'
              }`}
              onClick={() => handleChallengeClick(challenge)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">{challenge.title}</h3>
                  <p className="text-sm text-gray-400">{challenge.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-cyan-400">+{challenge.points}</div>
                  {challenge.completed && (
                    <div className="text-xs text-green-400">✓ Completed</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Challenge Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">{selectedChallenge.title}</h3>
            <button
              onClick={() => setSelectedChallenge(null)}
              className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded text-sm transition-colors"
            >
              Back
            </button>
          </div>

          {/* Scenario Description */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">Scenario:</h4>
            <p className="text-gray-300">{selectedChallenge.scenario}</p>
          </div>

          {/* Requirements */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">Requirements:</h4>
            <ul className="list-disc list-inside space-y-1">
              {selectedChallenge.requirements.map((req, index) => (
                <li key={index} className="text-gray-300 text-sm">{req}</li>
              ))}
            </ul>
          </div>

          {/* Password Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-white">Choose the strongest password:</h4>
            {selectedChallenge.mockPasswords.map((password, index) => (
              <label
                key={index}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedPassword === password
                    ? 'bg-cyan-900/30 border-cyan-500/50'
                    : 'bg-slate-700 border-slate-600 hover:border-slate-500'
                }`}
              >
                <input
                  type="radio"
                  name="password"
                  value={password}
                  checked={selectedPassword === password}
                  onChange={(e) => handlePasswordSelect(e.target.value)}
                  className="mr-3"
                />
                <code className="text-gray-300 font-mono text-sm">{password}</code>
              </label>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!selectedPassword}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            Submit Answer
          </button>

          {/* Result Display */}
          {showResult && (
            <div className={`p-4 rounded-lg ${
              isCorrect ? 'bg-green-900/30 border border-green-500/50' : 'bg-red-900/30 border border-red-500/50'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {isCorrect ? (
                  <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <span className={`font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-gray-300">
                {isCorrect 
                  ? `Great choice! You earned ${selectedChallenge.points} points.`
                  : `The correct answer was: ${selectedChallenge.correctPassword}`
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordChallenges;
