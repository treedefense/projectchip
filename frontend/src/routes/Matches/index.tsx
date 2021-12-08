import { Outlet } from 'react-router-dom';
import { Match } from './Match';
import { MatchPicker } from './MatchPicker';

export function Matches() {
  return (
    <main>
      <h2>Matches</h2>
      <Outlet />
    </main>
  );
}

export {
  Match,
  MatchPicker,
};