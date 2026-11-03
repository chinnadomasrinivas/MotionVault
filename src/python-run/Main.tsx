import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, interpolate } from 'remotion';
import { DURATION_IN_FRAMES, FPS, OV, SCENES, SPEECH_BURSTS, TRANSITIONS, SceneId, sceneFrames } from './timing';
import { SceneShell } from './components/Shell';
import { Background } from './components/Background';
import { Captions } from './components/Captions';
import { SFX } from './sfx';
import { Hook } from './scenes/Hook';
import { Problem } from './scenes/Problem';
import { Step1 } from './scenes/Step1';
import { Step2 } from './scenes/Step2';
import { Step3 } from './scenes/Step3';
import { Quiz } from './scenes/Quiz';
import { Answer } from './scenes/Answer';
import { Hardware } from './scenes/Hardware';
import { Payoff } from './scenes/Payoff';
import { Bonus } from './scenes/Bonus';
import { Recap } from './scenes/Recap';
import { Cta } from './scenes/Cta';

const COMP: Record<SceneId, React.FC> = { hook: Hook, problem: Problem, step1: Step1, step2: Step2, step3: Step3, quiz: Quiz, answer: Answer, hardware: Hardware, payoff: Payoff, bonus: Bonus, recap: Recap, cta: Cta };

/** 0..1 : how much the narrator is speaking at second t (fast attack, slower release => smooth ducking) */
const speech = (t: number) => {
  let m = 0;
  for (const [a, b] of SPEECH_BURSTS) {
    if (t >= a - 0.12 && t <= b + 0.45) {
      const v = t < a ? (t - (a - 0.12)) / 0.12 : t <= b ? 1 : 1 - (t - b) / 0.45;
      if (v > m) m = v;
    }
  }
  return m;
};

const BGM_PAUSE = 0.12;   // volume in pauses
const BGM_SPEECH = 0.05; // volume while the narrator speaks (auto-duck)
const bgmVolume = (f: number) => {
  const t = f / FPS;
  const base = BGM_PAUSE + (BGM_SPEECH - BGM_PAUSE) * speech(t);
  const fadeIn = interpolate(f, [0, FPS * 1.2], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(f, [DURATION_IN_FRAMES - FPS * 2.2, DURATION_IN_FRAMES], [1, 0], { extrapolateLeft: 'clamp' });
  return base * fadeIn * fadeOut;
};

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#EEF4FC' }}>
      <Background />

      {SCENES.map((s, i) => {
        const { from, to } = sceneFrames(s);
        const last = i === SCENES.length - 1;
        const Comp = COMP[s.id];
        const dur = (last ? DURATION_IN_FRAMES : to) - from + (last ? 0 : OV);
        return (
          <Sequence key={s.id} from={from} durationInFrames={dur} name={s.id}>
            <SceneShell
              startFrame={from} durationInFrames={dur}
              enter={i > 0 ? TRANSITIONS[i - 1] : null}
              exit={last ? null : TRANSITIONS[i]}
              push={0.05 + (i % 3) * 0.015} drift={i % 2 ? 22 : -22}
            >
              <Comp />
            </SceneShell>
          </Sequence>
        );
      })}

      <Captions />

      {/* ---- audio: 1) voiceover (untouched)  2) BGM (ducked)  3) SFX ---- */}
      <Audio src={staticFile('audio/voiceover.mp3')} volume={1} />
      <Audio src={staticFile('audio/bgm.mp3')} volume={bgmVolume} />
      {SFX.map((e, i) => (
        <Sequence key={i} from={Math.round(e.t * FPS)} durationInFrames={Math.round(FPS * 1.6)} layout="none">
          <Audio src={staticFile(`audio/sfx/${e.name}.wav`)} volume={e.v} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
