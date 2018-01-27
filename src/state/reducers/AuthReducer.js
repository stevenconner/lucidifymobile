import {
    SET_AUTH_ERROR,
    LOG_IN_SUCCESS,
} from '../../actions/types';

const initialState = {
    user: {},
    errorMsg: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_SUCCESS:
            return { ...state, user: action.payload }
        case SET_AUTH_ERROR:
            return { ...state, errorMsg: action.payload }
        default:
            return state;
    }
}