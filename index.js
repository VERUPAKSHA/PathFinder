
/**
 * PATHFINDER: CAREER GUIDANCE AFTER 10TH
 * Pure Vanilla JavaScript - No Frameworks, No Backend.
 * Perfect for GitHub Pages deployment.
 */

// 1. DATA DEFINITIONS
const StreamType = {
  SCIENCE: 'Science',
  COMMERCE: 'Commerce',
  ARTS: 'Arts / Humanities',
  VOCATIONAL: 'Vocational / Skill-Based'
};

const CAREER_PATHS = [
  {
    id: 'sci-pcm',
    stream: StreamType.SCIENCE,
    subStream: 'PCM (Physics, Chemistry, Math)',
    courses: ['B.Tech (Engineering)', 'B.Sc (Physics/Math)', 'B.Arch (Architecture)', 'BCA'],
    duration: '2 Years (School) + 3-5 Years (Degree)',
    outcomes: ['Software Engineer', 'Civil Engineer', 'Architect', 'Data Scientist'],
    description: 'The foundation for engineering and physical sciences. Ideal for students with strong analytical skills.'
  },
  {
    id: 'sci-pcb',
    stream: StreamType.SCIENCE,
    subStream: 'PCB (Physics, Chemistry, Biology)',
    courses: ['MBBS', 'BDS (Dental)', 'B.Pharm', 'B.Sc (Biology)', 'Nursing'],
    duration: '2 Years (School) + 4-6 Years (Degree)',
    outcomes: ['Doctor', 'Pharmacist', 'Biotechnologist', 'Healthcare Prof.'],
    description: 'Focuses on life sciences and medical fields. Best for students interested in healthcare.'
  },
  {
    id: 'com-acc',
    stream: StreamType.COMMERCE,
    subStream: 'Finance & Accounting',
    courses: ['Chartered Accountancy (CA)', 'B.Com', 'BBA', 'CS', 'CMA'],
    duration: '3-5 Years',
    outcomes: ['Auditor', 'Financial Analyst', 'Tax Consultant', 'Investment Banker'],
    description: 'Deals with money management, business accounts, and financial laws.'
  },
  {
    id: 'com-mgt',
    stream: StreamType.COMMERCE,
    subStream: 'Management & Business',
    courses: ['BMS', 'BBA', 'IPM (Integrated Management)'],
    duration: '3 Years',
    outcomes: ['Marketing Manager', 'Operations Manager', 'HR Lead', 'Entrepreneur'],
    description: 'Excellent for leadership roles and understanding how businesses operate.'
  },
  {
    id: 'arts-soc',
    stream: StreamType.ARTS,
    subStream: 'Social Sciences',
    courses: ['B.A (Psychology/Sociology)', 'B.A (English/History)', 'B.A.LL.B (Law)'],
    duration: '3-5 Years',
    outcomes: ['Journalist', 'Lawyer', 'Psychologist', 'Social Worker'],
    description: 'Focuses on human society, culture, and critical thinking.'
  },
  {
    id: 'arts-des',
    stream: StreamType.ARTS,
    subStream: 'Creative Arts & Design',
    courses: ['B.Des (UX/Fashion)', 'BFA (Fine Arts)', 'Animation & VFX'],
    duration: '3-4 Years',
    outcomes: ['UI/UX Designer', 'Fashion Designer', 'Animator', 'Creative Director'],
    description: 'A path for the visually creative and those interested in design thinking.'
  },
  {
    id: 'voc-iti',
    stream: StreamType.VOCATIONAL,
    subStream: 'Technical & Industrial ITI',
    courses: ['ITI (Electrician/Fitter)', 'Diploma in Engineering', 'Technical Skills Cert.'],
    duration: '1-3 Years',
    outcomes: ['Technician', 'Site Supervisor', 'Mechanic', 'Industrial Specialist'],
    description: 'Practical, hands-on training for immediate industrial employment.'
  },
  {
    id: 'voc-hosp',
    stream: StreamType.VOCATIONAL,
    subStream: 'Hospitality & Tourism',
    courses: ['Hotel Management Diploma', 'Culinary Arts', 'Travel & Tourism'],
    duration: '1-3 Years',
    outcomes: ['Chef', 'Hotel Manager', 'Tour Operator', 'Cabin Crew'],
    description: 'Focuses on customer service, luxury, and the global travel industry.'
  }
];

// 2. APP STATE
let state = {
  view: 'home', // 'home', 'stream', 'details'
  activeStream: null,
  selectedPathId: null,
  bookmarks: JSON.parse(localStorage.getItem('pathfinder_bookmarks') || '[]'),
  isDarkMode: localStorage.getItem('pathfinder_theme') === 'dark'
};

// 3. CORE FUNCTIONS
function saveToStorage() {
  localStorage.setItem('pathfinder_bookmarks', JSON.stringify(state.bookmarks));
  localStorage.setItem('pathfinder_theme', state.isDarkMode ? 'dark' : 'light');
}

window.navigate = function(view, params = {}) {
  state.view = view;
  if (params.stream) state.activeStream = params.stream;
  if (params.pathId) state.selectedPathId = params.pathId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
};

window.toggleBookmark = function(id) {
  if (state.bookmarks.includes(id)) {
    state.bookmarks = state.bookmarks.filter(b => b !== id);
  } else {
    state.bookmarks.push(id);
  }
  saveToStorage();
  render();
};

window.toggleTheme = function() {
  state.isDarkMode = !state.isDarkMode;
  document.documentElement.classList.toggle('dark', state.isDarkMode);
  saveToStorage();
  render();
};

