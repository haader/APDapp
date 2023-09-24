import {React, useEffect, useState} from 'react';
import { Modal,View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { addMisCursos, fetchMisCursos } from './databaseMisCursos';
import { AntDesign } from '@expo/vector-icons';

                

const InicioView=()=>{

                    // aqui colocamos la visión general del curso
                    // puedeser cantidad de aprobados, desaprobados
                    // cantidad de clases dadas, 
                    // cantidad de clases que faltan
                    

                    return(
                        <View>
                            <Text>INICIO </Text>
                        </View>
                    );    
}

export default InicioView;
