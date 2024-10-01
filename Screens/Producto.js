import { View, Text, Button, StyleSheet, Image, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { collection, addDoc, getFirestore } from "firebase/firestore"; 
import * as ImagePicker from 'expo-image-picker';
import Conexion from '../database/Conexion.js'

export default function Producto() {

    const db = getFirestore(Conexion)
    //conexion con la base de datos

    const [producto, setProductos] = useState({
        descripcion:"",
        marca:"",
        caracteristicas:"",
        modelo:"",
        precio:0,
        imageUri:null,
      });
     
      const establecerEstado = (nombre, value) =>{
        setProductos({...producto, [nombre]:value})
      }

    //Función que permite elegir una imagen de la galería
    const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled) {
      establecerEstado("imageUri",result.assets[0].uri)
    }
  };

  enviarDatos=()=>{
    if (!producto) return //validar
    guardarProducto(producto);
    setProductos({
        descripcion:"",
        marca:"",
        caracteristicas:"",
        modelo:"",
        precio:0,
        imageUri:null,
    });
  }

  const guardarProducto = async(producto) => {
    try {
        const docRef = await addDoc(collection(db, "colecProductos"), producto);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  };

  return (
   
      <ScrollView style={styles.container}>
      
      <Text style={styles.titulo}>Formulario de Producto</Text>

      {/* Campo Descripción */}
      <Text>Descripción:</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Ingrese la descripción"
        value={producto.descripcion}
        onChangeText={(value)=>establecerEstado("descripcion",value)}
      />

      {/* Campo Marca */}
      <Text>Marca:</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Ingrese la marca"
        value={producto.marca}
        onChangeText={(value)=>establecerEstado("marca",value)}
      />

      {/* Campo Características */}
      <Text>Características:</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Ingrese las características"
        value={producto.caracteristicas}
        onChangeText={(value)=>establecerEstado("caracteristicas",value)}
      />

      {/* Campo Modelo */}
      <Text>Modelo:</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Ingrese el modelo"
        value={producto.modelo}
        onChangeText={(value)=>establecerEstado("modelo", value)}
      />

      {/* Campo Precio */}
      <Text>Precio:</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Ingrese el precio"
        value={producto.precio}
        onChangeText={(value)=>establecerEstado("precio", value)}
        keyboardType="numeric" // Para que el teclado numérico aparezca
      />
   
      {/* Botón para seleccionar imagen */}
      <Button title="Seleccionar Imagen" onPress={pickImage} />
      {producto.imageUri && (
        <Image source={{ uri: producto.imageUri }} style={styles.image} />
      )}

      {/* Botón para enviar el formulario */}
      <View style={{ marginBottom: 15 }}>
        <Button title="Enviar" onPress={enviarDatos} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:10,
  },

  image: {
    width: 200,
    height: 200,
    margin:5,
  },
  TextInput:{
    borderColor: 'gray', 
    borderWidth: 1, 
    width:'100%',
    padding: 10, 
    marginBottom: 15 
  },
  titulo:{
    fontSize: 18, 
    marginBottom: 10,
    alignSelf:'center'
  }
});