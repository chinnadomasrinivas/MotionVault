import React from 'react';
import { Stage, At } from '../components/Stage';
import { StepBadge, CpuChip, Motherboard, FlowArrow, Monitor, Pill } from '../components/art';
import { useT, pop, ramp } from '../hooks';
import { at } from '../timing';
import { C, FONT_DISPLAY, FONT_MONO, shadow } from '../theme';

const NodeCard: React.FC<{ label: string; color: string; children: React.ReactNode; lit: number }> = ({ label, color, children, lit }) => (
  <div style={{ width: 205, textAlign: 'center' }}>
    <div style={{ width: 205, height: 200, borderRadius: 34, background: '#fff', border: `5px solid ${color}`, boxShadow: `${shadow(`${color}44`, 16, 34)}, 0 0 ${lit * 44}px ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>{children}</div>
    <div style={{ marginTop: 12, fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 36, color }}>{label}</div>
  </div>
);

export const Hardware: React.FC = () => {
  const t = useT();
  const tVM = at(27, 0), tC = at(27, 3), tOS = at(28, 0), tCPU = at(28, 2), tRUN = at(29, 0), tOUT = at(30, 0);
  const lit = (a: number, b: number) => ramp(t, a, a + 0.25, (x) => x) * (1 - ramp(t, b, b + 0.4, (x) => x) * 0.7);
  const run = ramp(t, tRUN, tRUN + 0.3) * (1 - ramp(t, tOUT, tOUT + 0.4));
  const bits = '0101 1100 1011 0011 1010 0110 1111 0001 0010 1101';
  const xs = [135, 400, 665, 930];
  return (
    <Stage>
      <At x={540} y={60} s={pop(t, at(26, 0))} o={pop(t, at(26, 0))} z={6}><StepBadge label="STEP 4 · 5" color={C.orange} /></At>

      {/* flow row: PVM -> OS -> CPU -> Output */}
      <At x={xs[0]} y={290} o={pop(t, tVM)} s={pop(t, tVM)}>
        <NodeCard label="PVM" color={C.pyBlue} lit={lit(tVM, tOS)}>
          <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 84, color: C.pyBlue }}>VM</div>
          <div style={{ position: 'absolute', right: -18, top: -18, width: 76, height: 76, borderRadius: '50%', background: C.blue, border: '5px solid #fff', color: '#fff', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop(t, tC, 9)})` }}>C</div>
        </NodeCard>
      </At>
      <At x={xs[1]} y={290} o={pop(t, tOS)} s={pop(t, tOS)}>
        <NodeCard label="OS" color={C.purple} lit={lit(tOS, tRUN)}>
          <svg width="120" height="120" viewBox="0 0 120 120"><rect x="12" y="20" width="96" height="70" rx="10" fill="none" stroke={C.purple} strokeWidth="8" /><path d="M40 106 H80 M60 90 V106" stroke={C.purple} strokeWidth="8" strokeLinecap="round" /><circle cx="60" cy="55" r="14" fill={C.purple} /></svg>
        </NodeCard>
      </At>
      <At x={xs[2]} y={290} o={pop(t, tCPU)} s={pop(t, tCPU)}>
        <NodeCard label="CPU" color={C.orange} lit={run + lit(tCPU, tRUN) * 0.5}>
          <CpuChip size={150} glow={run * 0.8} hot={run} />
        </NodeCard>
      </At>
      <At x={xs[3]} y={290} o={pop(t, tOUT)} s={pop(t, tOUT)}>
        <NodeCard label="OUTPUT" color={C.green} lit={lit(tOUT, tOUT + 3)}>
          <div style={{ width: 160, height: 110, borderRadius: 12, background: '#F3F6FB', border: `6px solid ${C.green}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_MONO, fontWeight: 900, fontSize: 80, color: C.green }}>5</div>
        </NodeCard>
      </At>
      <At x={(xs[0] + xs[1]) / 2} y={270} z={3}><FlowArrow length={62} color={C.orange} phase={t * 2.5} active={ramp(t, tOS - 0.2, tOS + 0.1)} /></At>
      <At x={(xs[1] + xs[2]) / 2} y={270} z={3}><FlowArrow length={62} color={C.orange} phase={t * 2.5} active={ramp(t, tCPU - 0.2, tCPU + 0.1)} /></At>
      <At x={(xs[2] + xs[3]) / 2} y={270} z={3}><FlowArrow length={62} color={C.orange} phase={t * 2.5} active={ramp(t, tOUT - 0.2, tOUT + 0.1)} /></At>

      {/* motherboard imagery: it lights up while the CPU executes */}
      <At x={540} y={745} o={ramp(t, tOS - 0.2, tOS + 0.4)} s={0.95 + 0.05 * ramp(t, tOS, tRUN + 2, (x) => x)}>
        <Motherboard w={800} h={554} pulse={Math.max(run, ramp(t, tOS, tOS + 1.5, (x) => x) * 0.5)} />
      </At>
      {/* machine-code stream into the CPU */}
      <At x={540} y={520} o={run} z={7}>
        <div style={{ fontFamily: FONT_MONO, fontWeight: 900, fontSize: 44, color: C.orange, background: 'rgba(255,255,255,0.92)', padding: '8px 26px', borderRadius: 20, whiteSpace: 'nowrap', width: 760, overflow: 'hidden', boxShadow: shadow() }}>
          <div style={{ transform: `translateX(${-((t * 260) % 540)}px)` }}>{bits + ' ' + bits + ' ' + bits}</div>
        </div>
      </At>
      <At x={540} y={990} o={ramp(t, tRUN, tRUN + 0.3)} z={7}><Pill text="machine instructions" bg={C.orange} size={40} /></At>
    </Stage>
  );
};
