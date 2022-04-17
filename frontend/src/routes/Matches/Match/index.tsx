import React from 'react';
import { useParams } from "react-router-dom";
import { matchIdKey } from '../../paths';
import { useGetMatchStrokesQuery, useSetStrokesMutation } from '../../../graphql';
import { cache } from '../../../utils/client';
import './Match.css'

export function Match() {
  const params = useParams();

  const { data, loading, error } = useGetMatchStrokesQuery({
    variables: {
      matchId: params[matchIdKey] || ''
    },
  });

  const [setStrokesMutation, { loading: setLoading }] = useSetStrokesMutation();

  const matchId = params[matchIdKey];

  if (!matchId) {
    return <div></div>
  }

  const strokesId: string = data?.matchStrokes.find(s => s.strokes === 0)?.id || '';
  const strokesPar: number = data?.matchStrokes.find(s => s.strokes === 0)?.hole.par || 0;
  const isComplete: boolean = data?.matchStrokes.find(s => s.strokes === 0) === undefined;

  let score = 0;
  data?.matchStrokes.forEach(s => {
    score += s.strokes;
	if (s.strokes > 0)
		score -= s.hole.par;
  });
  const scoreDisplay = `${score > 0 ? '+' : ''}${score}`;

  return (
    <main>
      {loading && <div>Loading match</div>}
      {error && <div>Unable to load match</div>}
      {data && <>
        <h2>This Match</h2>
        <div>Score: {scoreDisplay}</div>
        <div className="container">
          <div>Hole</div>
          <div>Par</div>
          <div>Strokes</div>
          {data.matchStrokes.slice().sort((msa, msb) => msa.hole.course_order - msb.hole.course_order).map(matchStroke => {
            return (
              <React.Fragment key={matchStroke.hole.course_order}>
                <div>{matchStroke.hole.course_order}</div>
                <div>{matchStroke.hole.par}</div>
                <div>{matchStroke.strokes || '-'}</div>
              </React.Fragment>
            );
          })}
        </div>
      </>
      }
      {data && !setLoading && !isComplete && <div>
        {[-3, -2, -1, 0, 1, 2, 3].map(strokeVal => {
        return (
          <button key={strokeVal} onClick={() => {
            setStrokesMutation({
              variables: {
                 strokesId: strokesId,
                 strokes: strokesPar + strokeVal
              },
              onCompleted: async () => {
                // ideally we would just refresh the one match stroke
                // but this at least works for now
                await cache.reset();
              },
            });
          }}>
            {strokeVal}
          </button>
        );
      })}
    </div>}
      {setLoading && <>
        <div>Setting stroke value</div>
      </>}
    </main>
  );
}
