
import React, { useState, useMemo, useCallback } from 'react';
import { MOCK_USER, LEVELS, CHALLENGE_CATEGORIES } from './constants';
import type { User, ChallengeCategory, ChallengeTask } from './types';
import Dashboard from './components/Dashboard';
import ChallengeView from './components/ChallengeView';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(MOCK_USER);
  const [challenges, setChallenges] = useState<ChallengeCategory[]>(CHALLENGE_CATEGORIES);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);

  const currentLevel = useMemo(() => {
    return LEVELS.slice().reverse().find(level => user.xp >= level.minXp) || LEVELS[0];
  }, [user.xp]);

  const totalPossiblePoints = useMemo(() => {
    return challenges.reduce((total, category) => {
        return total + category.content.tasks.reduce((taskTotal, task) => taskTotal + task.points, 0);
    }, 0);
  }, [challenges]);

  const calculateSecurityScore = useCallback((completedPoints: number) => {
    if (totalPossiblePoints === 0) return 0;
    return Math.round((completedPoints / totalPossiblePoints) * 100);
  }, [totalPossiblePoints]);


  const handleCompleteTask = (challengeId: string, taskId: string) => {
    let completedPoints = 0;
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === challengeId) {
        const updatedTasks = challenge.content.tasks.map(task => {
          if (task.id === taskId && !task.completed) {
            return { ...task, completed: true };
          }
          return task;
        });
        return { ...challenge, content: { ...challenge.content, tasks: updatedTasks } };
      }
      return challenge;
    });

    const taskToComplete = challenges
      .find(c => c.id === challengeId)?.content.tasks
      .find(t => t.id === taskId);

    if (taskToComplete && !taskToComplete.completed) {
        setUser(prevUser => ({
            ...prevUser,
            xp: prevUser.xp + taskToComplete.points,
        }));
    }

     updatedChallenges.forEach(category => {
        category.content.tasks.forEach(task => {
            if (task.completed) {
                completedPoints += task.points;
            }
        });
    });

    setUser(prevUser => ({
        ...prevUser,
        securityScore: calculateSecurityScore(completedPoints)
    }));
    
    setChallenges(updatedChallenges);
  };
  
  const handleSelectChallenge = (id: string) => {
    setSelectedChallengeId(id);
  };

  const handleBackToDashboard = () => {
    setSelectedChallengeId(null);
  };

  const selectedChallenge = useMemo(() => {
    return challenges.find(c => c.id === selectedChallengeId) || null;
  }, [selectedChallengeId, challenges]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {selectedChallenge ? (
          <ChallengeView 
            challenge={selectedChallenge} 
            onBack={handleBackToDashboard}
            onCompleteTask={handleCompleteTask}
          />
        ) : (
          <Dashboard 
            user={user}
            level={currentLevel}
            challenges={challenges}
            onSelectChallenge={handleSelectChallenge}
          />
        )}
      </div>
    </div>
  );
};

export default App;
