// FIX: Implemented the main App component. This file was previously a placeholder. It now manages application state, view routing, and game logic.
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { INITIAL_CHALLENGES, LEVELS, ACHIEVEMENTS } from './constants';
import type { ChallengeCategory, Achievement } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ChallengeView from './components/ChallengeView';
import AchievementToast from './components/AchievementToast';

type Theme = 'light' | 'dark' | 'system';

function App() {
  const [challenges, setChallenges] = useLocalStorage<ChallengeCategory[]>('dyp-challenges', INITIAL_CHALLENGES);
  const [storedAchievements, setStoredAchievements] = useLocalStorage<Record<string, Achievement>>('dyp-achievements', {});
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [toastQueue, setToastQueue] = useState<Achievement[]>([]);
  const [theme, setTheme] = useLocalStorage<Theme>('dyp-theme', 'system');

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    root.classList.toggle('dark', isDark);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        root.classList.toggle('dark', mediaQuery.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const achievements = useMemo(() => {
    return Object.values(ACHIEVEMENTS).map(baseAchievement => ({
        ...baseAchievement,
        unlocked: storedAchievements[baseAchievement.id]?.unlocked || false,
        timestamp: storedAchievements[baseAchievement.id]?.timestamp,
    }));
  }, [storedAchievements]);
  
  const userProgress = useMemo(() => {
    const totalXp = challenges.reduce((acc, challenge) => {
      return acc + challenge.content.tasks.reduce((taskAcc, task) => {
        return task.completed ? taskAcc + task.points : taskAcc;
      }, 0);
    }, 0);

    const level = LEVELS.findIndex(xpThreshold => totalXp < xpThreshold);
    const currentLevel = level === -1 ? LEVELS.length : level;

    const score = Math.floor((totalXp / (LEVELS[LEVELS.length - 1] || 1)) * 100);

    return { xp: totalXp, level: Math.max(1, currentLevel), score: Math.min(100, score) };
  }, [challenges]);


  const checkForAchievements = useCallback((updatedChallenges: ChallengeCategory[]) => {
    const newAchievements: Achievement[] = [];

    // Check for individual challenge completion
    updatedChallenges.forEach(challenge => {
        const isCompleted = challenge.content.tasks.every(t => t.completed);
        let achievementId = '';
        if (challenge.id === 'password-strength') achievementId = 'password-master';
        if (challenge.id === 'phishing-awareness') achievementId = 'phishing-spotter';
        if (challenge.id === '2fa-setup') achievementId = '2fa-enforcer';
        if (challenge.id === 'social-engineering') achievementId = 'social-pro';
        
        if (isCompleted && achievementId && !storedAchievements[achievementId]?.unlocked) {
            const achievement = ACHIEVEMENTS[achievementId];
            if(achievement) newAchievements.push({ ...achievement, unlocked: true, timestamp: Date.now() });
        }
    });
    
    // Check for all challenges completion
    const allDone = updatedChallenges.every(c => c.content.tasks.every(t => t.completed));
    if (allDone && !storedAchievements['cyber-master']?.unlocked) {
        const achievement = ACHIEVEMENTS['cyber-master'];
        if(achievement) newAchievements.push({ ...achievement, unlocked: true, timestamp: Date.now() });
    }

    if (newAchievements.length > 0) {
        setToastQueue(q => [...q, ...newAchievements]);
        setStoredAchievements(prev => {
            const updated = {...prev};
            newAchievements.forEach(ach => {
                updated[ach.id] = ach;
            });
            return updated;
        })
    }
  }, [storedAchievements, setStoredAchievements]);

  const handleCompleteTask = useCallback((challengeId: string, taskId: string) => {
    setChallenges(prevChallenges => {
      const newChallenges = prevChallenges.map(challenge => {
        if (challenge.id === challengeId) {
          const newTasks = challenge.content.tasks.map(task => {
            if (task.id === taskId && !task.completed) {
              return { ...task, completed: true };
            }
            return task;
          });
          return { ...challenge, content: { ...challenge.content, tasks: newTasks } };
        }
        return challenge;
      });

      // Defer achievement check until after state update
      setTimeout(() => checkForAchievements(newChallenges), 0);
      
      return newChallenges;
    });
  }, [setChallenges, checkForAchievements]);
  
  const handleSelectChallenge = (id: string) => setSelectedChallengeId(id);
  const handleBackToDashboard = () => setSelectedChallengeId(null);

  const handleCloseToast = () => {
      setToastQueue(q => q.slice(1));
  }

  const selectedChallenge = useMemo(() => {
    return challenges.find(c => c.id === selectedChallengeId) || null;
  }, [challenges, selectedChallengeId]);

  return (
    <div className="min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Header theme={theme} setTheme={setTheme} />
        <main>
          {selectedChallenge ? (
            <ChallengeView
              challenge={selectedChallenge}
              onBack={handleBackToDashboard}
              onCompleteTask={handleCompleteTask}
            />
          ) : (
            <Dashboard
              challenges={challenges}
              userProgress={userProgress}
              achievements={achievements}
              onSelectChallenge={handleSelectChallenge}
            />
          )}
        </main>
      </div>
      {toastQueue.length > 0 && <AchievementToast achievement={toastQueue[0]} onClose={handleCloseToast}/>}
    </div>
  );
}

export default App;