import React from 'react';
import { Stage, At } from '../components/Stage';
import { CpuChip, Gear, Pill } from '../components/art';
import { useT, pop, ramp } from '../hooks';
import { at } from '../timing';
import { C, FONT_DISPLAY, FONT_MONO, shadow } from '../theme';

const Icon: React.FC<{ i: number; t: number }> = ({ i, t }) => {
  if (i === 0) return <div style={{ fontFamily: FONT_MONO, fontWeight: 900, fontSize: 58, color: C.pyBlue }}>{'</>'}</div>;
  if (i === 1) return <Gear size={100} color={C.blue} rot={t * 140} />;
  if (i === 2) return <div style={{ fontFamily: FONT_MONO, fontWeight: 900, fontSize: 46, color: C.orange, lineHeight: 1.1 }}>0101<br />1100</div>;
  if (i === 3) return <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 64, color: C.pyBlue }}>VM</div>;
  if (i === 4) return <CpuChip size={118} glow={0.2} />;
  return <div style={{ fontFamily: FONT_MONO, fontWeight: 900, fontSize: 72, color: C.green }}>5</div>;
};
const LABELS = ['Code', 'Compile', 'Bytecode', 'Python VM', 'CPU', 'Output'];
const COLORS = [C.pyBlue, C.blue, C.orange, C.pyBlue, C.orange, C.green];

export const Recap: React.FC = () => {
  const t = useT();
  const t0 = 70.45, dt = 0.4;
  const pos = (i: number) => {                      // 2 rows x 3, snake order so the arrows always flow
    const row = Math.floor(i / 3), col = i % 3;
    return { x: 190 + (row === 0 ? col : 2 - col) * 350, y: 330 + row * 380 };
  };
  const javaT = at(37, 3);
  return (
    <Stage>
      <At x={540} y={70} o={pop(t, javaT)} s={pop(t, javaT)} z={6}><Pill text="Next: JAVA ☕ ?" bg={C.orange} size={56} /></At>
      {LABELS.map((l, i) => {
        const p = pop(t, t0 + i * dt, 12), { x, y } = pos(i);
        return (
          <React.Fragment key={l}>
            <At x={x} y={y} o={p} s={p}>
              <div style={{ width: 270, textAlign: 'center' }}>
                <div style={{ width: 270, height: 230, borderRadius: 36, background: '#fff', border: `5px solid ${COLORS[i]}`, boxShadow: shadow(`${COLORS[i]}44`, 16, 34), display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon i={i} t={t} /></div>
                <div style={{ marginTop: 12, fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 36, color: COLORS[i] }}>{l}</div>
              </div>
            </At>
            {i < 5 && (() => {
              const a = pos(i), b = pos(i + 1);
              const vertical = a.y !== b.y;
              const mx = (a.x + b.x) / 2, my = vertical ? (a.y + b.y) / 2 : a.y;
              const dir = vertical ? 0 : b.x > a.x ? 0 : 180;
              return (
                <At x={mx} y={my - (vertical ? 0 : 0)} o={ramp(t, t0 + (i + 1) * dt - 0.2, t0 + (i + 1) * dt)} r={vertical ? 90 : dir}>
                  <svg width="70" height="44" viewBox="0 0 70 44"><path d="M4 22 H50 M38 6 L60 22 L38 38" stroke={C.orange} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 8px rgba(255,122,26,.7))' }} /></svg>
                </At>
              );
            })()}
          </React.Fragment>
        );
      })}
    </Stage>
  );
};
