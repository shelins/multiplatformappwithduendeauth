import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const storeData = async (key: string, value: string) => {
    try {
        if (Platform.OS !== 'web') {
            await SecureStore.setItemAsync(key, value);
        }
        else {
            await AsyncStorage.setItem(key, value);
        }
    }
    catch (error) {
        console.log("error storing data", error);
    }
};

export const getItemFor = async (key: string) => {
    try {
        if (Platform.OS !== 'web') {
            const value = await SecureStore.getItemAsync(key);
            if (value !== null) {
                return value;
            }
        }
        else {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return value;
            }
        }
    }
    catch (error) {
        console.log("Error getting data", error);
    }
};

export const deleteData = async (key: string) => {
    try {
        if (Platform.OS !== 'web') {
            await SecureStore.deleteItemAsync(key);
        }
        else {
            AsyncStorage.removeItem(key);
        }
    }
    catch (error) {
        console.log("Error deleting data", error);
    }
};