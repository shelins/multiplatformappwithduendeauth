import { Link, Redirect, Stack, Tabs } from 'expo-router';
import { Text, View, Pressable, useColorScheme, StyleSheet } from 'react-native';
import { useSession } from '../../context/authprovider';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { useEffect, useState } from 'react';
import GLOBALS from '../../constants/Globals';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: '/',
};

export default function AppLayout() {
  const { appsession, isLoading } = useSession();
  const colorScheme = useColorScheme();
  const [myUserName, setMyUserName] = useState("");
  const [myGreet, setMyGreet] = useState("Hi");
  const [isNewNotification, setIsNewNotification] = useState(false);

  useEffect(() => {

    checkForNewNotification();
    setGreet();

  }, [appsession])
  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }


  if (!appsession) {
    return <Redirect href="/welcome" />;
  }

  function checkForNewNotification() {

  }
  function setGreet() {
    var myDate = new Date();
    var hrs = myDate.getHours();
    let greet: string;

    if (hrs < 12)
      greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
      greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
      greet = 'Good Evening';
    setMyGreet(greet);
    setMyUserName("Samson, Daniel");
  }


  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2051E5',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,

        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarLabel: 'Dashboard',
          headerTitleAlign: 'left',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerLeft: () => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 5 }}>
              <Text style={{ fontSize: 10, color: 'white' }} >{myGreet}</Text>
              {
                myUserName ? (<Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>{myUserName}</Text>) :
                  (<Text style={{ fontSize: 12, fontWeight: 'bold' }}></Text>)              }

            </View>
          ),
          headerRight: () => (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }} >             
              <Link href="/profile" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="user-circle"
                      size={GLOBALS.WIDTH.navigationIcon}
                      color={Colors[colorScheme ?? 'light'].tabIconDefault}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
          ),
        }}
      />     
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          href: null,
          tabBarIcon: ({ color }) => <TabBarIcon name="bolt" color={color} />,
          tabBarStyle: { display: 'none' },

        }}
      />         

    </Tabs>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 24
  }
});
