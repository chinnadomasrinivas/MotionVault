// Two-pass EBU R128 loudness normalisation of the rendered MP4 -> ~ -14 LUFS, true-peak <= -1.5 dBTP (no clipping).
// usage: node scripts/loudnorm.mjs out/raw.mp4 out/python-run-final.mp4   (needs ffmpeg on PATH)
import { spawnSync } from 'node:child_process';
const [input, output] = process.argv.slice(2);
if (!input || !output) { console.error('usage: node scripts/loudnorm.mjs <in.mp4> <out.mp4>'); process.exit(1); }
const target = 'I=-14:TP=-1.5:LRA=11';
const p1 = spawnSync('ffmpeg', ['-hide_banner', '-i', input, '-af', `loudnorm=${target}:print_format=json`, '-f', 'null', '-'], { encoding: 'utf8' });
if (p1.status !== 0) { console.error(p1.stderr); process.exit(1); }
const m = p1.stderr.match(/\{[\s\S]*?\}/g)?.pop();
if (!m) { console.error('could not read loudnorm stats'); process.exit(1); }
const s = JSON.parse(m);
console.log(`measured: ${s.input_i} LUFS, true peak ${s.input_tp} dBTP`);
const af = `loudnorm=${target}:measured_I=${s.input_i}:measured_TP=${s.input_tp}:measured_LRA=${s.input_lra}:measured_thresh=${s.input_thresh}:offset=${s.target_offset}:linear=true`;
const p2 = spawnSync('ffmpeg', ['-hide_banner', '-y', '-i', input, '-c:v', 'copy', '-af', af, '-c:a', 'aac', '-b:a', '256k', '-ar', '48000', output], { stdio: 'inherit' });
process.exit(p2.status ?? 1);
