import {React, useEffect, useState} from 'react';
import { Modal,View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { addMisCursos, fetchMisCursos } from './databaseMisCursos';
import { AntDesign } from '@expo/vector-icons';

const NotasView=()=>{
    return(
        
        <View>
            <Text>Notas</Text>
        </View>
    );
}

export default NotasView;