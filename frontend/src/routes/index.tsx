import { Routes as ReactRoutes, Route, Outlet, Link } from 'react-router-dom';

import { Home } from './Home';
import { NoMatch } from './NoMatch';
import { Matches } from './Matches';

import {
  Play,
  CoursePicker,
  HolePicker,
} from './Play';

import * as paths from './paths';

/* Notes
 * /new : start a new match ( later on give it some metadata )
 * /new/course -> Pick the course to play on ( CoursesPicker )
 * /new/holes -> Choose which holes to play on ( HolePicker tbc )
 *   later on -> invite players, set date, etc
 * after all that a new "match" is created and you are taken to play that match
 * /play/:matchId -> play the match ( RoundView )
 */

// Route the paths to the proper route element.
// Heavily tied into the layout
export function Routes() {
  return (
    <ReactRoutes>
      <Route path={paths.homePath} element={<Layout />}>
        <Route index element={<Home />} />

        <Route path={paths.matchesPath} element={<Matches />} >
        </Route>
        
        <Route path={paths.playPath} element={<Play />} >
          <Route index element={<CoursePicker />} />
          <Route path={paths.holePickerPath} element={<HolePicker />} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Route>
    </ReactRoutes>
  )
}

function Layout() {
  return (
    <>
      <nav>
        <Link to={paths.homePath}>Project Chip</Link>
        |
        <Link to={paths.matchesPath}>Matches</Link>
        |
        <Link to={paths.playPath}>Play</Link>
      </nav>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </>
  );
}

