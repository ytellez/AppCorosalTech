import React from 'react';

import {View, Image, StyleSheet, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import Settings from './Screens/Settings';
import Home from './Screens/Home';
import Users from './Screens/Users';
import DetailHome from './Screens/DetailHome';
import AnotherDetailHome from './Screens/AnotherDatailsHome';
import Tareas from './Screens/Tareas';


const DetailsHomeNavigator = createStackNavigator();

function StackDetailHome(){
  return(
    <DetailsHomeNavigator.Navigator
      initialRouteName='MyTabs'>
        <DetailsHomeNavigator.Screen
          name="OtraTareas"
          component={MyTabs}
          options={{
            headerShown:false,
          }}>
        </DetailsHomeNavigator.Screen>
        <DetailsHomeNavigator.Screen
          name="DetailHome"
          component={DetailHome}>
        </DetailsHomeNavigator.Screen>
        <DetailsHomeNavigator.Screen
          name="AnotherDetailHome"
          component={AnotherDetailHome}>
        </DetailsHomeNavigator.Screen>
    </DetailsHomeNavigator.Navigator>
  )
}


const Tab = createBottomTabNavigator();

function MyTabs(){
  return(
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: 'purple',
      }}
    >
        <Tab.Screen name='Home' component={Home} 
          options={{
            tabBarLabel:'Home',
            tabBarIcon: ({color, size})=> (
              <AntDesign name="home" size={30} color={color} />
            ),
            headerShown:false,
          }}
        />
        <Tab.Screen name='Tareas' component={Tareas} 
         options={{
            tabBarLabel:'Tareas',
            tabBarIcon: ({color, size})=> (
              <AntDesign name="setting" size={30} color={color} />
            ),
            headerShown:false,
          }}
        />
        <Tab.Screen name='Users' component={Users} 
         options={{
          tabBarLabel:'Users',
          tabBarIcon: ({color, size})=> (
            <AntDesign name="user" size={30} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
};

// Componente personalizado para el Drawer
function CustomDrawerContent(props) {
  return (
    <View style={{height:100, width:'100%', backgroundColor:'blue'}}>
      <View style={{ padding: 20, backgroundColor: '#f7f7f7' }}>
        <Image
          source={{ uri: 'data:image/jpeg;base64,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' }}
          style={styles.drawerImage}
        />
      </View>
      <Text style={{ margin: 20 }}>¡Hola, Yesenia!</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigation({nombre, foto}) {
  return (
    <Drawer.Navigator
      drawerContent={(props) =>{
        return (
        <View>
            <View style={styles.encabezado}>
              <Image
                source={foto}
                style={styles.drawerImage}
               
              />
              <Text style={styles.texto}>{nombre}</Text>
            </View>
            
            <DrawerItemList {...props}/>
          </View>
        ); 
      }}
      screenOptions={{
        drawerStyle:{
          backgroundColor:'#fff',
          width:250,
        },
        headerStyle:{
          backgroundColor:'#fff'
        },
        headerTintColor:'#000',
        headerTitleStyle:{
          fontWeight:'bold'
        },
        drawerActiveTintColor:'blue',
        drawerLabelStyle:{
        color:'#111'
        },
      }}
    > 
      <Drawer.Screen 
        name="Tareas" 
        component={StackDetailHome}
        options={{
          drawerLabel:'Tareas',
          title:'Tareas',
          drawerIcon:()=>{
            <FontAwesome5 name="tasks" size={24} color="black" />
          }
        }}
       />
      <Drawer.Screen 
        name="Setting" 
        component={Settings}
        options={{
          drawerLabel:'Settings',
          title:'Configuraciones',
          drawerIcon:()=>{
            <AntDesign name="setting" size={30} color="black"/>
          }
        }}
      />

      <Drawer.Screen 
        name="Home" 
        component={Home}
        options={{
          drawerLabel:'Home',
          title:'Home',
          drawerIcon:()=>{
            <AntDesign name="home" size={30} color="black" />
          }
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Navegacion({nombre, foto}) {
  return (
   <NavigationContainer>
     <DrawerNavigation nombre={nombre} foto={foto}/>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  drawerImage: {
    width: 120,
    height: 120,
    marginTop:40,
    borderRadius: 60, // Para hacerla circular
  },
  encabezado: {
    height:200, 
    width:'100%', 
    alignItems:'center',
    justifyContent:'center'
  },
  texto:{
    marginTop:10,
    size:16,
    fontWeight:'bold'
  }
});