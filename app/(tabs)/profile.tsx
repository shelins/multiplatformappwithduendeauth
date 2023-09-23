import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useSession } from '../../context/authprovider';

export default function profile() {
  const { signOut } = useSession();
  return (
    <View style={{flex:1}}>
      <View style={{flex:2, alignItems:'center', justifyContent:'center',}}>

      </View>
      <View style={{ alignItems:'center', justifyContent:'center', padding:15,
     backgroundColor:'#eee', borderTopLeftRadius:20, borderTopRightRadius:20, height:100}}>
      <Pressable onPress={() => {
          signOut()
        }}>
          <Text style={{fontSize:25, fontWeight:'bold'}}>Logout</Text>
      </Pressable>
      </View>
      
    </View>
  )
}