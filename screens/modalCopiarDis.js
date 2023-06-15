import React, { useState,useCallback, useEffect } from 'react';
import { View, TextInput, Modal, FlatList, Text, TouchableOpacity,ImageBackground } from 'react-native';
import { copyDistrito } from '../database';
import Button from '../componentes/Button'

const ModalCopiarDis=({isVisible,onClose,distritoSelect,actualizar})=>{

    const [nombresDis,setNombresDis]=useState([]);
    const [searchResults,setSearchResults]=useState([]);
    const [searchText,setSearchText]=useState('');
    const [selectToCopy,setSelectToCopy]=useState('');

    useEffect(()=>{
        TraerDatosDistrito();
    },[])


    const TraerDatosDistrito=()=>{
        fetch('https://servicios3.abc.gob.ar/valoracion.docente/api/apd.oferta.encabezado/select?rows=0&facet=true&facet.limit=-1&facet.mincount=1&json.nl=map&facet.field=descdistrito&q=*:*&wt=json')
        .then(response => response.json())
        .then(data => {
          // Aquí puedes trabajar con los datos de la respuesta
          let listaDistrito=data.facet_counts.facet_fields.descdistrito;
          var arrayListaDistrito=Object.keys(listaDistrito);
      
          setNombresDis(arrayListaDistrito);
          //console.log(arrayListaDistrito)
          
      console.error("trayendo nombres de los distritos");
        })
        .catch(error => {
          // Manejo de errores
          console.error(error);
        });
      
      }

    //pedimos los nombres de todos los distritos
    
  const handleSearch = text => {
    setSearchText(text);
    const results = nombresDis.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(results);
  };

 
const procesoCopiar=(isActual, newDis)=>{
    copyDistrito(isActual, newDis);
    actualizar();
    onClose();
}

 
  return (
    <Modal visible={isVisible} onRequestClose={onClose}>

      <View style={{height:'100%',justifyContent:'center',alignContent:'center'}}>
            <ImageBackground source={require('../assets/background.jpg')} style={{ flex: 1,width:'100%',height:'110%',position:'absolute',top:0}}></ImageBackground>  
            
            <Text style={{textAlign:'center',width:'100%',fontSize:30,color:'#fff',textShadowColor:'black',textShadowRadius:2}}>Copiar de {distritoSelect}</Text>
             

            <View style={{height:'50%'}}>
                  

                      <FlatList
                        data={searchResults}
                        renderItem={({ item }) => 
                        <TouchableOpacity style={{margin:2,borderWidth:1,borderRadius:10,backgroundColor:'rgba(150,150,150,0.5)'}}
                         onPress={()=>{
                          setSearchResults([])  
                          setSelectToCopy(item)

                        }}>
                          <Text style={{fontSize:20,textAlign:'center'}}>{item}</Text>
                          
                          </TouchableOpacity>}
                        keyExtractor={(_, index) => index.toString()}
                        inverted={true}
                
                      />

                      <TextInput
                        placeholder="Buscar"
                        value={searchText}
                        onChangeText={handleSearch}
                        style={{width:'100%',height:50,fontSize:20,textAlign:'center',borderWidth:2,borderRadius:10,backgroundColor:'rgba(12,12,12,0.5)'}}
                      />

            </View>

              <Text style={{fontSize:25, textAlign:'center',width:'100%',margin:10}}>se creara una nueva tabla {selectToCopy} con los filtros de {distritoSelect}</Text>

           



      </View>

      <View style={{justifyContent:'center',alignContent:'center',bottom:50,position:'absolute',width:'100%',marginBottom:10}}>
            <Button texto='Copiar' press={()=>{
                
              procesoCopiar(distritoSelect,selectToCopy);  
                onClose();
            }
          } />
          
    </View>
    
      <View style={{justifyContent:'center',alignContent:'center',bottom:0,position:'absolute',width:'100%'}}>
          
          <Button texto='Cancelar' press={()=>{
                onClose();
            }
          } />
      </View>

    </Modal>
  );
};

export default ModalCopiarDis;
