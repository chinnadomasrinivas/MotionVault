# Remotion project structure

- When creating a new Remotion video project to return as a ZIP for the local video library, use this standalone structure:
  ```text
  project-name/
  ├── package.json
  ├── remotion.config.ts
  ├── tsconfig.json
  ├── public/                 # project media
  └── src/
      ├── index.ts            # registerRoot(RemotionRoot)
      ├── Root.tsx            # exports RemotionRoot and registers Composition
      └── video/
          ├── Main.tsx
          ├── timing.ts
          ├── components/
          └── scenes/
  ```
- For new standalone projects, `src/index.ts` must import `registerRoot` from `remotion`, import `RemotionRoot` from `./Root`, and call `registerRoot(RemotionRoot)`. `src/Root.tsx` must export `RemotionRoot` and register a `<Composition>` with its id, component, duration, fps, width, and height.
- Include all source and media needed to run the standalone project. Use relative imports within the project and `staticFile('media-name.ext')` for files inside `public/`. Do not include `node_modules` or rendered output in the ZIP.
- Package the ZIP with `package.json`, `remotion.config.ts`, `tsconfig.json`, `public/`, and `src/` at its top level; do not wrap them in an extra enclosing directory. Include a `dev` script that runs `remotion studio src/index.ts`.
- The standalone ZIP structure above is only for a newly requested separate project. For work in this existing repository, follow the current project structure below and do not create a parallel `src/video/` tree.
- Before creating or editing files, inspect the existing project structure and relevant source files. Treat the current project as the source of truth; do not introduce a new structure just because a generic Remotion template uses one.
- Do not rename, move, or duplicate existing files. Do not create alternate entry points such as `Root2.tsx`, `index-new.ts`, or duplicate scene/component files.
- Keep `src/index.ts` as the entry point that calls `registerRoot(RemotionRoot)`.
- Keep composition registration in the existing `src/Root.tsx`. Do not call `registerRoot()` from a scene or composition component.
- Add Python Run scenes under `src/python-run/scenes/` using PascalCase filenames, for example `NewScene.tsx`. Put reusable components under `src/python-run/components/`.
- Follow existing responsibilities: update `Main.tsx` to wire scenes, `timing.ts` for timing, and the existing data files for project content. Avoid adding new files when an existing file owns that responsibility.
- Match existing naming, exports, imports, and formatting conventions.
- Do not modify a different standalone project under `projects/` unless I specifically ask.
- If the requested change seems to require moving or restructuring files, ask me before doing so.
- At the end, list the files created or changed and briefly say why each was needed.
