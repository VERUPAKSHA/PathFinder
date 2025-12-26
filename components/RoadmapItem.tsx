
import React, { useState } from 'react';
import { CareerPath } from '../types';
import { 
  AcademicCapIcon, 
  BriefcaseIcon,
  StarIcon as StarOutline,
  PlusCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

interface RoadmapItemProps {
  path: CareerPath;
  index: number;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onAddToCompare: (path: CareerPath) => void;
  isInCompareList: boolean;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ 
  path, 
  index, 
  isBookmarked, 
  onToggleBookmark, 
  onAddToCompare,
  isInCompareList 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 !== 0; // 0, 2, 4 are "left", 1, 3, 5 are "right" (0-based)
  
  // Color mapping based on index or stream if preferred
  const colors = [
    'from-rose-500 to-rose-600',
    'from-slate-700 to-slate-800',
    'from-indigo-500 to-indigo-600',
    'from-orange-500 to-orange-600',
    'from-purple-500 to-purple-600',
    'from-lime-600 to-lime-700',
    'from-violet-500 to-violet-600',
    'from-pink-500 to-pink-600'
  ];
  const colorClass = colors[index % colors.length];

  return (
    <div className={`relative flex w-full items-center mb-12 md:mb-8 ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Background Number */}
      <div className={`absolute -top-6 text-7xl font-black opacity-10 select-none ${isEven ? 'right-4 md:right-auto md:left-24' : 'left-4 md:left-auto md:right-24'}`}>
        {(index + 1).toString().padStart(2, '0')}
      </div>

      {/* Text Content Area */}
      <div className={`w-1/2 px-4 md:px-12 flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'}`}>
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          {path.subStream}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-xs line-clamp-2 md:line-clamp-none">
          {path.description}
        </p>
        
        <div className={`flex gap-3 mt-4 ${isEven ? '' : 'flex-row-reverse'}`}>
          <button 
            onClick={() => onToggleBookmark(path.id)}
            className="text-slate-400 hover:text-yellow-500 transition-colors"
          >
            {isBookmarked ? <StarSolid className="w-5 h-5 text-yellow-500" /> : <StarOutline className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => onAddToCompare(path)}
            disabled={isInCompareList}
            className={`text-slate-400 hover:text-primary-500 transition-colors ${isInCompareList ? 'text-primary-400' : ''}`}
          >
            <PlusCircleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Central Connector & Hexagon */}
      <div className="relative flex items-center justify-center z-10">
        {/* The Colored Hex/Chevron Shape */}
        <div 
          className={`h-24 md:h-28 w-32 md:w-40 bg-gradient-to-br ${colorClass} shadow-xl flex items-center justify-center transition-transform hover:scale-105 cursor-pointer`}
          style={{
            clipPath: isEven 
              ? 'polygon(20% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 50%)' 
              : 'polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%)'
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm border border-white/30">
            <AcademicCapIcon className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Spacer for the other side */}
      <div className="w-1/2" />

      {/* Expanded Roadmap Drawer */}
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 z-20 mt-4 px-4">
          <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-start mb-6">
              <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">{path.subStream} Roadmap</h4>
              <button onClick={() => setIsExpanded(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                <ChevronUpIcon className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1 bg-primary-500 rounded-full" />
                <div>
                  <p className="text-xs font-bold uppercase text-slate-400 mb-1">Duration & Focus</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{path.duration}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-slate-400 mb-2">Available Degree Paths</p>
                <div className="flex flex-wrap gap-2">
                  {path.courses.map(c => (
                    <span key={c} className="px-2 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs rounded-lg text-slate-700 dark:text-slate-300">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-slate-400 mb-2">Career Outcomes</p>
                <div className="flex flex-wrap gap-2">
                  {path.outcomes.map(o => (
                    <span key={o} className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-xs rounded-lg text-emerald-700 dark:text-emerald-300">
                      {o}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-2xl">
                <p className="text-xs font-bold uppercase text-primary-500 mb-2">Next Steps</p>
                <ul className="text-sm text-primary-700 dark:text-primary-300 space-y-1">
                  {path.nextSteps.map(s => <li key={s}>• {s}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapItem;
