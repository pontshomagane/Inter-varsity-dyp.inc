
import React from 'react';
import type { User, Level, ChallengeCategory } from '../types';
import Header from './Header';
import ScoreGauge from './ScoreGauge';
import XPBar from './XPBar';
import ChallengeCard from './ChallengeCard';

interface DashboardProps {
  user: User;
  level: Level;
  challenges: ChallengeCategory[];
  onSelectChallenge: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, level, challenges, onSelectChallenge }) => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
        <div className="lg:col-span-1 bg-slate-800/50 p-6 rounded-lg border border-slate-700 flex flex-col items-center justify-center shadow-lg shadow-cyan-500/10">
          <h2 className="text-xl font-semibold text-slate-300 mb-4">Overall Security Score</h2>
          <ScoreGauge score={user.securityScore} />
        </div>
        <div className="lg:col-span-2 bg-slate-800/50 p-6 rounded-lg border border-slate-700 shadow-lg">
          <h2 className="text-2xl font-bold text-slate-100">Welcome back, <span className="text-cyan-400">{user.name}</span></h2>
          <div className="mt-4">
            <div className="flex justify-between items-baseline mb-2">
              <p className="text-lg">
                Level: <span className={`font-bold ${level.color}`}>{level.name}</span>
              </p>
              <p className="text-sm text-slate-400">
                {user.xp} / {level.maxXp ? level.maxXp + 1 : 'Max'} XP
              </p>
            </div>
            <XPBar
              currentXp={user.xp}
              minXp={level.minXp}
              maxXp={level.maxXp ? level.maxXp + 1 : user.xp}
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-4">Training Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map(challenge => (
            <ChallengeCard 
              key={challenge.id}
              challenge={challenge}
              onClick={() => onSelectChallenge(challenge.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
