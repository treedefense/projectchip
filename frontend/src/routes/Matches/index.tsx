import { Outlet } from 'react-router-dom';
import { ChooseCreateMatch } from './ChooseCreateMatch';
import { CoursePicker } from './CoursePicker';
import { HolePicker } from './HolePicker';

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
  HolePicker,
};
