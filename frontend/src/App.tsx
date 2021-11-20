import { useState } from 'react';
import { Course, LoadCourses } from './models';
import { RoundView, CoursePicker } from './components';
import './App.css';

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
