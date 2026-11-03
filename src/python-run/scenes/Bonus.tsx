import React from 'react';
import { Stage, At } from '../components/Stage';
import { Pill, FileCard } from '../components/art';
import { useT, pop, ramp } from '../hooks';
import { at } from '../timing';
import { C, FONT_DISPLAY, FONT_MONO, shadow } from '../theme';

const Row: React.FC<{ icon: string; name: string; color?: string; indent?: number; p: number; hi?: number }> = ({ icon, name, color = C.ink, indent = 0, p, hi = 0 }) => (
  <div style={{ marginLeft: indent * 56, opacity: p, transform: `translateX(${(1 - p) * -40}px)`, display: 'flex', alignItems: 'center', gap: 16, fontFamily: FONT_MONO, fontWeight: 800, fontSize: 42, color, padding: '12px 20px', borderRadius: 18, background: hi > 0 ? `rgba(255,212,59,${0.45 * hi})` : 'transparent', margin: '4px 0' }}>
    <span style={{ fontSize: 46 }}>{icon}</span>{name}
  </div>
);

export const Bonus: React.FC = () => {
  const t = useT();
  const imp = at(35, 0), save = at(35, 4), fast = at(36, 0);
  const saveP = pop(t, at(35, 7), 11);
  const bar1 = ramp(t, fast + 0.2, fast + 1.5, (x) => x), bar2 = ramp(t, fast + 1.3, fast + 1.9, (x) => x);
  return (
    <Stage>
      <At x={540} y={60} s={pop(t, at(34, 0))} o={pop(t, at(34, 0))} z={6}><Pill text="BONUS" bg={C.pyBlue} size={56} style={{ background: `linear-gradient(90deg, ${C.pyBlue}, #5B9BD5)` }} /></At>
      {/* project tree */}
      <At x={540} y={370} o={pop(t, at(34, 0) + 0.2)} s={0.94 + 0.06 * pop(t, at(34, 0) + 0.2)}>
        <div style={{ width: 920, background: '#fff', border: `2px solid ${C.line}`, borderRadius: 34, boxShadow: shadow(), padding: '22px 30px' }}>
          <Row icon="📁" name="my_project/" p={1} color={C.inkSoft} />
          <Row icon="🐍" name="main.py" indent={1} p={pop(t, at(35, 0) - 0.3)} />
          <Row icon="🐍" name="utils.py  ← import" indent={1} p={pop(t, imp + 0.3)} hi={ramp(t, imp + 0.3, imp + 0.6)} />
          <Row icon="📂" name="__pycache__/" indent={1} p={pop(t, at(35, 5))} color={C.orange} hi={ramp(t, at(35, 5), at(35, 5) + 0.3)} />
          <div style={{ marginLeft: 112, opacity: saveP, transform: `translateY(${(1 - saveP) * -30}px) scale(${0.9 + 0.1 * saveP})`, display: 'flex', alignItems: 'center', gap: 18, fontFamily: FONT_MONO, fontWeight: 800, fontSize: 36, color: C.orange, padding: '10px 20px', background: '#FFF3E6', borderRadius: 18, border: `3px solid ${C.orange}`, marginTop: 6 }}>
            <span style={{ fontSize: 40 }}>💾</span>utils.cpython-313.pyc
          </div>
        </div>
      </At>
      <At x={800} y={700} o={ramp(t, save, save + 0.3)} s={pop(t, save)} z={5}><Pill text="bytecode saved" bg={C.orange} size={38} /></At>
      {/* next time = fast */}
      <At x={540} y={880} o={ramp(t, fast, fast + 0.3)}>
        <div style={{ width: 920, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[{ l: '1st run', w: 760 * bar1, c: C.muted, k: 'compile + run' }, { l: 'next run', w: 240 * bar2, c: C.green, k: '⚡ FAST' }].map((b) => (
            <div key={b.l} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ width: 170, fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 36, color: C.ink }}>{b.l}</div>
              <div style={{ height: 62, width: Math.max(8, b.w), borderRadius: 31, background: b.c, color: '#fff', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', paddingLeft: 24, whiteSpace: 'nowrap', overflow: 'hidden' }}>{b.w > 150 ? b.k : ''}</div>
            </div>
          ))}
        </div>
      </At>
    </Stage>
  );
};
