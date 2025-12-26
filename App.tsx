
import React, { useState, useEffect, useMemo } from 'react';
import { StreamType, CareerPath } from './types';
import { CAREER_PATHS } from './data';
import StreamSelector from './components/StreamSelector';
import PathCard from './components/PathCard';
import PathDetails from './components/PathDetails';
import ComparisonTool from './components/ComparisonTool';
import { 
  SunIcon, 
  MoonIcon, 
  BookmarkIcon, 
  ArrowsRightLeftIcon,
  BookOpenIcon,
  SparklesIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

type ViewState = 'home' | 'stream' | 'details';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [activeStream, setActiveStream] = useState<StreamType>(StreamType.SCIENCE);
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<CareerPath[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('pathfinder_bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
    
    const savedDarkMode = localStorage.getItem('pathfinder_theme');
    if (savedDarkMode === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Persist Data
  useEffect(() => {
    localStorage.setItem('pathfinder_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pathfinder_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pathfinder_theme', 'light');
    }
  };

  const handleStreamSelect = (stream: StreamType) => {
    setActiveStream(stream);
    setCurrentView('stream');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePathSelect = (id: string) => {
    setSelectedPathId(id);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const addToCompare = (path: CareerPath) => {
    if (compareList.length >= 2) {
      alert("You can compare up to 2 paths at a time.");
      return;
    }
    if (!compareList.find(p => p.id === path.id)) {
      setCompareList([...compareList, path]);
    }
    setIsCompareOpen(true);
  };

  const removeFromCompare = (id: string) => {
    setCompareList(prev => prev.filter(p => p.id !== id));
  };

  const filteredPaths = useMemo(() => {
    return CAREER_PATHS.filter(p => p.stream === activeStream);
  }, [activeStream]);

  const bookmarkedPaths = useMemo(() => {
    return CAREER_PATHS.filter(p => bookmarks.includes(p.id));
  }, [bookmarks]);

  const activePathDetails = useMemo(() => {
    return CAREER_PATHS.find(p => p.id === selectedPathId) || null;
  }, [selectedPathId]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-20 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => { setCurrentView('home'); setSelectedPathId(null); }}
          >
            <div className="bg-primary-500 p-2 rounded-lg">
              <BookOpenIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">PathFinder</h1>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsCompareOpen(true)}
              className="p-2 rounded-lg relative hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowsRightLeftIcon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {compareList.length}
                </span>
              )}
            </button>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            >
              {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        
        {/* VIEW 1: HOME / DISCOVERY */}
        {currentView === 'home' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-[10px] font-semibold uppercase tracking-widest mb-4">
                <SparklesIcon className="w-3.5 h-3.5" />
                Empowering Your Future
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                What Can I Do <span className="text-primary-500 italic">After 10th?</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Choose a major field of study below to explore specific career pathways, professional degrees, and vocational opportunities.
              </p>
            </div>
            <StreamSelector activeStream={activeStream} onSelect={handleStreamSelect} />
            
            {/* Quick Bookmarks Access on Home */}
            {bookmarkedPaths.length > 0 && (
              <div className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-8">
                  <BookmarkIcon className="w-6 h-6 text-primary-500" />
                  <h3 className="text-2xl font-bold tracking-tight">Saved for Later</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {bookmarkedPaths.map(path => (
                    <PathCard 
                      key={path.id} 
                      path={path}
                      isBookmarked={true}
                      onToggleBookmark={toggleBookmark}
                      onAddToCompare={addToCompare}
                      onViewDetails={handlePathSelect}
                      isInCompareList={compareList.some(p => p.id === path.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: STREAM RESULTS */}
        {currentView === 'stream' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-semibold mb-8 group"
            >
              <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Streams
            </button>

            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                {activeStream} Opportunities
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Detailed career roadmaps available in the {activeStream} sector.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPaths.map((path) => (
                <PathCard 
                  key={path.id} 
                  path={path}
                  isBookmarked={bookmarks.includes(path.id)}
                  onToggleBookmark={toggleBookmark}
                  onAddToCompare={addToCompare}
                  onViewDetails={handlePathSelect}
                  isInCompareList={compareList.some(p => p.id === path.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: PATH DETAILS */}
        {currentView === 'details' && activePathDetails && (
          <PathDetails 
            path={activePathDetails} 
            onBack={() => setCurrentView('stream')}
            isBookmarked={bookmarks.includes(activePathDetails.id)}
            onToggleBookmark={toggleBookmark}
          />
        )}

      </main>

      {/* Comparison Drawer Modal */}
      {isCompareOpen && (
        <ComparisonTool 
          items={compareList} 
          onRemove={removeFromCompare} 
          onClose={() => setIsCompareOpen(false)} 
        />
      )}

      {/* Footer */}
      <footer className="mt-20 py-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 dark:text-slate-500 text-xs font-medium tracking-wide">
            &copy; {new Date().getFullYear()} PathFinder Guidance Platform. Helping students navigate the future.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
