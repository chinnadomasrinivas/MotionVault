/**
 * ===== EDIT SCENE TIMINGS HERE (seconds) =====
 * Everything in the video is built from these numbers + captions.data.ts (word times).
 * Change a scene start/end here and the whole edit re-flows. No component changes needed.
 */
import { PHRASES, VOICE_SECONDS, SPEECH_BURSTS } from './captions.data';
export { PHRASES, VOICE_SECONDS, SPEECH_BURSTS };

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const TAIL_SECONDS = 1;
export const DURATION_IN_FRAMES = Math.ceil((VOICE_SECONDS + TAIL_SECONDS) * FPS);
export const SAFE = { top: 250, bottom: 400 };
export const COUNTDOWN_START = 42.05; // quiz 3-2-1 runs 42.05 -> 45.05 (3 s)
export const OV = 14; // frames of overlap used by every scene transition

/** start time (s) of word `w` in phrase `p` (indices = captions.data.ts) */
export const at = (p: number, w = 0) => PHRASES[p].words[w].s;
/** end time (s) of word `w` (default: last word) in phrase `p` */
export const endAt = (p: number, w?: number) => {
  const ws = PHRASES[p].words;
  return ws[w === undefined ? ws.length - 1 : w].e;
};

export type SceneId =
  | 'hook' | 'problem' | 'step1' | 'step2' | 'step3' | 'quiz'
  | 'answer' | 'hardware' | 'payoff' | 'bonus' | 'recap' | 'cta';

export type SceneDef = { id: SceneId; start: number; end: number };

const END = VOICE_SECONDS + TAIL_SECONDS;
export const SCENES: SceneDef[] = [
  { id: 'hook',     start: 0.0,   end: 8.45 },   // P0-P2   hook, 5 steps, bytecode teaser
  { id: 'problem',  start: 8.45,  end: 18.6 },   // P3-P6   CPU can't read Python, translator analogy
  { id: 'step1',    start: 18.6,  end: 23.05 },  // P7-P9   Run -> python file.py
  { id: 'step2',    start: 23.05, end: 29.5 },   // P10-P13 interpreter -> bytecode (translator)
  { id: 'step3',    start: 29.5,  end: 37.35 },  // P14-P16 PVM reads bytecode, chef/recipe
  { id: 'quiz',     start: 37.35, end: 45.05 },  // P17-P21 quiz + 3-2-1 countdown (42.05-45.05)
  { id: 'answer',   start: 45.05, end: 49.5 },   // P22-P25 BOTH! compile then interpret
  { id: 'hardware', start: 49.5,  end: 57.6 },   // P26-P30 VM(C) -> OS -> CPU -> Output
  { id: 'payoff',   start: 57.6,  end: 64.4 },   // P31-P33 import dis / dis.dis(add)
  { id: 'bonus',    start: 64.4,  end: 70.3 },   // P34-P36 __pycache__
  { id: 'recap',    start: 70.3,  end: 73.8 },   // P37     recap flow, "Java next?"
  { id: 'cta',      start: 73.8,  end: END },    // P38-P39 Comment JAVA, follow
];

export type TransitionKind = 'whip' | 'zoom' | 'slideUp' | 'wipe' | 'blur' | 'slideLeft';
/** transition INTO scene i+1 (length = SCENES.length - 1) */
export const TRANSITIONS: TransitionKind[] = [
  'whip', 'slideUp', 'zoom', 'wipe', 'slideLeft', 'zoom',
  'blur', 'whip', 'slideUp', 'wipe', 'zoom',
];

export const sceneFrames = (s: SceneDef) => ({
  from: Math.round(s.start * FPS),
  to: Math.round(s.end * FPS),
});
