import React from 'react';
import { C, FONT_DISPLAY, FONT_MONO, shadow } from '../theme';

/* ---------- generic UI bits ---------- */
export const Card: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => (
  <div style={{ background: C.paper, borderRadius: 36, boxShadow: shadow(), border: `2px solid ${C.line}`, ...style }}>{children}</div>
);

export const StepBadge: React.FC<{ label: string; color?: string; scale?: number }> = ({ label, color = C.blue, scale = 1 }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', padding: '14px 40px', borderRadius: 999, background: color, color: '#fff',
    fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 52, letterSpacing: 2, boxShadow: `0 14px 34px ${color}66`, transform: `scale(${scale})`,
  }}>{label}</div>
);

export const Pill: React.FC<{ text: string; bg: string; color?: string; size?: number; mono?: boolean; style?: React.CSSProperties }> = ({ text, bg, color = '#fff', size = 40, mono, style }) => (
  <div style={{ display: 'inline-block', padding: '10px 28px', borderRadius: 999, background: bg, color, fontFamily: mono ? FONT_MONO : FONT_DISPLAY, fontWeight: 800, fontSize: size, ...style }}>{text}</div>
);

/* ---------- CPU chip (heat spreader, gold pins, die) ---------- */
export const CpuChip: React.FC<{ size?: number; glow?: number; label?: string; hot?: number }> = ({ size = 420, glow = 0, label = 'CPU', hot = 0 }) => {
  const pins = Array.from({ length: 14 });
  return (
    <svg width={size} height={size} viewBox="0 0 420 420" style={{ filter: `drop-shadow(0 22px 34px rgba(20,50,110,0.32)) drop-shadow(0 0 ${glow * 40}px rgba(255,122,26,${0.9 * glow}))` }}>
      <defs>
        <linearGradient id="hs" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7F9FC" /><stop offset=".45" stopColor="#CBD3DF" /><stop offset=".6" stopColor="#E9EEF5" /><stop offset="1" stopColor="#AEB8C7" />
        </linearGradient>
        <linearGradient id="pcbc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1FA36F" /><stop offset="1" stopColor="#0B6B47" /></linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFE08A" /><stop offset="1" stopColor="#C8921A" /></linearGradient>
        <radialGradient id="die" cx=".5" cy=".5" r=".6"><stop offset="0" stopColor={hot > 0.2 ? '#FFB066' : '#6C86B8'} /><stop offset="1" stopColor="#2C3F6B" /></radialGradient>
      </defs>
      <rect x="20" y="20" width="380" height="380" rx="26" fill="url(#pcbc)" />
      {pins.map((_, i) => (
        <g key={i}>
          <rect x={44 + i * 24.5} y="26" width="12" height="16" rx="3" fill="url(#gold)" />
          <rect x={44 + i * 24.5} y="378" width="12" height="16" rx="3" fill="url(#gold)" />
          <rect x="26" y={44 + i * 24.5} width="16" height="12" rx="3" fill="url(#gold)" />
          <rect x="378" y={44 + i * 24.5} width="16" height="12" rx="3" fill="url(#gold)" />
        </g>
      ))}
      <rect x="62" y="62" width="296" height="296" rx="22" fill="url(#hs)" stroke="#8D99AC" strokeWidth="3" />
      <rect x="78" y="78" width="264" height="264" rx="14" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
      <rect x="130" y="120" width="160" height="110" rx="10" fill="url(#die)" opacity={0.35 + hot * 0.3} />
      <text x="210" y="205" textAnchor="middle" fontFamily={FONT_DISPLAY} fontWeight={900} fontSize="74" fill="#46546C" opacity=".92">{label}</text>
      <text x="210" y="262" textAnchor="middle" fontFamily={FONT_MONO} fontSize="20" fill="#6B7A92">x86-64 · 3.8 GHz</text>
      <circle cx="82" cy="338" r="9" fill="#F5C242" />
      <rect x="110" y="298" width="200" height="6" rx="3" fill="#8D99AC" opacity=".5" />
    </svg>
  );
};

