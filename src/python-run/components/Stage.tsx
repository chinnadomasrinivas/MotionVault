import React from 'react';

/** scene drawing area: y 250..1260 of the 1080x1920 frame (captions live below, UI-safe zone respected) */
export const Stage: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'absolute', left: 0, top: 250, width: 1080, height: 1010 }}>{children}</div>
);

/** centre-anchored absolute positioning inside the Stage */
export const At: React.FC<{ x: number; y: number; s?: number; o?: number; r?: number; z?: number; blur?: number; children?: React.ReactNode; style?: React.CSSProperties }> =
  ({ x, y, s = 1, o = 1, r = 0, z, blur = 0, children, style }) => (
    <div style={{
      position: 'absolute', left: x, top: y, opacity: o, zIndex: z, width: 'max-content',
      transform: `translate(-50%,-50%) scale(${s}) rotate(${r}deg)`,
      filter: blur > 0.2 ? `blur(${blur}px)` : undefined, ...style,
    }}>{children}</div>
  );
