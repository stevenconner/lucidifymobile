import {
    SET_LOADING_STATE,
    SET_DAY_JOURNAL_ENTRIES,
    SET_DREAM_JOURNAL_ENTRIES,
    SET_FETCH_ERROR
} from './types';
import { checkTokens } from './HelperActions';
import Toast from 'react-native-root-toast';
import { API_URL } from '../secret';

export const submitEntry = (obj, navigation) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADING_STATE, payload: true });
        checkTokens().then(jwt => {
            console.log('sending this', obj);
            fetch(
                API_URL + '/journal/create',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    },
                    body: JSON.stringify(obj)
                }
            ).then(resp => {
                console.log('submit entry resp', resp);
                if (resp.ok) {
                    resp.json().then(respJson => {
                        console.log('submit entry respJson', respJson);
                        dispatch({ type: SET_LOADING_STATE, payload: false });
                        let toast = Toast.show(`Journal entry submitted!`, {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.BOTTOM,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0
                        });
                        dispatch({ type: SET_DAY_JOURNAL_ENTRIES, payload: respJson.journals.day });
                        dispatch({ type: SET_DREAM_JOURNAL_ENTRIES, payload: respJson.journals.dream });
                        if (navigation) {
                            navigation.goBack();
                        }
                    })
                } else {
                    dispatch({ type: SET_LOADING_STATE, payload: false });
                    dispatch({ type: SET_FETCH_ERROR, payload: 'Submitting entry failed!' });
                }
            })
        })
    }
}

export const getEntries = () => {
    return (dispatch) => {
        dispatch({ type: SET_LOADING_STATE, payload: true });
        checkTokens().then(jwt => {
            fetch(
                API_URL + '/journal/get',
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                    }
                }
            ).then(resp => {
                console.log('get entries resp', resp);
                if (resp.ok) {
                    resp.json().then(respJson => {
                        console.log('get entries respJson', respJson);
                        dispatch({ type: SET_LOADING_STATE, payload: false });
                        dispatch({ type: SET_DAY_JOURNAL_ENTRIES, payload: respJson.journals.day });
                        dispatch({ type: SET_DREAM_JOURNAL_ENTRIES, payload: respJson.journals.dream });
                    })
                } else {
                    dispatch({ type: SET_LOADING_STATE, payload: false });
                }
            })
        })
    }
}