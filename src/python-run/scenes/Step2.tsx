import React from 'react';
import { Stage, At } from '../components/Stage';
import { StepBadge, FileCard, Gear, Pill, FlowArrow } from '../components/art';
import { CodeBlock } from '../components/code';
import { useT, pop, ramp, win } from '../hooks';
import { at } from '../timing';
import { C, FONT_DISPLAY, shadow } from '../theme';

export const Step2: React.FC = () => {
  const t = useT();
  const gearT = at(11, 0);
  const checkT = at(11, 4);                    // "check"
  const convT = at(12, 0);                     // "bytecode ga marusthundi"
  const transT = at(13, 2);                    // "translator"
  const scan = ramp(t, checkT, checkT + 0.9, (x) => x);
  const conv = ramp(t, convT, convT + 0.6);
  const flow = ramp(t, convT + 0.4, convT + 1.2);
  return (
    <Stage>
      <At x={540} y={70} s={pop(t, at(10, 0))} o={pop(t, at(10, 0))} z={6}><StepBadge label="STEP 2" color={C.purple} /></At>

      {/* source file (left) */}
      <At x={190} y={430} o={pop(t, at(10, 0) + 0.1)} s={pop(t, at(10, 0) + 0.1)}>
        <FileCard ext=".py" name="file.py" color={C.pyBlue} w={230} />
        {/* check scan beam */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 288 * scan, height: 8, background: C.green, boxShadow: `0 0 24px ${C.green}`, opacity: scan > 0 && scan < 1 ? 1 : 0 }} />
      </At>
      {/* interpreter machine (center) */}
      <At x={540} y={430} o={pop(t, gearT)} s={pop(t, gearT)} z={3}>
        <div style={{ width: 300, height: 330, borderRadius: 44, background: '#fff', border: `5px solid ${C.purple}`, boxShadow: shadow('rgba(122,90,248,0.35)', 20, 44), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Gear size={170} rot={t * 120} />
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 38, color: C.purple }}>Interpreter</div>
        </div>
      </At>
      {/* check marks */}
      <At x={190} y={190} o={ramp(t, checkT + 0.8, checkT + 1.0)} s={pop(t, checkT + 0.8, 9)} z={8}>
        <div style={{ width: 120, height: 120, borderRadius: '50%', background: C.green, color: '#fff', fontSize: 74, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '6px solid #fff', boxShadow: `0 14px 30px ${C.green}77` }}>✓</div>
      </At>
      {/* arrows */}
      <At x={365} y={430} z={4}><FlowArrow length={90} color={C.purple} phase={t * 2} active={ramp(t, gearT + 0.3, gearT + 0.6)} /></At>
      <At x={715} y={430} z={4}><FlowArrow length={90} color={C.purple} phase={t * 2} active={flow} /></At>
      {/* bytecode file (right) - morphs from source */}
      <At x={890} y={430} o={conv} s={0.7 + 0.3 * pop(t, convT + 0.2, 10)} r={(1 - conv) * -20}>
        <FileCard ext=".pyc" name="bytecode" color={C.orange} w={230} lines={6} />
      </At>

      {/* bytecode peek below */}
      <At x={540} y={800} o={conv} s={0.9 + 0.1 * pop(t, convT + 0.3)}>
        <div style={{ background: '#fff', border: `2px solid ${C.line}`, borderRadius: 28, boxShadow: shadow(), width: 820 }}>
          <CodeBlock lines={['LOAD_FAST_LOAD_FAST  1 (a, b)', 'BINARY_OP            0 (+)', 'RETURN_VALUE']} fs={32} hideNums pad={26} visible={ramp(t, convT + 0.4, convT + 1.4, (x) => x) * 3} />
        </div>
      </At>

      {/* translator analogy overlay */}
      <At x={540} y={640} o={pop(t, transT)} s={0.8 + 0.2 * pop(t, transT, 10)} z={10}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: C.ink, color: '#fff', padding: '20px 44px', borderRadius: 999, fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 60, boxShadow: shadow('rgba(11,27,51,0.4)', 20, 40) }}>
          <span style={{ transform: `translateX(${Math.sin(t * 8) * 8}px)` }}>⇄</span> TRANSLATOR
        </div>
      </At>
    </Stage>
  );
};
