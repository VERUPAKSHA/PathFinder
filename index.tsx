
// --- PURE VANILLA JAVASCRIPT ---

// Fix: Imported shared types and constants to avoid re-declaring them locally
// and to ensure index.tsx is treated as a module, isolating its scope.
import { StreamType } from './types';
import { CAREER_PATHS } from './data';

// 2. State Management
let state = {
  view: 'home', // 'home', 'stream', 'details'
  activeStream: null,
  selectedPathId: null,
  bookmarks: JSON.parse(localStorage.getItem('pathfinder_bookmarks') || '[]'),
  compareList: [],
  isDarkMode: localStorage.getItem('pathfinder_theme') === 'dark'
};

// 3. Helper Functions
function saveState() {
  localStorage.setItem('pathfinder_bookmarks', JSON.stringify(state.bookmarks));
  localStorage.setItem('pathfinder_theme', state.isDarkMode ? 'dark' : 'light');
}

/**
 * Fix: Added explicit types for 'view' and 'params' to resolve TS2339 errors
 * where properties 'stream' and 'pathId' were accessed on an implicitly empty object type.
 */
function navigate(view: string, params: { stream?: string; pathId?: string } = {}) {
  (state as any).view = view;
  if (params.stream) (state as any).activeStream = params.stream;
  if (params.pathId) (state as any).selectedPathId = params.pathId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

function toggleBookmark(id: string) {
  if (state.bookmarks.includes(id)) {
    state.bookmarks = state.bookmarks.filter((b: string) => b !== id);
  } else {
    state.bookmarks.push(id);
  }
  saveState();
  render();
}

function toggleTheme() {
  state.isDarkMode = !state.isDarkMode;
  document.documentElement.classList.toggle('dark', state.isDarkMode);
  saveState();
  render();
}

// 4. UI Components (Templates)
const Navbar = () => `
  <nav class="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2 cursor-pointer" onclick="window.navigate('home')">
        <div class="bg-primary-500 p-2 rounded-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <h1 class="text-xl font-bold tracking-tight text-slate-800 dark:text-white">PathFinder</h1>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="window.toggleTheme()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
          ${state.isDarkMode ? '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>' : '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>'}
        </button>
      </div>
    </div>
  </nav>
`;

const HomeView = () => `
  <div class="fade-in max-w-7xl mx-auto px-4 py-8 md:py-16">
    <div class="text-center mb-16 max-w-3xl mx-auto">
      <span class="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-[10px] font-bold uppercase tracking-widest mb-4">Empowering Your Future</span>
      <h2 class="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">What Can I Do <span class="text-primary-500 italic">After 10th?</span></h2>
      <p class="text-lg text-slate-600 dark:text-slate-400">Choose your foundation. Click a stream below to explore career results.</p>
    </div>
    
    <div class="relative max-w-4xl mx-auto">
      <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block"></div>
      <div class="flex flex-col gap-8 md:gap-0">
        ${Object.values(StreamType).map((type, i) => {
          const isEven = i % 2 !== 0;
          const colors = ['from-rose-500 to-rose-600', 'from-slate-700 to-slate-800', 'from-indigo-500 to-indigo-600', 'from-orange-500 to-orange-600'];
          return `
            <div onclick="window.navigate('stream', {stream: '${type}'})" class="relative flex w-full items-center md:h-32 group cursor-pointer ${isEven ? 'flex-row-reverse' : 'flex-row'}">
              <div class="w-full md:w-1/2 px-6 md:px-12 flex flex-col ${isEven ? 'items-start' : 'items-end text-right'}">
                <h3 class="text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary-500 transition-colors">${type}</h3>
              </div>
              <div class="relative flex items-center justify-center z-10 shrink-0">
                <div class="h-20 w-28 md:h-24 md:w-36 bg-gradient-to-br ${colors[i % 4]} shadow-lg flex items-center justify-center transition-transform group-hover:scale-110 ${isEven ? 'roadmap-clip-even' : 'roadmap-clip-odd'}">
                   <div class="bg-white/20 p-2 rounded-xl border border-white/30 text-white">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                   </div>
                </div>
              </div>
              <div class="hidden md:block w-1/2"></div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  </div>
`;

const StreamView = () => {
  const paths = CAREER_PATHS.filter(p => p.stream === (state as any).activeStream);
  return `
    <div class="fade-in max-w-7xl mx-auto px-4 py-8">
      <button onclick="window.navigate('home')" class="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors font-semibold mb-8">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        Back to Streams
      </button>
      <h2 class="text-3xl font-extrabold mb-8">${state.activeStream} Roadmaps</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${paths.map(path => `
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all group">
            <div class="flex justify-between items-start mb-4">
               <h3 class="text-lg font-bold group-hover:text-primary-500">${path.subStream}</h3>
               <button onclick="window.toggleBookmark('${path.id}')" class="p-2">
                 <svg class="w-6 h-6 ${state.bookmarks.includes(path.id) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
               </button>
            </div>
            <p class="text-sm text-slate-500 mb-6">${path.description}</p>
            <button onclick="window.navigate('details', {pathId: '${path.id}'})" class="w-full py-3 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold hover:bg-primary-500 hover:text-white transition-all flex justify-between px-4">
              Explore Opportunities
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

const DetailsView = () => {
  const path = CAREER_PATHS.find(p => p.id === state.selectedPathId);
  return `
    <div class="fade-in max-w-5xl mx-auto px-4 py-8">
       <button onclick="window.navigate('stream', {stream: '${path?.stream}'})" class="flex items-center gap-2 text-slate-500 hover:text-primary-600 font-semibold mb-8">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
        Back to Results
      </button>
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
        <h1 class="text-4xl font-extrabold mb-4">${path?.subStream}</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400">${path?.description}</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
          <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.26 10.147L12 14.654l7.74-4.507m-15.48 0L12 5.64l7.74 4.507m0 0v4.727c0 .535-.351 1.007-.852 1.173l-6.888 2.296a1.091 1.091 0 01-.7 0l-6.888-2.296A1.232 1.232 0 013 14.874V10.147" /></svg>
            Available Courses
          </h2>
          <ul class="space-y-2">
            ${path?.courses.map(c => `<li class="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl font-medium">• ${c}</li>`).join('')}
          </ul>
        </div>
        <div class="bg-primary-600 text-white p-8 rounded-3xl">
          <h2 class="text-xl font-bold mb-6">Career Outcomes</h2>
          <div class="flex flex-wrap gap-2">
            ${path?.outcomes.map(o => `<span class="px-3 py-1 bg-white/20 rounded-lg text-sm font-bold border border-white/30">${o}</span>`).join('')}
          </div>
          <div class="mt-8 pt-8 border-t border-white/10">
            <h3 class="font-bold mb-2">Study Duration</h3>
            <p class="text-primary-100">${path?.duration}</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

// 5. Main Render Loop
// Fix: Converted index.tsx to a module, so this function is no longer global and doesn't collide with index.js
function render() {
  const root = document.getElementById('root');
  if (!root) return;
  let content = Navbar();

  if (state.view === 'home') content += HomeView();
  else if (state.view === 'stream') content += StreamView();
  else if (state.view === 'details') content += DetailsView();

  root.innerHTML = content;
  document.documentElement.classList.toggle('dark', state.isDarkMode);
}

// 6. Global Exposure for inline onclick events
/**
 * Fix: Use type assertions for global window assignments to support dynamic property additions
 * in a TypeScript environment.
 */
(window as any).navigate = navigate;
(window as any).toggleBookmark = toggleBookmark;
(window as any).toggleTheme = toggleTheme;

// 7. Initial Mount
document.addEventListener('DOMContentLoaded', render);
