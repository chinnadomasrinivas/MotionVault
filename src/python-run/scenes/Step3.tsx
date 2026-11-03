import React from 'react';
import { Stage, At } from '../components/Stage';
import { StepBadge, ChefHat, Pill } from '../components/art';
import { CodeBlock } from '../components/code';
import { useT, pop, ramp, win } from '../hooks';
import { at, endAt } from '../timing';
import { C, FONT_DISPLAY, FONT_MONO, shadow } from '../theme';

const OPS = ['RESUME', 'LOAD_FAST_LOAD_FAST', 'BINARY_OP', 'RETURN_VALUE'];
const RECIPE = ['1  LOAD_FAST', '2  BINARY_OP', '3  RETURN_VALUE'];

export const Step3: React.FC = () => {
  const t = useT();
  const A = win(t, 29.4, 35.0, 0.4);           // PVM reading
  const B = win(t, 34.8, 38.0, 0.4);           // chef + recipe
  const r0 = at(15, 6);                        // "okkokka"
  const span = (endAt(15) - r0) / OPS.length;
  const idx = t < r0 ? -1 : Math.min(OPS.length - 1, Math.floor((t - r0) / span));
  const chefT = at(16, 0);
  return (
    <Stage>
      <At x={540} y={70} s={pop(t, at(14, 0))} o={pop(t, at(14, 0))} z={6}><StepBadge label="STEP 3" color={C.orange} /></At>

      {/* ---------- A: PVM reads bytecode instruction by instruction ---------- */}
      <At x={540} y={290} o={A * pop(t, at(15, 0))} s={pop(t, at(15, 0))}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, background: '#fff', border: `5px solid ${C.pyBlue}`, borderRadius: 44, padding: '26px 48px', boxShadow: shadow('rgba(55,118,171,0.35)', 20, 44) }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <rect x="10" y="10" width="100" height="100" rx="26" fill={C.pyBlue} />
            <rect x="30" y="34" width="60" height="40" rx="8" fill="#fff" opacity=".95" />
            <rect x="38" y="82" width="44" height="8" rx="4" fill={C.pyYellow} />
            <path d="M44 48 L56 56 L44 64" stroke={C.pyBlue} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="62" y="62" width="16" height="6" rx="3" fill={C.pyBlue} />
          </svg>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 58, color: C.pyBlue, lineHeight: 1.05 }}>Python<br />Virtual Machine</div>
        </div>
      </At>
      <At x={540} y={640} o={A * ramp(t, at(15, 4) - 0.2, at(15, 4) + 0.3)} s={0.92 + 0.08 * pop(t, at(15, 4) - 0.2)}>
        <div style={{ position: 'relative', background: '#fff', border: `2px solid ${C.line}`, borderRadius: 32, boxShadow: shadow(), width: 900, padding: '10px 0' }}>
          <div style={{ position: 'absolute', top: -22, left: 36 }}><Pill text="BYTECODE" bg={C.orange} size={32} /></div>
          {OPS.map((o, i) => (
            <div key={o} style={{
              margin: '10px 24px', padding: '14px 24px', borderRadius: 18, fontFamily: FONT_MONO, fontWeight: 800, fontSize: 38,
              background: i === idx ? C.blue : i < idx ? '#E6F7EE' : '#F3F6FB', color: i === idx ? '#fff' : i < idx ? C.green : C.inkSoft,
              transform: i === idx ? 'scale(1.04) translateX(10px)' : 'none', boxShadow: i === idx ? '0 12px 28px rgba(47,111,235,.45)' : 'none',
              display: 'flex', justifyContent: 'space-between',
            }}><span>{i === idx ? '▶ ' : '  '}{o}</span><span>{i < idx ? '✓' : ''}</span></div>
          ))}
        </div>
      </At>
      <At x={540} y={960} o={A * ramp(t, at(15, 6), at(15, 6) + 0.3)}><Pill text="one instruction at a time" bg={C.ink} size={40} /></At>

      {/* ---------- B: chef follows the recipe ---------- */}
      <At x={250} y={430} o={B * pop(t, chefT)} s={pop(t, chefT)} r={Math.sin(t * 5) * 3}>
        <ChefHat size={330} />
        <div style={{ textAlign: 'center', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 44, color: C.pyBlue, marginTop: -6 }}>PVM</div>
      </At>
      <At x={730} y={450} o={B * pop(t, at(16, 2))} s={0.9 + 0.1 * pop(t, at(16, 2))} r={2}>
        <div style={{ width: 470, background: '#FFFDF5', border: `4px solid ${C.orange}`, borderRadius: 30, padding: '26px 30px', boxShadow: shadow('rgba(255,122,26,0.30)', 18, 40) }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 44, color: C.orange, marginBottom: 14 }}>RECIPE = Bytecode</div>
          {RECIPE.map((r, i) => {
            const done = t > at(16, 3) + i * 0.55;
            return (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: FONT_MONO, fontWeight: 800, fontSize: 33, color: done ? C.green : C.inkSoft, margin: '14px 0' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, border: `4px solid ${done ? C.green : C.line}`, background: done ? C.green : '#fff', color: '#fff', textAlign: 'center', lineHeight: '34px', fontSize: 28 }}>{done ? '✓' : ''}</div>{r}
              </div>
            );
          })}
        </div>
      </At>
      <At x={540} y={850} o={B * ramp(t, at(16, 4), at(16, 4) + 0.3)} s={pop(t, at(16, 4))}><Pill text="Chef follows recipe steps" bg={C.orange} size={46} /></At>
    </Stage>
  );
};
