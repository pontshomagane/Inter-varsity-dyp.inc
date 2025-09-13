import React, { useState, useMemo } from 'react';
import type { ChallengeCategory, SocialEngineeringScenario } from '../types';
import Badge from './Badge';

interface SocialEngineeringGameProps {
  challenge: ChallengeCategory;
  onCompleteTask: (challengeId: string, taskId: string) => void;
}

const SocialEngineeringGame: React.FC<SocialEngineeringGameProps> = ({ challenge, onCompleteTask }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const scenarios = useMemo(() => {
    if (challenge.content.type === 'social-engineering-game') {
      return challenge.content.scenarios;
    }
    return [];
  }, [challenge]);

  const currentScenario = scenarios[currentIndex];

  const handleAnswerClick = (isCorrect: boolean, index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowFeedback(true);
    if (isCorrect) {
      setScore(s => s + 20);
    } else {
      setScore(s => s - 10);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);

    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsFinished(true);
      const mainTask = challenge.content.tasks[0];
      if (mainTask && !mainTask.completed) {
        onCompleteTask(challenge.id, mainTask.id);
      }
    }
  };
  
  if (challenge.content.type !== 'social-engineering-game') return null;

  if (isFinished) {
    return (
        <div className="text-center bg-slate-100 dark:bg-slate-900/50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">Challenge Complete!</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">You've finished the social engineering simulation.</p>
            <div className="flex justify-center items-center gap-8">
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold text-slate-800 dark:text-slate-100">{Math.max(0, score)}</span>
                    <span className="text-slate-500 dark:text-slate-400">Final Score</span>
                </div>
            </div>
            <div className="mt-8 flex justify-center">
                <Badge type="Mind Reader" />
            </div>
        </div>
    )
  }

  const isAnswerCorrect = selectedAnswer !== null && currentScenario.options[selectedAnswer]?.isCorrect;

  return (
    <div>
      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Scenario Analysis</h2>
        <div>
          <span className="font-bold text-lg text-cyan-600 dark:text-cyan-400">{Math.max(0, score)}</span>
          <span className="text-sm text-slate-500 dark:text-slate-400"> Score</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <div className="text-sm font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">{currentScenario.type}</div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">{currentScenario.title}</h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{currentScenario.description}</p>
        
        <div className="space-y-3">
          {currentScenario.options.map((option, index) => {
            let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all disabled:cursor-not-allowed ";
            if (selectedAnswer === index) {
              buttonClass += option.isCorrect ? "bg-green-500/10 border-green-500 text-green-700 dark:bg-green-500/20 dark:text-green-200" : "bg-red-500/10 border-red-500 text-red-700 dark:bg-red-500/20 dark:text-red-200";
            } else if (selectedAnswer !== null) {
              buttonClass += "border-slate-300 bg-slate-100 text-slate-500 opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400";
            } else {
              buttonClass += "border-slate-300 bg-slate-100 hover:bg-slate-200/50 hover:border-cyan-500 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700/50 dark:hover:border-cyan-500";
            }
            
            return (
              <button key={index} onClick={() => handleAnswerClick(option.isCorrect, index)} disabled={selectedAnswer !== null} className={buttonClass}>
                {option.text}
              </button>
            )
          })}
        </div>
      </div>
      
      {showFeedback && (
        <div className={`mt-4 p-4 rounded-md text-sm border ${isAnswerCorrect ? 'bg-green-100/50 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700' : 'bg-red-100/50 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300 dark:border-red-700'}`}>
          <p className="font-bold mb-1">{isAnswerCorrect ? "Correct!" : "Incorrect"}</p>
          <p>{isAnswerCorrect ? currentScenario.feedback.correct : currentScenario.feedback.incorrect}</p>
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-slate-500 dark:text-slate-400">Scenario {currentIndex + 1} of {scenarios.length}</span>
        {showFeedback && (
          <button onClick={handleNext} className="px-6 py-2 text-sm font-bold rounded-md transition-all bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-900 dark:hover:bg-cyan-400">
            {currentIndex < scenarios.length - 1 ? 'Next Scenario' : 'Finish'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialEngineeringGame;