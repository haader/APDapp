
import React, { useEffect} from 'react';
import { View,Text } from 'react-native';


import { NavigationContainer, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//IMPORTAMOS LAS VENTANAS
import ScreenTablas from './screens/ScreenTablas';
import ScreenFavoritos from './screens/screenFavoritos'
import ScreenAgregarFiltros from './screens/screenAgregarFIltro'
import ScreenMisCursos from './screens/MisCursos/screenMisCursos'
//IMPORTAMOS LOS COMANDOS DE LA BASE DE DATOS
import { initDatabase } from './database';
//iconos
import { AntDesign } from '@expo/vector-icons';
import { initMisCursos } from './screens/MisCursos/databaseMisCursos';

export default function App() {


  // arrays de los datos de seleccion traidos por la app
 
  useEffect(()=>{

    //realizamos los comandos de la database
    initDatabase(); // Inicializar la base de datos al cargar el componente
    initMisCursos();
    initTokesMisCursos();

  },[])

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({route})=>({
        headerTitle: () => (
          <View style={{alignItems:'center'}}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>APD-app</Text>
            <Text style={{ fontSize: 10, fontWeight: '200', color: 'black' }}>Actos Publicos Digitales-</Text>
            
          </View>
        )
      })
        
    }>

        <Tab.Screen name="Mis Cursos" component={ScreenMisCursos} options={
                {
                  headerShown:true,
                  tabBarIcon:({color='black', size=24 })=>{
                    <AntDesign name='staro' size={size} color={color}/>
                  }
                }
              }/>


        <Tab.Screen name="Buscar"  component={ScreenTablas} options={{
          headerShown:true,
          tabBarIcon: ({ color='black', size=24 }) => (
            <AntDesign name="search1" size={size} color={color} />
          )
        }} />

        <Tab.Screen name="Agregar Filtros" component={ScreenAgregarFiltros} options={{
          headerShown:true,
          tabBarIcon:({color='black', size=24 })=>(
           <AntDesign name="filter" size={size} color={color} />
          )}} />


      <Tab.Screen name="Favoritos" component={ScreenFavoritos} options={{
          headerShown:true,
          tabBarIcon:({ color='black', size=24 })=>(
            <AntDesign name="staro" size={size} color={color} />
          )
        }}/>

     

       

       
      </Tab.Navigator>
    </NavigationContainer>
  );
}



//estoy realizando una app conexpo y react native necesito realizar un navigate tipo tabs