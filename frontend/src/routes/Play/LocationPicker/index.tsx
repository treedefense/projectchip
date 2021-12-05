import { GetLocations } from '../../../db';
import { holePickerPath } from '../../paths';
import { useNavigateSearch } from '../../../utils/navigateParams';

export function LocationPicker() {
  const locations = GetLocations();
  const navigate = useNavigateSearch();

  return (
    <main>
      {locations.map((location) => {
        return (
          <button
            key={location.id}
            onClick={() => navigate(holePickerPath, {
              locationId: location.id.toString(),
            })}
          >
            {location.name}
          </button>
        );
      })}
    </main>
  );
}
