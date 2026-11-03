import React from 'react';
import { Stage, At } from '../components/Stage';
import { Pill } from '../components/art';
import { useT, pop, ramp, win } from '../hooks';
import { at, COUNTDOWN_START } from '../timing';
import { C, FONT_DISPLAY, shadow } from '../theme';


const Option: React.FC<{ letter: string; label: string; color: string; p: number; x: number; y?: number; dim?: number }> = ({ letter, label, color, p, x, y = 460, dim = 1 }) => (
  <At x={x} y={y} o={p * dim} s={0.85 + 0.15 * p}>
    <div style={{ width: 440, height: 250, borderRadius: 40, background: '#fff', border: `6px solid ${color}`, boxShadow: shadow(`${color}55`, 20, 44), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      <div style={{ width: 90, height: 90, borderRadius: '50%', background: color, color: '#fff', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{letter}</div>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 52, color: C.ink }}>{label}</div>
    </div>
  </At>
);

export const Quiz: React.FC = () => {
  const t = useT();
  const qT = at(17, 0);
  const n = t < COUNTDOWN_START ? 0 : Math.min(3, Math.floor(t - COUNTDOWN_START) + 1);   // 1..3 (elapsed)
  const num = 4 - n;
  const frac = (t - COUNTDOWN_START) % 1;
  const ring = t < COUNTDOWN_START ? 0 : Math.min(1, (t - COUNTDOWN_START) / 3);
  const cd = ramp(t, COUNTDOWN_START - 0.25, COUNTDOWN_START);
  return (
    <Stage>
      <At x={540} y={80} s={pop(t, qT)} o={pop(t, qT)} z={6}><Pill text="QUICK QUESTION" bg={C.purple} size={54} /></At>
      <At x={540} y={250} o={pop(t, at(18, 0))} s={0.9 + 0.1 * pop(t, at(18, 0))}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 96, color: C.ink, textAlign: 'center', lineHeight: 1.05 }}>Python is…<span style={{ color: C.purple }}> ?</span></div>
      </At>
      <Option letter="A" label="Compiled" color={C.blue} p={pop(t, at(18, 1))} x={290} y={560} />
      <Option letter="B" label="Interpreted" color={C.orange} p={pop(t, at(19, 0))} x={790} y={560} />

      {/* 3-2-1 countdown ring */}
      <At x={540} y={860} o={cd} s={0.8 + 0.2 * cd}>
        <div style={{ position: 'relative', width: 260, height: 260 }}>
          <svg width="260" height="260" viewBox="0 0 260 260" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
            <circle cx="130" cy="130" r="112" fill="#fff" stroke={C.line} strokeWidth="18" />
            <circle cx="130" cy="130" r="112" fill="none" stroke={C.purple} strokeWidth="18" strokeLinecap="round" strokeDasharray={`${(1 - ring) * 704} 704`} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 150, color: C.purple, transform: `scale(${1 + (1 - Math.min(1, frac * 3)) * 0.35})` }}>{num}</div>
        </div>
      </At>
      <At x={880} y={860} o={pop(t, at(21, 0))} s={pop(t, at(21, 0))}>
        <div style={{ background: C.ink, color: '#fff', padding: '16px 30px', borderRadius: 30, fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 40, boxShadow: shadow('rgba(11,27,51,.3)', 16, 30) }}>💬 Comments!</div>
      </At>
    </Stage>
  );
};
