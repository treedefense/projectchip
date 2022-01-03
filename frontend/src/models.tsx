// TODO: Switch to using graphql types
export interface Match {
  id: string;
  locationID: string;
  holeIDs: string[]; // ID's of the holes we are playing in order
  strokes: number[];
}
