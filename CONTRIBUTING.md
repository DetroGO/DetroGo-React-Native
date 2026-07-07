# Contributing to DetroGo

Thanks for considering contributing to DetroGo! This is a solo-started project that can only grow into something useful with community help every contribution, big or small, matters.

This guide covers how to get set up, the different ways you can contribute, and what we expect in a PR.

## Index
- [Getting Started](#getting-started)
- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Code Style](#code-style)
- [Code of Conduct](#code-of-conduct)

## Getting Started

1. Fork the repo and clone your fork:
```bash
   git clone https://github.com/<your-username>/DetroGo-React-Native.git
   cd DetroGo-React-Native
```
2. Install dependencies:
```bash
   npm install
```
3. Start the dev server(*use dev build):
```bash
   npx expo run:android
```

4. Requirements: Node `>=24.16`, Expo CLI, Android Studio (for Android builds/emulator). iOS support status: __NO__

## Ways to Contribute

### 1. Adding a new city
Help DetroGo expand by adding transit data for a new city.

**Read the guide [Adding a New City](docs/adding_a_new_city.md).**

Files required (per city, under `cities/<cityname>/`):
- `metrolines.json` - line-to-station mapping
- `stationsdata.json` - station metadata like lat lon line connection etc
- `shapes.ts` - geojson shapes for whole metro network these are required for rendering the map
- `stationshapes.ts` - geojson shapes for individual stations these are required for rendering on the map
- `lineMeta.ts` - line metadata like color name etc refer to the the guide mentioned at top for more indepth information.

Rules:
- Use official or reliable sources for station/line data, and cite them in your PR description
- Data must match the format specified in the [Adding a New City](docs/adding_a_new_city.md) guide
- Double-check interchange/transfer stations are marked correctly these are the easiest thing to get subtly wrong
- Test that routing works between at least 3–4 station pairs in the new city before opening the PR

### 2. Translating the app
Help translate DetroGo into more languages.

**Read [Translating Guide](docs/translating_the_app.md) first.**

Translation files live in `app/constants/strings.ts`.

Workflow:
- Open a PR with your translation added
- Confirm it matches the strings in [Translating Guide](docs/translating_the_app.md)
- Run the app and visually confirm strings render correctly no overflow, no missing Devanagari/script rendering issues, no fallback-to-English gaps
- Note in the PR which screens you tested

### 3. Fix bugs / build features
Check [open issues](https://github.com/DetroGO/DetroGo-React-Native/issues) anything labeled `good first issue` is a solid entry point. If you want to work on something not yet tracked as an issue, open one first so we can discuss approach before you sink time into it.

### 4. Improve documentation
Typos, unclear setup steps, missing explanations docs PRs are always welcome and don't require code review depth.

## Development Setup

- **TypeScript**: the project uses `strict: true`. New code should be fully typed avoid `any` unless there's genuinely no better option, and explain why in a comment if you do use it.
- **Run typecheck before opening a PR**:
```bash
  npx tsc --noEmit
```
- **Linting**:
```bash
  npx eslint .
```

## Pull Request Guidelines

- Keep PRs focused one feature or fix per PR, not a bundle of unrelated changes
- Write a clear PR description: what changed, why, and how you tested it
- Reference the related issue number if one exists (`Closes #12`)
- Make sure `tsc --noEmit` passes with no new errors
- Screenshots or a short screen recording for any UI change
- Be patient during review this is maintained part-time

## Reporting Bugs

Open an issue and include:
- What you expected to happen vs. what actually happened
- Steps to reproduce
- Device/OS/Expo Go version (or dev build) you're using
- Screenshots or logs if relevant

## Code Style

- Match existing folder structure: `app/` for screens, `components/` for shared UI, `hooks/` for custom hooks, `store/` for Zustand stores, `utils/` for logic helpers, `types/` for shared types
- Prefer extracting logic into hooks over stuffing it into screen components screen files should mostly be composition + JSX
- Comments should explain **why**, not narrate what the code obviously does

## Code of Conduct

Be respectful, be patient with new contributors, and keep discussion focused on the code and the project. Harassment or hostility toward contributors won't be tolerated.
