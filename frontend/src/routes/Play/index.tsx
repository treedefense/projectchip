import { Outlet } from 'react-router-dom';
import { LocationPicker } from './LocationPicker';
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
  LocationPicker,
  HolePicker,
};
