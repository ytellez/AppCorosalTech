import { View, Text, Button } from 'react-native'
import React from 'react';

import { useNavigation } from '@react-navigation/native';


export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor:'#1b2', flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Home</Text>
      <Button title='Go Details' onPress={()=>navigation.navigate("DetailHome")}></Button>
    </View>
  )
}