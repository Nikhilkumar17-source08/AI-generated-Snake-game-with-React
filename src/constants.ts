/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  color: string;
}

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'CYBER_PULSE_01',
    artist: 'VOID_ENGINE',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    color: '#00ffff',
  },
  {
    id: '2',
    title: 'SYNTH_REVENGE_X',
    artist: 'NEON_GHOST',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    color: '#ff00ff',
  },
  {
    id: '3',
    title: 'STATIC_OVERLORD',
    artist: 'MACHINE_MIND',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    color: '#39ff14',
  },
];

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
export const INITIAL_DIRECTION = { x: 0, y: -1 };
export const TICK_RATE = 100;
