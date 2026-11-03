import React from 'react';
import { Stage, At } from '../components/Stage';
import { Pill, FileCard, Gear, FlowArrow } from '../components/art';
import { useT, pop, ramp } from '../hooks';
import { at } from '../timing';
import { C, FONT_DISPLAY, shadow } from '../theme';

const Opt: React.FC<{ letter: string; label: string; color: string; ok: number }> = ({ letter, label, color, ok }) => (
  <div style={{ width: 400, height: 190, borderRadius: 36, background: ok > 0.5 ? '#E6F9EF' : '#fff', border: `6px solid ${ok > 0.5 ? C.green : color}`, boxShadow: shadow(`${ok > 0.5 ? C.green : color}55`, 16, 36), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, position: 'relative' }}>
    <div style={{ width: 80, height: 80, borderRadius: '50%', background: ok > 0.5 ? C.green : color, color: '#fff', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{letter}</div>
    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 46, color: C.ink }}>{label}</div>
    <div style={{ position: 'absolute', right: -22, top: -26, fontSize: 76, transform: `scale(${ok})`, opacity: ok }}>✅</div>
  </div>
);

export const Answer: React.FC = () => {
  const t = useT();
  const rendu = at(23, 0);
  const ok = pop(t, rendu, 10);
  const c1 = at(24, 1), c2 = at(25, 1);         // "compile", "interpret"
  const s1 = ramp(t, c1 - 0.3, c1 + 0.2), s2 = ramp(t, c2 - 0.3, c2 + 0.2);
  return (
    <Stage>
      <At x={540} y={70} s={pop(t, at(22, 0))} o={pop(t, at(22, 0))} z={6}><Pill text="ANSWER" bg={C.green} size={56} /></At>
      <At x={270} y={270}><Opt letter="A" label="Compiled" color={C.blue} ok={ok} /></At>
      <At x={810} y={270}><Opt letter="B" label="Interpreted" color={C.orange} ok={ok} /></At>
      <At x={540} y={440} o={ramp(t, rendu, rendu + 0.15)} s={0.5 + 0.7 * pop(t, rendu + 0.05, 8)} r={-4} z={7}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 130, color: C.green, textShadow: '0 10px 0 #fff, 0 20px 40px rgba(18,183,106,.45)', letterSpacing: 4 }}>BOTH!</div>
      </At>

      {/* compile first, interpret after */}
      <At x={110} y={800} o={ramp(t, at(24, 0) - 0.3, at(24, 0))}><FileCard ext=".py" color={C.pyBlue} w={150} lines={4} /></At>
      <At x={265} y={800} o={ramp(t, at(24, 0) - 0.3, at(24, 0))}><FlowArrow length={70} color={C.blue} phase={t * 2} active={s1} /></At>
      <At x={420} y={800} o={ramp(t, at(24, 0) - 0.3, at(24, 0))} s={0.9 + 0.1 * s1}>
        <div style={{ width: 150, height: 190, borderRadius: 30, background: '#fff', border: `5px solid ${C.blue}`, boxShadow: shadow(`${C.blue}55`, 14, 30), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.45 + 0.55 * s1 }}>
          <Gear size={90} color={C.blue} rot={t * 140} />
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 24, color: C.blue }}>COMPILE</div>
        </div>
      </At>
      <At x={560} y={800} o={ramp(t, at(24, 0) - 0.3, at(24, 0))}><FlowArrow length={60} color={C.blue} phase={t * 2} active={s1} /></At>
      <At x={690} y={800} o={ramp(t, at(24, 0) - 0.3, at(24, 0))}><FileCard ext=".pyc" color={C.orange} w={150} lines={4} /></At>
      <At x={840} y={800} o={ramp(t, at(25, 0) - 0.3, at(25, 0))}><FlowArrow length={60} color={C.orange} phase={t * 2} active={s2} /></At>
      <At x={965} y={800} o={ramp(t, at(25, 0) - 0.3, at(25, 0))} s={0.9 + 0.1 * s2}>
        <div style={{ width: 150, height: 190, borderRadius: 30, background: '#fff', border: `5px solid ${C.orange}`, boxShadow: shadow(`${C.orange}55`, 14, 30), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.45 + 0.55 * s2 }}>
          <div style={{ fontSize: 80, color: C.orange, transform: `scale(${1 + 0.1 * Math.sin(t * 10) * s2})` }}>▶</div>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 21, color: C.orange }}>INTERPRET</div>
        </div>
      </At>
      <At x={265} y={960} o={ramp(t, c1, c1 + 0.3)}><Pill text="1  compile" bg={C.blue} size={36} /></At>
      <At x={815} y={960} o={ramp(t, c2, c2 + 0.3)}><Pill text="2  interpret" bg={C.orange} size={36} /></At>
    </Stage>
  );
};