/* ---------- Motherboard (PCB, socket, RAM, caps, traces) ---------- */
export const Motherboard: React.FC<{ w?: number; h?: number; pulse?: number }> = ({ w = 920, h = 640, pulse = 0 }) => (
  <svg width={w} height={h} viewBox="0 0 920 640" style={{ filter: 'drop-shadow(0 26px 40px rgba(20,50,110,0.30))' }}>
    <defs>
      <linearGradient id="pcb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#14A06B" /><stop offset="1" stopColor="#0A6446" /></linearGradient>
      <linearGradient id="slot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#F2F4F8" /><stop offset="1" stopColor="#B8C1D0" /></linearGradient>
    </defs>
    <rect x="6" y="6" width="908" height="628" rx="22" fill="url(#pcb)" stroke="#075238" strokeWidth="6" />
    {/* traces */}
    <g stroke="#7FE3B4" strokeOpacity=".55" strokeWidth="4" fill="none" strokeLinecap="round">
      <path d="M120 120 H300 V240 H430" /><path d="M120 160 H260 V280 H430" /><path d="M120 200 H220 V320 H430" />
      <path d="M480 560 V430 H700" /><path d="M520 560 V470 H740" /><path d="M560 560 V510 H780" />
      <path d="M520 300 H700 V180 H820" /><path d="M520 340 H740 V220 H860" />
    </g>
    <g stroke="#FFE08A" strokeOpacity={0.25 + pulse * 0.7} strokeWidth="5" fill="none" strokeDasharray="14 18" strokeDashoffset={-pulse * 200}>
      <path d="M120 120 H300 V240 H430" /><path d="M520 300 H700 V180 H820" />
    </g>
    {/* CPU socket */}
    <rect x="300" y="250" width="240" height="240" rx="12" fill="#0A5A3D" stroke="#C9D1DD" strokeWidth="8" />
    <rect x="326" y="276" width="188" height="188" rx="8" fill="#CBD3DF" stroke="#8D99AC" strokeWidth="4" />
    <text x="420" y="382" textAnchor="middle" fontFamily={FONT_DISPLAY} fontWeight={900} fontSize="44" fill="#4C5A72">CPU</text>
    {/* RAM slots */}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={610 + i * 62} y="40" width="34" height="260" rx="6" fill="url(#slot)" stroke="#8D99AC" strokeWidth="3" />
        <rect x={617 + i * 62} y="52" width="20" height="236" rx="4" fill={i < 2 ? '#3B82F6' : '#1F2937'} opacity={i < 2 ? 0.9 : 0.55} />
      </g>
    ))}
    {/* capacitors */}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i}>
        <circle cx={90 + i * 46} cy="470" r="19" fill="#1F2937" stroke="#9AA5B8" strokeWidth="3" />
        <circle cx={90 + i * 46} cy="470" r="8" fill="#F5C242" />
      </g>
    ))}
    {/* VRM heatsink + ports + chipset */}
    <rect x="60" y="40" width="180" height="46" rx="8" fill="#8D99AC" />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={70 + i * 21} y="46" width="10" height="34" rx="3" fill="#C9D1DD" />)}
    <rect x="640" y="440" width="200" height="130" rx="14" fill="#C9D1DD" stroke="#8D99AC" strokeWidth="4" />
    <text x="740" y="515" textAnchor="middle" fontFamily={FONT_DISPLAY} fontWeight={900} fontSize="30" fill="#4C5A72">CHIPSET</text>
    {[0, 1, 2].map((i) => <rect key={i} x={70 + i * 70} y="560" width="52" height="46" rx="6" fill="#E5EAF2" stroke="#8D99AC" strokeWidth="3" />)}
  </svg>
);

/* ---------- Laptop frame ---------- */
export const Laptop: React.FC<{ w?: number; children?: React.ReactNode }> = ({ w = 900, children }) => {
  const h = w * 0.62;
  return (
    <div style={{ width: w, position: 'relative', filter: 'drop-shadow(0 30px 40px rgba(20,50,110,0.30))' }}>
      <div style={{ width: w, height: h, borderRadius: 30, background: 'linear-gradient(145deg,#D7DEEA,#9FABBF)', padding: 16, boxSizing: 'border-box' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 16, background: '#fff', overflow: 'hidden', position: 'relative' }}>{children}</div>
      </div>
      <div style={{ width: w * 1.1, height: 26, marginLeft: -w * 0.05, borderRadius: '0 0 40px 40px', background: 'linear-gradient(180deg,#E5EAF2,#9FABBF)' }} />
    </div>
  );
};

