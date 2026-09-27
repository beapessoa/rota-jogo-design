import type { Profile } from './state/types';

export function avatarSrc(profile: Pick<Profile, 'avatar' | 'avatarPhoto'>): string {
  return profile.avatarPhoto || `/images/avatar-${profile.avatar}.png`;
}

export const OPPONENT_NAME = 'emanuelly.c';
export const OPPONENT_AVATAR = '/images/avatar-3.png';

export function formatTime(seconds: number): string {
  return '00:' + String(Math.max(0, seconds)).padStart(2, '0');
}
