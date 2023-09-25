import {React, useEffect, useState} from 'react';
import { Modal,View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

export const ListaAlumnosView=()=>{
                
    useEffect(()=>{
        //colocamos el detch de inicio view
    },[])

    //colocamos la lista de alumnos ordenados alfabeticamente
    //podemos colocar diversos criterios para ordenarlos como por ejemplo
    //por cantidad de trabajos adeudados, por cantidad de notas
    //numero de faltas, numero de llamadas de atención

    //muy importante al seleccionar un alumno podemos ver mas detalles de este como:
    // los trabajos entregados
   return(
        <View>

            <Text>Listado de Alumnos</Text>
            
            <Text style={{color:'gray',margin:10}}>Agregar un nuevo Alumnos</Text>

            <View style={styles.row}>
                
                <TextInput placeholder='Apellido'></TextInput>
                <TextInput placeholder='Nombres'></TextInput>
                <TextInput placeholder='DNI'></TextInput>
                <TextInput placeholder='Descripción'></TextInput>

                <TouchableOpacity onPress={
                    ()=>{

                    }}>
                    <AntDesign name='plus' size={20} color={'black'}/>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles=StyleSheet.create({
    row:{
        display:'flex',
        flexDirection:'row'
}
})

