import React from 'react';

const CompletionScreen: React.FC = () => {
  const handleContinueTraining = () => {
    const trainingModules = document.getElementById('training-modules');
    trainingModules?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-500 dark:to-slate-800 rounded-lg border border-cyan-400/50 dark:border-slate-700 p-8 text-center text-white shadow-2xl shadow-cyan-500/20">
      <h2 className="text-4xl font-bold mb-2">
        <span role="img" aria-label="trophy">🏆</span> Congratulations, Cyber Warrior!
      </h2>
      <p className="text-cyan-200 dark:text-slate-300 mb-6">
        You've completed all basic challenges!
      </p>

      <div className="bg-black/20 dark:bg-slate-900/50 p-6 rounded-lg border border-white/10 dark:border-slate-700 text-left max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-cyan-300 mb-4">
          <span role="img" aria-label="crystal ball">🔮</span> COMING SOON:
        </h3>
        <ul className="space-y-2 text-cyan-100 dark:text-slate-300 list-disc list-inside">
          <li>Expert Mode challenges</li>
          <li>Real-time threat updates</li>
          <li>Master Class specializations</li>
          <li>Community mentor program</li>
        </ul>
      </div>

      <p className="mt-6 text-sm text-cyan-200 dark:text-slate-400">
        <span role="img" aria-label="sparks">⚡</span> For now, replay challenges to maintain your streak!
      </p>

      <button
        onClick={handleContinueTraining}
        className="mt-4 px-8 py-3 font-bold rounded-md transition-all bg-white text-cyan-600 hover:bg-slate-200 hover:scale-105"
      >
        Continue Training
      </button>
    </div>
  );
};

export default CompletionScreen;