// 4. UI TEMPLATES
const Navbar = () => `
  <nav class="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2 cursor-pointer" onclick="navigate('home')">
        <div class="bg-primary-500 p-2 rounded-lg text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
        </div>
        <h1 class="text-xl font-bold tracking-tight">PathFinder</h1>
      </div>
      <button onclick="toggleTheme()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
        ${state.isDarkMode 
          ? '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>' 
          : '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>'}
      </button>
    </div>
  </nav>
`;

const HomeView = () => `
  <div class="fade-in max-w-7xl mx-auto px-4 py-16">
    <div class="text-center mb-16 max-w-2xl mx-auto">
      <span class="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Career Discovery</span>
      <h2 class="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">What Can I Do <span class="text-primary-500 italic text-5xl md:text-6xl block mt-2">After 10th?</span></h2>
      <p class="text-lg text-slate-500 dark:text-slate-400">Select a major field to explore specialized career paths and roadmaps.</p>
    </div>

    <div class="relative max-w-4xl mx-auto">
      <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block"></div>
      <div class="flex flex-col gap-12 md:gap-0">
        ${Object.values(StreamType).map((type, i) => {
          const isEven = i % 2 !== 0;
          const colors = ['from-rose-500 to-rose-600', 'from-slate-700 to-slate-800', 'from-indigo-500 to-indigo-600', 'from-orange-500 to-orange-600'];
          return `
            <div onclick="navigate('stream', {stream: '${type}'})" class="relative flex w-full items-center md:h-32 group cursor-pointer ${isEven ? 'flex-row-reverse' : 'flex-row'}">
              <div class="w-full md:w-1/2 px-6 md:px-12 flex flex-col ${isEven ? 'items-start' : 'items-end text-right'}">
                <h3 class="text-xl md:text-2xl font-bold group-hover:text-primary-500 transition-colors">${type}</h3>
              </div>
              <div class="relative flex items-center justify-center z-10 shrink-0">
                <div class="h-20 w-28 md:h-24 md:w-36 bg-gradient-to-br ${colors[i % 4]} shadow-lg flex items-center justify-center transition-transform group-hover:scale-110 ${isEven ? 'roadmap-clip-even' : 'roadmap-clip-odd'}">
                   <div class="bg-white/20 p-2 rounded-xl border border-white/30 text-white">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
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
  const paths = CAREER_PATHS.filter(p => p.stream === state.activeStream);
  return `
    <div class="fade-in max-w-7xl mx-auto px-4 py-8">
      <button onclick="navigate('home')" class="flex items-center gap-2 text-slate-500 hover:text-primary-600 font-semibold mb-8 group">
        <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Streams
      </button>
      <div class="mb-12">
        <h2 class="text-3xl font-black mb-2">${state.activeStream} Roadmaps</h2>
        <p class="text-slate-500">Pick a specific sub-path to see courses and job outcomes.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${paths.map(path => `
          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-2xl transition-all group">
            <div class="flex justify-between items-start mb-4">
               <h3 class="text-lg font-bold group-hover:text-primary-500">${path.subStream}</h3>
               <button onclick="toggleBookmark('${path.id}')" class="p-2 transition-colors">
                 <svg class="w-6 h-6 ${state.bookmarks.includes(path.id) ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300 hover:text-yellow-400'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
               </button>
            </div>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-2">${path.description}</p>
            <button onclick="navigate('details', {pathId: '${path.id}'})" class="w-full py-3 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold hover:bg-primary-500 hover:text-white transition-all flex justify-between px-4 text-sm">
              Explore Opportunities
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

const DetailsView = () => {
  const path = CAREER_PATHS.find(p => p.id === state.selectedPathId);
  if (!path) return '';
  return `
    <div class="fade-in max-w-5xl mx-auto px-4 py-8">
       <button onclick="navigate('stream', {stream: '${path.stream}'})" class="flex items-center gap-2 text-slate-500 hover:text-primary-600 font-semibold mb-8 group">
        <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Results
      </button>
      
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
        <div class="flex items-center gap-2 mb-4">
          <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider rounded-full">${path.stream}</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-black mb-6">${path.subStream}</h1>
        <p class="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">${path.description}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 class="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
            <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
            Undergraduate Courses
          </h2>
          <div class="space-y-3">
            ${path.courses.map(c => `<div class="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl font-semibold border border-slate-100 dark:border-slate-800 hover:border-primary-200 dark:hover:border-primary-900 transition-colors">${c}</div>`).join('')}
          </div>
        </div>

        <div class="bg-primary-600 text-white p-8 md:p-10 rounded-3xl shadow-xl shadow-primary-500/10">
          <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            Job Outcomes
          </h2>
          <div class="grid grid-cols-1 gap-3">
            ${path.outcomes.map(o => `<div class="px-4 py-3 bg-white/20 rounded-xl font-bold border border-white/20 hover:bg-white/30 transition-colors">${o}</div>`).join('')}
          </div>
          <div class="mt-10 pt-8 border-t border-white/20">
            <h3 class="text-xs font-black uppercase tracking-widest text-primary-200 mb-2">Roadmap Timeline</h3>
            <p class="text-xl font-medium">${path.duration}</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

// 5. RENDER ENGINE
function render() {
  const root = document.getElementById('root');
  if (!root) return;

  let html = Navbar();

  if (state.view === 'home') html += HomeView();
  else if (state.view === 'stream') html += StreamView();
  else if (state.view === 'details') html += DetailsView();

  root.innerHTML = html;
  
  // Set theme on render
  document.documentElement.classList.toggle('dark', state.isDarkMode);
}

// Initial Launch
document.addEventListener('DOMContentLoaded', render);
