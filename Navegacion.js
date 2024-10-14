import React from 'react';

import {View, Image, StyleSheet, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';

import Settings from './Screens/Settings';
import Home from './Screens/Home';
import Users from './Screens/ListarProductos';
import DetailHome from './Screens/DetailHome';
import AnotherDetailHome from './Screens/AnotherDatailsHome';
import Tareas from './Screens/Tareas';
import Producto from './Screens/Producto';


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
          tabBarLabel:'Listar productos',
          tabBarIcon: ({color, size})=> (
            <Fontisto name="shopping-basket-add" size={24} color={color} />
          ),
          headerShown:false,
        }}
      />
        <Tab.Screen name='Producto' component={Producto} 
         options={{
            tabBarLabel:'Producto',
            tabBarIcon: ({color, size})=> (
              <Ionicons name="add-circle" size={24} color="black" />
            ),
            headerShown:false,
          }}
        />
    </Tab.Navigator>
  )
};

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
        name="Home" 
        component={StackDetailHome}
        options={{
          drawerLabel:'Home',
          title:'Corosal Tech',
          drawerIcon:()=>{
            <AntDesign name="home" size={30} color="black" />
          }
        }}
      />
      <Drawer.Screen 
        name="Tareas" 
        component={Tareas}
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