import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import { API_URL } from '../secret';

// Helper function to verify and/or refresh JWT
export const checkTokens = () => {
    return new Promise(async (resolve) => {
        // Pull jwt and refresh token out of AsyncStorage
        let jwt = await AsyncStorage.getItem('jwt');
        let refreshToken = await AsyncStorage.getItem('refreshToken');
        // Decode the JWT to obtain expire time
        let decoded = jwtDecode(jwt);
        // Get current time
        let time = Math.floor(Date.now() / 1000);
        // Check if time plus 50 is less than expire time
        if ((time + 50) < decoded.iat) {
            // JWT is still good, resolve promise with JWT
            console.log('jwt still good');
            resolve(jwt);
        } else {
            // JWT needs to be refreshed, fetch to endpoint for new JWT
            let request = fetch(
                API_URL + 'auth',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        "refreshToken": refreshToken,
                    })
                }
            ).then(resp => {
                if (resp.ok) {
                    resp.json().then(async respJson => {
                        // Store the JWT and refresh token in AsyncStorage
                        await AsyncStorage.setItem('jwt', respJson.jwt);
                        await AsyncStorage.setItem('refreshToken', respJson.refreshToken);
                        // Resolve promise with new JWT
                        resolve(jwt);
                    })
                }
            })
        }
    })
}

export const isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}