import {React, useEffect, useState} from 'react';
import { Modal,View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { addMisCursos, deleteMisCursos, deleteToken, fetchMisCursos } from './databaseMisCursos.js';
import { AntDesign } from '@expo/vector-icons';

import {InicioView} from './componentesModal/InicioView.js';
import {AsistenciaView} from './componentesModal/AsistenciaView.js';
import {ListaAlumnosView} from './componentesModal/ListaAlumnosView.js';
import {NotasView} from './componentesModal/NotasView.js';
import {TareasAlumnosView} from './componentesModal/TareasAlumnosView.js';
import {TrayectoriasView} from './componentesModal/TrayectoriasView.js';
import {TareasInstitucionalesDocentesView} from './componentesModal/TareasInstitucionalesDocentesView.js';


export default ViewCursoModal=({close, visible, escuela, materia, horario, id, token, actualizarDatos})=>{
            
            const [inicioView, setInicioView]=useState(false);
            const [listaAlumnosView,setListaAlumnosView]=useState(false);
            const [asistenciaView,setAsistenciaView]=useState(false);
            const [notasView, setNotasView]=useState(false);
            const [tareasInstitucionalesView,setTareasInstitucionalesView]=useState(true);

            const [tareasAlumnosView,setTareasAlumnosView]=useState(false);
            const [trayectoriasView,setTrayectoriasView]=useState(false);

 

    const ocultar=()=>{
     setInicioView(false);
     setListaAlumnosView(false);
     setAsistenciaView(false);
     setTareasInstitucionalesView(false);
     setNotasView(false);
     setTrayectoriasView(false);
     setTareasAlumnosView(false);
    }
    const Iconos=()=>{
        return(

            <View style={styles.iconContenedor}>

{/* por el momento colocamos esto primero que es lo que va a funcionar */}
            <View style={styles.iconAndText}>
                <TouchableOpacity style={[styles.icon,{backgroundColor:tareasInstitucionalesView?'rgba(0,0,0,0.7)':'white'}]} onPress={()=>{
                    ocultar();tareasInstitucionalesView?setTareasInstitucionalesView(true):setTareasInstitucionalesView(true)}}>
                    <AntDesign name="user" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.textIcon}>Tareas</Text>
                <Text style={styles.textIcon}>Docentes</Text>
            </View>    
                
            <View style={styles.iconAndText}>
                <TouchableOpacity style={[styles.icon,{backgroundColor:listaAlumnosView?'rgba(0,0,0,0.7)':'white'}]} onPress={()=>{
                    ocultar();listaAlumnosView?setInicioView(true):setListaAlumnosView(true)}}>
                    <AntDesign name="user" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.textIcon}>Lista</Text>
                <Text style={styles.textIcon}>de Alumnos</Text>
            </View>
                
            <View style={styles.iconAndText}>
                <TouchableOpacity style={[styles.icon,{backgroundColor:asistenciaView?'rgba(0,0,0,0.7)':'white'}]} onPress={()=>{
                    ocultar();asistenciaView?setInicioView(true):setAsistenciaView(true)}}>
                    <AntDesign name="user" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.textIcon}>Asistencia</Text>
                <Text style={styles.textIcon}></Text>
            </View>

            <View style={styles.iconAndText}>
                <TouchableOpacity style={[styles.icon,{backgroundColor:notasView?'rgba(0,0,0,0.7)':'white'}]} onPress={()=>{
                    ocultar();notasView?setInicioView(true):setNotasView(true)}}>
                    <AntDesign name="checkcircleo" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.textIcon}>Notas</Text>
                <Text style={styles.textIcon}>Alumnos</Text>
            </View>

            <View style={styles.iconAndText}>
                <TouchableOpacity style={[styles.icon,{backgroundColor:tareasAlumnosView?'rgba(0,0,0,0.7)':'white'}]} onPress={()=>{
                    ocultar();tareasAlumnosView?setTareasAlumnosView(true):setTareasAlumnosView(true)}}>
                    <AntDesign name="checkcircleo" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.textIcon}>Tareas</Text>
                <Text style={styles.textIcon}>Alumons</Text>
            </View>

            <View style={styles.iconAndText}>
                <TouchableOpacity style={[styles.icon,{backgroundColor:trayectoriasView?'rgba(0,0,0,0.7)':'white'}]} onPress={()=>{
                    ocultar();trayectoriasView?setTrayectoriasView(true):setTrayectoriasView(true)}}>
                    <AntDesign name="checkcircleo" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.textIcon}>Trayectorias</Text>
                <Text style={styles.textIcon}></Text>
            </View>

            </View>
            
        )
    }

    const eliminarCurso=(clave)=>{
        Alert.alert('Atención','¿Deseas Realmente eliminar este curso?',[{text:'Si',onPress:()=>{
            deleteMisCursos(clave,()=>{actualizarDatos()});
            //cerramos el modal
            close();
            
        }},{text:'No',onPress:()=>{}}])
    }
    const editarCurso=(clave)=>{
        Alert.alert('Atención','¿Deseas editar este curso?',[{text:'Si',onPress:()=>{
            
        }},{text:'No',onPress:()=>{}}])
    }

    const Proximamente=()=>{
        return(
            <View>
                <Text>Proximamente</Text>
            </View>
        )
    }

