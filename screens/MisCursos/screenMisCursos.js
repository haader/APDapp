import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, View,StyleSheet,ImageBackground,Text, TouchableOpacity } from 'react-native';

import Button from '../../componentes/Button';
//IMPORTAMOS EL MODAL DE BUSQUEDA


//importamos los iconos
import { AntDesign } from '@expo/vector-icons';
import { fetchMisCursos } from './databaseMisCursos';
import AddEscuelaModal from './AddEscuelaModal';
import ViewCursoModal from './ViewCursoModal';

const ScreenMisCursos=()=>{

    const [selectEscuela, setSelectEscuela]=useState();
    const [selectMateria , setSelectMateria]=useState();
    const [selectHorario, setSelectHorario]=useState();
    const [selectId, setSelectId]=useState();
    const [selectToken, setSelectToken]=useState();
            

    const [datos,setDatos]=useState([]);
    const[visibleModalAdd,setVisibleModalAdd]=useState(false);
    //array de dias donde colocalomos los dias donde hay actividades 
    
    const traerDatos=()=>{
        fetchMisCursos((data)=>{

            //enviamos los datos a la variable global
            setDatos(data);
        })
    }

    const closeModalAdd=()=>{
        
        setVisibleModalAdd(false);
        traerDatos()

    }

    useEffect(()=>{
        
        traerDatos()
    },[])

    const Curso = (dia) => {

        const escuelas = datos!= undefined?datos.filter((element) => element.dia == dia.dia):[];
        const escuelasDelDia=escuelas.sort((a,b)=> a.horaInicio-b.horaInicio);
      
        
          if (escuelasDelDia.length > 0) {

            return escuelasDelDia.map((element, index) => (

              <TouchableOpacity style={styles.cargo} key={index} onPress={() => {
                handlePress(element.establecimiento,element.materia,element.horaInicio,element.minutosInicio, element.horaFin,element.minutosFin, element.id, element.token)}}>
                
                <Text style={[{fontWeight:'bold'},styles.text]}>{element.establecimiento}</Text>
                <Text style={[{fontWeight:'bold'},styles.text]}>{element.materia}</Text>

                <View style={[styles.row,{margin:5}]}>
                    <Text style={styles.textHora}>{element.horaInicio.replace('.0','')}:</Text>
                    <Text style={styles.textHora}>{element.minutosInicio.replace('.0','')}-</Text>
                
                    <Text style={styles.textHora}>{element.horaFin.replace('.0','')}:</Text>
                    <Text style={styles.textHora}>{element.minutosFin.replace('.0','')} hs</Text>
                </View>

                

              </TouchableOpacity>

            ));
          } else {
//            console.log("-Dia",dia,"escuelaDelDia:",escuelasDelDia)
            return (
                <View style={{alignItems:'center',marginTop:15}}>
                    <Text style={{fontSize:8}}>No hay </Text>
                    <Text style={{fontSize:8}}>escuelas</Text>
                    <Text style={{fontSize:8}}>este día..</Text>
                </View>
            );
          }
      
      
        function handlePress(esc,materia,horaInicio,minInicio,horaFin, minFin,id, token) {
          // Lógica para manejar el evento onPress
          setSelectEscuela(esc)
          setSelectMateria(materia)
          setSelectHorario(horaInicio,':',minInicio,'-',horaFin,':',minFin);
          setSelectId(id);
          setSelectToken(token);

          setVisibleCursoModal(true)
        }
      };
      

    //renderizamos los datos de la semana 
    const DiaSemana=({dia})=>{
        return(

            <View style={styles.columnaDia}>

            <TouchableOpacity onPress={()=>{
                 fetchMisCursos((data)=>{

                    //enviamos los datos a la variable global
                    setDatos(data);
                    console.warn(data)
                })
            }}>
                <Text style={styles.NameDiaSemana}>{dia}</Text>
            </TouchableOpacity>
                
            
            {/* renderizamos los datos traidos de la db */}
            
                <Curso dia={dia}/>
            </View>
            

            //los datos son llamados dia por dia
            
        )
    }

    const [visibleViewCursoModal,setVisibleCursoModal]=useState(false);
    const closeViewCursoModal=()=>{
        setVisibleCursoModal(false);
    }

    return(
        <View>

            <ViewCursoModal
                close={closeViewCursoModal} 
                visible={visibleViewCursoModal} 
                escuela={selectEscuela} 
                materia={selectMateria} 
                horario={selectHorario}
                id={selectId}
                token={selectToken}
             />

            <ImageBackground source={require('../../assets/background.jpg')} style={{ flex: 1,width:'100%',height:'100%',position:'absolute',top:0}}></ImageBackground>  
            <AddEscuelaModal visible={visibleModalAdd} close={closeModalAdd} />
            <View style={[styles.row,{width:'100%',height:'100%'}]}>
            
                <DiaSemana dia={"Lunes"}/>
                <DiaSemana dia={'Martes'}/>
                <DiaSemana dia={'Miercoles'}/>
                <DiaSemana dia={'Jueves'}/>
                <DiaSemana dia={'Viernes'}/>
                {/* <DiaSemana dia={'Sabado'}/> */}
                
            </View>
            <View style={[styles.row,{width:'100%',justifyContent:'center',position:'absolute',bottom:0,marginBottom:20}]}>

                <TouchableOpacity onPress={()=>{setVisibleModalAdd(true)}}>
                    <AntDesign name='pluscircleo' color={'black'} size={40}></AntDesign>
                </TouchableOpacity>

            </View>
         
            

        </View>
    )

}
const styles=StyleSheet.create(
{
    row:{
        display:'flex',
        flexDirection:'row'
    },
    text:{
        color:'white',
        textAlign:'center',
        fontSize:11,

    },
    textHora:{
        color:'white',
        fontSize:9,
    },
    column:{
        display:'flex',
        flexDirection:'column'
    },
    NameDiaSemana:{
     textAlign:'center',
     justifyContent:'center',
     borderRadius:10,
     borderWidth:1,
     backgroundColor:'orange',
     padding:10,
     margin:5,
     color:'white',
     fontSize:10   
    },
    ficha:{
        borderWidth:1,
        borderRadius:10,
        padding:10,
        margin:10
    },
    columnaDia:{
        display:'flex',
        flexDirection:'column',
        width:'20%'
    },
    cargo:{
        borderWidth:1,
        alignItems:'center',
        borderRadius:10,
        margin:5,
        padding:5,
        backgroundColor:'rgba(0,0,0,0.6)',
        
    }
}
)

export default ScreenMisCursos;