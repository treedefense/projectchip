import { useState } from 'react';
import { Course } from '../../models';
import { StrokePicker } from './StrokePicker';
import { ScoreView } from './ScoreView';
import { HoleView } from './HoleView';

export function RoundView(course: Course) {
  const [holeStrokes, setHoleStrokes] = useState([]);

  return (
    <>
      <div>
        <p>{course.name}</p>
        {Object.values(course.holes).map((hole, index) => {
          const props = {
            id: hole.id,
            par: hole.par,
            strokes: holeStrokes[index] || 0,
          };
          return <HoleView key={hole.id} {...props} />;
        })}
        <ScoreView holes={course.holes} strokes={holeStrokes} />
        {course.holes.length > holeStrokes.length &&
          <p>
            <div>Select strokes for hole {holeStrokes.length + 1}</div>
            <StrokePicker strokes={holeStrokes} setStroke={setHoleStrokes} />
          </p>}
      </div>
    </>
  );
}
