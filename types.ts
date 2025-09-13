export interface Level {
  name: string;
  minXp: number;
  maxXp?: number; // Optional for the highest level
  color: string;
}

export interface User {
  name: string;
  xp: number;
  securityScore: number;
  achievements?: Achievement[];
}

export interface ChallengeTask {
  id: string;
  description: string;
  completed: boolean;
  points: number;
}

export interface SuspiciousElement {
  id: string;
  reason: string;
}

export interface PhishingEmail {
  id: string;
  sender: string;
  subject: string;
  body: string;
  isPhishing: boolean;
  suspiciousElements: SuspiciousElement[];
}

// Password Strength Game Types
export interface PasswordCriteria {
  id: string;
  label: string;
  description: string;
  met: boolean;
  points: number;
}

export interface PasswordStrengthLevel {
  name: string;
  minScore: number;
  color: string;
  description: string;
}

export interface PasswordChallenge {
  id: string;
  title: string;
  description: string;
  scenario: string;
  requirements: string[];
  mockPasswords: string[];
  correctPassword: string;
  points: number;
  completed: boolean;
}

export interface PasswordTip {
  id: string;
  title: string;
  description: string;
  category: 'general' | 'creation' | 'management' | 'security';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  points: number;
  requirement: string;
}

interface BaseContent {
    title: string;
    details: string[];
}

type TaskContent = BaseContent & {
    type: 'tasks';
    tasks: ChallengeTask[];
};

type PhishingGameContent = BaseContent & {
    type: 'phishing-game';
    emails: PhishingEmail[];
    tasks: ChallengeTask[]; // For XP calculation
};

type PasswordGameContent = BaseContent & {
    type: 'password-game';
    challenges: PasswordChallenge[];
    tips: PasswordTip[];
    tasks: ChallengeTask[]; // For XP calculation
};

export interface ChallengeCategory {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  points: number;
  content: TaskContent | PhishingGameContent | PasswordGameContent;
}
