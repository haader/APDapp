
import React, { useEffect, useState } from 'react';

import { ScrollView, Alert, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Button from '../componentes/Button'
//importamos los comandos para iniciar el fetch de la data base
import {fetchData, deleteRow, deleteRowsWhere } from '../database'

//modales
import ModalViewResult from './modalViewResult';
import ModalCopiarDis from './modalCopiarDis'
import { AntDesign } from '@expo/vector-icons';


export default function Filtros(){

  //variable boleana para ver el modalVIewResult
  const [boleanMR,setBoleanMR]=useState(false);
  const [copyDisBolean,setCopyDisBolean]=useState(false);
  const [selectDisCopiar,setSelectDisCopiar]=useState('');

  //contiene un arrary con los datos de toda la tabla
  const [arrayDistritos,setArrayDistritos]=useState([])
  const [array,setArray]=useState([]);

  const [filtroSelect, setFiltroSelect]=useState(["distrito","nivel","cargo"]);
  const [numPublicada, setNumPublicada]=useState([]);//es un array donde se almacenan los resultados de cada fetch
 
  

  const consultaURL = 'https://servicios3.abc.gob.ar/valoracion.docente/api/apd.oferta.encabezado/';

   //variables para el color
   let colorB=true;
   //const [colorB,setColorB]=useState(true);
   

const ver = () => {
  

  setBoleanMR(true);
};

const actualizar=()=>{
  fetchData((data) => {
    console.log(data);
    setArray(data);
  
    const distritosUnicos = Array.from(new Set(data.map(item => item.distrito)));

    setArrayDistritos(distritosUnicos);
  
  });
}


 
  useEffect(() => {
    actualizar();
  }, []);
  
  useEffect(() => {
    setNumPublicada([]);
    array.forEach((item, index) => {
      publicadas(item.distrito, item.nivel, item.cargo, index)
       
    });
  }, [array]);
  

  

  const comandoDelete=(id)=>{
    
    

      // ...

      Alert.alert(
        'Confirmación',
        '¿Estás seguro de que deseas eliminar este filtro?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Aceptar',
            onPress: () => {
              
              
              //acciones si se acepta
              deleteRow(id);
              fetchData((data) => {
                console.log(data); // Mostrar los datos en la consola
                setArray(data);
              });



            },
          },
        ],
        { cancelable: false }
      );



       
  }

  const verResultados=()=>{
    setBoleanMR(false);
  }



  const publicadas= async (dis,niv,car,index) =>{
    let distrito = dis.replaceAll(' ', '%20');
    let nivel = niv.replaceAll(' ', '%20');
    let cargo = car.replaceAll(' ', '%20').replaceAll('[','%5B').replaceAll('[','%5D').replaceAll('/','%2F');

    let urlFinal = consultaURL +'select?q=*%3A*&rows=6&sort=finoferta%20desc&json.nl=map&fq=descdistrito%3A%22'+ distrito + '%22&fq=descnivelmodalidad%3A%22' + nivel + '%22&fq=estado%3Apublicada&fq=cargo%3A%22' + cargo + '%22&wt=json';


    fetch(urlFinal)
  .then(response => response.json())
  .then(data => {
    
    // Aquí puedes trabajar con los datos obtenidos
    //console.log("TRAYENDO LA CANTIDAD DE PUBLICADAS:")
    //console.log(data.response.numFound);
    setNumPublicada(prevState => {
      const updatedArray = [...prevState];
      updatedArray[index] = data.response.numFound;
      return updatedArray;
    });
    
  })
  .catch(error => {
    // Aquí puedes manejar los errores de la solicitud de fetch
    console.error('Error al realizar la solicitud:', error);
  });


  }

  const CartelVacio = () => {
    if (array.length == 0) {

      return (
        <View style={{height:'90%',justifyContent:'center'}}>
            <Text style={{ textAlign: 'center', fontSize: 20, backgroundColor:'#b040a8',padding:5,borderRadius:10,color:'rgb(255,255,255)',textShadowColor:'black',textShadowRadius:2}}>
                  Bienvenido!, no hay filtros guardados, por favor agregue algún filtro
            </Text>
        </View>
        
      );
    } else {
        console.log("entro a B")
      return null; // o cualquier otro contenido que desees mostrar
    }
  };

  const operacionesDistrito=(selectDis)=>{
      Alert.alert(
        selectDis,
        '¿Que operaciones desea realizar al distrito seleccionado?',[
          {
            text:'Salir',
            onPress:()=>{

            }
          },
          {
            text:'eliminar distrito',
            onPress:()=>{
              eliminarDis(selectDis)
            }
          },
          {
            text:'copiar distrito',
            onPress:()=>{
              copiarDis(selectDis)
            }
          }
        ]
      )
  }

  const eliminarDis=(selectDis)=>{
    Alert.alert(
      'Atención',
      '¿Realmente deseas eliminar el distrito '+selectDis+'?',[
        {
          text:'cancelar',
          onPress:()=>{

          }
        },
        {
          text:'eliminar',
          onPress:()=>{
            deleteRowsWhere(selectDis);
            actualizar();
          }
        } 
      ]
    )
  }

  const copiarDis=(selectDis)=>{

    Alert.alert(
      'Atención',
      '¿Deseas copiar los filtros de '+selectDis+' en otro distrito?',[
        {text:'cancelar', onPress:()=>{}},
        {text:'copiar',onPress:()=>{
          //activamos el modal de copiar distrito para seleccionar el correcto
          setCopyDisBolean(true);
          setSelectDisCopiar(selectDis);
        }}
      ]
    )

  }

  const closeModalCopyDis=()=>{
    setCopyDisBolean(false);
  }

  return (
    <View style={{height:'100%',paddingTop:30}}>
   
   <ModalViewResult isVisible={boleanMR} onClose={verResultados} data={filtroSelect} url={consultaURL}/>
    <ModalCopiarDis isVisible={copyDisBolean} onClose={closeModalCopyDis} distritoSelect={selectDisCopiar} actualizar={actualizar}></ModalCopiarDis>

      <ImageBackground source={require('../assets/background.jpg')} style={{ flex: 1,width:'100%',height:'100%',position:'absolute',top:0}}></ImageBackground>  
    
      <ScrollView >
            <View style={{flex:1,paddingTop:60}}>
              <View style={[styles.container,{paddingLeft: 5,paddingRight: 5}]}>
              {/* <Text style={styles.title}>Cargos disponibles</Text> */}
          {arrayDistritos.map((item,index) => (
  // colocamos la tabla del distrito
            <View style={{marginBottom:20}} key={index}>
              <TouchableOpacity onPress={()=>{operacionesDistrito(item)}}><Text style={styles.title}>{item}</Text></TouchableOpacity>
              <View style={styles.container}>

                                    <View style={[styles.tableRow]}>
                                      <Text style={[styles.column,styles.headerTable,styles.nivel,{backgroundColor:'#b040a8'}]}>Nivel</Text>
                                      <Text style={[styles.column,styles.headerTable,styles.cargo,{backgroundColor:'#b040a8'}]}>Cargo</Text>
                                      <Text style={[styles.column,styles.headerTable,styles.disponible,{backgroundColor:'#b040a8'}]}>Publicadas</Text>
                                      <Text style={[styles.column,styles.headerTable,styles.acciones,{backgroundColor:'#b040a8'}]}>Acciones</Text>
                                    </View>
                                    <View style={styles.container}>
                                    
                                    {array.map((item, index2) => {
                                      
                                      
                                                        if (arrayDistritos[index].includes(item.distrito)) {
                                                          colorB?colorB=false:colorB=true;
                                                          return (
                                                            <View key={item.id} style={styles.tableRow}>
                                                              <TouchableOpacity onPress={() => {
                                                                      // console.log("presionaste ver!")
                                                                      if(numPublicada[index2]!==0){
                                                                        setFiltroSelect([item.distrito,item.nivel,item.cargo])
                                                                        ver();
                                                                      }
                                                                    }} style={[styles.column, styles.nivel,{backgroundColor:colorB?'#ccc':'white'}]}><Text style={styles.texto}>{item.nivel}</Text></TouchableOpacity>
                                                              <TouchableOpacity onPress={() => {
                                                                      // console.log("presionaste ver!")
                                                                      if(numPublicada[index2]!==0){
                                                                        setFiltroSelect([item.distrito,item.nivel,item.cargo])
                                                                        ver();
                                                                      }
                                                                    }} style={[styles.column, styles.cargo,{backgroundColor:colorB?'#ccc':'white'}]}><Text style={styles.texto}>{item.cargo}</Text></TouchableOpacity>
                                                              <TouchableOpacity onPress={() => {
                                                                      // console.log("presionaste ver!")
                                                                      if(numPublicada[index2]!==0){
                                                                        setFiltroSelect([item.distrito,item.nivel,item.cargo])
                                                                        ver();
                                                                      }
                                                                    }} style={[styles.column, styles.disponible,{backgroundColor:colorB?'#ccc':'white'}]}><Text style={styles.texto}>{numPublicada[index2]}</Text></TouchableOpacity>
                                                              <View style={[styles.cellAcciones,styles.acciones,{backgroundColor:colorB?'#ccc':'white'}]}>
                                                                
                                                              
                                                                  <TouchableOpacity onPress={() => {
                                                                      // console.log("presionaste ver!")
                                                                      if(numPublicada[index2]!==0){
                                                                        setFiltroSelect([item.distrito,item.nivel,item.cargo])
                                                                        ver();
                                                                      }
                                                                    }}
                                                                    style={{
                                                                      //backgroundColor: 'red', // Establecer el color de fondo como rojo
                                                                      paddingRight: 10, // Opcional: agregar un padding para mayor espacio alrededor del icono
                                                                    }}
                                                                    ><AntDesign name="eye" size={35} color={numPublicada[index2]==0?'red':"green"}/></TouchableOpacity>
                                                                    
                                                                    <TouchableOpacity  
                                                                      onPress={() => {
                                                                        
                                                                          comandoDelete(item.id)
                                                                        
                                                                        }
                                                                      }
                                                                      style={{
                                                                        //backgroundColor: 'red', // Establecer el color de fondo como rojo
                                                                        paddingRight: 10, // Opcional: agregar un padding para mayor espacio alrededor del icono
                                                                      }}
                                                                      >
                                                                              <AntDesign name="closecircleo" size={25} color="black"/>
                                                                      </TouchableOpacity>  
                                                              
                                                                
                                                                  
                                                                
                                                                
                                                              </View>
                                                            </View>
                                                          );
                                                        } else {
                                                          return null;
                                                        }
                                                        
                                                      })}

                                    </View>
                                    </View>


            </View>
          ))}
        </View>


              
              <View style={{height:30}}>
              
              </View>
              
              {/* ... Agrega más filas de datos según sea necesario */}
            </View>
      </ScrollView>
      
      <CartelVacio/>

      <View style={{justifyContent:'center',alignContent:'center',bottom:0,position:'absolute',width:'100%'}}>
      <Button texto='Actualizar' press={()=>{ 
          //traemos los datos de la database
            
                console.log("actualizar datos");
                actualizar();


      }}/>
      
      </View>

   
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 300,
    color:'white',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    backgroundColor:'#474545',
    fontFamily:'Roboto',
    textAlign:'center'
  },
  headerTable:{
    fontSize:15,
    fontWeight:600,
    color:'#ccc'

  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  column: {
    flex: 1,
    marginRight: 0,
    borderWidth:1,
    textAlign:"center",
    justifyContent:"center",
    borderColor:'#b040a8'
    
  },
  ViewRow:{
    
    flex: 1,
    marginRight: 0,
    justifyContent:"center",
    borderWidth:1
  }
  ,
  nivel:{
    width:"30%",
    textAlignVertical:'center'
  },
  cargo:{
    width:"30%",
    textAlignVertical:'center'
  },
  disponible:{
    width:"10%",
    textAlignVertical:'center'
  },
  acciones:{
  
   width:"30%",
   alignItems:"center",
   justifyContent:"center",
   

  },
  texto:{
    textAlign:'center',
    fontWeight:200
  },
  cellAcciones:{
    borderColor:'#b040a8',
    flex: 1,
    marginRight: 0,
    borderWidth:1,
    display:'flex',
    flexDirection:'row',
    width:'30%'
  },
  btn:{
    
    backgroundColor:'red',
    
  },
 
});


