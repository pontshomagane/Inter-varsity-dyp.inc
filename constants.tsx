// FIX: Implemented the missing constants and initial data for challenges, levels, and achievements. This file was previously a placeholder.
import React from 'react';
import type { ChallengeCategory, Achievement, BadgeType } from './types';

const iconProps = {
    className: "h-8 w-8",
    strokeWidth: 1.5,
};

const KeyIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...iconProps} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>;
const EyeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...iconProps} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ShieldCheckIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...iconProps} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>;
const UsersIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...iconProps} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 12a4.5 4.5 0 014.5 4.5v.228a2.25 2.25 0 01-2.25 2.25h-4.5a2.25 2.25 0 01-2.25-2.25v-.228a4.5 4.5 0 014.5-4.5z" /></svg>;

export const LEVELS = [0, 100, 250, 500, 1000, 2000]; // XP thresholds for levels 1-6

export const ACHIEVEMENTS: Record<string, Omit<Achievement, 'unlocked' | 'timestamp'>> = {
    'password-master': { id: 'password-master', name: 'Fortress Architect' as BadgeType, description: 'Mastered the art of strong passwords.' },
    'phishing-spotter': { id: 'phishing-spotter', name: 'Net Caster' as BadgeType, description: 'Successfully identified all phishing threats.' },
    '2fa-enforcer': { id: '2fa-enforcer', name: 'Shield Bearer' as BadgeType, description: 'Secured accounts with two-factor authentication.' },
    'social-pro': { id: 'social-pro', name: 'Mind Reader' as BadgeType, description: 'Saw through the tricks of social engineering.' },
    'cyber-master': { id: 'cyber-master', name: 'Privacy Paragon' as BadgeType, description: 'Completed all security challenges.' },
};

export const INITIAL_CHALLENGES: ChallengeCategory[] = [
  {
    id: 'password-strength',
    title: 'Password Fortress',
    description: 'Learn to create and manage strong, unique passwords.',
    icon: KeyIcon,
    content: {
      type: 'password-game',
      tasks: [
        { id: 'ps-1', description: 'Make your password at least 12 characters long', points: 10, completed: false },
        { id: 'ps-2', description: 'Include at least one uppercase letter', points: 10, completed: false },
        { id: 'ps-3', description: 'Include at least one number', points: 10, completed: false },
        { id: 'ps-4', description: 'Include at least one special character', points: 20, completed: false },
      ],
      tips: [
        "Use a mix of letters, numbers, and symbols.",
        "Avoid common words, phrases, or personal information.",
        "Consider using a password manager to generate and store complex passwords.",
        "A long passphrase like 'CorrectHorseBatteryStaple' is both memorable and strong."
      ]
    }
  },
  {
    id: 'phishing-awareness',
    title: 'Phishing Net',
    description: 'Spot and report phishing attempts to protect your data.',
    icon: EyeIcon,
    content: {
      type: 'phishing-game',
      tasks: [{ id: 'ph-1', description: 'Complete the phishing email analysis', points: 50, completed: false }],
      emails: [
        {
          id: 'email-1',
          sender: 'Your Bank <support@yourbank.co>',
          subject: 'Urgent: Action Required on Your Account',
          body: "Dear Customer, we've detected suspicious activity on your account. Please <action-link>click here</action-link> immediately to verify your identity and secure your account. Failure to do so may result in temporary suspension. Thank you, Your Bank Security Team. <signature>www.yourbank.secure-login.com</signature>",
          isPhishing: true,
          suspiciousElements: [
            { id: 'action-link', reason: "Hovering over this link would reveal a suspicious URL, not your actual bank's website." },
            { id: 'signature', reason: "This URL is designed to look legitimate, but it's a common trick. The real domain is 'secure-login.com', not 'yourbank.co'." }
          ]
        },
        {
          id: 'email-2',
          sender: 'Project Team <no-reply@project-tools.com>',
          subject: 'Update: New task assigned to you in Project Phoenix',
          body: "Hi there, a new task 'Finalize Q3 report' has been assigned to you by Jane Doe. Due date is this Friday. You can view the task details on our project board. Thanks, The Project Team",
          isPhishing: false,
          suspiciousElements: []
        }
      ]
    }
  },
  {
    id: '2fa-setup',
    title: 'Digital Shield',
    description: 'Add a crucial second layer of security to your accounts.',
    icon: ShieldCheckIcon,
    content: {
      type: '2fa-game',
      tasks: [
        { id: '2fa-1', description: 'Choose a 2FA method', points: 20, completed: false },
        { id: '2fa-2', description: 'Enable 2FA on your simulated account', points: 30, completed: false }
      ],
      methods: [
        { id: 'auth-app', name: 'Authenticator App', description: 'Use an app like Google Authenticator or Authy to generate time-based codes.', pros: ["Very secure", "Works offline"], cons: ["Requires a separate device"] },
        { id: 'sms', name: 'SMS Codes', description: 'Receive a unique code via text message each time you log in.', pros: ["Convenient", "Uses your phone number"], cons: ["Vulnerable to SIM-swapping attacks"] },
        { id: 'security-key', name: 'Hardware Security Key', description: 'A physical device (like a YubiKey) that you plug in to authenticate.', pros: ["Most secure method", "Protects against phishing"], cons: ["Can be lost", "Requires purchase"] }
      ]
    }
  },
  {
    id: 'social-engineering',
    title: 'Human Firewall',
    description: 'Recognize and resist psychological manipulation tactics.',
    icon: UsersIcon,
    content: {
      type: 'social-engineering-game',
      tasks: [{ id: 'se-1', description: 'Complete the scenario analysis', points: 50, completed: false }],
      scenarios: [
          {
              id: 'scen-1',
              type: 'Phone Call (Vishing)',
              title: 'The "IT Support" Call',
              description: 'You receive a call from someone claiming to be from your company\'s IT department. They say they\'ve detected a virus on your computer and need you to install a "security patch" by visiting a website and running a file. What should you do?',
              options: [
                  { text: 'Follow their instructions to fix the problem quickly.', isCorrect: false },
                  { text: 'Thank them, hang up, and call the official IT support number from the company directory to verify.', isCorrect: true },
                  { text: 'Give them your password so they can log in and fix it for you.', isCorrect: false }
              ],
              feedback: {
                  correct: 'Excellent choice! Always verify unsolicited requests through official channels. This is a common pretexting tactic to get you to install malware.',
                  incorrect: 'This is a dangerous approach. The caller is likely a scammer trying to trick you into installing malware or giving up control of your computer.'
              }
          }
      ]
    }
  }
];