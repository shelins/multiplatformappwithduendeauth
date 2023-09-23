import { storeData, getItemFor, deleteData } from '../helpers/storageHelper';

const authhelpers = {
    isUserLoggedIn: async function (key: string) {
        let bFlag = false;
        const myValue = await getItemFor(key);
        if (myValue === "Yes") {
            bFlag = true;
        }
        return bFlag;
    },
    setUserLogin: async function(loginstatuskey:string) {
        let bFlag = false;       
        await storeData("ak",loginstatuskey);
        return bFlag;
    }, 
    setStoreLogin: async function(loginstatuskey:string) {
        let bFlag = false;       
        await storeData("sl",loginstatuskey);
        return bFlag;
    }, 
    setAppAuthKeys: async function (tokenkey: string, tokenvalue: string, loginstatuskey: string) {
        let bFlag = false;
        await storeData(tokenkey, tokenvalue);
        await storeData(loginstatuskey, "Yes");
        return bFlag;
    },
    removeAppAuthKeys: async function (tokenkey: string, loginstatuskey: string) {
        let bFlag = false;
        await deleteData(tokenkey);
        await deleteData(loginstatuskey);
        return bFlag;
    },
    setRefreshToken: async function (tokenkey: string, tokenvalue: string) {
        let bFlag = false;
        await storeData(tokenkey, tokenvalue);
        return bFlag;
    },
    removeRefreshToken: async function (tokenkey: string) {
        let bFlag = false;
        await deleteData(tokenkey);
        return bFlag;
    },
    getRefreshToken: async (tokenkey: string) => {
        try {
            const myValue = await getItemFor(tokenkey);
            if (myValue !== null) {
                return myValue;
            }
        }
        catch (error) {
            console.log("error getting access token", error);
        }
    }
}

export default authhelpers;