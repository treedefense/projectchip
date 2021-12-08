import { Location, Match, Hole } from './models';

const locations = [
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
            {
                id: 3,
                par: 5,
            },
            {
                id: 4,
                par: 3,
            },
            {
                id: 5,
                par: 3,
            },
            {
                id: 6,
                par: 4,
            },
            {
                id: 7,
                par: 5,
            },
            {
                id: 8,
                par: 3,
            },
            {
                id: 9,
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

const matches: Array<Match> = [
    {
        id: 0,
        location: locations[0],
        holes: locations[0].holes,
        strokes: new Array(9).fill(0),
    },
];

export function GetLocations(): Location[] {
    return locations;
}
  
export function GetLocation(id: number): (Location|undefined) {
    for (let i = 0; i < locations.length; i++) {
        if (locations[i].id === id) {
            return locations[i];
        }
    }
}
  
export function CreateMatch({location, holes}: {location: Location; holes: Hole[];}): number {
    const match = {
        id: matches.length,
        location,
        holes,
        strokes: new Array(holes.length).fill(0),
    }
    matches.push(match);
    return match.id;
}

export function GetMatch(matchId: number) {
    return matches[matchId];
}

export function GetMatches(): Match[] {
    return matches;
}