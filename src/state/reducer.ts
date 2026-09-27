import type { Question } from '../data/questions';
import { DUELO_ROUNDS, QUESTION_TIME_SECONDS, SOLO_ROUNDS, XP_PER_CORRECT_ANSWER, XP_PER_LEVEL } from '../config';
import type { AppState, GameMode } from './types';
import { defaultSession } from './types';

export type Action =
  | { type: 'LOGIN'; name?: string; email?: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_FIELD'; field: 'name' | 'email' | 'phone' | 'birthdate'; value: string }
  | { type: 'SET_AVATAR'; avatar: number }
  | { type: 'SET_AVATAR_PHOTO'; photo: string | null }
  | { type: 'TOGGLE_NOTIF' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'START_SOLO' }
  | { type: 'START_DUELO_LOBBY' }
  | { type: 'SET_PAIRED' }
  | { type: 'START_DUELO_ROUND' }
  | { type: 'SPIN'; subjectIndex: number; wheelAngle: number }
  | { type: 'SPIN_DONE' }
  | { type: 'BEGIN_ROUND'; question: Question }
  | { type: 'TICK' }
  | { type: 'SELECT_ANSWER'; idx: number; oppHit: boolean | null }
  | { type: 'FINISH_ROUND'; meRight: boolean; oppRight: boolean }
  | { type: 'ABORT_SESSION' };

function startSession(mode: GameMode) {
  return {
    ...defaultSession,
    active: true,
    mode,
  };
}

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        profile: {
          ...state.profile,
          loggedIn: true,
          name: action.name !== undefined ? action.name : state.profile.name,
          email: action.email !== undefined ? action.email : state.profile.email,
        },
      };

    case 'LOGOUT':
      return { ...state, profile: { ...state.profile, loggedIn: false }, session: defaultSession };

    case 'UPDATE_FIELD':
      return { ...state, profile: { ...state.profile, [action.field]: action.value } };

    case 'SET_AVATAR':
      return { ...state, profile: { ...state.profile, avatar: action.avatar, avatarPhoto: null } };

    case 'SET_AVATAR_PHOTO':
      return { ...state, profile: { ...state.profile, avatarPhoto: action.photo } };

    case 'TOGGLE_NOTIF':
      return { ...state, profile: { ...state.profile, notif: !state.profile.notif } };

    case 'TOGGLE_SOUND':
      return { ...state, profile: { ...state.profile, sound: !state.profile.sound } };

    case 'START_SOLO':
      return { ...state, session: startSession('solo') };

    case 'START_DUELO_LOBBY':
      return { ...state, session: { ...startSession('duelo'), active: true } };

    case 'SET_PAIRED':
      return { ...state, session: { ...state.session, paired: true } };

    case 'START_DUELO_ROUND':
      return { ...state, session: { ...state.session, spinning: false, revealed: false, wheelAngle: 0 } };

    case 'SPIN':
      return {
        ...state,
        session: {
          ...state.session,
          spinning: true,
          revealed: false,
          subjectIndex: action.subjectIndex,
          wheelAngle: action.wheelAngle,
        },
      };

    case 'SPIN_DONE':
      return { ...state, session: { ...state.session, spinning: false, revealed: true } };

    case 'BEGIN_ROUND':
      return {
        ...state,
        session: {
          ...state.session,
          currentQuestion: action.question,
          selected: null,
          timeLeft: QUESTION_TIME_SECONDS,
          oppHit: null,
          revealed: false,
        },
      };

    case 'TICK':
      return { ...state, session: { ...state.session, timeLeft: Math.max(0, state.session.timeLeft - 1) } };

    case 'SELECT_ANSWER':
      if (state.session.selected !== null) return state;
      return {
        ...state,
        session: {
          ...state.session,
          selected: action.idx,
          oppHit: state.session.mode === 'duelo' ? action.oppHit : null,
        },
      };

    case 'FINISH_ROUND': {
      const { meRight, oppRight } = action;
      const duelo = state.session.mode === 'duelo';
      const xpGained = meRight ? XP_PER_CORRECT_ANSWER : 0;
      const totalRounds = duelo ? DUELO_ROUNDS : SOLO_ROUNDS;
      const last = state.session.round >= totalRounds;

      const profile = {
        ...state.profile,
        xp: state.profile.xp + xpGained,
        totalAnswered: state.profile.totalAnswered + 1,
        totalCorrect: state.profile.totalCorrect + (meRight ? 1 : 0),
      };

      if (duelo) {
        const meScore = state.session.meScore + (meRight ? 1 : 0);
        const oppScore = state.session.oppScore + (oppRight ? 1 : 0);
        if (last) {
          return {
            profile: {
              ...profile,
              level: Math.floor(profile.xp / XP_PER_LEVEL) + 1,
              streak: meScore > 0 ? profile.streak + 1 : profile.streak,
            },
            session: {
              ...state.session,
              meScore,
              oppScore,
              lastScore: meScore,
              lastTotal: totalRounds,
              lastXpGained: state.session.lastXpGained + xpGained,
            },
          };
        }
        return {
          profile,
          session: {
            ...state.session,
            meScore,
            oppScore,
            round: state.session.round + 1,
            spinning: false,
            revealed: false,
            selected: null,
            oppHit: null,
            lastXpGained: state.session.lastXpGained + xpGained,
          },
        };
      }

      const sessionCorrect = state.session.sessionCorrect + (meRight ? 1 : 0);
      if (last) {
        return {
          profile: {
            ...profile,
            level: Math.floor(profile.xp / XP_PER_LEVEL) + 1,
            streak: sessionCorrect > 0 ? profile.streak + 1 : profile.streak,
          },
          session: {
            ...state.session,
            sessionCorrect,
            lastScore: sessionCorrect,
            lastTotal: totalRounds,
            lastXpGained: state.session.lastXpGained + xpGained,
          },
        };
      }
      return {
        profile,
        session: {
          ...state.session,
          sessionCorrect,
          round: state.session.round + 1,
          spinning: false,
          revealed: false,
          selected: null,
          lastXpGained: state.session.lastXpGained + xpGained,
        },
      };
    }

    case 'ABORT_SESSION':
      return { ...state, session: defaultSession };

    default:
      return state;
  }
}
