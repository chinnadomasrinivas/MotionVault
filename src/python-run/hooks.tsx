import React, { createContext, useContext } from 'react';
import { Easing, interpolate, spring, useCurrentFrame } from 'remotion';
import { FPS } from './timing';

export const SceneCtx = createContext<{ start: number }>({ start: 0 });

/** absolute frame of the whole video (scene frame + scene start) */
export const useAbsFrame = () => useCurrentFrame() + useContext(SceneCtx).start;
/** absolute time in seconds - compare directly with timing.ts / captions times */
export const useT = () => useAbsFrame() / FPS;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export const ramp = (
  t: number, a: number, b: number,
  easing: (x: number) => number = Easing.out(Easing.cubic),
) =>
  interpolate(t, [a, b], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing,
  });

/** spring pop that starts exactly at second `a` */
export const pop = (t: number, a: number, damping = 13, stiffness = 150) =>
  t < a ? 0 : spring({ frame: (t - a) * FPS, fps: FPS, config: { damping, stiffness, mass: 0.7 } });

/** typewriter: returns the visible prefix of `text` between seconds a..b */
export const typed = (text: string, t: number, a: number, b: number) =>
  text.slice(0, Math.round(ramp(t, a, b, (x) => x) * text.length));

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

/** opacity window: fades in at `a`, fades out at `b` (seconds) */
export const win = (t: number, a: number, b: number, fade = 0.3) =>
  Math.min(ramp(t, a, a + fade, (x) => x), 1 - ramp(t, b - fade, b, (x) => x));
