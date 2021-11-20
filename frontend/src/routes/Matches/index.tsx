import { Outlet } from 'react-router-dom';
import { ChooseCreateMatch } from './ChooseCreateMatch';
import { CoursePicker } from './CoursePicker';

export function Matches() {
  return (
    <main>
      <h2>Matches</h2>
      <Outlet />
    </main>
  );
}

export {
  ChooseCreateMatch,
  CoursePicker,
};
