import { holePickerPath } from '../../paths';
import { useNavigateSearch } from '../../../utils/navigateParams';
import { useFindLocationNamesQuery } from '../../../graphql';

export function LocationPicker() {
  const { data, loading, error } = useFindLocationNamesQuery();
  const navigate = useNavigateSearch();

  return (
    <main>
      { loading && <div>Loading locations</div> }
      { error && <div>Unable to load locations</div> }
      { data && data.locations.map(loc => {
        return (
          <button
            key={loc.id}
            onClick={() => navigate(holePickerPath, {
              locationId: loc.id.toString(),
            })}
          >
            {loc.name}
          </button>
        );
      })}
    </main>
  );
}
