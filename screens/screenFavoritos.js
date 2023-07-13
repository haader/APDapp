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
const [objTarjeta,setObjTarjeta]=useState([{}]);

//array de objeto que contiene los IGE traidos de la tabla tableFavoritos
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

    // setObjTarjeta([{}]);
    
    fetchFav((data) => {
      setIge(data);
      console.log("se envio a Ige: ", JSON.stringify(data));
    
    });
    if (Ige !== undefined) {
        Ige.map((item,index)=>{
            ConsultarPreTarjetas(item.ige,index);
        }
        )    
    }
    
    
    
  }

  const darFormato=(ige)=>{
    //no es necesario comprobar si ige es undefined, hay que revisar donde se usa darFormato
    if (ige !== undefined) {
        let newIGE=ige.replace('.0','');
        return newIGE;
    }
}


const ConsultarPreTarjetas =async(ige,numeroConsulta)=>{
    

    let newIGE=darFormato(ige);//elimina el .0 del ige
    console.log("ige a consultar: "+ige)
    //realizamos la consulta
    fetch('https://servicios3.abc.gob.ar/valoracion.docente/api/apd.oferta.encabezado/select?q=*%3A*&rows=6&sort=finoferta%20desc&json.nl=map&fq=ige%3A'+newIGE+'&wt=json')
    .then(response => response.json())
    .then(data => {

      // Aquí puedes manejar los datos obtenidos en formato JSON
    //   console.log("ConsultarPreTarjetas: /**/")
    //   console.log( data.response.docs[0])
    
      //que datos necesitamos para mostrar
      //estado
      //distrito
      //cargo 
      //domicilio
      //dias y horario
      
      //creamos un objeto que contendra los datos para mostrar en las tarjetas      
      let objFav={"ige":ige,"escuela":'',"estado":"","distrito":"","cargo":"","domicilio":"","lu":"","ma":"","mi":"","ju":"","vi":"","sa":"","supl_desde":"","supl_hasta":""}

      //guardamos los datos en el objeto crado para luego pushearlo
        objFav.estado=data.response.docs[0].estado;
        objFav.escuela=data.response.docs[0].escuela;
        objFav.distrito=data.response.docs[0].descdistrito;
        objFav.cargo=data.response.docs[0].cargo;
        objFav.domicilio=data.response.docs[0].domiciliodesempeno;
        objFav.supl_desde=data.response.docs[0].supl_desde;
        objFav.supl_hasta=data.response.docs[0].supl_hasta;


        //guardamos los dias si son diferentes a "" (string vacio)
        data.response.docs[0].lunes!=""?objFav.lu=data.response.docs[0].lunes:null;
        data.response.docs[0].martes!=""?objFav.ma=data.response.docs[0].martes:null;
        data.response.docs[0].miercoles!=""?objFav.mi=data.response.docs[0].miercoles:null;
        data.response.docs[0].jueves!=""?objFav.ju=data.response.docs[0].jueves:null;
        data.response.docs[0].viernes!=""?objFav.vi=data.response.docs[0].viernes:null;
        data.response.docs[0].sabado!=undefined?data.response.docs[0].sabado!=""?objFav.sa=data.response.docs[0].sabado:null:null;

        //guardamos el objeto en la variable global, pusheandolo

      console.log("objeto fav es: "+JSON.stringify(objFav))

        setObjTarjeta(prevState => {
        const updatedArray = [...prevState];
        updatedArray[numeroConsulta] = objFav;
        return updatedArray;

    
     })

    //console.log("objTarjeta es "+objTarjeta);

    }).catch((error)=>{
        console.log("hubo un error:"+error)
    })

}

