import React from 'react';
import { Stage, At } from '../components/Stage';
import { StepBadge } from '../components/art';
import { CodeBlock, WindowFrame, RunButton, TerminalBox } from '../components/code';
import { useT, pop, ramp, typed } from '../hooks';
import { at, endAt } from '../timing';
import { C, FONT_DISPLAY } from '../theme';

export const Step1: React.FC = () => {
  const t = useT();
  const clickT = at(8, 0) + 0.15;                          // "Run"
  const press = ramp(t, clickT, clickT + 0.1, (x) => x) * (1 - ramp(t, clickT + 0.14, clickT + 0.4, (x) => x));
  const glow = ramp(t, clickT, clickT + 0.3) * (1 - ramp(t, clickT + 1.2, clickT + 2, (x) => x) * 0.6);
  const k = ramp(t, at(7, 0) + 0.2, clickT);
  const cx = 930 - 120 * k, cy = 760 - 560 * k;
  const term = pop(t, at(9, 0), 14);
  const cmd = typed('python file.py', t, at(9, 3), endAt(9, 4) + 0.15);
  const running = ramp(t, at(9, 6), at(9, 6) + 0.3);
  const dots = '.'.repeat(1 + (Math.floor(t * 4) % 3));
  return (
    <Stage>
      <At x={540} y={80} s={pop(t, at(7, 0))} o={pop(t, at(7, 0))} z={6}><StepBadge label="STEP 1" /></At>
      <At x={540} y={380 + 0 * term} s={1 - 0.05 * term} o={1 - 0.15 * term}>
        <WindowFrame title="file.py" w={940} right={<RunButton press={press} glow={glow} size={1} />}>
          <CodeBlock lines={['def add(a, b):', '    return a + b', '', 'print(add(2, 3))']} fs={40} />
        </WindowFrame>
      </At>
      <At x={cx} y={cy} o={ramp(t, at(7, 0), at(7, 0) + 0.3) * (1 - ramp(t, clickT + 0.8, clickT + 1.1))} z={9} r={-12}>
        <svg width="76" height="76" viewBox="0 0 24 24"><path d="M5 2 L5 19 L9.5 14.5 L13 22 L16 20.7 L12.6 13.3 L19 13 Z" fill="#fff" stroke={C.ink} strokeWidth="1.6" strokeLinejoin="round" /></svg>
      </At>
      {/* terminal rises from the background ("IDE background lo") */}
      <At x={540} y={820 + (1 - term) * 260} o={term} z={5}>
        <TerminalBox w={940} fs={44} cursor={running < 0.5}
          lines={[{ text: '$ ' + cmd, color: C.ink }, ...(running > 0.5 ? [{ text: '⚙ running' + dots, color: C.green }] : [])]} />
      </At>
      <At x={540} y={620} o={ramp(t, at(9, 1), at(9, 1) + 0.4) * (1 - running)} z={4}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 34, color: C.muted }}>▼ background command</div>
      </At>
    </Stage>
  );
};
