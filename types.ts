
export enum StreamType {
  SCIENCE = 'Science',
  COMMERCE = 'Commerce',
  ARTS = 'Arts / Humanities',
  VOCATIONAL = 'Vocational / Skill-Based'
}

export interface CareerPath {
  id: string;
  stream: StreamType;
  subStream: string;
  courses: string[];
  duration: string;
  nextSteps: string[];
  outcomes: string[];
  description: string;
}

export interface Bookmark {
  id: string;
  timestamp: number;
}
