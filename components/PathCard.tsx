
import React from 'react';
import { CareerPath } from '../types';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  ArrowRightIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

interface PathCardProps {
  path: CareerPath;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onAddToCompare: (path: CareerPath) => void;
  onViewDetails: (id: string) => void;
  isInCompareList: boolean;
}

const PathCard: React.FC<PathCardProps> = ({ 
  path, 
  isBookmarked, 
  onToggleBookmark, 
  onAddToCompare,
  onViewDetails,
  isInCompareList 
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 mb-2">
              {path.subStream}
            </span>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-primary-600 transition-colors">
              {path.subStream}
            </h3>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => onAddToCompare(path)}
              disabled={isInCompareList}
              className={`p-2 rounded-full transition-colors ${
                isInCompareList 
                  ? 'text-primary-500' 
                  : 'text-slate-400 hover:text-primary-500'
              }`}
            >
              <PlusCircleIcon className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onToggleBookmark(path.id)}
              className="p-2 rounded-full text-slate-400 hover:text-yellow-500 transition-colors"
            >
              {isBookmarked ? (
                <StarSolid className="w-5 h-5 text-yellow-500" />
              ) : (
                <StarOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 min-h-[40px]">
          {path.description}
        </p>

        <div className="flex items-center gap-4 text-slate-400 text-[11px] font-semibold mb-6">
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>{path.duration.split('+')[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <AcademicCapIcon className="w-4 h-4" />
            <span>{path.courses.length} Degrees</span>
          </div>
        </div>

        <button 
          onClick={() => onViewDetails(path.id)}
          className="w-full py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex items-center justify-between font-bold text-sm hover:bg-primary-600 hover:text-white transition-all group/btn"
        >
          <span>Explore Roadmap</span>
          <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default PathCard;
