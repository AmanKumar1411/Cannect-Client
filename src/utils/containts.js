export const HOST = import.meta.env.VITE_SERVER_URL;
const AUTH_ROUTES = `${HOST}/api/auth`;
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_IMAGE = `${AUTH_ROUTES}/add-profile-image`;
export const LOGOUT_USER_ROUTE = `${AUTH_ROUTES}/logout`;
export const CONTACTS_ROUTE = `/api/contacts`;
export const SEARCH_CONTACT_ROUTE = `${CONTACTS_ROUTE}/search`;

