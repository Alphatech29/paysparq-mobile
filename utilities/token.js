import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('accessToken', token);
  } catch (err) {
    console.error('Error saving token:', err);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('accessToken');
  } catch (err) {
    console.error('Error getting token:', err);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (err) {
    console.error('Error removing token:', err);
  }
};
