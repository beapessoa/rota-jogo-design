import type { Question } from '../data/questions';

export type GameMode = 'solo' | 'duelo';

export interface Profile {
  loggedIn: boolean;
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  xp: number;
  level: number;
  streak: number;
  totalAnswered: number;
  totalCorrect: number;
  avatar: number;
  avatarPhoto: string | null;
  notif: boolean;
  sound: boolean;
}

export interface Session {
  active: boolean;
  mode: GameMode;
  subjectIndex: number;
  round: number;
  meScore: number;
  oppScore: number;
  sessionCorrect: number;
  paired: boolean;
  oppHit: boolean | null;
  wheelAngle: number;
  spinning: boolean;
  revealed: boolean;
  currentQuestion: Question | null;
  selected: number | null;
  timeLeft: number;
  lastScore: number;
  lastTotal: number;
  lastXpGained: number;
}

export interface AppState {
  profile: Profile;
  session: Session;
}

export const defaultProfile: Profile = {
  loggedIn: false,
  name: '',
  email: '',
  phone: '(11) 98765-4321',
  birthdate: '14/03/2007',
  xp: 0,
  level: 1,
  streak: 30,
  totalAnswered: 0,
  totalCorrect: 0,
  avatar: 1,
  avatarPhoto: null,
  notif: true,
  sound: true,
};

export const defaultSession: Session = {
  active: false,
  mode: 'solo',
  subjectIndex: 0,
  round: 1,
  meScore: 0,
  oppScore: 0,
  sessionCorrect: 0,
  paired: false,
  oppHit: null,
  wheelAngle: 0,
  spinning: false,
  revealed: false,
  currentQuestion: null,
  selected: null,
  timeLeft: 12,
  lastScore: 0,
  lastTotal: 5,
  lastXpGained: 0,
};
