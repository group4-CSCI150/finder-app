import {AsyncStorage} from 'react-native';
const Base64 = require('js-base64').Base64
const token = {

    storeToken: async (token) => {
        try {
            console.log("Storing token");
            let tok = Base64.encode(JSON.stringify(token));
            await AsyncStorage.setItem('token', tok);
        } catch (error) {
            console.log("Error: ", error)
            alert(error)
        }
    },

    getToken: async () => {
        try {
            console.log("Reading token")
            let val = await AsyncStorage.getItem('token');
            if (val) {
                return JSON.parse(Base64.decode(val));
            }
            else {
                return null;
            }
        } catch (error) {
            console.log("Error: ", error)
            alert(error)
        }
    },

    removeToken: async () => {
        try {
            console.log("Deleting token")
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.log("Error: ", error)
            alert(error)
        }
    }
}

export default token;