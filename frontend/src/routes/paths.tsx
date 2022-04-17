const redirectUri: string | undefined = process.env.REACT_APP_AUTH0_CALLBACK_URI;
const logoutUri: string | undefined = process.env.REACT_APP_AUTH0_LOGOUT_URI;
if (!(redirectUri && logoutUri)) {
	throw new Error('Missing config values: redirect and logout uris');
}

export const homePath = '/';
export const matchesPath = '/matches';
export const matchIdKey = 'matchId';
export const matchPath = `${matchesPath}/:${matchIdKey}`;
export const playPath = '/play';
export const coursePickerPath = playPath + '/courses';
export const holePickerPath = playPath + '/holes';
export const authRedirectPath = '/' + redirectUri;
export const authLogoutPath = '/' + logoutUri;
