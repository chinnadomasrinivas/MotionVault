import React from 'react';
import { C, FONT_MONO, FONT_DISPLAY, shadow } from '../theme';

const KW = new Set(['def', 'return', 'import', 'print', 'from', 'if', 'else', 'for', 'in']);

/** tiny light-theme syntax colouring for python + bytecode listings */
export const colorize = (line: string): React.ReactNode[] => {
  const parts = line.split(/(\s+|[(),:+=]|"[^"]*")/).filter((p) => p !== '');
  return parts.map((p, i) => {
    let color: string = C.ink;
    if (KW.has(p)) color = C.purple;
    else if (/^[A-Z][A-Z_]+$/.test(p)) color = C.blue;                // BYTECODE opcodes
    else if (/^\d+$/.test(p)) color = C.orange;
    else if (/^".*"$/.test(p)) color = C.green;
    else if (/^[(),:+=]$/.test(p)) color = C.muted;
    else if (p === 'add' || p === 'dis') color = '#B54708';
    return <span key={i} style={{ color }}>{p}</span>;
  });
};

type CodeProps = {
  lines: string[]; fs?: number; lh?: number; active?: number; visible?: number; // visible = number of lines shown (can be fractional -> typing)
  typedLine?: { index: number; text: string }; numStart?: number; pad?: number; hideNums?: boolean;
};
export const CodeBlock: React.FC<CodeProps> = ({ lines, fs = 40, lh = 1.5, active = -1, visible = 99, numStart = 1, pad = 28, hideNums }) => (
  <div style={{ fontFamily: FONT_MONO, fontSize: fs, lineHeight: lh, padding: pad }}>
    {lines.map((l, i) => {
      if (i >= Math.ceil(visible)) return null;
      const frac = i === Math.floor(visible) ? visible - Math.floor(visible) : 1;
      const shown = frac < 1 ? l.slice(0, Math.ceil(l.length * frac)) : l;
      const on = i === active;
      return (
        <div key={i} style={{ display: 'flex', whiteSpace: 'pre', background: on ? 'rgba(47,111,235,0.14)' : 'transparent', borderLeft: `6px solid ${on ? C.blue : 'transparent'}`, borderRadius: 8, paddingLeft: 10, marginLeft: -16 }}>
          {!hideNums && <span style={{ width: fs * 1.6, color: C.muted, textAlign: 'right', paddingRight: 22, userSelect: 'none' }}>{i + numStart}</span>}
          <span>{colorize(shown)}</span>
        </div>
      );
    })}
  </div>
);

/* ---------- IDE window (VS Code-like, light) ---------- */
export const WindowFrame: React.FC<{ title: string; w?: number; h?: number | string; children?: React.ReactNode; style?: React.CSSProperties; right?: React.ReactNode }> = ({ title, w = 900, h = 'auto', children, style, right }) => (
  <div style={{ width: w, height: h, borderRadius: 28, background: '#fff', border: `2px solid ${C.line}`, boxShadow: shadow(), overflow: 'hidden', ...style }}>
    <div style={{ height: 66, background: C.mist, borderBottom: `2px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 24px', gap: 12, position: 'relative' }}>
      {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{ width: 20, height: 20, borderRadius: 10, background: c }} />)}
      <div style={{ marginLeft: 18, fontFamily: FONT_MONO, fontSize: 28, fontWeight: 700, color: C.inkSoft, background: '#fff', padding: '4px 18px', borderRadius: 10, border: `2px solid ${C.line}` }}>{title}</div>
      <div style={{ marginLeft: 'auto' }}>{right}</div>
    </div>
    {children}
  </div>
);

export const RunButton: React.FC<{ press?: number; glow?: number; size?: number }> = ({ press = 0, glow = 0, size = 1 }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 12, padding: `${10 * size}px ${26 * size}px`, borderRadius: 999,
    background: C.green, color: '#fff', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 32 * size,
    transform: `scale(${1 - press * 0.12})`, boxShadow: `0 ${10 - press * 6}px ${24}px rgba(18,183,106,${0.4 + glow * 0.5}), 0 0 ${glow * 50}px rgba(18,183,106,${glow})`,
  }}>
    <svg width={30 * size} height={30 * size} viewBox="0 0 30 30"><path d="M6 3 L26 15 L6 27 Z" fill="#fff" /></svg>Run
  </div>
);

export const TerminalBox: React.FC<{ lines: { text: string; color?: string }[]; w?: number; fs?: number; style?: React.CSSProperties; cursor?: boolean }> = ({ lines, w = 900, fs = 36, style, cursor }) => (
  <div style={{ width: w, borderRadius: 24, background: '#F3F6FB', border: `2px solid ${C.line}`, boxShadow: shadow(), overflow: 'hidden', ...style }}>
    <div style={{ height: 54, background: '#E4EAF4', display: 'flex', alignItems: 'center', padding: '0 22px', fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 24, color: C.inkSoft }}>TERMINAL</div>
    <div style={{ padding: '22px 28px', fontFamily: FONT_MONO, fontSize: fs, lineHeight: 1.55, minHeight: 90 }}>
      {lines.map((l, i) => (
        <div key={i} style={{ color: l.color || C.ink, whiteSpace: 'pre' }}>
          {l.text}{cursor && i === lines.length - 1 ? <span style={{ background: C.blue, color: C.blue }}>_</span> : null}
        </div>
      ))}
    </div>
  </div>
);
