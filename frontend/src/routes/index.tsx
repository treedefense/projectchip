import { Routes as ReactRoutes, Route, Outlet, Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import { Home } from './Home';
import { NoMatch } from './NoMatch';
import { Matches, Match, MatchPicker } from './Matches';
import { ProtectedRoute } from './../auth';

import './index.css';

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
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div> Loading auth </div>;
  }

  return (
    <ReactRoutes>
      <Route path={paths.homePath} element={<Layout />}>
        <Route index element={<Home />} />

        <Route path={paths.matchesPath} element={<ProtectedRoute component={Matches} />}>
          <Route index element={<MatchPicker />}/>
          <Route path={paths.matchPath} element={<Match />} />
        </Route>

        <Route path={paths.playPath} element={<ProtectedRoute component={Play} />} >
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
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <>
      <nav>
        <Link className="nav-link" to={paths.homePath}>Project Chip</Link>
        {isAuthenticated && <Link className="nav-link" to={paths.matchesPath}>Matches</Link>}
        {isAuthenticated && <Link className="nav-link" to={paths.playPath}>Play</Link>}
        {!isAuthenticated && <div className="nav-link" onClick={() => loginWithRedirect()}>Login</div>}
      </nav>
      <Outlet />
    </>
  );
}

