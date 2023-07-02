import React from 'react';
import { View, Text, Button,StyleSheet, Linking,ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { AntDesign } from '@expo/vector-icons';




export default function Tarjeta({miarray}){

    const openURL = async (oferta,detalle) => {
    
            const url =`https://misservicios.abc.gob.ar/actos.publicos.digitales/postulantes/?oferta=${oferta}&detalle=${detalle}`;
        
        
            const supported = await Linking.canOpenURL(url);

            if (supported) {
            await Linking.openURL(url);
            } else {
            console.log(`No se puede abrir la URL: ${url}`);
            }
      }
    
    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text);
      };

      const guardar=(distrito,cargo,domicilio,ige)=>{
        
        Alert.alert(
            'Estado',
            'Se Guardo en favoritos',
            [
              {
                text: 'Aceptar',
                onPress: () => {
                    insertFav(distrito,cargo,domicilio,ige);
                    
                },
              },
            ],
            { cancelable: false }
          );
      };

      const darFormato = (string) => {
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

    return (
        <ScrollView style={{height:'50%',borderWidth:1,margin:5,borderRadius:10}}>
          
            <View style={{backgroundColor:'white',borderTopColor:'#38c8a8',borderTopWidth:10,borderRadius:10}}>
                  
            <TouchableOpacity style={[styles.row,styles.publicada]} onPress={()=>{openURL(miarray.idoferta,miarray.iddetalle)}}>
            
            <Text style={{width:'80%',textAlign:'center'}}>{miarray.estado}</Text>
            <AntDesign name="bars" size={24} color="black" />
        
        </TouchableOpacity>    
        
        <View style={{marginLeft:20}}>
            
            <TouchableOpacity style={styles.row} onPress={()=>copyToClipboard(miarray.escuela)}>
                <Text style={{fontWeight:600}}>{miarray.escuela}</Text>
                <Text>&#40;</Text>
                <AntDesign name="copy1" size={18} color="black" />
                <Text>&#41;</Text>
            </TouchableOpacity>

            <Text style={{fontSize:20,color:'#b040a8'}}>{miarray.cargo}</Text>
            <View style={styles.row}>
            <Text style={{fontWeight:600}}>Cierre de oferta: </Text>
                <Text style={{fontSize:20,color:'#b040a8'}}>{darFormato(miarray.finoferta)}</Text>
            </View>      
        </View>
      
      
        
      
      <View style={[styles.row,styles.bordeSuave,{borderTopWidth:1,borderBottomWidth:1,padding:10,margin:10}]}>
                
                <TouchableOpacity style={styles.column} onPress={()=>copyToClipboard(miarray.ige)}>
                    <Text>IGE</Text>
                    <Text style={{fontSize:18,color:'#b040a8'}}>{miarray.ige}&#40;<AntDesign name="copy1" size={18} color="black" />&#41;</Text>
                </TouchableOpacity>
                
                <View style={styles.column}>
                    
                    <Text>AREA</Text>
                    <Text style={{fontSize:18,color:'#b040a8'}}>{miarray.areaincumbencia}</Text>          
                    
                </View>
                <View style={styles.column}>
                    <Text>NIVEL</Text>
                    <Text style={{fontSize:18,color:'#b040a8'}}>{miarray.descnivelmodalidad}</Text>  
                </View>
                    
      </View>
      
      <View style={{marginLeft:20}}>    
                {/* <Text>nivelmodalidad: {miarray.nivelmodalidad}</Text> */}
                
                <View style={{display:'flex',flexDirection:'row'}}><AntDesign name="enviromento" size={15} color="black" /><Text style={{fontWeight:600}}>Distrito: {miarray.descdistrito}</Text></View>
                
                <TouchableOpacity style={styles.row}  onPress={()=>copyToClipboard(miarray.domiciliodesempeno)}>
                    <Text style={{fontWeight:600}}>Domicilio : </Text>
                    <Text>{miarray.domiciliodesempeno}&#40;<AntDesign name="copy1" size={18} color="black" />&#41;</Text>
                </TouchableOpacity>
                    
                
                <View style={{display:'flex',flexDirection:'row'}}><AntDesign name="idcard" size={24} color="black" /><Text>curso division: {miarray.cursodivision}</Text></View>
                <View style={{display:'flex',flexDirection:'row'}}><AntDesign name="idcard" size={24} color="black" /><Text>directivo a cargo: {miarray.acargodireccion}</Text></View>
                
                
                {/* <Text>descripcionarea: {miarray.descripcionarea}</Text>
                <Text>descripcioncargo: {miarray.descripcioncargo}</Text> */}
                
                <Text>hs modulos: {miarray.hsmodulos}</Text>
                <Text>inicio de oferta: {darFormato(miarray.iniciooferta)}</Text>
                {/* <Text>id: {miarray.id}</Text>
                <Text>iddetalle: {miarray.iddetalle}</Text>
                <Text>idoferta: {miarray.idoferta}</Text> */}
                
                {/* <Text>infectocontagiosa: {miarray.infectocontagiosa}</Text>
                <Text>turno: {miarray.turno}</Text>
                <Text>jornada: {miarray.jornada}</Text> */}

      </View>
      
        <View style={[styles.bordeSuave,{display:'flex',flexDirection:'column',borderTopWidth:1,borderBottomWidth:1,padding:10,margin:10}]}>
            {miarray.lunes !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>lunes: {miarray.lunes}</Text></View> : null}
            {miarray.lunes !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>martes: {miarray.martes}</Text></View> : null}
            {miarray.lunes !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>miercoles: {miarray.miercoles}</Text></View> : null}
            {miarray.lunes !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>jueves: {miarray.jueves}</Text></View> : null}
            {miarray.lunes !== '' ?<View style={{display:'flex',flexDirection:'row'}}><AntDesign name="clockcircleo" size={15} color="black"/><Text style={{fontWeight:600}}>viernes: {miarray.viernes}</Text></View> : null}

        </View>

        <View style={{marginLeft:20}}>
                <Text style={{fontWeight:600}}>suplencia desde: {darFormato(miarray.supl_desde)}</Text>
                <Text style={{fontWeight:600}}>suplencia hasta: {darFormato(miarray.supl_hasta)}</Text>
        </View>
      
      <View style={[styles.bordeSuave,{display:'flex',flexDirection:'column',borderTopWidth:1,borderBottomWidth:1,padding:10,margin:10}]}>
            <Text>tomaposesion: {darFormato(miarray.tomaposesion)}</Text>
            <Text>supl_revista: {miarray.supl_revista}</Text>
      
            {/* <Text>numdistrito: {miarray.numdistrito}</Text> */}
      
            <Text>observaciones: {miarray.observaciones}</Text>
      </View>
      

{/* remplazando a */}
      {/* <Text>reemp_apeynom: {miarray.reemp_apeynom}</Text> */}
      {/* <Text>reemp_cuil: {miarray.reemp_cuil}</Text> */}
      {/* <Text>reemp_motivo: {miarray.reemp_motivo}</Text> */}
      
      
      
      {/* <Text>timestamp: {miarray.timestamp}</Text> */}
      {/* <Text>tipooferta: {miarray.tipooferta}</Text>
      <Text>tipooferta_id: {miarray.tipooferta_id}</Text>
      <Text>ult_movimiento: {miarray.ult_movimiento}</Text>
       */}
        {/* <View style={{width:'100%',alignContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{guardar(miarray.descdistrito,miarray.cargo,miarray.domiciliodesempeno,miarray.ige)}}>
                
                <AntDesign name="star" size={40} color={'black'} />

            </TouchableOpacity>
        </View> */}
       
            </View>

          </ScrollView>
      );
 
}

const  styles=StyleSheet.create({
    row:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    column:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'33%'
    },
    publicada:{
        display:'flex',
        alignItems:'stretch',
        textAlign:'center',
        borderRadius:10,
        borderWidth:1,
        margin:5,
        paddingBottom:5,
        paddingTop:5,
        backgroundColor:'#d4edda',
        borderColor:'#c3e6cb',
        color:'#155724'
        
    },
    bordeSuave:{
        borderTopColor:'#ccc',
        borderBottomColor:'#ccc'
    }
})