/* ---------- Monitor (output) ---------- */
export const Monitor: React.FC<{ w?: number; children?: React.ReactNode; on?: number }> = ({ w = 760, children, on = 1 }) => {
  const h = w * 0.58;
  return (
    <div style={{ width: w, filter: 'drop-shadow(0 28px 40px rgba(20,50,110,0.28))', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: w, height: h, borderRadius: 26, background: 'linear-gradient(145deg,#E2E8F2,#A6B2C6)', padding: 18, boxSizing: 'border-box' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 12, background: `rgba(255,255,255,${0.35 + 0.65 * on})`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>{children}</div>
      </div>
      <div style={{ width: 70, height: 60, background: 'linear-gradient(90deg,#B8C2D3,#E8EDF5,#B8C2D3)' }} />
      <div style={{ width: 260, height: 18, borderRadius: 12, background: 'linear-gradient(180deg,#E5EAF2,#9FABBF)' }} />
    </div>
  );
};

/* ---------- File card (.py / .pyc) ---------- */
export const FileCard: React.FC<{ ext: string; name?: string; color: string; w?: number; lines?: number }> = ({ ext, name, color, w = 220, lines = 5 }) => (
  <div style={{ width: w, textAlign: 'center' }}>
    <div style={{ width: w, height: w * 1.25, position: 'relative', background: '#fff', borderRadius: 22, border: `4px solid ${color}`, boxShadow: shadow(`${color}44`, 16, 36), overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -2, top: -2, width: 54, height: 54, background: `linear-gradient(225deg, ${C.mist} 50%, ${color} 50%)`, borderBottomLeftRadius: 14 }} />
      <div style={{ position: 'absolute', left: 22, top: 70, right: 22 }}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} style={{ height: 12, borderRadius: 6, background: color, opacity: 0.22 + (i % 3) * 0.12, width: `${90 - (i * 17) % 50}%`, marginBottom: 14 }} />
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, fontFamily: FONT_MONO, fontWeight: 800, fontSize: w * 0.17, color }}>{ext}</div>
    </div>
    {name && <div style={{ marginTop: 12, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30, color: C.inkSoft }}>{name}</div>}
  </div>
);

/* ---------- Gear ---------- */
export const Gear: React.FC<{ size?: number; color?: string; rot?: number }> = ({ size = 160, color = C.purple, rot = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: `rotate(${rot}deg)` }}>
    <g fill={color}>
      {Array.from({ length: 8 }).map((_, i) => <rect key={i} x="43" y="2" width="14" height="22" rx="4" transform={`rotate(${i * 45} 50 50)`} />)}
      <circle cx="50" cy="50" r="33" />
    </g>
    <circle cx="50" cy="50" r="15" fill="#fff" />
  </svg>
);

/* ---------- Chef hat + recipe card ---------- */
export const ChefHat: React.FC<{ size?: number }> = ({ size = 220 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <defs><linearGradient id="hat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#DDE5F2" /></linearGradient></defs>
    <g stroke="#B7C4DB" strokeWidth="4" fill="url(#hat)">
      <circle cx="62" cy="76" r="38" /><circle cx="100" cy="56" r="44" /><circle cx="140" cy="76" r="38" />
      <rect x="54" y="92" width="92" height="64" rx="10" />
    </g>
    <rect x="50" y="150" width="100" height="26" rx="8" fill="#fff" stroke="#B7C4DB" strokeWidth="4" />
    <path d="M78 100 V148 M100 100 V148 M122 100 V148" stroke="#C9D5E8" strokeWidth="3" />
  </svg>
);

/* ---------- Glowing flow arrow (horizontal or vertical) ---------- */
export const FlowArrow: React.FC<{ length?: number; vertical?: boolean; color?: string; phase?: number; active?: number }> = ({ length = 120, vertical, color = C.orange, phase = 0, active = 1 }) => (
  <div style={{ width: vertical ? 40 : length, height: vertical ? length : 40, position: 'relative', opacity: 0.25 + active * 0.75, transform: vertical ? undefined : undefined }}>
    <svg width={vertical ? 40 : length} height={vertical ? length : 40} viewBox={vertical ? `0 0 40 ${length}` : `0 0 ${length} 40`} style={{ filter: `drop-shadow(0 0 ${10 * active}px ${color})` }}>
      {vertical ? (
        <>
          <line x1="20" y1="0" x2="20" y2={length - 14} stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray="18 14" strokeDashoffset={-phase * 32} />
          <path d={`M4 ${length - 22} L20 ${length - 2} L36 ${length - 22} Z`} fill={color} />
        </>
      ) : (
        <>
          <line x1="0" y1="20" x2={length - 14} y2="20" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray="18 14" strokeDashoffset={-phase * 32} />
          <path d={`M${length - 22} 4 L${length - 2} 20 L${length - 22} 36 Z`} fill={color} />
        </>
      )}
    </svg>
  </div>
);

/* ---------- Generic neutral "Python" badge (NOT the official logo - see ASSETS.md) ---------- */
export const PyBadge: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.28, background: `linear-gradient(135deg, ${C.pyBlue} 0 52%, ${C.pyYellow} 52% 100%)`, boxShadow: shadow('rgba(55,118,171,0.4)', 14, 30), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: size * 0.34, color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,.25)' }}>Py</div>
);