const pintarPreTarjetas =(objetoIge,index)=>{

    return(
        <View
    style={[styles.igeTarjeta,{
    backgroundColor: objetoIge.estado=='Publicada'?'rgba(56, 200, 168, 0.20)':'rgba(255, 255, 120, 0.20)',
    borderTopWidth:10,
//    borderTopColor:'#38c8a8'
    borderTopColor:objetoIge.estado=='Publicada'?'rgba(56, 200, 168, 1)':'rgba(255, 255, 120, 1)',
}]}
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
                            deleteFav(objetoIge.ige);
                            actualizar();
                            },
                        },
                        ],
                        { cancelable: false }
                    );
                                
        }}><AntDesign name="closecircleo" size={30} color="red" />
    </TouchableOpacity>
    
    <Text style={styles.estado}>{objetoIge.estado}</Text>
    
        <View style={{display:'flex',flexDirection:'row', marginBottom:10,marginTop:10}}>
                <Text style={styles.headerTarjeta}>{objetoIge.distrito}</Text>
                <Text style={styles.headerTarjeta}>{objetoIge.cargo}</Text>
                {/* <Text style={styles.headerTarjeta}>{darFormato(objetoIge.ige)}</Text> */}
        </View>
    <View style={styles.body}>
        <Text>Escuela: {objetoIge.escuela}</Text>
        <Text>Domicilio: {objetoIge.domicilio}</Text>
    <Text style={{fontWeight:400}}>suplencia desde: {darFormatoTime(objetoIge.supl_desde)}</Text>
    <Text style={{fontWeight:400}}>suplencia hasta: {darFormatoTime(objetoIge.supl_hasta)}</Text>
    
    <View style={{borderTopColor:'#ccc',borderBottomColor:'#ccc',display:'flex',flexDirection:'column',borderTopWidth:2,borderBottomWidth:2,borderBottomColor:'gray',borderTopColor:'gray',marginTop:10,paddingTop:10,paddingBottom:10}}>
            {objetoIge.lu !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>lunes: {objetoIge.lu}</Text></View> : null}
            {objetoIge.ma !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>martes: {objetoIge.ma}</Text></View> : null}
            {objetoIge.mi !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>miercoles: {objetoIge.mi}</Text></View> : null}
            {objetoIge.ju !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>jueves: {objetoIge.ju}</Text></View> : null}
            {objetoIge.vi !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>viernes: {objetoIge.vi}</Text></View> : null}
            {objetoIge.sa !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>sabado: {objetoIge.sa}</Text></View> : null}

        </View>
    </View>
    <TouchableOpacity style={[styles.btn,{position:'absolute',bottom:0,width:'100%'}]} onPress={()=>{Ver(objetoIge.ige)}}><AntDesign name="eye" size={24} color="black" /></TouchableOpacity>
</View>

    )
}

const renderizarTarjetas = ({ objTarjeta }) => {
    if (objTarjeta[0].ige != undefined ) {

        console.log("objTarjeta es mayor a cero!!!: "+JSON.stringify(objTarjeta))
      
        const igeComponents = objTarjeta.map((item, index) => {
        return(
        <View key={index}>
            {pintarPreTarjetas(item, index)}
        </View>
        )
      });
  
      return <View>{igeComponents}</View>;
    }else{
        
    }
  
    
  };


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
            
        
            <View>
                    {objTarjeta[0].ige != undefined && renderizarTarjetas({ objTarjeta })}
            </View>



           
            </ScrollView>
            
            <CartelVacio />

            <Button texto='Actualizar' press={()=>{actualizar()}}/>
            
            
            <Modal visible={viewModal} onRequestClose={closeModal}>
                <ImageBackground source={require('../assets/background.jpg')} style={{ flex: 1,width:'100%',height:'110%',position:'absolute',top:'-10%'}}></ImageBackground>  
                <Tarjeta miarray={array}/>
                <TouchableOpacity style={{width:'100%',alignItems:'center'}} onPress={closeModal}><AntDesign name="closecircleo" size={50} color="red" /></TouchableOpacity>
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
        paddingBottom:20,
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        
    },headerTarjeta:{
        fontSize:13,
        fontWeight:300,
        marginLeft:10,
        marginRight:10,
    },estado:{
        textAlign:'center',
        fontSize:25,
        fontWeight:300
    },body:{
        margin:20
    }
})

export default ScreenFavoritos;