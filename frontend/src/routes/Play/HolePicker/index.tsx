import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { matchesPath } from '../../paths';
import { useFindCourseHolesQuery, useCreateNewMatchMutation } from '../../../graphql';

export function HolePicker() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('courseId') || '';

  const navigate = useNavigate();
  const [selectedHoles, setSelectedHoles] = useState<Record<string, Boolean>>({});

  const { data, loading, error } = useFindCourseHolesQuery({
    variables: {
      courseID: id,
    }
  });

  const [createNewMatchMutation, { data:matchData, loading:matchLoading, error:matchError }] = useCreateNewMatchMutation();

  if(matchData){
    navigate(`${matchesPath}/${matchData.createMatch}`)
  }

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

    const matchHoles = [];
    for (const h of (data.course?.holes || [])) {
      if (!h) {
        continue;
      }
      if (selectedHoles[h.id]) {
        matchHoles.push(h.id)
      }
    }

    createNewMatchMutation({
      variables:{
        newMatch:{
          course_id:id,
          participant_ids:["1"],
          hole_ids: matchHoles
        }
      }
    })
  }

  return (
    <main>
      <h2>Select holes</h2>
      { loading && <div>Loading locations</div> }
      { error && <div>Unable to load locations</div> }
      { data && !data.course && <div>Unable to find that location</div> }
      { data && data.course && !matchData && <>
        <ul>
          {
            data.course?.holes?.map(hole => {
              if(!hole){
                return <div>hole not found.</div>
              }

              return (
                <li key={hole.id}>
                  <input
                    type="checkbox"
                    id = {hole.id.toString()}
                    name={hole.id.toString()}
                    checked={selectedHoles[hole.id] === true}
                    onChange={() => onHoleStateChanged(hole.id)}
                  />
                  <label htmlFor={hole.id.toString()}>
                    {hole.course_order}
                  </label>
                </li>
              );
            })
          }
          </ul>
          <div>
            <button onClick={() => onSubmit()}>Submit</button>
          </div>
        </>
      }
      { data && data.course && matchData && <></>}
      { data && data.course && matchLoading && <div>Creating new match</div>}
      { data && data.course && matchError && <div>Unable to create new match.</div>}
    </main>
  );
}
// We need to unhardcode the chosen holes and make it respond to checked boxes.
