export enum UserRole {
  LEARNER = 'LEARNER',
  SME = 'SME',
  SPONSOR = 'SPONSOR',
  GUEST = 'GUEST'
}

export interface SkillScore {
  reliability: number;
  technical: number;
  communication: number;
  speed: number;
  endorsements: number;
  total: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  walletBalance: number;
  tokens: number; // SkillTokens for redeeming rewards
  level: 'Starter' | 'Rising' | 'Pro' | 'Elite'; // Career Ladder
  skillScore?: SkillScore;
  skills: string[]; // List of skills the user possesses
  badges?: Badge[];
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  budget: number;
  skills: string[]; // Skills required to unlock this gig
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Open' | 'In Progress' | 'Completed';
  postedBy: string;
  applicants?: number;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface Course {
  id: string;
  title: string;
  provider: 'Akello' | 'Tangira' | 'Partner';
  duration: string;
  xp: number;
  category: string;
  progress: number;
  unlocksSkill?: string; // The skill this course grants upon completion
}