import React from 'react';

export function StrokePicker({ strokes, setStroke }: { strokes: number[]; setStroke: React.Dispatch<React.SetStateAction<any>>; }) {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(stroke => {
        return (
          <button key={stroke} onClick={() => setStroke([...strokes, stroke])}>
            {stroke}
          </button>
        );
      })}
    </div>
  );
}
