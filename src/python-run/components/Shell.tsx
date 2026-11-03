import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { OV, WIDTH, TransitionKind } from '../timing';
import { SceneCtx } from '../hooks';

type Props = {
  startFrame: number;          // absolute start of this scene
  durationInFrames: number;    // includes the OV overlap tail
  enter: TransitionKind | null;
  exit: TransitionKind | null;
  push?: number;               // slow camera push-in amount
  drift?: number;              // horizontal camera drift in px
  children: React.ReactNode;
};

const eio = Easing.inOut(Easing.cubic);

/** gives every scene: transition in/out + a slow cinematic camera push */
export const SceneShell: React.FC<Props> = ({ startFrame, durationInFrames, enter, exit, push = 0.06, drift = 0, children }) => {
  const f = useCurrentFrame();
  const inP = enter ? interpolate(f, [0, OV], [0, 1], { extrapolateRight: 'clamp', easing: eio }) : 1;
  const outP = exit ? interpolate(f, [durationInFrames - OV, durationInFrames], [0, 1], { extrapolateLeft: 'clamp', easing: eio }) : 0;
  const cam = f / Math.max(1, durationInFrames);

  let tx = 0, ty = 0, sc = 1, op = 1, blur = 0, clip: string | undefined;

  // incoming
  if (enter === 'whip') { tx += (1 - inP) * WIDTH; blur += (1 - inP) * 28; }
  if (enter === 'zoom') { sc *= 0.82 + 0.18 * inP; op *= inP; blur += (1 - inP) * 10; }
  if (enter === 'slideUp') { ty += (1 - inP) * 1920; }
  if (enter === 'slideLeft') { tx += (1 - inP) * -WIDTH; }
  if (enter === 'wipe') { clip = `inset(0 ${(1 - inP) * 100}% 0 0)`; }
  if (enter === 'blur') { op *= inP; blur += (1 - inP) * 30; sc *= 1.04 - 0.04 * inP; }
  // outgoing
  if (exit === 'whip') { tx += -outP * WIDTH * 0.9; blur += outP * 28; }
  if (exit === 'zoom') { sc *= 1 + outP * 0.55; op *= 1 - outP; blur += outP * 12; }
  if (exit === 'slideUp') { ty += -outP * 260; op *= 1 - outP * 0.5; }
  if (exit === 'slideLeft') { tx += outP * WIDTH * 0.5; op *= 1 - outP * 0.4; }
  if (exit === 'blur') { op *= 1 - outP; blur += outP * 30; }

  const camS = 1 + push * cam;
  return (
    <SceneCtx.Provider value={{ start: startFrame }}>
      <AbsoluteFill style={{
        transform: `translate(${tx}px, ${ty}px) scale(${sc})`,
        opacity: op,
        filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
        clipPath: clip,
        willChange: 'transform',
      }}>
        <AbsoluteFill style={{ transform: `scale(${camS}) translateX(${drift * cam}px)`, transformOrigin: '50% 45%' }}>
          {children}
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneCtx.Provider>
  );
};
