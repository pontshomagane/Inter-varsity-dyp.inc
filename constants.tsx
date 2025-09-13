
import React from 'react';
import type { User, Level, ChallengeCategory, PhishingEmail } from './types';

const PasswordIcon = ({ className = "h-8 w-8" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const PhishingIcon = ({ className = "h-8 w-8" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const WifiIcon = ({ className = "h-8 w-8" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.555a5.5 5.5 0 017.778 0M12 20.25a.75.75 0 01.75-.75h.008a.75.75 0 010 1.5H12.75a.75.75 0 01-.75-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.222 12.333a10.5 10.5 0 0115.556 0" />
    </svg>
);

export const MOCK_USER: User = {
  name: 'Agent X',
  xp: 1250,
  securityScore: 68,
};

// FIX: Property 'color' is missing in type '{ name: string; minXp: any; }' but required in type 'Level'.
export const LEVELS: Level[] = [
  { name: 'Rookie', minXp: 0, maxXp: 999, color: 'text-gray-400' },
  { name: 'Agent', minXp: 1000, maxXp: 2499, color: 'text-cyan-400' },
  { name: 'Specialist', minXp: 2500, maxXp: 4999, color: 'text-indigo-400' },
  { name: 'Master', minXp: 5000, color: 'text-amber-400' },
];

// FIX: Module '"./constants"' has no exported member 'CHALLENGE_CATEGORIES'.
export const CHALLENGE_CATEGORIES: ChallengeCategory[] = [
    {
      id: 'password-strength',
      title: 'Password Fortress',
      description: 'Learn to create and manage strong, unique passwords for all your accounts.',
      icon: <PasswordIcon />,
      points: 350,
      content: {
        type: 'tasks',
        title: 'Password Fortress: The First Line of Defense',
        details: [
          "Your password is the key to your digital life. A strong password is a complex, unique combination of letters, numbers, and symbols that is difficult for others to guess.",
          "In this module, you'll learn the essential principles of password security to build an impenetrable fortress around your sensitive information."
        ],
        tasks: [
          { id: 'ps-1', description: 'Enable Two-Factor Authentication (2FA) on a mock social media account.', completed: true, points: 100 },
          { id: 'ps-2', description: 'Create a password with at least 12 characters, including uppercase, lowercase, numbers, and symbols.', completed: false, points: 150 },
          { id: 'ps-3', description: 'Use a password manager to securely store your new password.', completed: false, points: 100 },
        ],
      },
    },
    {
      id: 'phishing-awareness',
      title: 'Phishing Net',
      description: 'Master the art of identifying and avoiding deceptive phishing attempts.',
      icon: <PhishingIcon />,
      points: 400,
      content: {
        type: 'tasks',
        title: 'Spot the Phish: Don\'t Get Hooked',
        details: [
          "Phishing attacks use deceptive emails, messages, and websites to trick you into revealing personal information, like passwords and credit card numbers.",
          "This module will sharpen your senses to detect the subtle red flags of phishing scams and protect you from taking the bait."
        ],
        tasks: [
          { id: 'pa-1', description: 'Identify the suspicious link in a sample phishing email.', completed: true, points: 100 },
          { id: 'pa-2', description: 'Verify the sender\'s email address for legitimacy.', completed: true, points: 100 },
          { id: 'pa-3', description: 'Report a phishing attempt using the "Report Phishing" button.', completed: false, points: 100 },
          { id: 'pa-4', description: 'Explain why a sense of urgency in an email is a red flag.', completed: false, points: 100 },
        ],
      },
    },
    {
      id: 'public-wifi',
      title: 'Secure Wi-Fi',
      description: 'Navigate public Wi-Fi networks safely and protect your data from prying eyes.',
      icon: <WifiIcon />,
      points: 250,
      content: {
        type: 'tasks',
        title: 'Public Wi-Fi: A Hacker\'s Playground',
        details: [
          "Public Wi-Fi is convenient, but it can be a minefield of security risks. Unsecured networks can expose your personal information to anyone nearby.",
          "Learn how to connect to public Wi-Fi safely, using tools like VPNs to encrypt your connection and keep your data private."
        ],
        tasks: [
          { id: 'wf-1', description: 'Connect to a mock public Wi-Fi using a VPN.', completed: false, points: 150 },
          { id: 'wf-2', description: 'Disable auto-connect for open Wi-Fi networks on your device.', completed: false, points: 100 },
        ],
      },
    },
  ];
