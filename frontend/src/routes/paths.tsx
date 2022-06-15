export const loginPath: string = '/' + process.env.REACT_APP_LOGIN_PATH;
export const logoutPath: string = '/' + process.env.REACT_APP_LOGOUT_PATH;

export const homePath = '/';
export const matchesPath = '/matches';
export const matchIdKey = 'matchId';
export const matchPath = `${matchesPath}/:${matchIdKey}`;
export const playPath = '/play';
export const coursePickerPath = playPath + '/courses';
export const holePickerPath = playPath + '/holes';
