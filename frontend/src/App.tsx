import React, { useState } from 'react';
import './App.css';

interface Hole {
  id: number;
  par: number;
  strokes: number;
  setStrokes(strokes: number): void;
}

interface Round {
  name: string;
  holes: Hole[];
}

function HoleView(hole: Hole) {
  if(hole.strokes > 0) {
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
}

function RoundView(round: Round) {
  let score = 0;
  for (let i = 0; i < round.holes.length; i++) {
    const hole = round.holes[i];
    if (hole.strokes === 0) {
      break;
    }
    score += hole.strokes - hole.par;
  }

  return (
    <div className="round">
      <p>Course name is {round.name}</p>
      {round.holes.map(hole => {
        return <HoleView {...hole} key={hole.id} />
      })}
      Score: {score}
    </div>
  )
}

function useNewHole(id: number, par: number): Hole {
    const [strokes, setStrokes] = useState(0)
    return {
      id,
      par,
      strokes,
      setStrokes,
    };
}

function App() {
  const round: Round = {
    name: "Chipville",
    holes: [
      useNewHole(1, 3),
      useNewHole(2, 5),
      useNewHole(3, 4),
    ]
  };

  return (
    <div className="App">
      <RoundView {...round} />
    </div>
  );
}

export default App;
