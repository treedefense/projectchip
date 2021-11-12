import React from 'react';
import './App.css';

interface Hole {
  id: number;
  par: number;
}

interface Course {
  name: string;
  holes: Hole[];
}

function HoleView(hole: Hole) {
  return <p>Hole {hole.id} is a par {hole.par}</p>
}

function CourseView(course: Course) {
  return (
    <div className="course">
      <p>Course name is {course.name}</p>
      {course.holes.map(hole => {
        return <HoleView {...hole} />
      })}
    </div>
  )
}

function App() {
  const course: Course = {
    name: "Chipville",
    holes: [
      {
        id: 1,
        par: 3,
      },
      {
        id: 2,
        par: 4,
      },
      {
        id: 3,
        par: 5,
      }
    ]
  };

  return (
    <div className="App">
      <CourseView {...course} />
    </div>
  );
}

export default App;
