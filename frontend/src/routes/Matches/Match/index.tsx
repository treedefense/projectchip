import { useParams } from "react-router-dom";
import { matchIdKey } from '../../paths';
import { useGetMatchStrokesQuery, useSetStrokesMutation } from '../../../graphql';
import { cache } from '../../../utils/client';
import './Match.css'

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

  const { data, loading, error } = useGetMatchStrokesQuery({
    variables: {
      matchId: params[matchIdKey] || ''
    },
  });

  const [setStrokesMutation, { data: setData, loading: setLoading, error: setError }] = useSetStrokesMutation();

  const matchId = params[matchIdKey];

  if (!matchId) {
    return <div></div>
  }

  const strokesId: string = data?.matchStrokes.find(s => s.strokes === 0)?.id || ''
  const strokesPar: number = data?.matchStrokes.find(s => s.strokes === 0)?.hole.par || 0

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
          {data.matchStrokes.slice().sort((msa, msb) => msa.hole.course_order - msb.hole.course_order).map(matchStroke => {
            return (
              <>
                <div>{matchStroke.hole.course_order}</div>
                <div>{matchStroke.hole.par}</div>
                <div>{matchStroke.strokes || '-'}</div>
              </>
            );
          })}
        </div>
      </>
      }
      {data && !setLoading && <div>
        {[-3, -2, -1, 0, 1, 2, 3].map(strokeVal => {
        return (
          <button key={strokeVal} onClick={() => {
            setStrokesMutation({
              variables: {
                 strokesId: strokesId,
                 strokes: strokesPar + strokeVal
              },
              onCompleted: async () => {
                console.log('clearing cache', cache);
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
