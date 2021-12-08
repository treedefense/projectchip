import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { GetLocation, CreateMatch } from '../../../db';
import { matchesPath } from '../../paths';

export function HolePicker() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedHoles, setSelectedHoles] = useState<Record<number, Boolean>>({});

  const id = searchParams.get('locationId');
  if (!id) {
    // should redirect back to /play
    return <div></div>
  }

  const idAsNumber = parseInt(id, 10);
  const location = GetLocation(idAsNumber);
  if (!location) {
    // should redirect back to /play
    return <div></div>
  }

  const onHoleStateChanged = (id: number) => {
    const isSelected = selectedHoles?.[id];
    setSelectedHoles({
      ...selectedHoles,
      [id]: !isSelected,
    })
  }

  const onSubmit = () => {
    // create a match here
    const matchHoles = location.holes.filter(h => selectedHoles[h.id] === true);
    const matchId = CreateMatch({
      location,
      holes: matchHoles,
    });

    // we want to go to /matches/:matchId but this doesn't exist
    navigate(`${matchesPath}/${matchId}`);
  }

  return (
    <main>
      <h2>Select holes</h2>
      <ul>
        {location.holes.map(hole => {
          return (
            <li key={hole.id}>
              <label>
                <input
                  type="checkbox"
                  name={hole.id.toString()}
                  checked={selectedHoles[hole.id] === true}
                  onChange={() => onHoleStateChanged(hole.id)}
                />
                {hole.id}
              </label>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => onSubmit()}>Submit</button>
      </div>
    </main>
  );
}
