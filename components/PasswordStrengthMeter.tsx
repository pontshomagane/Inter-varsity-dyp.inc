

import React from 'react';

interface PasswordStrengthMeterProps {
  password?: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password = '' }) => {
  const checkStrength = () => {
    let score = 0;
    if (password.length > 0 && password.length < 8) score = 1;
    else {
      if (password.length >= 12) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;
    }

    if (score === 1) return { level: 0, text: 'Weak', colorClass: 'red' };
    if (score === 2) return { level: 1, text: 'Medium', colorClass: 'yellow' };
    if (score >= 3) return { level: 2, text: 'Strong', colorClass: 'green' };
    return { level: -1, text: '', colorClass: 'slate' };
  };

  const strength = checkStrength();
  const strengthLevels = [
    { text: 'Weak', color: 'bg-red-500' },
    { text: 'Medium', color: 'bg-yellow-400' },
    { text: 'Strong', color: 'bg-green-400' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-1 h-5">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Password Strength</span>
        {strength.text && <span className={`text-sm font-bold text-${strength.colorClass}-500 dark:text-${strength.colorClass}-400`}>{strength.text}</span>}
      </div>
      <div className="flex w-full h-2 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 space-x-1">
        {strengthLevels.map((level, index) => (
            <div
              key={level.text}
              className={`w-1/3 h-full rounded-sm transition-colors duration-300 ${index <= strength.level ? level.color : 'bg-slate-200 dark:bg-slate-700'}`}
            ></div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;