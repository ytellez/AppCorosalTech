import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import { Card, Button, Icon} from '@rneui/themed';

import React, { useEffect } from 'react'

import { useState } from 'react';
import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore"; 
import {appFirebase} from '../database/Conexion.js';
import { list } from '@react-native-firebase/storage';

export default function ListarProductos(props) {

  const db = getFirestore(appFirebase)
    //conexion con la base de datos

  
  const [lista, setLista]=useState([])
  //---------Para filtrar
  const [filteredData, setFilteredData]=useState([])
  //---------

  useEffect(()=>{
    const getLista=async()=> { //Lectura y captura de datos de una colección en la BD
      try{
        const querySnapshot=await getDocs(collection(db,"colecProductos"))
        //Arreglo para almacenar los documentos de la colección
        const docs=[]
        //Recorre cada documento y se obtiene datos de cada campo
        querySnapshot.forEach((doc) => {
          const {caracteristicas, descripcion, imageUrl, marca, modelo, precio}=doc.data()
         //Se ubican los datos en el arreglo
          docs.push({
            id:doc.id, //se obtiene el id del doc para almacenarlo en el arreglo
            caracteristicas,
            descripcion,
            imageUrl,
            marca,
            modelo,
            precio
         })
        })
        setLista(docs);
        setFilteredData(docs); //-----para filtrar---------
      }catch(error){
        console.log('Error al obtener los datos');
      }
  }
  getLista()
//},[lista]) 
},[]) ///Agregar dependencia lista para mostrar los elementos nuevos en la lista
  

//--------- Función Para filtrar------------------- 
const searchFilterFunction = (text) => {
  if(text){  
      const newData = lista.filter(item => {
          const itemData = item.descripcion ? item.descripcion.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      })
      setFilteredData(newData);
  } else {
      setFilteredData(lista);
  }
}
///--------------------------------------/////

  return (
       
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          inputContainerStyle={{backgroundColor: 'white'}}
          placeholder="Buscar.."
          value={filteredData} 
          onChangeText={text=>searchFilterFunction(text)}
       /> 
     </View>
     <View>{/*Mostrar productos de la BD  */}
        {
           filteredData.map((List)=>(
            <View style={styles.contenedorCard} key={List.id}>
              <Card>
                <Card.Title style={styles.TextTituloCard}>{List.descripcion}</Card.Title>
                <Card.Divider />
                <Card.Image
                  style={{ padding: 0, height:200, width:200, alignSelf:'center'  }}
                  source={{
                  uri:List. imageUrl}}
                />
                <Text style={styles.textoLista}>Detalle: 
                  {List.caracteristicas}
                </Text>
                <Text style={styles.textoLista}> Marca: 
                  {List.marca}
                </Text>
                <Text style={styles.textoLista}> Modelo: 
                  {List.modelo}
                </Text>
                <Text style={styles.textoLista}> Precio: 
                  {List.precio}
                </Text>
                <Button style={styles.botonStyle}
                  icon={<Icon
                    name="code"              
                  />
                  }
                  title="Preguntar al vendedor"
                />
              </Card>
           </View>
          ))
        }
      
      </View>
    </ScrollView>

   
  );
}

const styles = StyleSheet.create({
  container: {
    padding:20,
  },
  image: {
    width: 200,
    height: 200,
    margin:5,
  },
  TextTituloCard:{
    fontSize: 20, 
    color:"#3364ff"
  },
  titulo:{
    fontSize: 18, 
    marginBottom: 10,
    alignSelf:'center'
  },
  TextoTitulo:{
    textAlign:'left',
    marginTop:20,
    marginBottom:10,
    fontSize:22,
    color:"#3364ff"
  },  
  TextoNombre:{
    fontSize:16
  },
  botonStyle:{
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  iconStyle:{
    marginRight: 10,
    color:"#ffffff"
  },
  textoLista:{
    marginBottom: 10
  },
  searchBar:{
    height: 40,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor:'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  }
 

});