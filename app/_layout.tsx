import { Slot, SplashScreen } from 'expo-router';
import { SessionProvider } from '../context/authprovider'
import { FontAwesome } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { ThemeProvider } from '@react-navigation/native';
import AppTheme from '../constants/AppTheme';
import { useColorScheme } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Root() {
  const colorScheme = useColorScheme();
  // Set up the auth context and render our layout inside of it.
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
       <ThemeProvider value={colorScheme === 'dark' ? AppTheme : AppTheme}>
       <Slot />
       </ThemeProvider>
     
    </SessionProvider>
  );
}
