import {React, useEffect, useState} from 'react';
import { Modal,View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { addMisCursos, fetchMisCursos } from './databaseMisCursos';
import { AntDesign } from '@expo/vector-icons';

           
            
const AsistenciaView=()=>{
    // es para pasar lista, guarda la lista 

    return(
        <View>
            <Text>Asistencia</Text>
        </View>
    )
}

export default AsistenciaView;