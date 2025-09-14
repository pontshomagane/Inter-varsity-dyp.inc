import React from 'react';

const threats = [
  {
    id: 1,
    icon: '🚨',
    text: '2 hours ago: Fake "shipping update" SMS campaign detected.',
    colorClass: 'text-red-500',
  },
  {
    id: 2,
    icon: '⚠️',
    text: "6 hours ago: WhatsApp 'family emergency' scam surge in your area.",
    colorClass: 'text-yellow-500',
  },
    {
    id: 3,
    icon: '⚠️',
    text: '1 day ago: Public Wi-Fi network vulnerability advisory issued.',
    colorClass: 'text-yellow-500',
  },
  {
    id: 4,
    icon: '✅',
    text: '1,284 users protected today',
    colorClass: 'text-green-500',
  },
];

const ThreatFeed: React.FC = () => {
  return (
    <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-6 h-full animate-slide-in stagger-3 opacity-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Live Threat Feed</h3>
        <div className="flex items-center gap-1.5">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 animate-pulse"></span>
            <span className="text-xs font-medium text-red-500 dark:text-red-400">LIVE</span>
        </div>
      </div>
      <div className="space-y-3">
        {threats.map((threat) => {
            const parts = threat.text.split(':');
            const hasTimestamp = parts.length > 1;

            return (
                <div key={threat.id} className="flex items-start gap-3 text-sm pb-3 border-b border-slate-200/50 dark:border-slate-700/50 last:border-b-0 last:pb-0">
                    <span className={`flex-shrink-0 text-lg pt-0.5`}>{threat.icon}</span>
                    <p className="text-slate-600 dark:text-slate-300">
                    {hasTimestamp ? (
                        <>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{parts[0]}:</span>
                        {parts.slice(1).join(':')}
                        </>
                    ) : (
                        <span className={`${threat.colorClass} font-semibold`}>{threat.text}</span>
                    )}
                    </p>
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default ThreatFeed;