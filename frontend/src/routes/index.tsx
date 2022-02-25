import { Routes as ReactRoutes, Route, Outlet, Link } from 'react-router-dom';

import { Home } from './Home';
import { NoMatch } from './NoMatch';
import { Matches, Match, MatchPicker } from './Matches';

import {
  Play,
  LocationPicker,
  CoursePicker,
  HolePicker,
} from './Play';

import * as paths from './paths';

// Route the paths to the proper route element.
// Heavily tied into the layout
export function Routes() {
  return (
    <ReactRoutes>
      <Route path={paths.homePath} element={<Layout />}>
        <Route index element={<Home />} />

        <Route path={paths.matchesPath} element={<Matches />} >
          <Route index element={<MatchPicker />}/>
          <Route path={paths.matchPath} element={<Match />} />
        </Route>

        <Route path={paths.playPath} element={<Play />} >
          <Route index element={<LocationPicker />} />
          <Route path={paths.coursePickerPath} element={<CoursePicker />} />
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

