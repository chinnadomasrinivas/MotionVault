import React from 'react';
import { Stage, At } from '../components/Stage';
import { Pill } from '../components/art';
import { CodeBlock, WindowFrame, RunButton, TerminalBox } from '../components/code';
import { useT, pop, ramp, typed } from '../hooks';
import { at, endAt } from '../timing';
import { C, FONT_DISPLAY, shadow } from '../theme';
import { DIS_LINES } from '../data';

export const Payoff: React.FC = () => {
  const t = useT();
  const proofT = at(31, 0);
  const typeImport = ramp(t, at(32, 0), at(32, 1) + 0.15, (x) => x);
  const typeDis = ramp(t, at(32, 3), endAt(32, 3) + 0.2, (x) => x);
  const runT = at(32, 4);                                  // "run"
  const press = ramp(t, runT, runT + 0.1, (x) => x) * (1 - ramp(t, runT + 0.15, runT + 0.4, (x) => x));
  const outT = at(32, 5);
  const hlStart = at(33, 0), hlSpan = (endAt(33) - hlStart - 0.3) / 3;
  const lineOrder = [0, 2, 3, 4];
  const hlIdx = t < hlStart ? -1 : Math.min(3, Math.floor((t - hlStart) / hlSpan));
  const active = hlIdx < 0 ? -1 : lineOrder[hlIdx];

  const src = ['import dis', '', 'def add(a, b):', '    return a + b', '', 'dis.dis(add)'];
  // lines appear: def block first (already there), `import dis` typed, `dis.dis(add)` typed
  const shown = src.map((l, i) => (i === 0 ? l.slice(0, Math.round(l.length * typeImport)) : i === 5 ? l.slice(0, Math.round(l.length * typeDis)) : l));
  return (
    <Stage>
      <At x={540} y={50} s={pop(t, proofT)} o={pop(t, proofT)} z={8}><Pill text="PROOF 🔍" bg={C.blue} size={50} /></At>
      <At x={540} y={355} o={ramp(t, proofT - 0.2, proofT + 0.3)} s={0.96 + 0.04 * pop(t, proofT)}>
        <WindowFrame title="add.py" w={940} right={<RunButton press={press} glow={ramp(t, runT, runT + 0.3) * (1 - ramp(t, runT + 1.2, runT + 2, (x) => x))} size={0.85} />}>
          <CodeBlock lines={shown} fs={38} lh={1.42} pad={22} />
        </WindowFrame>
      </At>
      <At x={540} y={810} o={ramp(t, outT, outT + 0.3)} s={0.94 + 0.06 * pop(t, outT)}>
        <div style={{ position: 'relative' }}>
          <TerminalBox w={940} fs={30} lines={[]} style={{ borderRadius: 24 }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 54 }}>
            <CodeBlock lines={DIS_LINES} fs={30} lh={1.42} hideNums pad={26} active={active} visible={ramp(t, outT, outT + 0.9, (x) => x) * DIS_LINES.length} />
          </div>
          <div style={{ height: 275 }} />
        </div>
      </At>
      <At x={810} y={640} o={ramp(t, at(33, 3), at(33, 3) + 0.2)} s={pop(t, at(33, 3), 9)} z={9} r={-5}>
        <Pill text="REAL BYTECODE ✔" bg={C.green} size={44} style={{ boxShadow: shadow('rgba(18,183,106,.5)', 14, 30) }} />
      </At>
    </Stage>
  );
};
