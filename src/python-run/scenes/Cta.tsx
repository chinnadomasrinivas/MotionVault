import React from 'react';
import { Stage, At } from '../components/Stage';
import { PyBadge } from '../components/art';
import { useT, pop, ramp, typed } from '../hooks';
import { at } from '../timing';
import { C, FONT_DISPLAY, FONT_MONO, shadow } from '../theme';

export const Cta: React.FC = () => {
  const t = useT();
  const cT = at(38, 0), jT = at(38, 1), sendT = at(38, 3), fT = at(39, 0);
  const send = ramp(t, sendT, sendT + 0.1, (x) => x) * (1 - ramp(t, sendT + 0.12, sendT + 0.35, (x) => x));
  const pulse = 1 + 0.06 * Math.sin((t - fT) * 9) * ramp(t, fT, fT + 0.3);
  return (
    <Stage>
      <At x={540} y={150} s={0.8 + 0.2 * pop(t, cT)} o={pop(t, cT)} z={6}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 112, color: C.ink, textAlign: 'center', lineHeight: 1.0 }}>Comment<br /><span style={{ color: C.orange }}>JAVA</span> 👇</div>
      </At>
      {/* comment box mock */}
      <At x={540} y={520} o={pop(t, cT + 0.15)} s={0.92 + 0.08 * pop(t, cT + 0.15)}>
        <div style={{ width: 920, boxSizing: 'border-box', background: '#fff', borderRadius: 40, border: `2px solid ${C.line}`, boxShadow: shadow(), padding: 30, display: 'flex', alignItems: 'center', gap: 22 }}>
          <PyBadge size={92} />
          <div style={{ flex: 1, minWidth: 0, height: 100, borderRadius: 50, background: C.mist, border: `3px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 34px', fontFamily: FONT_MONO, fontWeight: 900, fontSize: 56, color: C.ink }}>
            {typed('JAVA', t, jT, jT + 0.5) || <span style={{ color: C.muted, fontSize: 40 }}>Add a comment…</span>}
            <span style={{ width: 4, height: 56, background: C.blue, marginLeft: 6, opacity: Math.floor(t * 2) % 2 }} />
          </div>
          <div style={{ width: 110, height: 100, borderRadius: 50, background: C.blue, color: '#fff', fontSize: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 - send * 0.15})`, boxShadow: `0 12px 28px ${C.blue}66` }}>➤</div>
        </div>
      </At>
      {/* follow */}
      <At x={540} y={800} o={pop(t, fT)} s={pop(t, fT) * pulse}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '26px 70px', borderRadius: 999, background: `linear-gradient(90deg, ${C.blue}, ${C.purple})`, color: '#fff', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 70, boxShadow: `0 22px 50px ${C.blue}77` }}>＋ Follow</div>
      </At>
      {[0, 1, 2, 3].map((i) => {
        const k = ramp(t, fT + 0.25 + i * 0.22, fT + 1.5 + i * 0.22, (x) => x);
        return <At key={i} x={[120, 960, 200, 880][i]} y={900 - k * 260} o={k > 0 && k < 1 ? 1 - k * 0.6 : 0} s={0.8 + 0.5 * k} z={7}><span style={{ fontSize: 80 }}>{['❤️', '🔥', '💙', '⚡'][i]}</span></At>;
      })}
    </Stage>
  );
};
