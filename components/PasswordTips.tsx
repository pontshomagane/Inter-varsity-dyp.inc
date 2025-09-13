import React, { useState } from 'react';
import type { PasswordTip } from '../types';

interface PasswordTipsProps {
  tips: PasswordTip[];
}

const PasswordTips: React.FC<PasswordTipsProps> = ({ tips }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Tips', color: 'bg-slate-600' },
    { id: 'general', label: 'General', color: 'bg-blue-600' },
    { id: 'creation', label: 'Creation', color: 'bg-green-600' },
    { id: 'management', label: 'Management', color: 'bg-purple-600' },
    { id: 'security', label: 'Security', color: 'bg-red-600' }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general':
        return '💡';
      case 'creation':
        return '🔑';
      case 'management':
        return '📱';
      case 'security':
        return '🛡️';
      default:
        return '💡';
    }
  };

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? `${category.color} text-white`
                : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Tips List */}
      <div className="space-y-3">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="bg-slate-700 p-4 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{getCategoryIcon(tip.category)}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">{tip.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTips.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No tips found for the selected category.</p>
        </div>
      )}
    </div>
  );
};

export default PasswordTips;
