# ASSETS

## Provided by you
| File | Use | Licence / rights |
|---|---|---|
| `public/audio/voiceover.mp3` (76.28 s, ElevenLabs "Bunty") | Master timeline. Used as-is, never re-synthesised or altered. | Yours (check your ElevenLabs plan terms for commercial use). |

## Generated for this project (original work, no third-party licence)
| File | What | How |
|---|---|---|
| `public/audio/bgm.mp3` | Soft lo-fi/tech loop, 84 BPM, Am-F-C-G (pad, bass, pluck, light drums) | Synthesised by `scripts/build_audio.py` |
| `public/audio/sfx/*.wav` (whoosh, swipe, pop, key, tick, ding, impact, click, rise, success, digital) | Subtle UI/transition SFX | Synthesised by `scripts/build_audio.py` |
| All visuals: CPU chip, motherboard, laptop/IDE, terminal, monitor, file cards, gears, chef hat, flow arrows | Hand-built SVG/CSS inside the Remotion components (`src/python-run/components/art.tsx`, `code.tsx`) | Original code |
| `src/python-run/data.ts` | **Real** `dis.dis(add)` output captured by running Python 3.13.17 | Python stdlib output |

Fonts: system stacks only (Segoe UI Black / Cascadia Code / Consolas on Windows) so the project renders offline.
Emoji (🤯 👀 💬 ☕ 👇) come from the OS emoji font (Segoe UI Emoji on Windows).

## NOT included (could not be downloaded)
The build sandbox blocks every site except package registries, so **no stock photos / videos / logos were downloaded**
(Pexels, Pixabay, Unsplash, Wikimedia and python.org all returned "403 blocked"). Everything above was replaced by
generated SVG/CSS visuals - there are no broken links or empty placeholders.

* **Official Python logo** - not drawn on purpose (it is a trademark; I won't imitate it). The video uses a neutral blue/yellow "Py" badge.
  To use the real logo: download it from https://www.python.org/community/logos/ , save as `public/assets/python-logo.svg`
  and swap `<PyBadge/>` for `<Img src={staticFile('assets/python-logo.svg')}/>` in `components/art.tsx` (used in Problem + Cta scenes).
* **Real photos of a CPU / motherboard** - if you want photos instead of the SVG art, drop licensed images (Pexels/Unsplash/Pixabay)
  into `public/assets/` and use `<Img src={staticFile('assets/cpu.jpg')}/>` inside `CpuChip` / `Motherboard`. Record each source URL + licence below.

| File | Source URL | Licence |
|---|---|---|
| _(none added yet)_ | | |
