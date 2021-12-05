export interface Location {
  id: number; // unique location id
  name: string,
  holes: Hole[];
}

export interface Hole {
  id: number; // unique hole id per location
  par: number;
}

export interface Match {
}

// TEMP place for this, will need to be stored on the backend later anyway
export function LoadLocations(): Location[] {
  return [
    {
      id: 0,
      name: 'Cherry Hill',
      holes: [
        {
          id: 1,
          par: 3,
        },
        {
          id: 2,
          par: 4,
        },
      ],
    },
    {
      id: 1,
      name: 'Orange Brook',
      holes: [
        {
          id: 1,
          par: 4,
        },
        {
          id: 2,
          par: 3,
        },
      ],
    },
  ];
}

export function GetLocation(id: number): (Location|undefined) {
  const locations = LoadLocations();
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].id === id) {
      return locations[i];
    }
  }
}

export function CreateMatch(match: Match) {
}