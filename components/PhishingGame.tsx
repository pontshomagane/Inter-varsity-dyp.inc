import React, { useState, useMemo, useEffect, useCallback } from 'react';
import type { ChallengeCategory } from '../types';
import Badge from './Badge';

interface PhishingGameProps {
  challenge: ChallengeCategory;
  onCompleteTask: (challengeId: string, taskId: string) => void;
}

const PhishingGame: React.FC<PhishingGameProps> = ({ challenge, onCompleteTask }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedElements, setClickedElements] = useState<Record<string, string[]>>({});
  const [feedback, setFeedback] = useState<{ message: string; correct: boolean } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const emails = useMemo(() => {
    if (challenge.content.type === 'phishing-game') {
      return challenge.content.emails;
    }
    return [];
  }, [challenge]);

  const currentEmail = emails[currentIndex];

  const handleElementClick = (elementId: string, reason: string) => {
    if (clickedElements[currentEmail.id]?.includes(elementId)) return;

    setFeedback({ message: reason, correct: true });
    setScore(s => s + 10);
    setClickedElements(prev => ({
      ...prev,
      [currentEmail.id]: [...(prev[currentEmail.id] || []), elementId],
    }));
  };

  const handleSafeElementClick = () => {
      setFeedback({ message: "This element looks safe. No red flags here.", correct: false });
      setScore(s => s - 5);
  }

  const parseBody = (body: string, suspiciousElements: { id: string, reason: string }[]) => {
    const parts = body.split(/(<.*?>.*?<\/.*?>)/g).filter(part => part);
    return parts.map((part, index) => {
      const match = part.match(/<(.*?)>(.*?)<\/.*?>/);
      if (match) {
        const id = match[1];
        const text = match[2];
        const element = suspiciousElements.find(e => e.id === id);
        const isClicked = clickedElements[currentEmail.id]?.includes(id);

        if (element) {
          return (
            <span
              key={index}
              onClick={() => handleElementClick(id, element.reason)}
              className={`cursor-pointer rounded p-0.5 transition-all ${
                isClicked
                  ? 'bg-green-500/50 text-green-200 ring-2 ring-green-400'
                  : 'bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-200'
              }`}
            >
              {text}
            </span>
          );
        }
      }
      return <span key={index} onClick={handleSafeElementClick}>{part}</span>;
    });
  };

  const handleNext = () => {
    setFeedback(null);
    if (currentIndex < emails.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsFinished(true);
      const mainTask = challenge.content.tasks[0];
      if (mainTask && !mainTask.completed) {
        onCompleteTask(challenge.id, mainTask.id);
      }
    }
  };

  const totalSuspiciousElements = useMemo(() => emails.reduce((acc, email) => acc + email.suspiciousElements.length, 0), [emails]);


  if (isFinished) {
    return (
        <div className="text-center bg-slate-100 dark:bg-slate-900/50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">Challenge Complete!</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">You've finished the phishing simulation.</p>
            <div className="flex justify-center items-center gap-8">
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold text-slate-800 dark:text-slate-100">{score}</span>
                    <span className="text-slate-500 dark:text-slate-400">Final Score</span>
                </div>
                 <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold text-slate-800 dark:text-slate-100">
                        {Object.values(clickedElements).flat().length}
                        <span className="text-2xl text-slate-500 dark:text-slate-400"> / {totalSuspiciousElements}</span>
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">Threats Found</span>
                </div>
            </div>
            <div className="mt-8 flex justify-center">
                <Badge type="Net Caster" />
            </div>
        </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Email Analysis</h2>
        <div>
          <span className="font-bold text-lg text-cyan-600 dark:text-cyan-400">{score}</span>
          <span className="text-sm text-slate-500 dark:text-slate-400"> Score</span>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-700 min-h-[300px]">
        <div className="border-b border-slate-200 dark:border-slate-700 pb-3 mb-3">
            <p><span className="font-semibold text-slate-500 dark:text-slate-400">From:</span> {currentEmail.sender}</p>
            <p><span className="font-semibold text-slate-500 dark:text-slate-400">Subject:</span> {currentEmail.subject}</p>
        </div>
        <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {parseBody(currentEmail.body, currentEmail.suspiciousElements)}
        </div>
      </div>
       {feedback && (
          <div className={`mt-4 p-4 rounded-md text-sm ${feedback.correct ? 'bg-green-100/50 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700' : 'bg-red-100/50 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300 dark:border-red-700'} border`}>
            {feedback.message}
          </div>
        )}
      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-slate-500 dark:text-slate-400">Email {currentIndex + 1} of {emails.length}</span>
        <button
            onClick={handleNext}
            className="px-6 py-2 text-sm font-bold rounded-md transition-all bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-900 dark:hover:bg-cyan-400 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
            disabled={!feedback && currentEmail.isPhishing && (clickedElements[currentEmail.id]?.length || 0) < currentEmail.suspiciousElements.length}
        >
            {currentIndex < emails.length - 1 ? 'Next Email' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default PhishingGame;