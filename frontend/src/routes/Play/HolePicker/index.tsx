import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CreateMatch } from '../../../db';
import { matchesPath } from '../../paths';
import { useFindCourseHolesQuery } from '../../../graphql';

export function HolePicker() {
  const [searchParams] = useSearchParams();
  // TODO: Switch to local storage or something later
  const id = searchParams.get('courseId') || '';

  const navigate = useNavigate();
  const [selectedHoles, setSelectedHoles] = useState<Record<string, Boolean>>({});

  const { data, loading, error } = useFindCourseHolesQuery({
    variables: {
      courseID: id,
    }
  });

  const onHoleStateChanged = (id: string) => {
    const isSelected = selectedHoles?.[id];
    setSelectedHoles({
      ...selectedHoles,
      [id]: !isSelected,
    })
  }

  const onSubmit = () => {
    if (!data || !data.course) {
      return;
    }

    // create a match here
   /* const matchHoles = data.course?.holes
      ?.map(h => h?.id)
      .filter((id: string) => selectedHoles[id] === true);

    const matchId = CreateMatch({
      locationID: id,
      holes: matchHoles,
    });

    // we want to go to /matches/:matchId but this doesn't exist
    navigate(`${matchesPath}/${matchId}`);*/
  }

  return (
    <main>
      <h2>Select holes</h2>
      { loading && <div>Loading locations</div> }
      { error && <div>Unable to load locations</div> }
      { data && !data.course && <div>Unable to find that location</div> }
      { data && data.course && <>
        <ul>
          {
            data.course?.holes?.map(hole => {
              if(!hole){
                return <div>hole not found.</div>
              }

              return (
                <li key={hole.id}>
                  <label>
                    <input
                      type="checkbox"
                      name={hole.id.toString()}
                      checked={selectedHoles[hole.id] === true}
                      onChange={() => onHoleStateChanged(hole.id)}
                    />
                    {hole.course_order}
                  </label>
                </li>
              );
            })
          }
          </ul>
        </>
      }
      <div>
        <button onClick={() => onSubmit()}>Submit</button>
      </div>
    </main>
  );
}
