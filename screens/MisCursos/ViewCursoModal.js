import {React, useEffect, useState} from 'react';
import { Modal,View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { addMisCursos, fetchMisCursos } from './databaseMisCursos';
import { AntDesign } from '@expo/vector-icons';

import {InicioView} from './componentesModal/InicioView';
import {AsistenciaView} from './componentesModal/AsistenciaView';
import {ListaAlumnosView} from './componentesModal/ListaAlumnosView';
import {NotasView} from './componentesModal/NotasView';
import {TareasAlumnosView} from './componentesModal/TareasAlumnosView';
import {TrayectoriasView} from './componentesModal/TrayectoriasView';
import {TareasInstitucionalesDocentesView} from './componentesModal/TareasInstitucionalesDocentesView';


export default ViewCursoModal=({close, visible, escuela, materia, horario, id, token})=>{
            
            const [inicioView, setInicioView]=useState(true);
            const [listaAlumnosView,setListaAlumnosView]=useState(false);
            const [asistenciaView,setAsistenciaView]=useState(false);
            const [notasView, setNotasView]=useState(false);
            const [administrarView,setAdministrarView]=useState(false);

            const [tareasAlumnosView,setTareasAlumnosView]=useState(false);
            const [trayectoriasView,setTrayectoriasView]=useState(false);

 

    const ocultar=()=>{
     setInicioView(false);
     setListaAlumnosView(false);
     setAsistenciaView(false);
     setAdministrarView(false);
     setNotasView(false);
     setTrayectoriasView(false);
     setTareasAlumnosView(false);
    }
    const Iconos=()=>{
        return(

            <View style={styles.iconContenedor}>

{/* por el momento colocamos esto primero que es lo que va a funcionar */}
            <View style={styles.iconAndText}>
                <TouchableOpacity style={[styles.icon,{backgroundColor:administrarView?'rgba(0,0,0,0.7)':'white'}]} onPress={()=>{
                    ocultar();administrarView?setAdministrarView(true):setAdministrarView(true)}}>
                    <AntDesign name="user" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.textIcon}>Tareas{'\n'} Docentes</Text>
            </View>    
                
            <View style={styles.iconAndText}>
                <TouchableOpacity style={[styles.icon,{backgroundColor:listaAlumnosView?'rgba(0,0,0,0.7)':'white'}]} onPress={()=>{
                    ocultar();listaAlumnosView?setInicioView(true):setListaAlumnosView(true)}}>
                    <AntDesign name="user" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.textIcon}>Lista{'\n'}de Alumnos</Text>
            </View>
                
            <View style={styles.iconAndText}>
                <TouchableOpacity style={[styles.icon,{backgroundColor:asistenciaView?'rgba(0,0,0,0.7)':'white'}]} onPress={()=>{
                    ocultar();asistenciaView?setInicioView(true):setAsistenciaView(true)}}>
                    <AntDesign name="user" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.textIcon}>Asistencia</Text>
            </View>

            <View style={styles.iconAndText}>
                <TouchableOpacity style={[styles.icon,{backgroundColor:notasView?'rgba(0,0,0,0.7)':'white'}]} onPress={()=>{
                    ocultar();notasView?setInicioView(true):setNotasView(true)}}>
                    <AntDesign name="checkcircleo" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.textIcon}>Notas{'\n'} Alumnos</Text>
            </View>

            <View style={styles.iconAndText}>
                <TouchableOpacity style={[styles.icon,{backgroundColor:tareasAlumnosView?'rgba(0,0,0,0.7)':'white'}]} onPress={()=>{
                    ocultar();tareasAlumnosView?setTareasAlumnosView(true):setTareasAlumnosView(true)}}>
                    <AntDesign name="checkcircleo" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.textIcon}>Tareas{'\n'}  Alumons</Text>
            </View>

            <View style={styles.iconAndText}>
                <TouchableOpacity style={[styles.icon,{backgroundColor:trayectoriasView?'rgba(0,0,0,0.7)':'white'}]} onPress={()=>{
                    ocultar();trayectoriasView?setTrayectoriasView(true):setTrayectoriasView(true)}}>
                    <AntDesign name="checkcircleo" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.textIcon}>Trayectorias</Text>
            </View>

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
                    
                    <TouchableOpacity style={styles.btn}>

                        <AntDesign name="edit" size={24} color="black" />

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn}>
                        
                        <AntDesign name="delete" size={24} color="black" />

                    </TouchableOpacity>

            </View>


{/* cuerpo */}
            
    {/* Pendientes de la escuela   */}
    {/* alumnos */}
    {/* tareas administrativas */}

                <Iconos/>

{/* View de componentes */}
<View style={{height:'50%'}}>

            { TareasInstitucionalesDocentesView && (<TareasInstitucionalesDocentesView/>)} 
            
            { inicioView && (<InicioView/>)}
            
            { listaAlumnosView && (<ListaAlumnosView/>)}
            
            { asistenciaView && (<AsistenciaView/>)}
            
            { notasView && (<NotasView/>)}
            
            { administrarView && (<TareasInstitucionalesDocentesView/>)}

            {TrayectoriasView && (<TrayectoriasView/>)}

            {TareasAlumnosView && (<TareasAlumnosView/>)}

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
