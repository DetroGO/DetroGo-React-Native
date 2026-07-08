<div align="center">
<img src="https://github.com/user-attachments/assets/0a21b0a5-07d3-4d07-a618-f864b543f359"
        title="Detro" alt="DetroGo logo" width="140" />

# DetroGo
### React Native

A Material 3 transit app for Delhi-NCR.  
Minimal, clean, and native experience.

[![GPL 3.0 License](https://img.shields.io/badge/license-GPL3-green.svg)](LICENSE)
[![Made in Delhi](https://img.shields.io/badge/made%20in-Delhi-orange.svg)]()
[![Crowdin](https://badges.crowdin.net/detrogo/localized.svg)](https://crowdin.com)

**[detrogo.vercel.app](https://detrogo.vercel.app/)**

### [NEW: Help Translate DetroGo at Crowdin](https://crowdin.com/project/detrogo)
</div>

---

## Table of Contents

- [About](#about)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Supported Cities](#supported-cities)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)
---

## About

DetroGo is a focused transit app built for commuters who just want to plan their route nothing else. Indian transit apps have increasingly become cluttered super-apps, pushing unrelated services and ads to users who simply want to know the next train. DetroGo exists to fix that.

Open source, Material 3, and built to do exactly what a transit app should: help you plan your commute, save routes, track your history, and navigate.

---

## Features

- **Routing Engine** - Custom routing engine using BFS and Dijkstra's algorithm
- **Schematic Map Renderer** - Minimal schematic map to understand your route at a glance
- **In-App System Map** - Built-in transit map for supported regions
- **Material 3 UI** - Follows Material 3 design guidelines throughout
- **Nearest Station** - Automatically finds your closest station
- **Dynamic Colors** - Full support for Android's Material You (Monet) theming
- **AMOLED Mode** - Pure black theme to save battery and navigate in the dark
- **Fully Offline** - Complete offline support for routing and GPS
- **Route History** - Local storage for route history and user preferences
- **i18n Language Support** - Local and international language support *(currently only supports english)* 

---

## Tech Stack

- **[React Native]([https://reactnative.dev/]) + [Expo]([https://expo.dev/])** — cross-platform app framework
- **TypeScript** — powering the core routing and data logic
- **[Zustand]([https://github.com/pmndrs/zustand])** — lightweight state management
- **[React Native Reanimated]([https://docs.swmansion.com/react-native-reanimated/])** — smooth, native-thread animations
- **[MapLibre]([https://maplibre.org/])** — open-source map rendering
- **[Custom Route Rendering Engine]([https://github.com/DetroGo/detrogo-map-renderer])** — Schematic map rendering engine using Svelte

---

## Supported Cities

| City | Status |
|------|--------|
| **Delhi NCR** | Operational |
| Mumbai | Planned |
| Bengaluru | Planned |
| Chennai | Planned |
| Hyderabad | Planned |

---

## Screenshots

<p align="center">
  <img width="23%" alt="Search Dark" src="https://github.com/user-attachments/assets/504d4fb1-2da7-4d7d-8c33-8e14caa7d8f7" />
  <img width="23%" alt="Detail Dark" src="https://github.com/user-attachments/assets/6880f498-2c75-43eb-9a60-71afc999bb04" />
  <img width="23%" alt="Settings Dark" src="https://github.com/user-attachments/assets/b240e9a6-b637-4e18-9bd9-db98bc75ffe3" />
  <img width="23%" alt="Map Dark" src="https://github.com/user-attachments/assets/7e50573c-18b2-46e5-86e2-cdfede6511ca" />
</p>

### Dark Mode
<p align="center">
  <img width="23%" alt="Search Dark" src="https://github.com/user-attachments/assets/5dd92218-1615-4f7f-a54a-65184635c411" />
  <img width="23%" alt="Detail Dark" src="https://github.com/user-attachments/assets/dacd6cd3-53b1-485c-9b97-18bffa8c1274" />
  <img width="23%" alt="Settings Dark" src="https://github.com/user-attachments/assets/2923023e-0def-419e-9c53-e82f40e1f480" />
  <img width="23%" alt="Map Dark" src="https://github.com/user-attachments/assets/034ef174-eb5a-4791-876a-c3428b69c966" />
</p>

### Light Mode
<p align="center">
  <img width="23%" alt="Map Light" src="https://github.com/user-attachments/assets/5c44afc8-ae74-49ca-ad6b-e2fefeaa9948" />
  <img width="23%" alt="Search Light" src="https://github.com/user-attachments/assets/f8227448-4983-4147-9fec-f80f146c4bcd" />
  <img width="23%" alt="Detail Light" src="https://github.com/user-attachments/assets/76ea5f60-b15a-4575-903f-0af26f5b0c0e" />
  <img width="23%" alt="Settings Light" src="https://github.com/user-attachments/assets/6ebd220b-b6f1-4bad-b730-1045266f5723" />
</p>

---

## 🛠️ Setup & Installation

### Prerequisites

- [Node.js]([https://nodejs.org/](https://nodejs.org/)) (LTS recommended)
- npm or yarn
- an Android emulator or a Android device connected via USB

### Installation

1. **Clone the repository**
  ```bash

   git clone [https://github.com/simplystudios/DetroGo-React-Native.git](https://github.com/simplystudios/DetroGo-React-Native.git)

   cd DetroGo-React-Native

  ```
2. **Install dependencies**
  ```bash

   npm install

  ```
3. **Build the development client( IMPORTANT - Does not work with Expo Go )**
  ```bash

   npx expo run:android

  ```

---

## Contributing

Contributions are welcome, whether that's fixing a bug, adding a feature, or bringing DetroGo to a new city.

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

### Adding a New City

To add a new city you need to get the city's transit system GTFS file, or a JSON list of stations with coordinates and basic line data (names, colors, etc.), and follow the [Adding a New City](docs/adding_a_new_city.md) guide to get started.

### Translating the App

To translate the app into your language just head on over to crowdin and start translating the strings. You can find the crowdin project [here](https://crowdin.com/project/detrogo).

for a more detailed guide on how to translate the app, see [docs/TRANSLATING.md](docs/TRANSLATING.md).

---

## 🤝 Contributors

<a href="https://github.com/simplystudios/DetroGo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=simplystudios/DetroGo" />
</a>

---

## License

Free and open source under the [GPL 3.0 License](LICENSE).

---

<div align="center">Made with ❤️ in Delhi</div>
