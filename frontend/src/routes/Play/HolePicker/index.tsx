import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CreateMatch } from '../../../db';
import { matchesPath } from '../../paths';
import { useFindLocationHolesQuery } from '../../../graphql';

export function HolePicker() {
  const [searchParams] = useSearchParams();
  // TODO: Switch to local storage or something later
  const id = searchParams.get('locationId') || '';

  const navigate = useNavigate();
  const [selectedHoles, setSelectedHoles] = useState<Record<string, Boolean>>({});

  const { data, loading, error } = useFindLocationHolesQuery({
    variables: {
      locationID: id,
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
    if (!data || !data.location) {
      return;
    }

    // create a match here
    const matchHoles = data.location.holes
      .map(h => h.id)
      .filter((id: string) => selectedHoles[id] === true);

    const matchId = CreateMatch({
      locationID: id,
      holes: matchHoles,
    });

    // we want to go to /matches/:matchId but this doesn't exist
    navigate(`${matchesPath}/${matchId}`);
  }

  return (
    <main>
      <h2>Select holes</h2>
      { loading && <div>Loading locations</div> }
      { error && <div>Unable to load locations</div> }
      { data && !data.location && <div>Unable to find that location</div> }
      { data && data.location && <>
        <ul>
          {
            data.location.holes.map(hole => {
              return (
                <li key={hole.id}>
                  <label>
                    <input
                      type="checkbox"
                      name={hole.id.toString()}
                      checked={selectedHoles[hole.id] === true}
                      onChange={() => onHoleStateChanged(hole.id)}
                    />
                    {hole.number}
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
