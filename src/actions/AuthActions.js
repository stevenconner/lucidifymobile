// This is where authentication actions are created.
import {
    SET_AUTH_ERROR,
    SET_LOADING_STATE,
} from './types';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { checkTokens } from './HelperActions';
import { API_URL } from '../secret';

export const logIn = (email, password, navigation) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADING_STATE, payload: true });
        fetch(
            API_URL + '/auth',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            }
        ).then(resp => {
            console.log('here is login resp', resp);
            if (resp.ok) {
                resp.json().then(async respJson => {
                    console.log('here is login respJson', respJson);
                    let { jwt, refreshToken } = respJson;
                    await AsyncStorage.setItem('jwt', jwt);
                    await AsyncStorage.setItem('refreshToken', refreshToken);
                    if (navigation) {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            key: null,
                            actions: [
                                NavigationActions.navigate({ routeName: 'DrawerNavigation' })
                            ]
                        })
                        navigation.dispatch(resetAction);
                        dispatch({ type: SET_LOADING_STATE, payload: false });
                    }
                })
            } else {
                dispatch({ type: SET_LOADING_STATE, payload: false });
                dispatch({type: SET_AUTH_ERROR, payload: 'Log in failed, please try again.'})
            }
        })
    }
}

export const registerWithEmail = (obj, navigation) => {
    return (dispatch) => {
        console.log('registering with', obj);
        delete obj.passwordAgain;
        dispatch({ type: SET_LOADING_STATE, payload: true });
        fetch(
            API_URL + '/user/create',
            {
                method: 'POST',
                body: JSON.stringify(obj)
            }
        ).then(resp => {
            console.log("register resp", resp);
            if (resp.ok) {
                resp.json().then(async respJson => {
                    console.log('register respJson', respJson);
                    let { jwt, refreshToken } = respJson;
                    await AsyncStorage.setItem('jwt', jwt);
                    await AsyncStorage.setItem('refreshToken', refreshToken);
                    if (navigation) {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            key: null,
                            actions: [
                                NavigationActions.navigate({ routeName: 'DrawerNavigation' })
                            ]
                        })
                        navigation.dispatch(resetAction);
                        dispatch({ type: SET_LOADING_STATE, payload: false });
                    }
                })
            } else {
                dispatch({ type: SET_LOADING_STATE, payload: false });
                dispatch({type: SET_AUTH_ERROR, payload: 'Registration failed, please try again.'})
            }
        })
    }
}

export const logOut = (navigation) => {
    return async (dispatch) => {
        await AsyncStorage.removeItem('jwt');
        await AsyncStorage.removeItem('refreshToken');
        const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: 'LoginScreen' })
            ]
        })
        navigation.dispatch(resetAction);
    }
}