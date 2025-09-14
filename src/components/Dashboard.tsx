import React from 'react';
import type { ChallengeCategory, UserProgress, Achievement } from '../types';
import ChallengeCard from './ChallengeCard';
import { LEVELS } from '../constants';
import ScoreGauge from './ScoreGauge';
import XPBar from './XPBar';
import Badge from './Badge';
import ProgressChart from './ProgressChart';
import AnalyticsWidget from './AnalyticsWidget';
import ThreatFeed from './ThreatFeed';
import FamilyDashboard from './FamilyDashboard';
import ScamStory from './ScamStory';
import CompletionScreen from './CompletionScreen';

interface DashboardProps {
  challenges: ChallengeCategory[];
  userProgress: UserProgress;
  achievements: Achievement[];
  onSelectChallenge: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ challenges, userProgress, achievements, onSelectChallenge }) => {
  const { xp, level, score } = userProgress;
  const minXp = level > 1 ? LEVELS[level - 1] : 0;
  const maxXp = LEVELS[level] || LEVELS[LEVELS.length - 1];

  const unlockedAchievements = achievements
    .filter(a => a.unlocked)
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  const nextChallenge = challenges.find(c => !c.content.tasks.every(t => t.completed));
  const allChallengesCompleted = !nextChallenge;

  return (
    <div className="space-y-8">
      <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-6 flex flex-col sm:flex-row items-center justify-between gap-8 animate-slide-in stagger-1 opacity-0">
         <div className="flex items-center gap-6">
           <ScoreGauge score={score} />
           <div>
             <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Your Privacy Profile</h2>
             <p className="text-slate-500 dark:text-slate-400">Complete challenges to improve your score.</p>
           </div>
         </div>
         <div className="w-full sm:w-1/3">
           <div className="flex justify-between items-baseline mb-2">
               <span className="font-bold text-cyan-600 dark:text-cyan-400">Level {level}</span>
               <span className="text-xs text-slate-500 dark:text-slate-400">{xp} / {maxXp} XP</span>
           </div>
           <XPBar currentXp={xp} minXp={minXp} maxXp={maxXp} />
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-6 animate-slide-in stagger-2 opacity-0">
               <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Proficiency</h3>
               <ProgressChart challenges={challenges} />
           </div>
            <div className="animate-slide-in stagger-2 opacity-0">
               <AnalyticsWidget challenges={challenges} />
           </div>
       </div>
      
      {allChallengesCompleted ? (
        <div className="animate-slide-in stagger-3 opacity-0">
            <CompletionScreen />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-6 animate-slide-in stagger-3 opacity-0">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Next Goal</h3>
                {nextChallenge && (
                <div onClick={() => onSelectChallenge(nextChallenge.id)} className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-md flex items-center gap-4 cursor-pointer hover:bg-slate-200/70 dark:hover:bg-slate-700/50 transition-colors h-full">
                    <div className="text-cyan-600 dark:text-cyan-400 flex-shrink-0">{nextChallenge.icon}</div>
                    <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{nextChallenge.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{nextChallenge.description}</p>
                    </div>
                </div>
                )}
            </div>
            <ThreatFeed />
        </div>
      )}


      <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-6 animate-slide-in stagger-4 opacity-0">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Recent Achievements</h3>
          {unlockedAchievements.length > 0 ? (
            <div className="flex flex-wrap gap-3">
            {unlockedAchievements.slice(0, 5).map(achievement => (
                <Badge key={achievement.id} type={achievement.name} />
            ))}
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-sm">Complete a challenge to earn your first badge!</p>
          )}
      </div>

      <div className="animate-slide-in stagger-5 opacity-0">
        <FamilyDashboard userScore={score} />
      </div>

      <div className="animate-slide-in stagger-6 opacity-0">
        <ScamStory />
      </div>

      <div id="training-modules">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Training Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge, i) => (
            <div key={challenge.id} className={`animate-slide-in opacity-0`} style={{animationDelay: `${700 + 100 * i}ms`}}>
                <ChallengeCard
                challenge={challenge}
                onClick={() => onSelectChallenge(challenge.id)}
                />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;