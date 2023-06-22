import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, View,StyleSheet,ImageBackground,Text } from 'react-native';
import { initDatabase, insertFiltro, fetchData } from '../database';
import Button from '../componentes/Button'

//IMPORTAMOS EL MODAL DE BUSQUEDA
import ModalBusqueda from './modalBusqueda';

const ScreenAgregarFiltro = () =>{

      //declaramos las variables para los array que contienen distrito,niveles,cargos unicos
  const [disFrecuentes,setDisFrecuentes]=useState([]);
  const [nivFrecuentes,setNivFrecuentes]=useState([]);
  const [carFrecuentes,setCarFrecuentes]=useState([]);
  const [arrayDistrito,setArrayDistrito]=useState(null);
  const [arrayNivel,setArrayNivel]=useState(null);
  const [arrayCargo,setArrayCargo]=useState(null);

  //declaramos las variables globales
  const [distrito,setDistrito]=useState('Seleccione un Distrito');
  const [nivel, setNivel]=useState('Seleccione un Nivel');
  const [cargo,setCargo]=useState('Seleccione un Cargo');


  //creamos las variables para los boleanos de los modales
  const[modal1,setModal1]=useState(false);
  const[modal2,setModal2]=useState(false);
  const[modal3,setModal3]=useState(false);



  useEffect(()=>{

    TraerDatosDistrito();
    TraerDatosNiveles();
    TraerDatosCargos();

    Frecuentes();
  },[])

  const TraerDatosDistrito=()=>{
      fetch('https://servicios3.abc.gob.ar/valoracion.docente/api/apd.oferta.encabezado/select?rows=0&facet=true&facet.limit=-1&facet.mincount=1&json.nl=map&facet.field=descdistrito&q=*:*&wt=json')
      .then(response => response.json())
      .then(data => {
        // Aquí puedes trabajar con los datos de la respuesta
        let listaDistrito=data.facet_counts.facet_fields.descdistrito;
        var arrayListaDistrito=Object.keys(listaDistrito);
    
        setArrayDistrito(arrayListaDistrito);
        // console.log(arrayListaDistrito)
        
    
      })
      .catch(error => {
        // Manejo de errores
        console.error(error);
      });
    
    }

    const TraerDatosNiveles=()=>{
      fetch('https://servicios3.abc.gob.ar/valoracion.docente/api/apd.oferta.encabezado/select?rows=0&facet=true&facet.limit=-1&facet.mincount=1&json.nl=map&facet.field=descnivelmodalidad&q=*:*&wt=json')
      .then(response => response.json())
      .then(data => {
        // Aquí puedes trabajar con los datos de la respuesta
        let lista2=data.facet_counts.facet_fields.descnivelmodalidad;
        var array2=Object.keys(lista2);
    
        setArrayNivel(array2);
        // console.log(array2)
        
    
      })
      .catch(error => {
        // Manejo de errores
        console.error(error);
      });
    
    }
  
    const TraerDatosCargos=()=>{
      fetch('https://servicios3.abc.gob.ar/valoracion.docente/api/apd.oferta.encabezado/select?rows=0&facet=true&facet.limit=-1&facet.mincount=1&json.nl=map&facet.field=cargo&q=*:*&wt=json')
      .then(response => response.json())
      .then(data => {
        // Aquí puedes trabajar con los datos de la respuesta
        let lista3=data.facet_counts.facet_fields.cargo;
        var array3=Object.keys(lista3);
    
        setArrayCargo(array3);
        // console.log(array3)
        
    
      })
      .catch(error => {
        // Manejo de errores
        console.error(error);
      });
    
    }


  const Frecuentes=()=>{
  
    fetchData((data) => {
      console.log("obteniendo datos de FETCH, determinando frecuentes");
    
      const distritosUnicos = [];
      const nivUnicos = [];
      const carUnicos = [];
    
      data.forEach((objeto) => {
        if (!distritosUnicos.includes(objeto.distrito)) {
          distritosUnicos.push(objeto.distrito);
        }
    
        if (!nivUnicos.includes(objeto.nivel)) {
          nivUnicos.push(objeto.nivel);
        }
    
        if (!carUnicos.includes(objeto.cargo)) {
          carUnicos.push(objeto.cargo);
        }
      });
      console.log(distritosUnicos)
      setDisFrecuentes(distritosUnicos);
      setNivFrecuentes(nivUnicos);
      setCarFrecuentes(carUnicos);
    });
    
  }
  
  const closeModal1=()=>{
    setModal1(false);
  }
  const closeModal2=()=>{
    setModal2(false);
  }
  const closeModal3=()=>{
    setModal3(false);
  }

  const comprobarRepetidos = (distrito, nivel, cargo) => {
    fetchData((data=>{
      
        const repetidos = data.some((item) => {
          return (
            item.distrito === distrito &&
            item.nivel === nivel &&
            item.cargo === cargo
          );
        });
      
        if (repetidos) {
          console.log("repetidos");
          Alert.alert(
            'Error',
            'El filtro que intentas guardar ya existe!',
            [
              {
                text: 'Aceptar',
                onPress: () => {
                  
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          
            
            insertFiltro(distrito,nivel,cargo);
            Frecuentes();

            Alert.alert(
              'Estado',
              'EL filtro se agrego correctamente',
              [
                {
                  text: 'Aceptar',
                  onPress: () => {
                    
                  },
                },
              ],
              { cancelable: false }
            );
        }
     }))
    
  };
  


    return (
      
      <View style={[styles.container,{paddingTop:30}]}>
      <ImageBackground source={require('../assets/background.jpg')} style={{ flex: 1,width:'100%',height:'100%',position:'absolute',top:0}}></ImageBackground>  
  {/* clocamos los modales */}
        <ModalBusqueda title='Seleccione un distrito' isVisible={modal1} onClose={closeModal1} data={arrayDistrito} setVariable={setDistrito} frecuentes={disFrecuentes} setNewFrecuentes={setDisFrecuentes}/>
        <ModalBusqueda title='Seleccione un nivel' isVisible={modal2} onClose={closeModal2} data={arrayNivel} setVariable={setNivel} frecuentes={nivFrecuentes} setNewFrecuentes={setNivFrecuentes}/>
        <ModalBusqueda title='Seleccione un cargo' isVisible={modal3} onClose={closeModal3} data={arrayCargo} setVariable={setCargo} frecuentes={carFrecuentes} setNewFrecuentes={setCarFrecuentes}/>
  
        <View style={{ display: 'flex', flexDirection: 'row',top:140,position:'absolute',alignItems:'center',borderWidth:3,borderRadius:10,padding:10,borderColor:'#707070'}}>
          <Text style={{fontSize:60,fontWeight:'600',color:'#707070'}}>APD</Text>
          <Text style={{fontSize:30,bottom:-10,fontWeight:'100',color:'#707070'}}>app</Text>
        </View>

        <View style={{ width:'50%', display: 'flex', flexDirection: 'column',marginTop:20 }}>
          <Button texto={distrito} press={()=>{
            setModal1(true);
            console.log("distrito")
            
          }}/>
        </View>
  
        <View style={{ width:'50%',display: 'flex', flexDirection: 'column',marginTop:20 }}>
          <Button texto={nivel} press={()=>{
            setModal2(true);
            console.log("nivel")}}/>
        </View>
  
        <View style={{ width:'50%',display: 'flex', flexDirection: 'column',marginTop:20 }}>
          <Button texto={cargo} press={()=>{
            setModal3(true);
            console.log("cargo")}} />
        </View>
  
        <View style={{ display: 'flex', flexDirection: 'row',position:'absolute', bottom:0 }}>
          <Button texto="Agregar" press={()=>{
            if((distrito!='Seleccione un Distrito')&&(nivel!='Selecione un Nivel')&&(cargo!='Seleccione un Cargo')){
           
              console.log("procesando datos...")
              comprobarRepetidos(distrito,nivel,cargo);
             
            }else{
              console.log("NO se guardaron los datos!!!");
              Alert.alert(
                'Error',
                'Debe elegir los filtro antes de guardarlos',
                [
                  {
                    text: 'Aceptar',
                    onPress: () => {
                      
                    },
                  },
                ],
                { cancelable: false }
              );
  
            }
          }}/>
        </View>
  
     
  
  
        <StatusBar style="auto" />
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
  });
  
  
  export default ScreenAgregarFiltro;