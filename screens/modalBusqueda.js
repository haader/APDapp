import React, { useState,useCallback, useEffect } from 'react';
import { View, TextInput, Modal, FlatList, Text, TouchableOpacity,ImageBackground } from 'react-native';
import { fetchData } from '../database';
import Button from '../componentes/Button'

const ModalBusqueda = ({ isVisible, onClose, data ,setVariable, frecuentes, title}) => {

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  // const [frecuencia, setFrecuencia] = useState(frecuentes);
  
  // {console.log("es:" +frecuentes)}

  const handleSearch = text => {
    setSearchText(text);
    const results = data.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(results);
  };

  const Recientes = () => {
    const handlePress = useCallback(
      (item) => {
        setVariable(item);
        onClose();
      },
      [setVariable, onClose]
    );
  
    return (
      
        <FlatList
          data={frecuentes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ margin: 5, borderWidth: 1, borderRadius: 10,backgroundColor:'#b040a8'}}
              onPress={() => handlePress(item)}
            >
              <Text style={{ fontSize: 20, textAlign: 'center',color:'white',color:'#fff',textShadowColor:'black',textShadowRadius:2 }}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={true}
          //  contentContainerStyle={{ }}
        />
      
    );
  };

 

  return (
    <Modal visible={isVisible} onRequestClose={onClose}>

      <View style={{height:'100%',justifyContent:'center',alignContent:'center'}}>
            <ImageBackground source={require('../assets/background.jpg')} style={{ flex: 1,width:'100%',height:'110%',position:'absolute',top:0}}></ImageBackground>  
            
            <Text style={{textAlign:'center',width:'100%',fontSize:30,color:'#fff',textShadowColor:'black',textShadowRadius:2}}>{title}</Text>
             

            <View style={{height:'50%'}}>
                  

                      <FlatList
                        data={searchResults}
                        renderItem={({ item }) => 
                        <TouchableOpacity style={{margin:2,borderWidth:1,borderRadius:10,backgroundColor:'rgba(150,150,150,0.5)'}}
                         onPress={()=>{
                          setVariable(item)
                          onClose();
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

              <Text style={{textAlign:'center',width:'100%',margin:10}}>Puede seleccionar un filtro previo:</Text>

            <View style={{height:'100%',paddingBottom:50,justifyContent:'center',alignContent:'center',flex:1,borderWidth:0}}>

                    <Recientes style={{margin:5}}/>

            </View>



      </View>

      <View style={{justifyContent:'center',alignContent:'center',bottom:0,position:'absolute',width:'100%'}}>
          <Button texto='Cerrar' press={()=>{
                onClose();
            }
          } />
      </View>

    </Modal>
  );
};

export default ModalBusqueda;
