import React from 'react';

const familyMembers = [
  { name: 'Mom', score: 89, title: '2FA Champion', avatarColor: 'bg-pink-500' },
  { name: 'Dad', score: 67, title: 'Phishing Hunter', avatarColor: 'bg-blue-500' },
  { name: 'Brother', score: 45, title: 'Password Rookie', avatarColor: 'bg-green-500' },
  { name: 'You', score: 0, title: 'Privacy Trainee', avatarColor: 'bg-cyan-500', isCurrentUser: true },
];

interface FamilyDashboardProps {
  userScore: number;
}

const FamilyDashboard: React.FC<FamilyDashboardProps> = ({ userScore }) => {
  const members = familyMembers.map(m => m.isCurrentUser ? { ...m, score: userScore } : m);
  
  return (
    <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Family & Team Protection</h3>
        <button className="px-3 py-1.5 text-xs font-bold rounded-md transition-all bg-cyan-600/10 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400 hover:bg-cyan-600/20 dark:hover:bg-cyan-500/30">
          Invite Member
        </button>
      </div>
      <div className="space-y-4">
        {members.sort((a, b) => b.score - a.score).map((member) => (
          <div key={member.name} className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full ${member.avatarColor} flex items-center justify-center font-bold text-white text-lg flex-shrink-0`}>
              {member.name.charAt(0)}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-baseline">
                <p className="font-semibold text-slate-800 dark:text-slate-200">{member.name} {member.isCurrentUser && '(You)'}</p>
                <p className="font-bold text-cyan-600 dark:text-cyan-400">{member.score}%</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{member.title}</p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${member.score}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full text-center px-4 py-2 text-sm font-bold rounded-md transition-all bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-900 dark:hover:bg-cyan-400">
        Challenge your family to beat your score!
      </button>
    </div>
  );
};

export default FamilyDashboard;