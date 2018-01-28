import {
    SET_LOADING_STATE,
    SET_JOURNAL_ENTRIES,
} from '../../actions/types';

const initialState = {
    loading: false,
    journalEntries: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_STATE:
            return { ...state, loading: action.payload };
        case SET_JOURNAL_ENTRIES:
            return { ...state, journalEntries: action.payload };
        default:
            return state;
    }
}