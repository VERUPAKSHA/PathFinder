
import React from 'react';
import { CareerPath } from '../types';
import { XMarkIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

interface ComparisonToolProps {
  items: CareerPath[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

const ComparisonTool: React.FC<ComparisonToolProps> = ({ items, onRemove, onClose }) => {
  if (items.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <ArrowsRightLeftIcon className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Comparison Guide</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50">
                <th className="p-6 text-sm font-bold uppercase text-slate-400 tracking-wider w-1/4">Aspect</th>
                {items.map((item) => (
                  <th key={item.id} className="p-6 w-1/3 relative group">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary-500 mb-1">{item.stream}</span>
                      <span className="text-lg font-bold text-slate-800 dark:text-slate-100">{item.subStream}</span>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="absolute top-4 right-4 p-1 rounded-full bg-red-100 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </th>
                ))}
                {items.length === 1 && <th className="p-6 bg-slate-50 dark:bg-slate-900/20 text-slate-400 italic">Add another path to compare...</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              <tr>
                <td className="p-6 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/20">Typical Duration</td>
                {items.map(item => <td key={item.id} className="p-6 text-slate-600 dark:text-slate-400">{item.duration}</td>)}
                {items.length === 1 && <td></td>}
              </tr>
              <tr>
                <td className="p-6 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/20">Initial Courses</td>
                {items.map(item => (
                  <td key={item.id} className="p-6">
                    <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                      {item.courses.slice(0, 3).map(c => <li key={c}>{c}</li>)}
                    </ul>
                  </td>
                ))}
                {items.length === 1 && <td></td>}
              </tr>
              <tr>
                <td className="p-6 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/20">Future Prospects</td>
                {items.map(item => (
                  <td key={item.id} className="p-6">
                    <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                      {item.nextSteps.slice(0, 3).map(s => <li key={s}>{s}</li>)}
                    </ul>
                  </td>
                ))}
                {items.length === 1 && <td></td>}
              </tr>
              <tr>
                <td className="p-6 font-bold text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/20">Job Roles</td>
                {items.map(item => (
                  <td key={item.id} className="p-6">
                    <div className="flex flex-wrap gap-1">
                      {item.outcomes.slice(0, 3).map(o => (
                        <span key={o} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-[10px] rounded">{o}</span>
                      ))}
                    </div>
                  </td>
                ))}
                {items.length === 1 && <td></td>}
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Compare paths to understand their differences in study duration, cost, and career outcomes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTool;
