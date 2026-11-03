"""
Generates the ORIGINAL (self-made, no third-party licence) BGM + SFX used by the video.
Run:  python scripts/build_audio.py        (needs numpy, scipy, ffmpeg on PATH)
Output: public/audio/bgm.mp3, public/audio/sfx/*.wav
"""
import os, subprocess, wave
import numpy as np
from scipy import signal

SR = 44100
ROOT = os.path.join(os.path.dirname(__file__), "..")
AUDIO = os.path.join(ROOT, "public", "audio")
SFX = os.path.join(AUDIO, "sfx")
os.makedirs(SFX, exist_ok=True)
rng = np.random.default_rng(7)


def t_(d):
    return np.arange(int(SR * d)) / SR


def env(n, a=0.005, r=0.1):
    e = np.ones(n)
    na, nr = max(1, int(a * SR)), max(1, int(r * SR))
    e[:na] = np.linspace(0, 1, na)
    e[-nr:] *= np.linspace(1, 0, nr)
    return e


def lp(x, f, order=2):
    b, a = signal.butter(order, f / (SR / 2), "low")
    return signal.lfilter(b, a, x)


def bp(x, f1, f2, order=2):
    b, a = signal.butter(order, [f1 / (SR / 2), f2 / (SR / 2)], "band")
    return signal.lfilter(b, a, x)


def save_wav(name, x, peak=0.8):
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    with wave.open(os.path.join(SFX, name + ".wav"), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


# ---------- SFX ----------
def whoosh(d=0.55):
    n = int(SR * d); x = rng.standard_normal(n)
    out = np.zeros(n); chunks = 24
    for i in range(chunks):
        a, b = i * n // chunks, (i + 1) * n // chunks
        c = 300 * (2 ** (i / chunks * 4.2)) if i < chunks * .55 else 300 * (2 ** ((chunks - i) / chunks * 5.2))
        seg = bp(x[a:b], max(80, c * .7), min(18000, c * 1.4), 1)
        out[a:b] = seg
    e = np.sin(np.linspace(0, np.pi, n)) ** 1.6
    return out * e

def pop():
    t = t_(0.12); f = 900 * np.exp(-t * 28) + 220
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 38)

def key():
    n = int(SR * 0.045); x = rng.standard_normal(n)
    return bp(x, 1800, 7000, 1) * np.exp(-np.arange(n) / SR * 120)

def tick():
    t = t_(0.09); return np.sin(2 * np.pi * 1250 * t) * np.exp(-t * 55)

def ding():
    t = t_(1.3); x = 0
    for k, (m, g) in enumerate([(1, 1), (2.76, .4), (5.4, .2), (1.5, .3)]):
        x = x + g * np.sin(2 * np.pi * 1318.5 * m * t) * np.exp(-t * (3 + k * 2.2))
    return x

def impact():
    t = t_(0.7); f = 120 * np.exp(-t * 7) + 38
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 6)
    n = rng.standard_normal(len(t)); return x + .25 * lp(n, 900) * np.exp(-t * 18)

def click():
    t = t_(0.06); return (np.sin(2 * np.pi * 2400 * t) + .4 * rng.standard_normal(len(t))) * np.exp(-t * 90)

def rise(d=0.9):
    t = t_(d); f = 220 * 2 ** (t / d * 2.2)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * (t / d) ** 1.5 * env(len(t), .02, .06) * .6

def swipe(d=0.3):
    n = int(SR * d); x = bp(rng.standard_normal(n), 1500, 9000, 1)
    return x * np.sin(np.linspace(0, np.pi, n)) ** 2

def success():
    out = np.zeros(int(SR * 0.9))
    for i, f in enumerate([523.3, 659.3, 784.0]):
        t = t_(0.5); s = np.sin(2 * np.pi * f * t) * np.exp(-t * 6)
        a = int(i * 0.09 * SR); out[a:a + len(s)] += s
    return out

