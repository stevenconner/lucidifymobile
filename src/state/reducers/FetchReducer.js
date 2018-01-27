import {
    SET_LOADING_STATE,
    SET_DAY_JOURNAL_ENTRIES,
    SET_DREAM_JOURNAL_ENTRIES
} from '../../actions/types';

const initialState = {
    loading: false,
    dayEntries: [],
    dreamEntries: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_STATE:
            return { ...state, loading: action.payload };
        case SET_DAY_JOURNAL_ENTRIES:
            return { ...state, dayEntries: action.payload };
        case SET_DREAM_JOURNAL_ENTRIES:
            return { ...state, dreamEntries: action.payload };
        default:
            return state;
    }
}