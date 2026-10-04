import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'jwt_token';

export const authRepository = {
    saveToken: async (token) => {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    },
    getToken: async () => {
        return await AsyncStorage.getItem(TOKEN_KEY);
    },
    removeToken: async () => {
        await AsyncStorage.removeItem(TOKEN_KEY);
    },
};