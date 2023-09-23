import { Dimensions, Text, View } from 'react-native';
import axios from "axios";
import {useSession} from '../../context/authprovider';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
export default function Index() {
 const {accesstoken} = useSession();
 const [userdata,setUserdata] = useState(null);
 let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://demo.duendesoftware.com/connect/userinfo',
  headers: { 
    'Authorization': 'Bearer ' + accesstoken
  }
};
function getMyUserInfo()
{
  axios.request(config)
  .then((response) => {
    setUserdata(response.data);
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}
useEffect(() => {
  getMyUserInfo();  
}, [])



  return (
    <SafeAreaView>
<View style={{ flex: 1, margin:10,  alignItems: 'center' }}>
  <View style={{ width:width, padding:10, alignContent:'stretch'}}>
  <Text>{JSON.stringify(userdata)}</Text>
  </View>
   
    </View>
    </SafeAreaView>
    
  );
}