def digital():
    t = t_(0.25); x = np.sign(np.sin(2 * np.pi * 1800 * t)) * .3 + np.sin(2 * np.pi * 2600 * t) * .3
    return x * env(len(t), .003, .08) * (np.sin(2 * np.pi * 22 * t) > -.2)

for name, fn, pk in [("whoosh", whoosh, .75), ("pop", pop, .7), ("key", key, .55), ("tick", tick, .6),
                     ("ding", ding, .7), ("impact", impact, .85), ("click", click, .55), ("rise", rise, .6),
                     ("swipe", swipe, .5), ("success", success, .65), ("digital", digital, .5)]:
    save_wav(name, fn(), pk)

# ---------- BGM: soft lo-fi tech, 84 BPM, Am-F-C-G ----------
BPM = 84; beat = 60 / BPM; bars = 36; total = bars * 4 * beat  # ~102 s of loopable material
N = int(SR * total); bgm = np.zeros((N, 2))
chords = [[57, 60, 64, 67], [53, 57, 60, 64], [48, 52, 55, 59], [55, 59, 62, 66]]
mf = lambda m: 440 * 2 ** ((m - 69) / 12)

def add(x, start, pan=0.0):
    a = int(start * SR); b = min(N, a + len(x))
    if a >= N: return
    bgm[a:b, 0] += x[:b - a] * (1 - pan) / 2 * 1.4
    bgm[a:b, 1] += x[:b - a] * (1 + pan) / 2 * 1.4

for bar in range(bars):
    ch = chords[bar % 4]; t0 = bar * 4 * beat
    d = 4 * beat + .6; t = t_(d)
    for m in ch:  # warm pad (detuned saw+sine, low-passed)
        pad = 0
        for det in (-.07, .07):
            pad = pad + signal.sawtooth(2 * np.pi * mf(m) * (1 + det / 100) * t)
        pad = lp(pad / 2, 1400) * .08 + np.sin(2 * np.pi * mf(m) * t) * .05
        add(pad * env(len(t), .35, .6), t0, pan=rng.uniform(-.4, .4))
    # bass
    tb = t_(2 * beat)
    for k in range(2):
        b = np.sin(2 * np.pi * mf(ch[0] - 12) * tb) * np.exp(-tb * 2.2) * .22
        add(b, t0 + k * 2 * beat)
    # soft pluck arpeggio (every 8th, sparse after bar 2)
    if bar >= 1:
        for k in range(8):
            if rng.random() < .72:
                m = ch[[0, 2, 1, 3, 2, 1, 3, 2][k]] + 12
                tp = t_(.5)
                p = signal.square(2 * np.pi * mf(m) * tp, duty=.35) * np.exp(-tp * 7)
                add(lp(p, 2600) * .045, t0 + k * beat / 2, pan=(k % 3 - 1) * .5)
    # lo-fi drums
    if bar >= 2:
        for k in range(4):
            tk = t_(.3); kick = np.sin(2 * np.pi * np.cumsum(110 * np.exp(-tk * 20) + 45) / SR) * np.exp(-tk * 11) * .3
            if k in (0, 2): add(kick, t0 + k * beat)
            th = t_(.06); hat = bp(rng.standard_normal(len(th)), 6000, 12000, 1) * np.exp(-th * 70) * .05
            add(hat, t0 + k * beat + beat / 2)
            if k in (1, 3):
                ts = t_(.18); sn = bp(rng.standard_normal(len(ts)), 1200, 5000, 1) * np.exp(-ts * 22) * .09
                add(sn, t0 + k * beat)

bgm = lp(bgm.T, 9000).T  # soften
bgm = bgm / np.max(np.abs(bgm)) * 0.89
raw = os.path.join(AUDIO, "_bgm.wav")
with wave.open(raw, "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((bgm * 32767).astype(np.int16).tobytes())
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", raw, "-af", "loudnorm=I=-14:TP=-1.5:LRA=7",
                "-b:a", "160k", os.path.join(AUDIO, "bgm.mp3")], check=True)
os.remove(raw)
print("audio ready:", os.listdir(SFX), "bgm.mp3")
