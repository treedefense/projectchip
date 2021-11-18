import React, { useState } from 'react';
import './App.css';

interface Course {
  id: number; // unique course id
  name: string,
  location: string,
  holes: Hole[];
}

interface Hole {
  id: number; // unique hole id per course
  par: number;
}

function StrokePicker({strokes, setStroke}: {strokes: number[], setStroke: React.Dispatch<React.SetStateAction<any>>}) {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(stroke => {
        return (
          <button key={stroke} onClick={() => setStroke([...strokes, stroke])}>
            {stroke}
          </button>
        )
      })}
    </div>
  )
}

function HoleView({id, par, strokes}: {id: number, par: number, strokes: number}) {
  return <div>Hole {id}: {strokes} / {par}</div>
}

function ScoreView({holes, strokes}: {holes: Hole[], strokes: number[]}) {
  let score = 0;
  for (let i = 0; i < strokes.length; i++) {
    score += strokes[i] - holes[i].par;
  }
  return <div>Score: {score > 0 ? '+' : ''}{score.toString()}</div>
}

function RoundView(course: Course) {
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
          }
          return <HoleView key={hole.id} {...props} />
        })}
        <ScoreView holes={course.holes} strokes={holeStrokes} />
        {course.holes.length > holeStrokes.length && 
          <p>
            <div>Select strokes for hole {holeStrokes.length+1}</div>
            <StrokePicker strokes={holeStrokes} setStroke={setHoleStrokes} />
          </p>
        }
      </div>
    </>
  )
}

function CoursePicker({courses, setCourseId}: { courses: Course[], setCourseId: (id: number) => void}): JSX.Element {
  return (
    <div>
      {courses.map((course)=> {
        return (
          <button
          key={course.id}
          onClick={() => setCourseId(course.id)}
          >
            {course.name}
          </button>
        )
      })}
    </div>
  )
}

function LoadCourses(): Course[] {
  return [
    {
      id: 0,
      name: 'Cherry Hill',
      location: 'CA',
      holes: [
        {
          id: 1,
          par: 3,
        },
        {
          id: 2,
          par: 4,
        },
      ],
    },
    {
      id: 1,
      name: 'Orange Brook',
      location: 'OR',
      holes: [
        {
          id: 1,
          par: 4,
        },
        {
          id: 2,
          par: 3,
        },
      ],
    },
  ];
}

function App() {
  const courses: Course[] = LoadCourses();
  const [courseId, setCourse] = useState(-1)

  // TODO: later
  // login at home: /
  // you start a match: /start
  // choose a course: /play

  if (courseId < 0) {
    return (
      <div className="App">
        <CoursePicker courses={courses} setCourseId={setCourse} />
      </div>
    );
  }
  return (
    <div>
      <RoundView {...courses[courseId]} />
    </div>
  )
}

export default App;
