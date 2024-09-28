import { View, Text, Button } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function DetailHome() {
  const Navigation = useNavigation();
  return (
    <View style={{backgroundColor:'pink', flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>DetailHome</Text>
      <Button title='Mas detalles' onPress={()=>Navigation.navigate("AnotherDetailHome")}></Button>
    </View>
  )
}