
import React from 'react';
import { CareerPath } from '../types';
import { 
  ArrowLeftIcon, 
  AcademicCapIcon, 
  BriefcaseIcon, 
  ClockIcon, 
  ChartBarIcon,
  BookmarkIcon,
  StarIcon as StarOutline,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';

interface PathDetailsProps {
  path: CareerPath;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

const PathDetails: React.FC<PathDetailsProps> = ({ path, onBack, isBookmarked, onToggleBookmark }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Navigation Header */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-semibold mb-8 group"
      >
        <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to {path.stream} Results
      </button>

      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-bold uppercase tracking-wider">
                {path.stream}
              </span>
              <div className="flex items-center gap-1 text-slate-400">
                <ClockIcon className="w-4 h-4" />
                <span className="text-xs font-medium">{path.duration}</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              {path.subStream}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {path.description}
            </p>
          </div>
          <button 
            onClick={() => onToggleBookmark(path.id)}
            className={`p-4 rounded-2xl border-2 transition-all ${
              isBookmarked 
                ? 'bg-yellow-50 border-yellow-200 text-yellow-600 dark:bg-yellow-900/20 dark:border-yellow-800' 
                : 'bg-white border-slate-100 hover:border-slate-200 text-slate-400 dark:bg-slate-700 dark:border-slate-600'
            }`}
          >
            {isBookmarked ? <StarSolid className="w-8 h-8" /> : <StarOutline className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Courses Section */}
          <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <AcademicCapIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Undergraduate Pathways</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {path.courses.map((course, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{course}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Outcomes Section */}
          <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                <BriefcaseIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Professional Outcomes</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {path.outcomes.map((outcome, i) => (
                <span key={i} className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-xl text-sm font-bold border border-emerald-100 dark:border-emerald-800">
                  {outcome}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Future Steps */}
          <section className="bg-primary-600 rounded-3xl p-8 text-white shadow-lg shadow-primary-500/20">
            <div className="flex items-center gap-3 mb-6">
              <PaperAirplaneIcon className="w-6 h-6 text-primary-200" />
              <h2 className="text-xl font-bold">What Comes Next?</h2>
            </div>
            <ul className="space-y-4">
              {path.nextSteps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-primary-50">{step}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Market Insight Placeholder */}
          <section className="bg-slate-900 rounded-3xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <ChartBarIcon className="w-6 h-6 text-slate-400" />
              <h2 className="text-lg font-bold">Industry Demand</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-sm text-slate-400">Demand Score</span>
                <span className="text-2xl font-black text-primary-400">High</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 w-[85%]" />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Professionals in this field are currently seeing 15% year-on-year growth in global markets.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PathDetails;
