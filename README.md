# AI Video Editor

A Remotion workspace for the **PythonRun** video and a local library for managing separate Remotion video projects.

## Requirements

- Node.js and npm
- FFmpeg on `PATH` for audio generation and final audio normalization
- Python with `numpy` and `scipy` for audio generation and alignment scripts

## Clone onto another laptop

After this repository has been pushed to GitHub, install Git and Node.js on the other laptop, then run:

```powershell
git clone <your-github-repository-url>
cd AI_Video_editor
npm install
npm run dev
```

Open `http://localhost:4173` for the local project library, or run `npm run studio` for the main PythonRun composition. Imported video projects under `projects/` and rendered videos under `out/` are not included in Git; copy those folders separately if you want to transfer them too. Keep `.env` files and credentials out of the repository.

Install the JavaScript dependencies from the repository root:

```powershell
npm install
```

## Local project library

Start the library from the repository root:

```powershell
npm run dev
```

Open [http://localhost:4173](http://localhost:4173). The library lets you import a Remotion ZIP or project folder, open an imported project in Remotion Studio, view its files, or delete it from the library. Imports are copied into `projects/`; the original source folder is not changed. Deleting a library project removes its copied folder from `projects/`.

## Current video: PythonRun

The current composition is registered in `src/Root.tsx`; `src/index.ts` is its Remotion entry point.

```powershell
npm run studio
```

This opens Remotion Studio for the current workspace. The composition id is `PythonRun` (1080 × 1920, 30 fps, 2319 frames / 77.3 seconds).

To type-check or render:

```powershell
npm run typecheck
npm run render
```

The render writes `out/raw.mp4`. For the normalized final video, run:

```powershell
npm run mix
```

This writes `out/python-run-final.mp4`. `npm run build:video` runs both render and mix. The mix step requires FFmpeg.

## Audio scripts

```powershell
npm run audio
npm run align
```

`audio` rebuilds the background music and sound effects; `align` recalculates voiceover timing. Both scripts are under `scripts/` and require Python dependencies and FFmpeg. Review the timing and phrase mapping after regenerating alignment.

## Project layout

```text
src/
  index.ts                 Remotion entry point; calls registerRoot()
  Root.tsx                 Registers the PythonRun composition
  python-run/
    Main.tsx               Scene and audio composition
    timing.ts              Scene timing and composition dimensions
    captions.data.ts       Caption and visual-hit timing data
    sfx.ts                 Sound-effect cue points
    scenes/                Individual video scenes
    components/            Shared visuals, captions, and transitions
public/
  audio/                   Voiceover, music, and sound effects
scripts/                   Local library, audio, and alignment scripts
projects/                  Imported project copies (ignored by Git)
```

For scene content, edit `src/python-run/scenes/`. Keep composition registration in `src/Root.tsx`; use `src/index.ts` as the entry point. See [ASSETS.md](./ASSETS.md) for asset notes and [CLAUDE.md](./CLAUDE.md) for AI-assisted editing conventions.
