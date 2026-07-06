import metroLines from "../cities/delhi/metrolines.json";
import type {
  MetroLines,
  StationGraph,
  StationName,
  LineName,
  Interchange,
  RouteStep,
  TransferDetail,
  RouteResult,
} from "../types/routing";

const interchanges: Interchange[] = [
  { from: "Noida Sec-52", to: "Noida Sector 51", note: "Walkway transfer" },
  {
    from: "Dilli Haat - INA",
    to: "Dilli Haat - INA",
    note: "Internal transfer",
  },
  { from: "Maujpur - Babarpur", to: "Maujpur - Babarpur", note: "loop" },
];

function buildGraph(lines: MetroLines): StationGraph {
  const g: StationGraph = {};
  for (const line in lines) {
    const s = lines[line];
    for (let i = 0; i < s.length - 1; i++) {
      g[s[i]] ??= [];
      g[s[i + 1]] ??= [];
      g[s[i]].push(s[i + 1]);
      g[s[i + 1]].push(s[i]);
    }
  }
  interchanges.forEach((link) => {
    if (g[link.from] && g[link.to]) {
      g[link.from].push(link.to);
      g[link.to].push(link.from);
    }
  });
  return g;
}

function findRoute(
  graph: StationGraph,
  start: StationName,
  end: StationName,
): StationName[] {
  const queue: StationName[] = [start];
  const visited = new Set<StationName>([start]);
  const parent: Partial<Record<StationName, StationName>> = {};

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current === end) {
      const path: StationName[] = [];
      let step: StationName | undefined = end;
      while (step) {
        path.push(step);
        step = parent[step];
      }
      return path.reverse();
    }
    const neighbors = graph[current] || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent[neighbor] = current;
        queue.push(neighbor);
      }
    }
  }
  return [];
}

function getConnectingLine(
  lines: MetroLines,
  a: StationName,
  b: StationName,
): LineName | null {
  for (const line in lines) {
    const s = lines[line];
    for (let i = 0; i < s.length - 1; i++) {
      if ((s[i] === a && s[i + 1] === b) || (s[i] === b && s[i + 1] === a)) {
        return line;
      }
    }
  }
  return null;
}

function getRouteLines(
  route: StationName[],
  lines: MetroLines,
): (LineName | "INTERCHANGE")[] {
  const used: (LineName | "INTERCHANGE")[] = [];
  for (let i = 0; i < route.length - 1; i++) {
    used.push(
      getConnectingLine(lines, route[i], route[i + 1]) ?? "INTERCHANGE",
    );
  }
  return used;
}

function findTransferStations(
  route: StationName[],
  segmentLines: (LineName | "INTERCHANGE")[],
): StationName[] {
  const transfers: StationName[] = [];
  for (let i = 1; i < segmentLines.length; i++) {
    if (
      segmentLines[i] !== segmentLines[i - 1] &&
      segmentLines[i] !== "INTERCHANGE"
    ) {
      transfers.push(route[i]);
    }
  }
  return transfers;
}

function findTransferDetails(
  route: StationName[],
  segmentLines: (LineName | "INTERCHANGE")[],
): TransferDetail[] {
  const details: TransferDetail[] = [];
  for (let i = 1; i < segmentLines.length; i++) {
    if (
      segmentLines[i] !== segmentLines[i - 1] &&
      segmentLines[i] !== "INTERCHANGE"
    ) {
      details.push({
        station: route[i],
        position: i,
        fromLine: segmentLines[i - 1] as LineName,
        toLine: segmentLines[i] as LineName,
      });
    }
  }
  return details;
}

function buildRouteSteps(
  route: StationName[],
  segmentLines: (LineName | "INTERCHANGE")[],
  transferStations: StationName[],
): RouteStep[] {
  return route.map((station, i) => ({
    station,
    line: i === 0 ? segmentLines[0] : segmentLines[i - 1],
    isTransfer: transferStations.includes(station),
  }));
}

const graph = buildGraph(metroLines as MetroLines);

export function calculateRoute(
  from: StationName,
  to: StationName,
): RouteResult {
  if (!graph[from] || !graph[to]) {
    return { error: "Invalid station name" };
  }
  const route = findRoute(graph, from, to);
  if (route.length === 0) {
    return { error: "No route found" };
  }
  const segmentLines = getRouteLines(route, metroLines as MetroLines);
  const transferStations = findTransferStations(route, segmentLines);
  const transferDetails = findTransferDetails(route, segmentLines);
  const steps = buildRouteSteps(route, segmentLines, transferStations);

  return {
    from,
    to,
    stops: route.length - 1,
    route: steps,
    transferStations,
    transferDetails,
  };
}
