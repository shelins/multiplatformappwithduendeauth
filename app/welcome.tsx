import { Link, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Image, Pressable
} from 'react-native';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function welcome() {
  const [selectedId, setSelectedId] = useState<string>();
  const [onboarding, setOnboarding] = useState([
    require('../assets/images/Onboarding1.png'),
    require('../assets/images/Onboarding2.png'),
    require('../assets/images/Onboarding3.png'),
  ])
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 30, color: '#ee8352' }}>Welcome to My App</Text>
      </View>
      <View style={{ flex: 2, }}>
        <FlatList
          horizontal={true}
          snapToAlignment={"center"}
          data={onboarding}
          renderItem={({ item, index }) => (
            <Image source={item}
              key={index} />
          )}
        />
      </View>

      <View style={{ justifyContent: 'center', borderRadius: 15, padding: 10 }}>
        <Pressable onPress={() => {
          router.replace('/sign-in')
        }} style={{ borderWidth: 1, borderColor: '#ee8352', borderRadius: 5, minHeight: 48 }}>
          <View style={{ flexDirection: 'row', minHeight: 48 }}>
            <View style={{ minWidth: 100, minHeight: 48, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 16,
              }}>Get Started!</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ee8352', paddingLeft: 10, paddingRight: 10, minHeight: 48 }}>
              <FontAwesome name="arrow-circle-right" size={24} color={'white'} />
            </View>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: 'center',
  },
  item: {
    // width:500,
    //width: width,

    padding: 20,
    margin: 10,
    // marginVertical: 8,
    //marginHorizontal: 16,
    //borderWidth:5,
    borderRadius: 10,
    //borderColor:'#eee'
  },
  title: {
    fontSize: 32,
  },
  headerStyle: {
    flex: 1,
    height: 40,
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    color: 'white',
  },
});