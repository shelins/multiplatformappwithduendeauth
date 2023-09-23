import { StyleSheet, Pressable, Modal, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import GLOBALS from '../constants/Globals';
import { router } from 'expo-router';

export default function Login({ isVisible, onLogin }) {
  console.log("isvisible-login", isVisible)
  return (
    <View>  
     
      <Modal animationType="fade" transparent={false} visible={isVisible}>
      <View style={styles.modalContent} >
        <View style={styles.titleContainer}>
          <Text style={{ color: 'white' }}>Log In to view the Dashboard!</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-evenly', }}>
            <View style={{ justifyContent: 'space-evenly', alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <Pressable onPress={() => {
                router.replace('/welcome')
              }} style={{ borderWidth: 1, borderColor: '#ee8352', borderRadius: 5, minHeight: 48 }}>
                <View style={{ flexDirection: 'row', minHeight: 48 }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ee8352', paddingLeft: 10, paddingRight: 10, minHeight: 48 }}>
                    <FontAwesome name="arrow-circle-left" size={24} color={'white'} />
                  </View>
                  <View style={{ minWidth: 100, minHeight: 48, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.title}  >View Intro</Text>
                  </View>
                </View>
              </Pressable>
              <Pressable onPress={onLogin} style={{ borderWidth: 1, borderColor: '#2051E5', borderRadius: 5, minHeight: 48 }}>
                <View style={{ flexDirection: 'row', minHeight: 48 }}>
                  <View style={{ padding: 10, minWidth: 100, minHeight: 48, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.title} >Log In</Text>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#2051E5', paddingLeft: 10, paddingRight: 10, minHeight: 48 }}>
                    <FontAwesome name="sign-in" size={24} color={'white'} />
                  </View>
                </View>
              </Pressable>
            </View>
          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>            
            <Text style={{fontWeight:'300'}}>* You will be redirected to browser to complete the login. After successful authentication browser will redirect you back to this app.</Text>
          </View>
        </View>
      </View>
    </Modal>
    </View>
   
  )
}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#a2d2ff',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    
    // justifyContent:'space-evenly'
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#2051E5',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
