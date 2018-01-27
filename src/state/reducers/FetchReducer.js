import {
    SET_LOADING_STATE
} from '../../actions/types';

const initialState = {
    loading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_STATE:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}