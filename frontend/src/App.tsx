import React, { useState } from 'react';
import './App.css';

interface Course {
  id: number; // unique course id
  name: string,
  location: string,
  holes: Record<string, Hole>;
}

interface Hole {
  id: number; // unique hole id per course
  par: number;
}

/*
  strokes: number;
  setStrokes(strokes: number): void;
*/

// rename to match?
// match is N rounds

interface Round {
  courseId: number;
  strokes: Record<number, number>; // hole id to strokes
}

function HoleView(hole: Hole) {
  /*
  if (hole.strokes > 0) {
    return <p>Shot {hole.strokes} on hole {hole.id}</p>
  }

  return (
    <>
      <p>Enter Strokes for hole {hole.id}</p>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((strokes) => {
        return (
          <button
            key={strokes}
            onClick={() => hole.setStrokes(strokes)}
          >
            {strokes}
          </button>
        )
      })}
    </>
  )
  */
}

function RoundView(round: Round) {
  /*
  let score = 0;
  for (let i = 0; i < round.holes.length; i++) {
    const hole = round.holes[i];
    if (hole.strokes === 0) {
      break;
    }
    score += hole.strokes - hole.par;
  }
  const scoreString = score <= 0 ? score.toString() : `+${score}`;

  return (
    <>
    <div>
      <p>Course name is {round.name}</p>
    </div>
    <div className="round">
      {round.holes.map(hole => {
        return <HoleView {...hole} key={hole.id} />
      })}
    </div>
    <div>
      Score: {scoreString}
    </div>
    </>
  )
  */
}

/*
function useNewHole(id: number, par: number): Hole {
    const [strokes, setStrokes] = useState(0)
    return {
      id,
      par,
      strokes,
      setStrokes,
    };
}
*/

function CoursePicker(courses: Record<number, Course>) {
  return <div>Test</div>
}

function App() {
  const courses: Record<number, Course> = {
    1: {
      id: 1,
      name: 'cherry Hill',
      location: 'CA',
      holes: {
        1: {
          id: 1,
          par: 3,
        },
        2: {
          id: 2,
          par: 4,
        },
      },
    },
  };

  return (
    <div className="App">
      <CoursePicker {...courses} />
    </div>
  );
}

export default App;
