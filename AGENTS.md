# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a static React portfolio website (no backend, no database, no API). Single service: Vite dev server.

### Tech Stack

- React 19, TypeScript 6, Vite 8, Tailwind CSS 4
- Package manager: **Yarn** (classic v1, `yarn.lock` present)

### Commands

| Task | Command |
|------|---------|
| Install deps | `yarn install` |
| Dev server | `yarn dev` (serves on `http://localhost:5173`) |
| Type check | `npx tsc --noEmit` |
| Build | `yarn build` (runs `tsc && vite build`, outputs to `dist/`) |
| Preview build | `yarn preview` |

### Notes

- No linter or test framework is configured in the project. `tsc --noEmit` is the only static analysis available.
- No backend or database services are required.
- The `hook/` directory (containing `useToggle.tsx`) lives outside `src/` but is included in `tsconfig.json`'s `include` array.
- Use `--host 0.0.0.0` with `yarn dev` when the dev server needs to be accessible from outside localhost (e.g., cloud agent browser testing).
