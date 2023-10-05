import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions/authedUser';

export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.id;
        case REMOVE_CURRENT_USER:
            return action.id;
        default:
            return state;
    }
}