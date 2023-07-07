import React, { useEffect, useState } from 'react';
import { View, Alert, Modal, Text, TouchableOpacity,ImageBackground } from 'react-native';
import Tarjeta from './tarjeta';
import { AntDesign } from '@expo/vector-icons';
import { fetchFav, insertFav } from '../database';
//importamos el btn personalizado
import Button from '../componentes/Button'
const ModalViewResult = ({ isVisible, onClose, data, url}) => {

  //traer datos del resultado del btn VER
  const [arrayResult,setArrayResult]=useState();
  const [actual,setActual]=useState(0);
  const [total,setTotal]=useState(0);

  const guardar=(ige)=>{
        //antes de ejecutar esta funcion se comprueba si esta repetido el ige
    insertFav(ige)

                    Alert.alert(
                      'Estado',
                      'Se Guardo Correctamente en favoritos',
                      [
                        {
                          text: 'Aceptar',
                          onPress: () => {
                          },
                        },
                      ],
                      { cancelable: false }
                    );
  };
  const consultar = async ()=>{
    try {
                  
      //realizamos la consulta de datos
  let distrito = data[0].replaceAll(' ', '%20');
  let nivel = data[1].replaceAll(' ', '%20');
  let cargo = data[2].replaceAll(' ', '%20').replaceAll('[','%5B').replaceAll('[','%5D').replaceAll('/','%2F');
  
  let urlFinal = url +'select?q=*%3A*&rows=6&sort=finoferta%20desc&json.nl=map&fq=descdistrito%3A%22'+ distrito + '%22&fq=descnivelmodalidad%3A%22' + nivel + '%22&fq=estado%3Apublicada&fq=cargo%3A%22' + cargo + '%22&wt=json';
  
  
      const response = await fetch(urlFinal);
      const json = await response.json();
      setArrayResult(json);
      
  
  } catch (error) {
  
   console.error('Error al realizar la solicitud:', error);
  }
   }
    
  const Resultados=()=>{
    if((arrayResult != undefined)&&(arrayResult.response.docs[actual] != undefined)){
    
      //console.log(arrayResult.response.docs[actual]);
      setTotal(arrayResult.response.numFound);
      const miarray2=arrayResult.response.docs[actual];
      
     return(
        
        <Tarjeta miarray={miarray2}/>
     )

      
      
        }
      
  } 

  const btnAnterior=()=>{
    if(actual!==0){
      let prev=actual-1;
      setActual(prev)
    }else{

    }
  }

  const btnSiguiente=()=>{
    if(actual<(total-1)){
      console.log(actual+" de "+total)
      let next=actual+1;
      setActual(next)
    }else{

    }
  }

  const Save=()=>{
    return(

                <TouchableOpacity onPress={()=>{
                  //console.log("IGE:"+JSON.stringify(arrayResult.response.docs[actual].ige))
                  console.log("presionando")
                  let igeNum=arrayResult.response.docs[actual].ige;
                  comprobarRepetidos(igeNum);
                  }}
                  style={{width:'20%',position:'absolute',right:0}}>
                    
                    <AntDesign name="save" size={60} color={'black'} />
                    {/* <Text>Guardar</Text> */}

                </TouchableOpacity>
    )
  }

  const Navegador=()=>{
    return(
      <View style={{display:"flex",flexDirection:"row",alignItems:'center',width:'100%',justifyContent:'center'}}>
          
          <TouchableOpacity  onPress={()=>{ btnAnterior()}}><AntDesign name="leftcircle" size={40} color="#b040a8" /></TouchableOpacity>
          
          <Text style={{margin:20, fontSize:22}}>{actual+1} de {total}</Text>

          <TouchableOpacity  onPress={()=>{btnSiguiente()}}><AntDesign name="rightcircle" size={40} color="#b040a8" /></TouchableOpacity>
        </View>
    )
  }

  const comprobarRepetidos = (ige) => {
    let ige2=ige+'.0';
    console.log(ige2);
  
    //se verifica que el ige a guardar no este ya en la base de datos para eso se hace una consulta
    fetchFav((data) => {
      const repetido = data.some((item) => item.ige === ige2);
      console.log(repetido);
  
      if (repetido) {
        Alert.alert(
          'Atención',
          '¡Ya se encuentra guardado en favoritos!',
          [
            {
              text: 'Aceptar',
              onPress: () => {},
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          'Atención',
          '¿Desea guardarlo en favoritos?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Aceptar',
              onPress: () => {
                guardar(
                  // arrayResult.response.docs[actual].descdistrito,
                  // arrayResult.response.docs[actual].cargo,
                  // arrayResult.response.docs[actual].domiciliodesempeno,
                  arrayResult.response.docs[actual].ige
                );
              },
            },
          ]
        );
      }
    });
  };
  

  //console.log("ATENCION!!! los resultados son!")
useEffect(()=>{
  consultar();
  
},[data])
//renderizamos los datos
   
   //mostramos los resultados
  return (
    <Modal visible={isVisible} onRequestClose={onClose}>
      
      <View style={{height:'85%'}}>
      <ImageBackground source={require('../assets/background.jpg')} style={{ flex: 1,width:'100%',height:'110%',position:'absolute',top:0}}></ImageBackground>  
        <Text style={{width:'100%',textAlign:'center',margin:10,fontSize:30}}>Resultados</Text>

        {/* <Navegador/> */}

        <Resultados/>
        {/* <Text>{arrayResult}</Text> */}
        
        
       
      </View>
      <View style={{width:'100%',alignContent:'center',alignItems:'center',display:'flex',flexDirection:'row'}}>
                
                

                <Navegador/>

                <Save/>

            </View>
      
            <View style={{justifyContent:'center',alignContent:'center',position:'absolute',bottom:0,width:'100%'}}>
                  <Button texto='Cerrar' press={()=>{
                    setActual(0);
                    setTotal(0);
                    console.log("se preciono cerrar!!!")
                    onClose()    
                  }
                
                    } />
            </View>
    </Modal>
  );
};

export default ModalViewResult;
