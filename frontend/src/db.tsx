import { Location, Match } from './models';

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

const matches: Array<Match> = [];

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
  
export function CreateMatch(match: Match) {
    matches.push(match);
}
