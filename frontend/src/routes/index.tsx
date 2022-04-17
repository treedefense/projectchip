import { useEffect } from 'react';
import { Routes as ReactRoutes, Route, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import { Home } from './Home';
import { NoMatch } from './NoMatch';
import { Matches, Match, MatchPicker } from './Matches';
import { ProtectedRoute } from '../utils/auth';
import { setToken } from '../utils/cookies';

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
					<Route index element={<MatchPicker />} />
					<Route path={paths.matchPath} element={<Match />} />
				</Route>

				<Route path={paths.playPath} element={<ProtectedRoute component={Play} />} >
					<Route index element={<LocationPicker />} />
					<Route path={paths.coursePickerPath} element={<CoursePicker />} />
					<Route path={paths.holePickerPath} element={<HolePicker />} />
				</Route>

				<Route path={paths.authRedirectPath} element={<AuthCallbackRoute />} />
				<Route path={paths.authLogoutPath} element={<AuthLogoutRoute />} />
				<Route path="*" element={<NoMatch />} />
			</Route>
		</ReactRoutes>
	)
}

function AuthCallbackRoute() {
	const { getAccessTokenSilently } = useAuth0();
	const navigate = useNavigate();

	useEffect(() => {
		async function getToken() {
			const token = await getAccessTokenSilently();
			setToken(token);
			navigate(paths.matchesPath);
		}

		getToken();
	});

	return <div>Redirecting</div>
}

function AuthLogoutRoute() {
	const navigate = useNavigate();

	useEffect(() => {
		setToken("");
		navigate(paths.homePath);
	});

	return <div>Redirecting</div>
}

function Layout() {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	return (
		<>
			<nav>
				<Link className="nav-link" to={paths.homePath}>Project Chip</Link>
				{!isAuthenticated && (<>
					<div
						className="nav-link"
						onClick={() =>
							loginWithRedirect({ redirectUri: window.location.origin + paths.authRedirectPath
						})}
					>
						Login
					</div>
				</>)}
				{isAuthenticated && (<>
					<Link className="nav-link" to={paths.matchesPath}>Matches</Link>
					<Link className="nav-link" to={paths.playPath}>Play</Link>
					<div
						className="nav-link"
						onClick={() => logout({ returnTo: window.location.origin + paths.authLogoutPath })}
					>
						Logout
					</div>
				</>)}
			</nav>
			<Outlet />
		</>
	);
}

