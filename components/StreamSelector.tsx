
import React from 'react';
import { StreamType } from '../types';
import { 
  BeakerIcon, 
  CurrencyDollarIcon, 
  PaintBrushIcon, 
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline';

interface StreamSelectorProps {
  activeStream: StreamType;
  onSelect: (stream: StreamType) => void;
}

const StreamSelector: React.FC<StreamSelectorProps> = ({ activeStream, onSelect }) => {
  const streams = [
    { 
      type: StreamType.SCIENCE, 
      icon: BeakerIcon, 
      color: 'from-rose-500 to-rose-600', 
      text: 'Exploring the laws of nature, innovation, and engineering.' 
    },
    { 
      type: StreamType.COMMERCE, 
      icon: CurrencyDollarIcon, 
      color: 'from-slate-700 to-slate-800', 
      text: 'Business, finance, trade, and economic management.' 
    },
    { 
      type: StreamType.ARTS, 
      icon: PaintBrushIcon, 
      color: 'from-indigo-500 to-indigo-600', 
      text: 'Creativity, social sciences, history, and humanities.' 
    },
    { 
      type: StreamType.VOCATIONAL, 
      icon: WrenchScrewdriverIcon, 
      color: 'from-orange-500 to-orange-600', 
      text: 'Hands-on training, skills, and industry specializations.' 
    },
  ];

  return (
    <div className="relative max-w-4xl mx-auto py-10 px-4">
      {/* Central Vertical Spine */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block" />

      <div className="flex flex-col gap-12 md:gap-0">
        {streams.map((stream, index) => {
          const Icon = stream.icon;
          const isEven = index % 2 !== 0;
          const isActive = activeStream === stream.type;
          
          return (
            <div 
              key={stream.type} 
              className={`relative flex w-full items-center md:h-32 mb-4 md:mb-0 cursor-pointer group ${isEven ? 'flex-row-reverse' : 'flex-row'}`}
              onClick={() => onSelect(stream.type)}
            >
              {/* Background Number */}
              <div className={`absolute top-0 text-7xl font-bold opacity-10 select-none group-hover:opacity-15 transition-opacity ${isEven ? 'right-4 md:right-auto md:left-16' : 'left-4 md:left-auto md:right-16'}`}>
                {(index + 1).toString().padStart(2, '0')}
              </div>

              {/* Text Side */}
              <div className={`w-full md:w-1/2 px-6 md:px-12 flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'}`}>
                <h3 className={`text-xl md:text-2xl font-bold mb-1 transition-colors tracking-tight ${isActive ? 'text-primary-500' : 'text-slate-800 dark:text-slate-100'}`}>
                  {stream.type}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-xs hidden md:block font-medium">
                  {stream.text}
                </p>
              </div>

              {/* Infographic Shape (The Button UI) */}
              <div className="relative flex items-center justify-center z-10 shrink-0">
                <div 
                  className={`h-20 w-28 md:h-24 md:w-36 bg-gradient-to-br ${stream.color} shadow-lg flex items-center justify-center transition-all duration-300 transform ${isActive ? 'scale-110 shadow-primary-500/20 ring-4 ring-primary-500/30' : 'hover:scale-105 group-hover:shadow-xl'}`}
                  style={{
                    clipPath: isEven 
                      ? 'polygon(20% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 50%)' 
                      : 'polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%)'
                  }}
                >
                  <div className="bg-white/20 p-2 md:p-3 rounded-xl backdrop-blur-sm border border-white/30">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Spacer for desktop layout */}
              <div className="hidden md:block w-1/2" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StreamSelector;
