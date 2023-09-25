import {React, useEffect, useState} from 'react';
import { Modal,View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { ADDtareasInstitucionales, FETCHtareasInstitucionales, updateTAREAtareaInstitucional, updateBOLEANOtareaInstitucional, DELETEtareaInstitucional } from './databaseComponentesModal/tareasInstitucionalesDocentesDB.js';

export const TareasInstitucionalesDocentesView=( token )=>{
    
    const [tarea,setTarea]=useState('');
    const [data,setData]=useState([])

    //view para ver las tareas selleccionadas
    //es un objeto que contiene todos los datos de las tarea seleccionada fecha tarea id
    const [select,setSelect]=useState({tarea:'hola',fecha:'20/09/20231', id:12})
    const [viewSelect,setViewSelect]=useState(false)

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

        Alert.alert('ATENCIÓN', '¿Desea editar esta tarea?',[{text:'Si',onPress:()=>{
            Alert.alert('Atención','PROXIAMENTE',[{text:'ok',onPress:()=>{}}])
        }},{text:'No',onPress:()=>{}}])

    }

    const deleteTask=(id,token)=>{

        Alert.alert('ATENCIÓN', '¿Desea eliminar esta tarea?',[{text:'Si',onPress:()=>{
            
            DELETEtareaInstitucional(token,id);
            actualizarDatos();

        }},{text:'No',onPress:()=>{}}])

    }

    const VerTareaSeleccionada=()=>{

        return(
            <View style={{display:'flex',position:'absolute'}}>
                <Text>Tarea Seleccionada</Text>
                <Text>{select.fecha}</Text>
                <Text>{select.tarea}</Text>
                <TouchableOpacity onPress={()=>{
                    setViewSelect(false)
                }}>
                    <AntDesign name='close' size={25} color={'black'}></AntDesign>
                </TouchableOpacity>
            </View>
        )

    }

    const TareasComponente=()=>{
        
        return(
            <View>
                {data.map((element,index)=>{
                            return(
                                <View key={index} style={styles.borderComponente}>
                                    {/* inono que demuestra el estado */}
                                    <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:element.estado?'white':'black'}}
                                    onPress={()=>{

                                        updateBOLEANOtareaInstitucional(token,element.id,element.estado?0:1);
                                        actualizarDatos()

                                    }}>

                                        <AntDesign name='circle' size={25} color={element.estado?'black':'white'}/>

                                    </TouchableOpacity>
                                    {/* tareas */}
                                        <TouchableOpacity onPress={()=>{
                                            setSelect(element.tarea,element.fecha,element.estado);
                                            setViewSelect(true);
                                            
                                        }}>
                                            <Text style={{backgroundColor:element.estado?'green':'white'}}>
                                                {element.tarea}
                                            </Text>
                                        </TouchableOpacity>
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

{viewSelect && (<VerTareaSeleccionada/>)}            

            <Text>Tareas Institucionales</Text>
            
            {data.length>0?<TareasComponente/>:<View><Text>No hay tareas institucionales guardadas</Text></View>}
            
            <Text>Agregar una nueva tarea</Text>

            <View style={styles.row}>
                
                <TextInput 
                value={tarea}
                onChangeText={ChangeText} 
                placeholder='Tarea'
                style={{borderWidth:1,borderRadius:10,padding:10,width:'80%'}}
                >

                </TextInput>
                
                <TouchableOpacity
                style={{borderRadius:50,borderWidth:1,justifyContent:'center',alignItems:'center'}}
                onPress={
                    ()=>{
                        if(tarea!=null||tarea!=''){

                            ADDtareasInstitucionales(token,tarea);

                            actualizarDatos();
                            
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

