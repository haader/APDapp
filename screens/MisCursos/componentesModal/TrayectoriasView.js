import {React, useEffect, useState} from 'react';
import { Modal,View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { addMisCursos, fetchMisCursos } from './databaseMisCursos';
import { AntDesign } from '@expo/vector-icons';


const TrayectoriasView=()=>{
    
    
    return(
        <View>
            <Text>Trayectoria alumnos</Text>
        </View>
    );
}
export default TrayectoriasView;