export interface Location {
  id: number; // unique location id
  name: string;
  holes: Hole[];
}

export interface Hole {
  id: number; // unique hole id per location
  par: number;
}

export interface Match {
  location: Location;
  holes: Hole[];
  strokes: number[];
}
