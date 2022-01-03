import { Match } from './models';

const matches: Array<Match> = [];

export function CreateMatch({locationID, holes}: {locationID: string; holes: string[];}): string {
    const match: Match = {
        id: matches.length.toString(),
        locationID,
        holeIDs: holes,
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
