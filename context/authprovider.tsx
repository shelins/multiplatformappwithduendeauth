import React from 'react';
import { useStorageState } from './useStorageState';
import { useState } from 'react';
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import authHelp from '../helpers/auth';
import { storeData, deleteData } from '../helpers/storageHelper';
import Globals from '../constants/Globals';
import { encryptedObject } from './../helpers/encryption';

const AuthContext = React.createContext<{ signIn: () => void; fdsignIn: () => void; signOut: () => void; appsession?: string | null, accesstoken?: string | null, isLoading: boolean } | null>(null);

WebBrowser.maybeCompleteAuthSession();

const AUTH_URL = Globals.AUTH_BASE_URL;
const AUTH_ClientId = Globals.AUTH_CLIENT_ID;
const keyappRT = Globals.LOGIN_REFRESH_TOKEN;
const keySessionvalue = Globals.SESSION_KEY;

const useProxy = true;
const redirectUri = makeRedirectUri({
  useProxy,
});

// This hook can be used to access the user info.

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  console.log("usesession", value)
  return value;
}

export function SessionProvider(props) {
  const [[isLoading, appsession], setSession] = useStorageState('appsession');
  const [accesstoken,setAccessToken]=useState(null);
  const [loggedin, setLoggedin] = useState(false);
  const discovery = useAutoDiscovery(AUTH_URL);
  const [request, result, promptAsync] = useAuthRequest(
    {
      clientId: AUTH_ClientId,
      redirectUri,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
    },
    discovery
  );
  const dologin = () => {
    promptAsync().then((codeResponse) => {
      if (request && codeResponse?.type === 'success' && discovery) {
        exchangeCodeAsync(
          {
            clientId: AUTH_ClientId,
            code: codeResponse.params.code,
            extraParams: request.codeVerifier
              ? { code_verifier: request.codeVerifier }
              : undefined,
            redirectUri,
          },
          discovery,
        ).then(async (res) => {
          //await authHelp.setAppAuthKeys(keyappRT, res.refreshToken, keyappLS)
          setLoggedin(true);
          //await login();
          setAccessToken(res.accessToken);
          let mrstr = res.refreshToken ?? "error";;
          await authHelp.setRefreshToken(keyappRT, mrstr);
          //console.log(res.accessToken);
          setSession(keySessionvalue);
          setLoginUserValues();
        });
      }
    });
  };

  const setLoginUserValues = async () => {
    let myuserstring = "{\"userid\":\"adshelly\", \"usertype\":0, \"displayname\": \"Arun David Shelly\",\"info\":[{\"areano\":\"20\",\"levelid\":\"DVP\",\"clientid\":\"1114\"}]}"
    let eMyUserString = await encryptedObject(myuserstring);
    await storeData("uv", eMyUserString);
  }
  const doStoreLogin = async () => {
    let myuserstring = "{\"userid\":\"s\", \"usertype\":1, \"displayname\": \"20 | DVP\",\"info\":[{\"areano\":\"20\",\"levelid\":\"DVP\",\"clientid\":\"1114\"}]}"
    await authHelp.setStoreLogin("Yes");
    let eMyUserString = await encryptedObject(myuserstring);
    await storeData("uv", eMyUserString);
    setSession(keySessionvalue);
  }
  async function doLogout() {
    await deleteData("sl");
    await deleteData("uv");
    await authHelp.removeRefreshToken(keyappRT);
    setSession(null);
  }
  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          dologin();
        },
        
        signOut: () => {
          doLogout();
        },
        appsession,
        accesstoken,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
