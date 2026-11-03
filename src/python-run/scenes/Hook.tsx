import React from 'react';
import { Stage, At } from '../components/Stage';
import { Laptop, Pill, CpuChip } from '../components/art';
import { CodeBlock, WindowFrame, RunButton } from '../components/code';
import { useT, pop, ramp, win } from '../hooks';
import { at, endAt } from '../timing';
import { C, FONT_DISPLAY, FONT_MONO, shadow } from '../theme';
import { DIS_LINES } from '../data';

const STEPS = ['Command', 'Interpreter', 'PVM', 'OS', 'CPU'];

export const Hook: React.FC = () => {
  const t = useT();
  const pressT = at(0, 4);                       // "press"
  const press = ramp(t, pressT, pressT + 0.12, (x) => x) * (1 - ramp(t, pressT + 0.16, pressT + 0.4, (x) => x));
  const glow = ramp(t, pressT, pressT + 0.3) * win(t, 0, 3.4, 0.4);
  // cursor path -> Run button (845, 349 in stage coords)
  const k = ramp(t, 0.15, pressT);
  const cx = 1010 - 165 * k, cy = 760 - 410 * k;
  const secT = at(0, 6);                         // "1"
  const ring = ramp(t, secT, secT + 1.0, (x) => x);
  const A = win(t, 0, 3.3, 0.35);                // laptop + title block
  const B = win(t, 3.1, 5.8, 0.35);              // five steps
  const Cc = win(t, 5.6, 9.2, 0.4);              // bytecode teaser (scene shell handles the exit)

  return (
    <Stage>
      {/* ---------- A: thumbnail title + laptop, Run press, 1-second ring ---------- */}
      <At x={540} y={110} o={A} s={0.9 + 0.1 * pop(t, 0.0, 12)} z={5}>
        <div style={{ textAlign: 'center', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 104, lineHeight: 1.0, color: C.ink, textShadow: '0 8px 0 rgba(47,111,235,0.18)' }}>
          Run Button<br /><span style={{ color: C.blue }}>Secret</span> 🤯
        </div>
      </At>
      <At x={540} y={610} o={A} s={1 + ramp(t, 0, 3.3, (x) => x) * 0.05} blur={(1 - ramp(t, 0, 0.5)) * 14}>
        <Laptop w={880}>
          <WindowFrame title="file.py" w={848} h={540} style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
            right={<RunButton press={press} glow={glow} size={0.9} />}>
            <CodeBlock lines={['name = "Python"', 'print("Hello", name)']} fs={36} />
          </WindowFrame>
        </Laptop>
      </At>
      <At x={cx} y={cy} o={A * ramp(t, 0.1, 0.4) * (1 - ramp(t, pressT + 0.5, pressT + 0.8))} z={9} r={-12}>
        <svg width="70" height="70" viewBox="0 0 24 24"><path d="M5 2 L5 19 L9.5 14.5 L13 22 L16 20.7 L12.6 13.3 L19 13 Z" fill="#fff" stroke={C.ink} strokeWidth="1.6" strokeLinejoin="round" /></svg>
      </At>
      {/* 1 second ring */}
      <At x={930} y={175} o={A * pop(t, secT)} s={0.72 * pop(t, secT)} z={8}>
        <div style={{ position: 'relative', width: 230, height: 230, borderRadius: '50%', background: '#fff', boxShadow: shadow(), display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${C.line}` }}>
          <svg width="230" height="230" viewBox="0 0 230 230" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
            <circle cx="115" cy="115" r="96" fill="none" stroke={C.line} strokeWidth="16" />
            <circle cx="115" cy="115" r="96" fill="none" stroke={C.orange} strokeWidth="16" strokeLinecap="round" strokeDasharray={`${ring * 603} 603`} />
          </svg>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 72, color: C.ink, lineHeight: 0.9, textAlign: 'center' }}>1<span style={{ fontSize: 40 }}> sec</span></div>
        </div>
      </At>

      {/* ---------- B: 5 steps chain (each node on the beat of the narration) ---------- */}
      <At x={540} y={190} o={B} s={pop(t, at(1, 3))} z={5}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 150, color: C.blue, lineHeight: 1 }}>5 <span style={{ color: C.ink }}>steps</span></div>
      </At>
      {STEPS.map((label, i) => {
        const tt = at(1, 3) + i * 0.3;
        const p = pop(t, tt, 11);
        const x = 130 + i * 205;
        return (
          <React.Fragment key={label}>
            <At x={x} y={560} o={B * p} s={p} z={6}>
              <div style={{ width: 168, height: 168, borderRadius: '50%', background: i === 4 ? C.orange : C.blue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 92, boxShadow: `0 18px 40px ${i === 4 ? C.orange : C.blue}77`, border: '6px solid #fff' }}>{i + 1}</div>
              <div style={{ textAlign: 'center', marginTop: 16, fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 30, color: C.ink }}>{label}</div>
            </At>
            {i < 4 && (
              <At x={x + 102} y={560} o={B * ramp(t, tt + 0.1, tt + 0.3)} z={5}>
                <svg width="60" height="40" viewBox="0 0 60 40"><path d="M2 20 H44 M34 6 L54 20 L34 34" stroke={C.muted} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </At>
            )}
          </React.Fragment>
        );
      })}
      <At x={540} y={880} o={B * ramp(t, at(1, 3) + 1.4, at(1, 3) + 1.9)} z={5}>
        <Pill text="in just 1 second" bg={C.ink} size={46} />
      </At>

      {/* ---------- C: bytecode teaser ---------- */}
      <At x={540} y={150} o={Cc * pop(t, at(2, 0))} s={pop(t, at(2, 0))} z={5}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 84, color: C.ink, textAlign: 'center', lineHeight: 1 }}>Last lo <span style={{ color: C.blue }}>bytecode</span> 👀</div>
      </At>
      <At x={540} y={560} o={Cc * ramp(t, at(2, 2) - 0.1, at(2, 2) + 0.3)} s={0.92 + 0.08 * pop(t, at(2, 2) - 0.1)} blur={(1 - ramp(t, at(2, 5), at(2, 5) + 0.5)) * 8} z={4}>
        <WindowFrame title="dis.dis(add)" w={900}>
          <CodeBlock lines={DIS_LINES} fs={31} hideNums visible={ramp(t, at(2, 2), at(2, 2) + 1.4, (x) => x) * DIS_LINES.length} />
          <div style={{ height: 6 }} />
        </WindowFrame>
      </At>
      <At x={820} y={800} o={Cc * ramp(t, at(2, 5), at(2, 5) + 0.3)} s={pop(t, at(2, 5))} z={8}>
        <Pill text="REAL ✔" bg={C.green} size={52} />
      </At>
      <At x={170} y={850} o={Cc * 0.9} s={0.55} r={-8}><CpuChip size={420} glow={0.2} /></At>
    </Stage>
  );
};
