// FIX: Implemented the missing Badge component. This file was previously a placeholder. It displays achievement badges.
import React from 'react';
import type { BadgeType } from '../types';

interface BadgeProps {
  type: BadgeType;
}

const icons: Record<string, React.ReactNode> = {
    KeyIcon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>,
    EyeIcon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    ShieldCheckIcon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>,
    UsersIcon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 12a4.5 4.5 0 014.5 4.5v.228a2.25 2.25 0 01-2.25 2.25h-4.5a2.25 2.25 0 01-2.25-2.25v-.228a4.5 4.5 0 014.5-4.5z" /></svg>,
    StarIcon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
};


const BADGE_CONFIG: Record<BadgeType, { icon: React.ReactNode; color: string }> = {
  "Fortress Architect": { icon: icons.KeyIcon, color: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 border-blue-500/30 dark:border-blue-500" },
  "Net Caster": { icon: icons.EyeIcon, color: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300 border-purple-500/30 dark:border-purple-500" },
  "Shield Bearer": { icon: icons.ShieldCheckIcon, color: "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-300 border-green-500/30 dark:border-green-500" },
  "Mind Reader": { icon: icons.UsersIcon, color: "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-300 border-yellow-500/30 dark:border-yellow-500" },
  "Privacy Paragon": { icon: icons.StarIcon, color: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-400/20 dark:text-cyan-300 border-cyan-500/30 dark:border-cyan-400" },
};

const Badge: React.FC<BadgeProps> = ({ type }) => {
    const config = BADGE_CONFIG[type];

    if (!config) return null;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.color}`}>
      {config.icon}
      <span className="font-bold text-sm">{type}</span>
    </div>
  );
};

export default Badge;