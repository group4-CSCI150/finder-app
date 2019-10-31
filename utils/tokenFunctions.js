import {AsyncStorage} from 'react-native';
const token = {

    storeToken: async (token) => {
        try {
            console.log("Storing token")
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            console.log("Error: ", error)
            alert(error)
        }
    },

    getToken: async () => {
        try {
            console.log("Reading token")
            let val = await AsyncStorage.getItem('token');
            console.log(Base64.decode(val))
            return val;
        } catch (error) {
            console.log("Error: ", error)
            alert(error)
        }
    },

    removeToken: async () => {
        try {
            console.log("Reading token")
            await AsyncStorage.removeItem('token');
        } catch (error) {
            console.log("Error: ", error)
            alert(error)
        }
    }
}

export default token;