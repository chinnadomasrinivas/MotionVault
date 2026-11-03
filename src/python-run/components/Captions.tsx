import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { FPS, PHRASES, SAFE, HEIGHT } from '../timing';
import { C, FONT_DISPLAY, FONT_MONO } from '../theme';
import { pop } from '../hooks';

type W = { w: string; s: number; e: number; code: boolean };
type Chunk = { words: W[]; s: number; e: number };

const isCode = (w: string) => /[_.()]|^import$|^dis$/.test(w) && w.length > 2;

/** word chunks (<= 4 words) built from the script text + word times. Breaks on sentence end / pauses. */
const buildChunks = (): Chunk[] => {
  const all: W[] = PHRASES.flatMap((p) => p.words.map((x) => ({ ...x, code: isCode(x.w) })));
  const chunks: Chunk[] = [];
  let cur: W[] = [];
  const flush = () => { if (cur.length) { chunks.push({ words: cur, s: cur[0].s, e: cur[cur.length - 1].e }); cur = []; } };
  all.forEach((w, i) => {
    cur.push(w);
    const next = all[i + 1];
    const chars = cur.reduce((a, b) => a + b.w.length + 1, 0);
    const endSentence = /[.!?]$/.test(w.w);
    const pause = next ? next.s - w.e > 0.3 : true;
    if (cur.length >= 4 || chars > 26 || endSentence || pause) flush();
  });
  flush();
  return chunks;
};

export const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const chunks = useMemo(buildChunks, []);
  const idx = chunks.findIndex((c, i) => t >= c.s - 0.04 && t < (chunks[i + 1] ? Math.max(c.e + 0.25, c.e) : c.e + 0.6));
  if (idx < 0) return null;
  const c = chunks[idx];
  const scale = 0.94 + 0.06 * pop(t, c.s - 0.04, 16);
  return (
    <div style={{ position: 'absolute', left: 60, right: 60, bottom: SAFE.bottom + 6, height: 190, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${scale})` }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '8px 16px', justifyContent: 'center', padding: '18px 28px',
        background: 'rgba(255,255,255,0.88)', borderRadius: 36, boxShadow: '0 18px 50px rgba(20,50,110,0.20)',
        border: `2px solid ${C.line}`, backdropFilter: 'blur(8px)',
      }}>
        {c.words.map((w, i) => {
          const active = t >= w.s && t < w.e + 0.02;
          const done = t >= w.e;
          return (
            <span key={i} style={{
              fontFamily: w.code ? FONT_MONO : FONT_DISPLAY, fontWeight: 900, fontSize: w.code ? 54 : 62, lineHeight: 1.1,
              color: active ? '#fff' : done ? C.ink : '#9AA9C2',
              background: active ? C.blue : 'transparent',
              padding: '2px 12px', borderRadius: 16,
              transform: active ? 'translateY(-4px) scale(1.06)' : 'none',
              boxShadow: active ? '0 8px 20px rgba(47,111,235,0.4)' : 'none',
            }}>{w.w}</span>
          );
        })}
      </div>
    </div>
  );
};
