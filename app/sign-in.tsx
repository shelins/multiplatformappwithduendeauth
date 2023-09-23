import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect } from 'react';

import { useSession } from '../context/authprovider';
import Login from '../components/login';

export default function SignIn() {
  const { appsession, signIn } = useSession();
  useEffect(() => {
    if (appsession) {
      router.replace('/');
    }

  }, [appsession])
  return (
    <View >
      <Login isVisible={true} onLogin={signIn}></Login>
    </View>
  );
}
