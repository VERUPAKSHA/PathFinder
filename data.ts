
import { StreamType, CareerPath } from './types';

export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'sci-pcm',
    stream: StreamType.SCIENCE,
    subStream: 'PCM (Physics, Chemistry, Math)',
    courses: ['B.Tech / B.E (Engineering)', 'B.Sc (Statistics, Physics)', 'B.Arch (Architecture)', 'BCA'],
    duration: '2 Years (Schooling) + 3-5 Years (Degree)',
    nextSteps: ['M.Tech', 'MBA', 'UPSC', 'Research / PhD'],
    outcomes: ['Software Engineer', 'Civil Engineer', 'Architect', 'Data Scientist'],
    description: 'The foundation for engineering and physical sciences. Ideal for students with strong analytical skills.'
  },
  {
    id: 'sci-pcb',
    stream: StreamType.SCIENCE,
    subStream: 'PCB (Physics, Chemistry, Biology)',
    courses: ['MBBS', 'BDS (Dental)', 'B.Pharm', 'B.Sc (Botany, Zoology)', 'Nursing'],
    duration: '2 Years (Schooling) + 4-6 Years (Degree)',
    nextSteps: ['MD / MS', 'Post Graduation in Specialization', 'Clinical Research'],
    outcomes: ['Doctor', 'Pharmacist', 'Biotechnologist', 'Medical Researcher'],
    description: 'Focuses on life sciences and medical fields. Best for students interested in healthcare and biology.'
  },
  {
    id: 'com-ca',
    stream: StreamType.COMMERCE,
    subStream: 'Finance & Professional Accounting',
    courses: ['Chartered Accountancy (CA)', 'B.Com', 'BBA', 'Company Secretary (CS)', 'CMA'],
    duration: '3-5 Years',
    nextSteps: ['M.Com', 'MBA (Finance)', 'PhD in Commerce'],
    outcomes: ['Auditor', 'Financial Analyst', 'Tax Consultant', 'Investment Banker'],
    description: 'Deals with money management, business accounts, and financial laws.'
  },
  {
    id: 'com-mgt',
    stream: StreamType.COMMERCE,
    subStream: 'Management & Business',
    courses: ['BMS', 'BBA', 'IPM (IIM Integrated Program)'],
    duration: '3 Years',
    nextSteps: ['MBA', 'Executive Management Programs', 'Startup Incubation'],
    outcomes: ['Marketing Manager', 'Operations Manager', 'HR Consultant', 'Entrepreneur'],
    description: 'Excellent for leadership roles and understanding how businesses operate globally.'
  },
  {
    id: 'arts-human',
    stream: StreamType.ARTS,
    subStream: 'Social Sciences & Humanities',
    courses: ['B.A (Psychology, Sociology)', 'B.A (English, History)', 'B.A.LL.B (Law)'],
    duration: '3-5 Years',
    nextSteps: ['M.A', 'Civil Services (UPSC)', 'Legal Practice'],
    outcomes: ['Journalist', 'Lawyer', 'Psychologist', 'Social Worker', 'Professor'],
    description: 'Focuses on human society, culture, and critical thinking.'
  },
  {
    id: 'arts-design',
    stream: StreamType.ARTS,
    subStream: 'Creative Arts & Design',
    courses: ['B.Des (Fashion/Graphic/UX)', 'BFA (Fine Arts)', 'Animation & VFX'],
    duration: '3-4 Years',
    nextSteps: ['Master in Design', 'Senior Art Direction', 'Creative Agency Lead'],
    outcomes: ['UI/UX Designer', 'Fashion Designer', 'Animator', 'Interior Designer'],
    description: 'A path for the visually creative and those interested in aesthetic problem solving.'
  },
  {
    id: 'voc-iti',
    stream: StreamType.VOCATIONAL,
    subStream: 'ITI & Technical Training',
    courses: ['ITI (Electrician/Fitter/Mechanic)', 'Polytechnic Diploma', 'Short-term Certificate Courses'],
    duration: '1-3 Years',
    nextSteps: ['Advanced Diploma', 'B.E (Lateral Entry)', 'Small Business Ownership'],
    outcomes: ['Technician', 'Site Supervisor', 'Auto Mechanic', 'Maintenance Engineer'],
    description: 'Hands-on training for immediate employment in industrial sectors.'
  },
  {
    id: 'voc-hosp',
    stream: StreamType.VOCATIONAL,
    subStream: 'Hospitality & Tourism',
    courses: ['Diploma in Hotel Management', 'Culinary Arts Certification', 'Travel & Tourism Diploma'],
    duration: '1-3 Years',
    nextSteps: ['BHM (Hotel Management)', 'Global Cruise Training'],
    outcomes: ['Chef', 'Hotel Manager', 'Flight Attendant', 'Tour Operator'],
    description: 'Fast-growing industry focused on service, travel, and guest experiences.'
  }
];
