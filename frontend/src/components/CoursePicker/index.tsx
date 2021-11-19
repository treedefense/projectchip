import { Course } from '../../models';

export function CoursePicker({ courses, setCourseId }: { courses: Course[]; setCourseId: (id: number) => void; }): JSX.Element {
  return (
    <div>
      {courses.map((course) => {
        return (
          <button
            key={course.id}
            onClick={() => setCourseId(course.id)}
          >
            {course.name}
          </button>
        );
      })}
    </div>
  );
}
