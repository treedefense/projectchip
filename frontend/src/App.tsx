import React, { useState } from 'react';
import './App.css';

interface CourseList {
  courseChoice: number;
  setCourse(courseChoice: number): void;
  courses: Record<number, Course>;
}

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

interface Round {
  courseId: number;
  holes: Record<string, Hole>;
}

function HoleView(hole: Hole) {
}

function RoundView(round: Round) {
  return (
    <div>
      <p>{round.courseId}</p>
      {Object.values(round.holes).map((hole) => {
        return <p>{hole.par}</p>
      })}
    </div>
  )
}

function CoursePicker(courseList: CourseList) {
  return (
    <div>
      {Object.values(courseList.courses).map((course)=> {
        return (
          <button
          key={course.id}
          onClick={() => courseList.setCourse(course.id)}
          >
          {course.name}
          </button>
        )
      })}
      <p>{courseList.courseChoice}</p>
    </div>
  )
}


function App() {
  const [courseChoice, setCourse] = useState(-1)
  const courseList: CourseList = {
    courseChoice,
    setCourse,
    courses: {
      1: {
        id: 1,
        name: 'Cherry Hill',
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
      2: {
        id: 2,
        name: 'Orange Brook',
        location: 'OR',
        holes: {
          1: {
            id: 1,
            par: 4,
          },
          2: {
            id: 2,
            par: 3,
          },
        },
      },
    },
  };


  if(courseList.courseChoice === -1)
  {
    return (
      <div className="App">
        <CoursePicker{...courseList}/>
      </div>
    );
  } else {
    let round: Round = {
      courseId: courseChoice,
      holes: courseList.courses[courseChoice].holes,
      }
    return (
      <div className="App">
        <RoundView{...round}/>
      </div>
    );
  }

}

export default App;
