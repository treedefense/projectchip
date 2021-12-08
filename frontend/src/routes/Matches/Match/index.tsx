import React, { useState } from 'react';
import { GetMatch } from 'db';
import { Hole } from 'models';
import { useParams } from "react-router-dom";
import { matchIdKey } from '../../paths';
import './Match.css'

function StrokePicker({ strokes, setStrokes }: { strokes: number[]; setStrokes: React.Dispatch<React.SetStateAction<any>>; }) {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(stroke => {
        return (
          <button key={stroke} onClick={() => setStrokes([...strokes, stroke])}>
            {stroke}
          </button>
        );
      })}
    </div>
  );
}

function ScoreView({ holes, strokes }: { holes: Hole[]; strokes: number[]; }) {
  let score = 0;
  for (let i = 0; i < strokes.length; i++) {
    score += strokes[i] - holes[i].par;
  }
  return <div>Score: {score > 0 ? '+' : ''}{score.toString()}</div>;
}

export function Match() {
    const params = useParams();
    const [strokes, setStrokes] = useState<Array<number>>([]);

    const matchId = params[matchIdKey];

    if (!matchId) {
        return <div></div>
    }

    const match = GetMatch(parseInt(matchId, 10));
    if (!match) {
      return <div></div>
    }

    return (
      <main>
        <h2>This Match</h2>
        <div className="container">
          <div>Hole</div>
          <div>Par</div>
          <div>Strokes</div>
          {match.holes.map((hole, index) => {
            return (
              <React.Fragment key={hole.id}>
                <div>{hole.id}</div>
                <div>{hole.par}</div>
                <div>{strokes[index] || '-'}</div>
              </React.Fragment>
            );
          })}
        </div>
        <ScoreView holes={match.holes} strokes={strokes} />
        {strokes.length < match.holes.length && <StrokePicker strokes={strokes} setStrokes={setStrokes} />}   
      </main>
    );
  }