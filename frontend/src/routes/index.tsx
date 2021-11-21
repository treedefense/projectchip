import { Routes as ReactRoutes, Route, Outlet, Link } from 'react-router-dom';
import { Matches, ChooseCreateMatch, CoursePicker } from './Matches';
import { Home } from './Home';
import { NoMatch } from './NoMatch';
import { homePath, matchPath, coursePickerPath } from './paths';

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
      <Route path={homePath} element={<Layout />}>
        <Route index element={<Home />} />

        <Route path={matchPath} element={<Matches />} >
          <Route index element={<ChooseCreateMatch />} />
          <Route path={coursePickerPath} element={<CoursePicker />} />
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
        <Link to={homePath}>Project Chip</Link>
        |
        <Link to={matchPath}>Matches</Link>
      </nav>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </>
  );
}

