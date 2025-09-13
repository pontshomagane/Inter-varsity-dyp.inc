import React, { useState, useMemo, useCallback } from 'react';
import type { PasswordCriteria, PasswordStrengthLevel, PasswordChallenge, PasswordTip, Achievement } from '../types';
import PasswordMeter from './PasswordMeter';
import PasswordChecklist from './PasswordChecklist';
import PasswordChallenges from './PasswordChallenges';
import PasswordTips from './PasswordTips';
import AchievementTracker from './AchievementTracker';

interface PasswordStrengthGameProps {
  onCompleteTask: (challengeId: string, taskId: string) => void;
  userAchievements?: Achievement[];
}

const PasswordStrengthGame: React.FC<PasswordStrengthGameProps> = ({ 
  onCompleteTask, 
  userAchievements = [] 
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState<PasswordChallenge | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [showTips, setShowTips] = useState(false);

  // Password strength levels
  const strengthLevels: PasswordStrengthLevel[] = [
    { name: 'Very Weak', minScore: 0, color: 'text-red-500', description: 'Easily crackable' },
    { name: 'Weak', minScore: 20, color: 'text-orange-500', description: 'Vulnerable to attacks' },
    { name: 'Fair', minScore: 40, color: 'text-yellow-500', description: 'Basic protection' },
    { name: 'Good', minScore: 60, color: 'text-blue-500', description: 'Decent security' },
    { name: 'Strong', minScore: 80, color: 'text-green-500', description: 'Excellent protection' },
    { name: 'Very Strong', minScore: 95, color: 'text-emerald-500', description: 'Maximum security' }
  ];

  // Password criteria with points
  const passwordCriteria: PasswordCriteria[] = useMemo(() => [
    {
      id: 'length',
      label: 'At least 12 characters',
      description: 'Longer passwords are harder to crack',
      met: currentPassword.length >= 12,
      points: 5
    },
    {
      id: 'uppercase',
      label: 'Uppercase letters (A-Z)',
      description: 'Adds complexity to your password',
      met: /[A-Z]/.test(currentPassword),
      points: 5
    },
    {
      id: 'lowercase',
      label: 'Lowercase letters (a-z)',
      description: 'Essential for password diversity',
      met: /[a-z]/.test(currentPassword),
      points: 5
    },
    {
      id: 'numbers',
      label: 'Numbers (0-9)',
      description: 'Increases password entropy',
      met: /[0-9]/.test(currentPassword),
      points: 5
    },
    {
      id: 'symbols',
      label: 'Special symbols (!@#$%^&*)',
      description: 'Maximum security enhancement',
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(currentPassword),
      points: 5
    },
    {
      id: 'no-common',
      label: 'No common patterns',
      description: 'Avoids predictable sequences',
      met: !/(123|abc|qwe|password|admin)/i.test(currentPassword),
      points: 5
    }
  ], [currentPassword]);

  // Calculate password strength score
  const passwordScore = useMemo(() => {
    const metCriteria = passwordCriteria.filter(criteria => criteria.met);
    const totalPoints = metCriteria.reduce((sum, criteria) => sum + criteria.points, 0);
    return Math.min(totalPoints * 4, 100); // Scale to 100
  }, [passwordCriteria]);

  // Get current strength level
  const currentStrengthLevel = useMemo(() => {
    return strengthLevels
      .slice()
      .reverse()
      .find(level => passwordScore >= level.minScore) || strengthLevels[0];
  }, [passwordScore, strengthLevels]);

  // Password challenges for different scenarios
  const passwordChallenges: PasswordChallenge[] = [
    {
      id: 'banking-challenge',
      title: 'Banking Account',
      description: 'Create a password for your online banking account',
      scenario: 'You need to secure your most sensitive financial information. Choose the strongest password from the options below.',
      requirements: ['At least 16 characters', 'Mix of all character types', 'No personal information'],
      mockPasswords: [
        'password123',
        'Bank2024!',
        'MyBank$ecure2024!@#',
        '123456789',
        'BankingPassword2024!@#$%^&*()'
      ],
      correctPassword: 'BankingPassword2024!@#$%^&*()',
      points: 50,
      completed: false
    },
    {
      id: 'social-media-challenge',
      title: 'Social Media Account',
      description: 'Secure your social media presence',
      scenario: 'Protect your social media account from hackers and impersonators.',
      requirements: ['At least 12 characters', 'Uppercase and lowercase', 'Numbers and symbols'],
      mockPasswords: [
        'mypassword',
        'Social2024',
        'MySocial$ecure2024!',
        'social123',
        'SocialMedia2024!@#'
      ],
      correctPassword: 'MySocial$ecure2024!',
      points: 30,
      completed: false
    },
    {
      id: 'work-email-challenge',
      title: 'Work Email',
      description: 'Secure your professional email account',
      scenario: 'Your work email contains sensitive business information and client data.',
      requirements: ['At least 14 characters', 'Complex character mix', 'No dictionary words'],
      mockPasswords: [
        'work123',
        'Email2024!',
        'WorkEmail$ecure2024!@#',
        'password',
        'Professional2024!@#$%^&*()'
      ],
      correctPassword: 'Professional2024!@#$%^&*()',
      points: 40,
      completed: false
    }
  ];

  // Password tips
  const passwordTips: PasswordTip[] = [
    {
      id: 'tip-1',
      title: 'Use a Passphrase',
      description: 'Instead of a single word, use a memorable phrase like "MyDogLoves2Play@ThePark!"',
      category: 'creation'
    },
    {
      id: 'tip-2',
      title: 'Avoid Personal Information',
      description: 'Never use your name, birthday, or other easily guessable personal details.',
      category: 'security'
    },
    {
      id: 'tip-3',
      title: 'Use a Password Manager',
      description: 'Password managers can generate and store unique, strong passwords for each account.',
      category: 'management'
    },
    {
      id: 'tip-4',
      title: 'Enable Two-Factor Authentication',
      description: 'Add an extra layer of security with 2FA, even if your password is compromised.',
      category: 'security'
    },
    {
      id: 'tip-5',
      title: 'Regular Updates',
      description: 'Change passwords regularly, especially for sensitive accounts like banking.',
      category: 'management'
    }
  ];

  // Handle password input
  const handlePasswordChange = useCallback((password: string) => {
    setCurrentPassword(password);
    
    // Update game score based on criteria met
    const newScore = passwordCriteria
      .filter(criteria => criteria.met)
      .reduce((sum, criteria) => sum + criteria.points, 0);
    setGameScore(newScore);
  }, [passwordCriteria]);

  // Handle challenge completion
  const handleChallengeComplete = useCallback((challengeId: string, selectedPassword: string) => {
    const challenge = passwordChallenges.find(c => c.id === challengeId);
    if (challenge && selectedPassword === challenge.correctPassword) {
      // Mark challenge as completed
      const updatedChallenges = passwordChallenges.map(c => 
        c.id === challengeId ? { ...c, completed: true } : c
      );
      
      // Award points
      setGameScore(prev => prev + challenge.points);
      
      // Complete the task in the main app
      onCompleteTask('password-strength', challengeId);
    }
  }, [passwordChallenges, onCompleteTask]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Password Strength Game</h1>
        <p className="text-gray-300 text-lg">
          Master the art of creating strong, secure passwords and protect your digital life!
        </p>
        <div className="mt-4">
          <span className="text-2xl font-bold text-cyan-400">Score: {gameScore}</span>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Password Input and Meter */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Test Your Password</h2>
            <div className="space-y-4">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Enter a password to test its strength..."
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <PasswordMeter 
                score={passwordScore} 
                strengthLevel={currentStrengthLevel}
              />
            </div>
          </div>

          <PasswordChecklist criteria={passwordCriteria} />
        </div>

        {/* Right Column - Challenges and Tips */}
        <div className="space-y-6">
          <PasswordChallenges 
            challenges={passwordChallenges}
            onChallengeSelect={setSelectedChallenge}
            onChallengeComplete={handleChallengeComplete}
          />
          
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Password Tips</h2>
              <button
                onClick={() => setShowTips(!showTips)}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
              >
                {showTips ? 'Hide Tips' : 'Show Tips'}
              </button>
            </div>
            {showTips && <PasswordTips tips={passwordTips} />}
          </div>
        </div>
      </div>

      {/* Achievement Tracker */}
      <AchievementTracker 
        achievements={userAchievements}
        gameScore={gameScore}
        completedChallenges={passwordChallenges.filter(c => c.completed).length}
      />
    </div>
  );
};

export default PasswordStrengthGame;
