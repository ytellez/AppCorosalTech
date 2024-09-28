import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Tarea from '../componentes/Tarea';
import uuid from 'react-native-uuid';

export default function Tareas() {
    const [tarea, setTarea]=useState('');
    const [tareas, setTareas]=useState([
      {id:2, tarea: 'Prueba', completada: false},
      {id:3, tarea: 'Prueba', completada: false}
    ]);
  
    const guardarTarea = () =>{
      if (!tarea) return
      const nuevaTarea ={
        id:uuid.v4(),
        tarea: tarea,
        completada:false,
      }
      setTareas([nuevaTarea, ...tareas]);
      setTarea('');
    }
  
    const completarTarea = (id) =>{
      const tareasActualizadas = tareas.map((t)=>{
        if(id===t.id) t.completada=!t.completada
        return t;
      });
      setTareas(tareasActualizadas);
    };
  
    const eliminarTarea = (id) => {
        const tareasActualizadas = tareas.filter((t)=>t.id != id);
        setTareas(tareasActualizadas);
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>App de Tareas</Text>
        <View style={styles.contenedorForm}>
          <TextInput 
            placeholder='Ingresa la tarea' 
            style={styles.textimput}
            onChangeText={setTarea}
            value={tarea}>
          </TextInput>
          <TouchableOpacity 
              style={styles.boton}
              onPress={guardarTarea}>
              <Text style={styles.textoboton}>Clic me</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contenedorTareas}>
          {
            tareas.map((t)=>{
                return(
                  <Tarea 
                    id={t.id}
                    key={t.id}
                    tarea={t.tarea}
                    completada={t.completada}
                    completarTarea={completarTarea}
                    eliminarTarea={eliminarTarea}
                  ></Tarea>
                )
            })
          }
  
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    titulo:{
      fontSize:40,
      color:'#8D139D',
      fontWeight:'bold',
      marginTop:30,
    },
    contenedorForm:{
      flexDirection:'row',
      marginTop:15,
      marginHorizontal:10,
    },
    textimput:{
      flex:3,
      borderColor:'#B718CC',
      borderWidth:3,
      height:60,
      padding:15,
      fontSize:17,
    },
    boton:{
      flex:1,
      backgroundColor:'#B718CC',
      alignItems:'center',
      justifyContent:'center',
  
    },
    textoboton:{
      fontSize:16,
      fontWeight:'bold',
      color:'#fff',
    },
    contenedorTareas:{
      width:'95%'
    }
  });
  