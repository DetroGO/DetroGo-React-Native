import metroLines from "../cities/delhi/metrolines.json";

const interchanges = [
  { from: "Noida Sec-52", to: "Noida Sector 51", note: "Walkway transfer" },
  {
    from: "Dilli Haat - INA",
    to: "Dilli Haat - INA",
    note: "Internal transfer",
  },
  { from: "Maujpur - Babarpur", to: "Maujpur - Babarpur", note: "loop" },
];

function buildGraph(lines) {
  const g = {};

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

// ⚠️ FIXED: Now actually reconstructs and returns the path array
function findRoute(graph, start, end) {
  const queue = [start];
  const visited = new Set([start]);
  const parent = {};

  while (queue.length > 0) {
    const current = queue.shift();

    if (current === end) {
      // Reconstruct the path by walking backward from the end
      const path = [];
      let step = end;
      while (step) {
        path.push(step);
        step = parent[step];
      }
      return path.reverse(); // Reverse it so it goes from Start -> End
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
  return []; // Return empty array if no route is found
}

function getConnectingLine(lines, a, b) {
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

// ⚠️ FIXED: Handled the null interchange case
function getRouteLines(route, lines) {
  const used = [];
  for (let i = 0; i < route.length - 1; i++) {
    // If it's a manual walkway interchange, label it safely
    used.push(
      getConnectingLine(lines, route[i], route[i + 1]) ?? "INTERCHANGE",
    );
  }
  return used;
}

function findTransferStations(route, segmentLines) {
  const transfers = [];
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

function buildRouteSteps(route, segmentLines, transferStations) {
  return route.map((station, i) => ({
    station,
    line: i === 0 ? segmentLines[0] : segmentLines[i - 1],
    isTransfer: transferStations.includes(station),
  }));
}

const graph = buildGraph(metroLines);

export function calculateRoute(from, to) {
  if (!graph[from] || !graph[to]) {
    return { error: "Invalid station name" };
  }

  const route = findRoute(graph, from, to);

  if (route.length === 0) {
    return { error: "No route found" };
  }

  const segmentLines = getRouteLines(route, metroLines);
  const transferStations = findTransferStations(route, segmentLines);
  const steps = buildRouteSteps(route, segmentLines, transferStations);

  return {
    from,
    to,
    stops: route.length - 1,
    route: steps,
    transferStations,
  };
}
