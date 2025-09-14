import React from 'react';

const ScamStory: React.FC = () => {
  return (
    <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-yellow-500/10 rounded-full border border-yellow-500/20 text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Scam Stories & Successes</h3>
      </div>

      <div className="space-y-6">
        {/* Testimonial Section */}
        <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 bg-slate-100 dark:bg-slate-900/50 rounded-r-lg">
          <p className="italic text-slate-600 dark:text-slate-300">
            "DYP.inc saved me R3,500 last week from a clever delivery scam. The phishing module was a lifesaver!"
          </p>
          <cite className="block text-right text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2">— Alex, Cape Town</cite>
        </blockquote>

        {/* Interactive Story Section */}
        <div className="bg-slate-100 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">From Victim to Victor</h4>
            <div className="flex items-center justify-between gap-4 mt-2">
                <div className="flex-grow">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                        Follow Sarah's journey from falling for a simple scam to becoming her family's designated cyber warrior.
                    </p>
                    <button className="px-3 py-1.5 text-xs font-bold rounded-md transition-all bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-900 dark:hover:bg-cyan-400">
                        Read Sarah's Story
                    </button>
                </div>
                <div className="text-center flex-shrink-0">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Sarah's Score</p>
                    <div className="flex items-center gap-2 font-bold">
                        <span className="text-red-500 text-lg">15%</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        <span className="text-green-500 text-lg">92%</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ScamStory;