return(

    <Modal
    onRequestClose={close}
    visible={visible}
    transparent={true}
    >

<View style={{
        flex: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente para oscurecer el fondo
        
    }}>
        
        {/* Contenido del modal aquí */}


    
        <View style={[{borderRadius:10, borderWidth:1, backgroundColor:'white',width:'95%'},styles.column]}>

{/* titulo */}

            <Text style={styles.textTitle}>{escuela}</Text>
            <Text style={styles.textSubTitle}>{materia}</Text>
            <Text style={styles.textHora}>{horario}</Text>

{/* botones */}
            <View style={{display:'flex', flexDirection:'row'}}>
                    
                    <TouchableOpacity style={styles.btn}
                    onPress={()=>{
                        editarCurso(token);
                    }}
                    >

                        <AntDesign name="edit" size={24} color="black" />

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}
                    onPress={()=>{
                        eliminarCurso(token);
                    }}
                    >
                        
                        <AntDesign name="delete" size={24} color="black" />

                    </TouchableOpacity>

            </View>


{/* cuerpo */}
            
    {/* Pendientes de la escuela   */}
    {/* alumnos */}
    {/* tareas administrativas */}

                <Iconos/>

{/* View de componentes */}
<View style={{height:'50%',borderWidth:1,borderRadius:10,padding:10,width:'95%',alignItems:'center'}}>

            { tareasInstitucionalesView && (<TareasInstitucionalesDocentesView/>)} 
            
            {/* { inicioView && (<InicioView/>)} */}
            { inicioView && (<Proximamente/>)}
            
            {/* { listaAlumnosView && (<ListaAlumnosView/>)} */}
            { listaAlumnosView && (<Proximamente/>)}
            
            {/* { asistenciaView && (<AsistenciaView/>)} */}
            { asistenciaView && (<Proximamente/>)}
            
            {/* { notasView && (<NotasView/>)} */}
            { notasView && (<Proximamente/>)}

            {/* {trayectoriasView && (<TrayectoriasView/>)} */}
            {trayectoriasView && (<Proximamente/>)}

            {/* {tareasAlumnosView && (<TareasAlumnosView token={token}/>)} */}
            {tareasAlumnosView && (<Proximamente/>)}

</View>



            <TouchableOpacity onPress={close}>

                <AntDesign name="closecircleo" size={40} color="black" />
                
            </TouchableOpacity>


        </View>

    </View>
    </Modal>   

)

}

const styles=StyleSheet.create({
    row:{display:'flex',flexDirection:'ron,margiw'},
    column:{display:'flex',flexDirection:'column',alignItems:'center',padding:10},
    btn:{borderRadius:10, borderWidth:1,padding:5,margin:5,alignItems:'center'},
    textTitle:{fontSize:18,fontWeight:'bold'},
    textSubTitle:{fontSize:15,fontWeight:'300'},
    textHora:{fontSize:12,fontWeight:'300'},

    icon:{borderRadius:50,borderWidth:0,padding:10,margin:10,justifyContent:'center',alignItems:'center'},
    iconContenedor:{
        flexDirection: 'row', // Organizar iconos en filas
        flexWrap: 'wrap', // Permitir que se envuelvan en nuevas filas o columnas
        },
    iconAndText:{padding:5,margin:5,alignItems:'center',justifyContent:'center'},
    textIcon:{textAlign:'center',fontSize:10}
})
