import { Hole } from '../../models';

export function ScoreView({ holes, strokes }: { holes: Hole[]; strokes: number[]; }) {
  let score = 0;
  for (let i = 0; i < strokes.length; i++) {
    score += strokes[i] - holes[i].par;
  }
  return <div>Score: {score > 0 ? '+' : ''}{score.toString()}</div>;
}
