export type StationName = string;
export type LineName = string;

export type MetroLines = Record<LineName, StationName[]>;

export type Interchange = {
  from: StationName;
  to: StationName;
  note: string;
};

export type StationGraph = Record<StationName, StationName[]>;

export type RouteStep = {
  station: StationName;
  line: LineName | "INTERCHANGE";
  isTransfer: boolean;
};

export type TransferDetail = {
  station: StationName;
  position: number;
  fromLine: LineName;
  toLine: LineName;
};

export type RouteError = {
  error: string;
};

export type RouteSuccess = {
  from: StationName;
  to: StationName;
  stops: number;
  route: RouteStep[];
  transferStations: StationName[];
  transferDetails: TransferDetail[];
};

export type RouteResult = RouteError | RouteSuccess;
