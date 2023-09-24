import {React, useEffect, useState} from 'react';
import { Modal,View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { addMisCursos, fetchMisCursos } from './databaseMisCursos';
import { AntDesign } from '@expo/vector-icons';


import { ADDtareasInstitucionales } from './databaseComponentesModal/tareasInstitucionalesDocentesDB/ADDtareasInstitucionales';
import { FETCHtareasInstitucionales } from './databaseComponentesModal/tareasInstitucionalesDocentesDB/FETCHtareasInstitucionales';
import { updateTAREAtareaInstitucional } from './databaseComponentesModal/tareasInstitucionalesDocentesDB/updateTAREAtareaInstitucional';
import { updateBOLEANOtareaInstitucional } from './databaseComponentesModal/tareasInstitucionalesDocentesDB/updateBOLEANOtareaInstitucional';
import { DELETEtareaInstitucional } from './databaseComponentesModal/tareasInstitucionalesDocentesDB/DELETEtareaInstitucional';



const TareasInstitucionalesDocentesView=( token )=>{
    
    const [tarea,setTarea]=useState('');
    const [data,setData]=useState([])

    useEffect(()=>{
        actualizarDatos()
    },[])

    //funcion para guardar los cambios del input
    const ChangeText=(text)=>{
        setTarea(text)
    }

    const actualizarDatos=()=>{
        FETCHtareasInstitucionales(token,
            (datos)=>{
                setData(datos)
            })
    }

    const edit=(id,token)=>{

        Alert.alert('ATENCIÓN', '¿Desea editar esta tarea?',[{text:'Si',onPress:()=>{}},{text:'No',onPress:()=>{}}])

    }

    const deleteTask=(id,token)=>{

        Alert.alert('ATENCIÓN', '¿Desea eliminar esta tarea?',[{text:'Si',onPress:()=>{
            
            DELETEtareaInstitucional(token,id);
            actualizarDatos();

        }},{text:'No',onPress:()=>{}}])

    }


    const TareasComponente=()=>{
        
        return(
            <View>
                {data.map((element,index)=>{
                            return(
                                <View key={index} style={styles.borderComponente}>
                                    {/* inono que demuestra el estado */}
                                    <View style={{alignItems:'center',justifyContent:'center',backgroundColor:element.estado?'white':'black'}}>

                                        <AntDesign name='circle' size={25} color={element.estado?'black':'white'}/>

                                    </View>
                                    {/* tareas */}
                                        <Text style={{backgroundColor:element.estado?'green':'white'}}>
                                            {element.tarea}
                                        </Text>
                                    {/* botones */}
                                    <View style={styles.row}>
                                        {/* editar   tarea */}
                                            <TouchableOpacity onPress={()=>edit(element.id,token)}>
                                                <AntDesign name='edit' size={25} color={'orange'}/>
                                            </TouchableOpacity>

                                        {/* eliminar tarea */}

                                            <TouchableOpacity onPress={()=> deleteTask(element.id,token)}>
                                                <AntDesign name='delete' size={25} color={'red'}/>
                                            </TouchableOpacity>
                                    </View>

                                </View>
                            )
                        })}
            </View>
        )
        
    }

    return( 
        <View>

            <Text>Tareas Institucionales</Text>
            
            {data.length>0?<TareasComponente/>:<View><Text>No hay tareas institucionales guardadas</Text></View>}
            
            <Text>Agregar una nueva tarea</Text>

            <View style={styles.row}>
                
                <TextInput 
                value={tarea}
                onChangeText={ChangeText} 
                placeholder='Tarea'></TextInput>
                
                <TouchableOpacity onPress={
                    ()=>{
                        if(tarea!=null||tarea!=''){

                            ADDtareasInstitucionales(token,tarea)

                            actualizarDatos()
                            
                        }else{
                            Alert.alert('ATENCION','debe agregar algun valor a la tarea',[{text:'ok',onPress:()=>{}}])
                        };
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
},borderComponente:{
    borderRadius:10,
    borderWidth:1,
    margin:5,
    padding:5,
    display:'flex',
    flexDirection:'row'
}
})

export default TareasInstitucionalesDocentesView;