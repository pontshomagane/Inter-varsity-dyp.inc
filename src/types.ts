// FIX: Implemented the missing type definitions for the application. This file was previously a placeholder.
import React from 'react';

export interface Task {
  id: string;
  description: string;
  points: number;
  completed: boolean;
}

export interface PasswordGameContent {
  type: 'password-game';
  tasks: Task[];
  tips: string[];
}

export interface PhishingEmail {
  id: string;
  sender: string;
  subject: string;
  body: string;
  isPhishing: boolean;
  suspiciousElements: { id: string; reason: string }[];
}

export interface PhishingGameContent {
  type: 'phishing-game';
  tasks: Task[];
  emails: PhishingEmail[];
}

export interface TwoFactorMethod {
    id: string;
    name: string;
    description: string;
    pros: string[];
    cons: string[];
}

export interface TwoFactorGameContent {
    type: '2fa-game';
    tasks: Task[];
    methods: TwoFactorMethod[];
}

export interface SocialEngineeringScenario {
    id: string;
    type: string;
    title: string;
    description: string;
    options: { text: string; isCorrect: boolean }[];
    feedback: { correct: string; incorrect: string };
}

export interface SocialEngineeringGameContent {
    type: 'social-engineering-game';
    tasks: Task[];
    scenarios: SocialEngineeringScenario[];
}

export type ChallengeContent = PasswordGameContent | PhishingGameContent | TwoFactorGameContent | SocialEngineeringGameContent;

export interface ChallengeCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: ChallengeContent;
}

export interface UserProgress {
    xp: number;
    level: number;
    score: number;
}

export type BadgeType = "Fortress Architect" | "Net Caster" | "Shield Bearer" | "Mind Reader" | "Privacy Paragon";

export interface Achievement {
    id: string;
    name: BadgeType;
    description: string;
    unlocked: boolean;
    timestamp?: number;
}