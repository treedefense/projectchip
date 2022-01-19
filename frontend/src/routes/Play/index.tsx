import { Outlet } from 'react-router-dom';
import { LocationPicker } from './LocationPicker';
import { CoursePicker } from './CoursePicker';
import { HolePicker } from './HolePicker';

export function Play() {
  return (
    <main>
      <h1>Play a match</h1>
      <Outlet />
    </main>
  );
}

export {
  LocationPicker,
  CoursePicker,
  HolePicker,
};
