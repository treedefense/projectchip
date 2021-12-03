import { LoadCourses } from '../../../models';
import { holePickerPath } from '../../paths';
import { useNavigateSearch } from '../../../utils/navigateParams';

export function CoursePicker() {
  const courses = LoadCourses();
  const navigate = useNavigateSearch();

  return (
    <main>
      {courses.map((course) => {
        return (
          <button
            key={course.id}
            onClick={() => navigate(holePickerPath, {
              courseId: course.id.toString(),
            })}
          >
            {course.name}
          </button>
        );
      })}
    </main>
  );
}
