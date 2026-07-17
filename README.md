<div align="center">
<img src="https://github.com/user-attachments/assets/0a21b0a5-07d3-4d07-a618-f864b543f359"
        title="Detro" alt="DetroGo logo" width="140" />

# DetroGo
### React Native

A Material 3 transit app for Delhi-NCR.  
Minimal, clean, and native experience.


[![Version](https://img.shields.io/badge/version-v0.1.0--alpha-f59e0b)](https://github.com/DetroGO/DetroGo-React-Native)
[![Crowdin](https://badges.crowdin.net/detrogo/localized.svg)](https://crowdin.com)
<br/>
[![wakatime](https://wakatime.com/badge/user/f983c5d0-c6d8-471e-a499-43763ad1d6b4/project/f4f4ecaf-a095-45e5-afee-2266e9064b67.svg)](https://wakatime.com/badge/user/f983c5d0-c6d8-471e-a499-43763ad1d6b4/project/f4f4ecaf-a095-45e5-afee-2266e9064b67)
[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?&logo=discord&logoColor=white)](https://discord.gg/6ksFv4g9ze)




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

DetroGo is a transit app built for transit commuters who just want to plan their route nothing else. Indian transit apps have increasingly become cluttered super-apps, pushing unrelated services and ads to users who simply want to know the route. DetroGo fixes these by simplifying the interface and focusing on just the essentials. it allows you search instantly for your route and get the nearest station in the picker. it lays out the route in a simple and easy to understand schematic map with along with real-time updates like where to transfer and how many stations are left you can also see towards which end point a transfer is needed. DetroGo exists to simplify your transit experience.

Built with React Native and Expo. Fully Open source, uses Material 3 design principles, and built to do exactly what a transit app should: help you plan your commute, save routes, track your history, and navigate.

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

### To Implement

- **Live Route Tracking** - being able to get live tracking of your route in the route map
- **Tickets Page** - store all your offline paper qr ticket just by scanning them or book a qr ticket online(will redirect to the whatsapp of the transit agency)

---

## Tech Stack

- **[React Native]([https://reactnative.dev/]) + [Expo]([https://expo.dev/])** — React Native with Expo
- **TypeScript** — powering the core routing and data logic
- **[Zustand]([https://github.com/pmndrs/zustand])** — lightweight state management
- **[React Native Reanimated]([https://docs.swmansion.com/react-native-reanimated/])** — smooth, native-thread animations
- **[MapLibre]([https://maplibre.org/])** — open-source map rendering
- **[Custom Route Rendering Engine]([https://github.com/DetroGo/detrogo-map-renderer])** — Schematic map rendering engine using Svelte and Javascript
- **[Customized Expo Live Notifications]([https://github.com/DetroGo/expo-live-updates])** — Customized live notifications using Expo Live Updates(Software Mansion)
---

## Supported Cities

DetroGo currently supports **Delhi NCR**. More cities are planned as metro data gets added and verified.

<table>
  <tr>
    <td width="100%">
      <h3>🛺  Delhi NCR</h3>
      <h4><strong>Coverage:</strong> 100%</h4>
      <p><strong>Status:</strong> Operational</p>
      
      
    </td>
  </tr>
  <tr>
    <td width="100%">
      <h3>🚧 Mumbai</h3>
      <p><strong>Status:</strong> Planned</p>
      <p>Metro data still needs to be added and checked before this city can go live.</p>
    </td>
  </tr>
  <tr>
    <td width="100%">
      <h3>🚧 Bengaluru</h3>
      <p><strong>Status:</strong> Planned</p>
      <p>upport will be added once reliable metro data is available in the app format.</p>
    </td>
  </tr>
  <tr>
    <td width="100%">
      <h3>🚧 Chennai</h3>
      <p><strong>Status:</strong> Planned</p>
      <p>Support will be added once reliable metro data is available in the app format.</p>
    </td>
  </tr>
  <tr>
    <td width="100%">
      <h3>🚇 And Even More Cities</h3>
      <p><strong>Status:</strong> Coming Soon</p>
      <p>Through Community Contributions we will be able to add even more cities</p>
    </td>
  </tr>
</table>

Want your city added? Check the [Contribution Guide](#Contributing) and help add station, line, and route data.

---

## Screenshots


### Dark Mode
<p align="center">

  <img width="23%" alt="Search Dark" src="https://github.com/user-attachments/assets/f382713e-371d-4d96-89f1-82c22288c032" />
  <img width="23%" alt="Detail Dark" src="https://github.com/user-attachments/assets/dacd6cd3-53b1-485c-9b97-18bffa8c1274" />
  <img width="23%" alt="Settings Dark" src="https://github.com/user-attachments/assets/2923023e-0def-419e-9c53-e82f40e1f480" />
  <img width="23%" alt="Map Dark" src="https://github.com/user-attachments/assets/330c4913-3bdc-44b6-be11-a690e7c5928e" />
</p>

### Light Mode
<p align="center">
  <img width="23%" alt="Map Light" src="https://github.com/user-attachments/assets/b31ca493-efed-4e7e-be79-591386c31d86" />
  <img width="23%" alt="Search Light" src="https://github.com/user-attachments/assets/f8227448-4983-4147-9fec-f80f146c4bcd" />
  <img width="23%" alt="Detail Light" src="https://github.com/user-attachments/assets/76ea5f60-b15a-4575-903f-0af26f5b0c0e" />
  <img width="23%" alt="Settings Light" src="https://github.com/user-attachments/assets/8300f57b-3129-4dd6-a44e-d42415bd8464" />
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
Since we use packages not compatible with the Expo Go app you will need to build the development client locally.

  ```bash

   npx expo run:android

  ```

---

## Contributing

Contributions are welcomed, whether that's fixing a bug, adding a feature, or bringing DetroGo to a new city.

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

## Adding a New City

To add a new city you need to get the city's transit system GTFS file, or a JSON list of stations with coordinates and basic line data (names, colors, etc.), and follow the [Adding a New City](docs/adding_a_new_city.md) guide to get started.

### Translating the App

To translate the app into your language just head on over to crowdin and start translating the strings. You can find the crowdin project [here](https://crowdin.com/project/detrogo).

for a more detailed guide on how to translate the app, see [docs/TRANSLATING.md](docs/TRANSLATING.md).



## 🤝 Contributors

<a href="https://github.com/simplystudios/DetroGo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=simplystudios/DetroGo" />
</a>

---

## License

Free and open source under the [GPL 3.0 License](LICENSE).

---

<div align="center">Made with ❤️ in Delhi</div>
