import { holePickerPath } from '../../paths';
import { useNavigateSearch } from '../../../utils/navigateParams';
import { useFindLocationCoursesQuery } from '../../../graphql';
import { useSearchParams } from 'react-router-dom';

export function CoursePicker() {
  const [searchParams] = useSearchParams();
  // TODO: Switch to local storage or something later
  const id = searchParams.get('locationId') || '';

  const { data, loading, error } = useFindLocationCoursesQuery({
    variables: {
      locationID: id,
    }
  });

  const navigate = useNavigateSearch();

  return (
    <main>
      { loading && <div>Loading locations</div> }
      { error && <div>Unable to load locations</div> }
      { data && data.location?.courses?.map(course => {
        if(!course){
          return <div>Course not found.</div>
        }
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
