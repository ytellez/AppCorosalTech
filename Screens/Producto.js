import { View, Text, Button, StyleSheet, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { collection, addDoc, getFirestore } from "firebase/firestore"; 
import * as ImagePicker from 'expo-image-picker';
import {appFirebase} from '../database/Conexion.js';
import {firebase} from '../database/Conexion.js';
import uuid from 'react-native-uuid';



export default function Producto() {

    const db = getFirestore(appFirebase)
    //conexion con la base de datos

    const [producto, setProductos] = useState({
        descripcion:"",
        marca:"",
        caracteristicas:"",
        modelo:"",
        precio:0,
        imageUrl:null,
      });

      const establecerEstado=(nombre, valor)=>{
        setProductos({...producto, [nombre]:valor})

      }
 
      const [image, setImage] = useState(null);
      const [uploading, setUploading] = useState(false);
      const [url, setUrl] = useState(null);
    
     //Función que permite elegir una imagen de la galería
     const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });
    
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      };
      console.log(image);
     // uploadImage();
     // establecerEstado("imageUrl",url);
    };
    
    const uploadImage = async () => {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null);
      })
      const uniqueId = uuid.v4(); 
      const ref = firebase.storage().ref().child(`Pictures/Image${uniqueId}`)
      const snapshot = ref.put(blob)
      snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
        ()=>{
          setUploading(true)
        },
        (error) => {
          setUploading(false)
          console.log(error)
          blob.close()
          return 
        },
        () => {
          snapshot.snapshot.ref.getDownloadURL().then((url) => {
            setUploading(false)
            console.log("Download URL: ", url)
            setImage(url)
            establecerEstado("imageUrl",url)
            blob.close()
            console.log(url)
            return url  
          })
        }
        )
    }


 enviarDatos=()=>{
    if (!producto) return //validar
    guardarProducto(producto);
    setProductos({
        descripcion:"",
        marca:"",
        caracteristicas:"",
        modelo:"",
        precio:0,
        imageUrl:null,
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
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
       {!uploading ? <Button title='Upload Image' onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}

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