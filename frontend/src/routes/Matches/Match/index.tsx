import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { holePickerPath, matchIdKey } from '../../paths';
import { useGetMatchStrokesQuery } from '../../../graphql';
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

/*
function ScoreView({ holes, strokes }: { holes: Hole[]; strokes: number[]; }) {
  let score = 0;
  for (let i = 0; i < strokes.length; i++) {
    score += strokes[i] - holes[i].par;
  }
  return <div>Score: {score > 0 ? '+' : ''}{score.toString()}</div>;
}
*/

export function Match() {
  const params = useParams();
  //const [strokes, setStrokes] = useState<Array<number>>([]);

  const { data, loading, error } = useGetMatchStrokesQuery({
    variables: {
      matchId: params[matchIdKey] || ''
    },
  });

  const matchId = params[matchIdKey];

  if (!matchId) {
    return <div></div>
  }


  // these do not work yet
  // <ScoreView holes={match.holes} strokes={strokes} />

  return (
    <main>
      {loading && <div>Loading match</div>}
      {error && <div>Unable to load match</div>}
      {data && <>
        <h2>This Match</h2>
        <div className="container">
          <div>Hole</div>
          <div>Par</div>
          <div>Strokes</div>
          {data.matchStrokes.map(matchStroke => {
            return (
              <>
                <div>{matchStroke.hole.course_order}</div>
                <div>{matchStroke.hole.par}</div>
                <div>{matchStroke.strokes}</div>
              </>
            );
          })}
        </div>
      </>
      }
    </main>
  );
}
