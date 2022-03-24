import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { matchesPath } from '../../paths';
import { useFindCourseHolesQuery, useCreateNewMatchMutation } from '../../../graphql';
import './holePicker.css';
import flag from './flag.svg';
import circle from './x-circle.svg';

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

  const onHoleClicked = (id: string) => {
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
        <div className="hole-grid">
          {
            data.course?.holes?.map(hole => {
              if(!hole){
                return <div>hole not found.</div>
              }

              return (
                <div
                    key={hole.id}
                    id={hole.id.toString()}
                    onClick={() => onHoleClicked(hole.id)}
                    className="hole-item"
                >
                    <img src={selectedHoles[hole.id] ? flag : circle} className="selection-image" />
                    {hole.course_order}
                </div>
              );
            })
          }
          </div>
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
