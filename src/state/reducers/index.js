import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import FetchReducer from './FetchReducer';

export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        auth: AuthReducer,
        fetch: FetchReducer,
    })
}