export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

export function setCurrentUser(id) {
return {
type: SET_CURRENT_USER,
id
};
}

export function removeCurrentUser() {
return {
type: REMOVE_CURRENT_USER,
id: ''
};
}