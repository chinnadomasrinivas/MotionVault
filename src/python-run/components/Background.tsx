import React from 'react';
import { AbsoluteFill, interpolateColors, useCurrentFrame } from 'remotion';
import { SCENES, FPS } from '../timing';

// light, bright palettes (never black). One per scene -> background colour changes with the story.
const PAL: Record<string, [string, string, string]> = {
  hook:     ['#F4F8FF', '#DCE9FF', '#2F6FEB'],
  problem:  ['#F6F7FA', '#E3E8F2', '#F04438'],
  step1:    ['#F3F9FF', '#D8ECFF', '#2F6FEB'],
  step2:    ['#F5F6FF', '#E1E3FF', '#7A5AF8'],
  step3:    ['#FFF9EE', '#FFE9C2', '#FF7A1A'],
  quiz:     ['#F7F3FF', '#E6DBFF', '#7A5AF8'],
  answer:   ['#F1FBF6', '#CDF3DF', '#12B76A'],
  hardware: ['#FFF6EE', '#FFDFC4', '#FF7A1A'],
  payoff:   ['#F2F8FF', '#D3E6FF', '#2F6FEB'],
  bonus:    ['#FFFBEA', '#FFF0B3', '#E0A800'],
  recap:    ['#F3F8FF', '#D9E7FF', '#3776AB'],
  cta:      ['#FFF7F0', '#FFE0CC', '#FF7A1A'],
};

export const Background: React.FC = () => {
  const f = useCurrentFrame();
  const mids = SCENES.map((s) => ((s.start + s.end) / 2) * FPS);
  const col = (i: 0 | 1 | 2) =>
    interpolateColors(f, mids, SCENES.map((s) => PAL[s.id][i]));
  const top = col(0), bottom = col(1), accent = col(2);
  const px = (f * 0.35) % 120, py = (f * 0.2) % 120;
  const px2 = (f * 0.9) % 240, py2 = (f * 0.5) % 240;
  return (
    <AbsoluteFill style={{ background: `linear-gradient(170deg, ${top} 0%, ${bottom} 100%)` }}>
      {/* soft accent glows (slow parallax) */}
      <div style={{ position: 'absolute', left: -200 + Math.sin(f / 90) * 60, top: 200, width: 700, height: 700, borderRadius: '50%', background: accent, opacity: 0.16, filter: 'blur(120px)' }} />
      <div style={{ position: 'absolute', right: -260 + Math.cos(f / 110) * 70, top: 900, width: 760, height: 760, borderRadius: '50%', background: accent, opacity: 0.12, filter: 'blur(140px)' }} />
      {/* far blueprint grid */}
      <AbsoluteFill style={{
        opacity: 0.55,
        backgroundImage:
          'linear-gradient(rgba(47,111,235,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(47,111,235,0.10) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        backgroundPosition: `${-px / 2}px ${-py / 2}px`,
      }} />
      {/* near grid (moves faster => depth) */}
      <AbsoluteFill style={{
        opacity: 0.5,
        backgroundImage:
          'linear-gradient(rgba(47,111,235,0.16) 2px, transparent 2px), linear-gradient(90deg, rgba(47,111,235,0.16) 2px, transparent 2px)',
        backgroundSize: '240px 240px',
        backgroundPosition: `${-px2}px ${-py2}px`,
      }} />
      {/* vignette */}
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(20,50,110,0.14) 100%)' }} />
    </AbsoluteFill>
  );
};
