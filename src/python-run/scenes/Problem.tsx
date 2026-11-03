import React from 'react';
import { Stage, At } from '../components/Stage';
import { CpuChip, FileCard, Pill, PyBadge } from '../components/art';
import { useT, pop, ramp, win } from '../hooks';
import { at, endAt } from '../timing';
import { C, FONT_DISPLAY, FONT_MONO, shadow } from '../theme';

const Person: React.FC<{ color: string; face?: string }> = ({ color, face = '🙂' }) => (
  <div style={{ width: 190, height: 190, borderRadius: '50%', background: `linear-gradient(145deg, #fff, ${color}33)`, border: `6px solid ${color}`, boxShadow: shadow(`${color}55`, 16, 34), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 110 }}>{face}</div>
);
const Bubble: React.FC<{ text: string; color: string; size?: number }> = ({ text, color, size = 56 }) => (
  <div style={{ position: 'relative', background: '#fff', border: `5px solid ${color}`, borderRadius: 40, padding: '16px 34px', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: size, color, boxShadow: shadow(`${color}44`, 14, 30) }}>
    {text}
    <div style={{ position: 'absolute', bottom: -22, left: 50, width: 36, height: 36, background: '#fff', borderRight: `5px solid ${color}`, borderBottom: `5px solid ${color}`, transform: 'rotate(45deg)' }} />
  </div>
);

export const Problem: React.FC = () => {
  const t = useT();
  const A = win(t, 8.4, 12.1, 0.35);
  const B = win(t, 11.9, 16.2, 0.4);
  const Cc = win(t, 16.0, 19.2, 0.4);

  // A: code card flies to CPU, bounces back with a red cross
  const hit = at(4, 3);                                   // "artham"
  const fly = ramp(t, at(4, 0), hit - 0.05, (x) => x * x);
  const back = ramp(t, hit, hit + 0.5);
  const cardX = 250 * fly - 250 * back;
  const shake = t > hit && t < hit + 0.35 ? Math.sin(t * 90) * 10 : 0;

  // B: translator analogy
  const j = at(5, 2);                                     // "Japan"
  return (
    <Stage>
      {/* ---------- A ---------- */}
      <At x={540} y={110} o={A * pop(t, at(3, 0))} s={pop(t, at(3, 0))} z={6}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 118, color: C.red, letterSpacing: 2 }}>PROBLEM</div>
      </At>
      <At x={720} y={560} o={A} s={0.7 + 0.3 * pop(t, at(3, 0) + 0.2)}>
        <div style={{ transform: `translateX(${shake}px)` }}><CpuChip size={460} glow={0.15 + 0.2 * ramp(t, hit, hit + 0.2)} /></div>
      </At>
      <At x={190 + cardX} y={560} o={A * pop(t, at(4, 0) - 0.3)} z={7} r={back * -14}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <FileCard ext=".py" color={C.pyBlue} w={190} />
          <div style={{ marginTop: -4 }}><PyBadge size={70} /></div>
        </div>
      </At>
      <At x={600} y={400} o={A * ramp(t, hit, hit + 0.1)} s={pop(t, hit, 9)} z={9}>
        <div style={{ width: 190, height: 190, borderRadius: '50%', background: C.red, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 130, fontFamily: FONT_DISPLAY, fontWeight: 900, border: '8px solid #fff', boxShadow: `0 20px 50px ${C.red}88` }}>✕</div>
      </At>
      <At x={540} y={930} o={A * ramp(t, hit, hit + 0.4)} z={7}>
        <Pill text="CPU ≠ Python" bg={C.ink} size={56} />
      </At>

      {/* ---------- B: Telugu -> Japan ---------- */}
      <At x={250} y={440} o={B * pop(t, at(5, 0))} s={pop(t, at(5, 0))} z={5}><Person color={C.orange} /></At>
      <At x={830} y={440} o={B * pop(t, j)} s={pop(t, j)} z={5}><Person color={C.red} face="😕" /></At>
      <At x={280} y={230} o={B * pop(t, at(5, 1))} s={pop(t, at(5, 1))} z={6}><Bubble text="తెలుగు" color={C.orange} /></At>
      <At x={800} y={230} o={B * pop(t, j + 0.15)} s={pop(t, j + 0.15)} z={6}><Bubble text="日本語?" color={C.red} /></At>
      <At x={540} y={440} o={B * ramp(t, at(5, 1), at(5, 1) + 0.4)} z={4}>
        <svg width="260" height="60" viewBox="0 0 260 60">
          <path d="M6 30 H210" stroke={C.muted} strokeWidth="9" strokeDasharray="16 14" strokeLinecap="round" strokeDashoffset={-t * 90} />
          <path d="M196 10 L236 30 L196 50" stroke={C.muted} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </At>
      <At x={540} y={440} o={B * ramp(t, at(5, 4), at(5, 4) + 0.2)} s={pop(t, at(5, 4), 9)} z={8}>
        <div style={{ fontSize: 150, fontFamily: FONT_DISPLAY, fontWeight: 900, color: C.red, textShadow: '0 8px 24px rgba(240,68,56,.4)' }}>?</div>
      </At>
      <At x={540} y={800} o={B * ramp(t, at(5, 3), at(5, 3) + 0.4)} z={6}>
        <Pill text="Language gap" bg={C.red} size={54} />
      </At>

      {/* ---------- C: how will the code run? ---------- */}
      <At x={200} y={470} o={Cc * pop(t, at(6, 0))} s={pop(t, at(6, 0))}><FileCard ext=".py" color={C.pyBlue} w={200} /></At>
      <At x={850} y={470} o={Cc * pop(t, at(6, 0) + 0.1)} s={0.55 * pop(t, at(6, 0) + 0.1)}><CpuChip size={420} /></At>
      <At x={540} y={470} o={Cc * ramp(t, at(6, 1), at(6, 1) + 0.3)} z={5}>
        <svg width="280" height="60" viewBox="0 0 280 60"><path d="M6 30 H230" stroke={C.muted} strokeWidth="9" strokeDasharray="16 14" strokeLinecap="round" strokeDashoffset={-t * 90} /><path d="M216 10 L256 30 L216 50" stroke={C.muted} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </At>
      <At x={540} y={300} o={Cc * ramp(t, at(6, 2), at(6, 2) + 0.3)} s={0.8 + 0.4 * pop(t, at(6, 2), 8) + Math.sin(t * 6) * 0.04} z={7}>
        <div style={{ fontSize: 230, fontFamily: FONT_DISPLAY, fontWeight: 900, color: C.blue, lineHeight: 1, textShadow: '0 12px 40px rgba(47,111,235,.45)' }}>?</div>
      </At>
      <At x={540} y={850} o={Cc * ramp(t, at(6, 3), at(6, 3) + 0.4)} z={6}><Pill text="How does it run?" bg={C.blue} size={58} /></At>
    </Stage>
  );
};
