import CryptoJS from "react-native-crypto-js";
import Globals from "../constants/Globals";

//CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

export const encryptedString = async ( value: string) => {
    let eValue:string='';
    try {
        eValue=CryptoJS.AES.encrypt(value, Globals.APP_Key).toString();
    }
    catch (error) {
        console.log("error encrypting data", error);
    }
    finally{
        return eValue;
    }
};
export const decryptedString = async ( encryptedValue: string) => {
    let dValue:string='';
    try {
        let bytes  = CryptoJS.AES.decrypt(encryptedValue, Globals.APP_Key);
        dValue = bytes.toString(CryptoJS.enc.Utf8);        
    }
    catch (error) {
        console.log("error encrypting data", error);
    }
    finally{
        return dValue;
    }
};
export const encryptedObject = async ( value: string) => {
    let eValue:string='';
    try {
        eValue=CryptoJS.AES.encrypt(JSON.stringify(value), Globals.APP_Key).toString();
    }
    catch (error) {
        console.log("error encrypting object", error);
    }
    finally{
        return eValue;
    }
};
export const decryptedObject = async ( encryptedObject: string) => {
    let dValue:string='';
    try {
        let bytes  = CryptoJS.AES.decrypt(encryptedObject, Globals.APP_Key);
        dValue = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));       
    }
    catch (error) {
        console.log("error encrypting data", error);
    }
    finally{
        return dValue;
    }
};