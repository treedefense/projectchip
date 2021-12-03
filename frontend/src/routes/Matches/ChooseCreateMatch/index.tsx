import { useNavigate } from "react-router-dom";
import { coursePickerPath } from '../../paths';

export function ChooseCreateMatch() {
  const navigate = useNavigate();
  return (
    <main>
      <button onClick={() => {navigate(coursePickerPath)}}>
        New Match
      </button>
    </main>
  )
}
