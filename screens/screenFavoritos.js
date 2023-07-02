import {useFocusEffect } from '@react-navigation/native';
import { useEffect,useState } from 'react';
import { Alert, View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity,ImageBackground } from 'react-native';
//importamos los iconos
import { AntDesign } from '@expo/vector-icons';
import Button from '../componentes/Button'
//traemos la funcion de la base de datos para eliminar
import { fetchFav,deleteFav } from '../database';
//importamos la tarjeta
import Tarjeta from './tarjeta';




const ScreenFavoritos = () => {

const [array,setArray]=useState([{}]);
const [Ige,setIge]=useState([{}]);
const [viewModal,setViewModal]=useState(false);

useEffect(()=>{
    actualizar();
},[])

const closeModal=()=>{
    setViewModal(false);
}

const darFormatoTime = (string) => {
    const fechaHora = new Date(string);
    const dia = fechaHora.getUTCDate();
    const mes = fechaHora.getUTCMonth() + 1;
    const anio = fechaHora.getUTCFullYear();
    const horas = fechaHora.getUTCHours();
    const minutos = fechaHora.getUTCMinutes();
  
    const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${anio}`;
    const horaFormateada = `${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos} hs`;
  
    return(fechaFormateada+" "+(horaFormateada=='00:00 hs'?'':horaFormateada));
  };

const actualizar=()=>{
    console.log("Ige: "+Ige.length)
    
    fetchFav((data) => {
        console.log("favoritos: ", JSON.stringify(data));

      setIge(data);
    
    });
  }

  const darFormato=(ige)=>{
    if (ige !== undefined) {
        let newIGE=ige.replace('.0','');
        return newIGE;
    }
}

const Ver=(ige)=>{
    
    let newIGE=darFormato(ige);
    //realizamos la consulta
    fetch('https://servicios3.abc.gob.ar/valoracion.docente/api/apd.oferta.encabezado/select?q=*%3A*&rows=6&sort=finoferta%20desc&json.nl=map&fq=ige%3A'+newIGE+'&wt=json')
    .then(response => response.json())
    .then(data => {
      // Aquí puedes manejar los datos obtenidos en formato JSON
      setArray(data.response.docs[0]);
    })
    //introducimos los datos a un modal para exponerlos
    setViewModal(true);

}

const igeComponents = Ige.map((item, index) => (
<View
    style={styles.igeTarjeta}
    key={index}
    // onPress={() => {verFavorito(item.iges)}}
>
    <TouchableOpacity style={{position:'absolute',right:0,zIndex:10}} onPress={()=>{
                    console.log("press eliminar")
                    Alert.alert(
                        'Confirmación',
                        '¿Estás seguro de que deseas eliminarlo?',
                        [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                        {
                            text: 'Aceptar',
                            onPress: () => {                  
                            //acciones si se acepta
                            deleteFav(item.id);
                            actualizar();
                            },
                        },
                        ],
                        { cancelable: false }
                    );
                                
        }}><AntDesign name="closecircleo" size={30} color="red" />
    </TouchableOpacity>

    <Text>Cargo: {item.cargo}</Text>
    <Text>Distrito: {item.distrito}</Text>
    <Text>Ige: {darFormato(item.iges)}</Text>
    <Text>Domicilio: {item.domicilio}</Text>
    <Text style={{fontWeight:600}}>suplencia desde: {darFormatoTime(item.supl_desde)}</Text>
    <Text style={{fontWeight:600}}>suplencia hasta: {darFormatoTime(item.supl_hasta)}</Text>
    
    <View style={{borderTopColor:'#ccc',borderBottomColor:'#ccc',display:'flex',flexDirection:'column',borderTopWidth:1,borderBottomWidth:1,padding:10,margin:10}}>
            {item.lunes !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>lunes: {item.lunes}</Text></View> : null}
            {item.martes !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>martes: {item.martes}</Text></View> : null}
            {item.miercoles !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>miercoles: {item.miercoles}</Text></View> : null}
            {item.jueves !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>jueves: {item.jueves}</Text></View> : null}
            {item.viernes !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>viernes: {item.viernes}</Text></View> : null}
            {item.sabado !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>sabado: {item.sabado}</Text></View> : null}

        </View>
    <TouchableOpacity style={[styles.btn,{position:'absolute',bottom:0,width:'100%'}]} onPress={()=>{Ver(item.iges)}}><AntDesign name="eye" size={24} color="black" /></TouchableOpacity>
</View>
));

const CartelVacio = () => {
    if (Ige.length == 0) {
        console.log("entro a A")
      
        return (
            <View style={{height:'90%',justifyContent:'center'}}>
                <Text style={{ textAlign: 'center', fontSize: 20, backgroundColor:'#b040a8',padding:5,borderRadius:10,color:'rgb(255,255,255)',textShadowColor:'black',textShadowRadius:2}}>
                    Debes guardar cargos en favoritos
                </Text>
                
            </View>
            
          );
    } else {
        console.log("entro a B")
      return null; // o cualquier otro contenido que desees mostrar
    }
  };

    return(
        <View style={{height:'100%',alignContent:'center',alignItems:'center',paddingTop:30}}>
            <ImageBackground source={require('../assets/background.jpg')} style={{ flex: 1,width:'100%',height:'100%',position:'absolute',top:0}}></ImageBackground>  
            {/* <View style={styles.centro}>
                <Text style={{width:'100%',textAlign:'center'}}>pantalla favoritos</Text>
            </View> */}
            {/* <ScrollView style={{alignItems:'center'}}> */}
            <ScrollView style={{width:'100%',padding:10}}>
            
                {igeComponents}
           
            </ScrollView>
            
            <CartelVacio />

            <Button texto='Actualizar' press={()=>{actualizar()}}/>
            
            
            <Modal visible={viewModal} onRequestClose={closeModal}>
                <Tarjeta miarray={array}/>
                <TouchableOpacity style={{width:'100%',alignItems:'center'}} onPress={closeModal}><AntDesign name="closecircleo" size={50} color="black" /></TouchableOpacity>
            </Modal>
        
        </View>
    
    )

};
const styles=StyleSheet.create({
    btn:{
        backgroundColor:'#b040a8',
        borderWidth:1,
        borderRadius:10,
        alignItems:'center'
    },igeTarjeta:{
        width: '95%',
        height: 125,
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderTopWidth:5,
        borderTopColor:'#38c8a8'
    }
})

export default ScreenFavoritos;