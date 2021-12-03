import { Outlet } from 'react-router-dom';
import { CoursePicker } from './CoursePicker';
import { HolePicker } from './HolePicker';

export function Play() {
  return (
    <main>
      <h2>Play a match</h2>
      <Outlet />
    </main>
  );
}

export {
  CoursePicker,
  HolePicker,
};
