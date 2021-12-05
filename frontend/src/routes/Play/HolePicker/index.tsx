import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GetLocation } from '../../../models';
// import { playPath } from '../../paths';

export function HolePicker() {
  const [searchParams] = useSearchParams();
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
                  checked={!!selectedHoles?.[hole.id]}
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
