
import React, { useEffect} from 'react';


import { NavigationContainer, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//IMPORTAMOS LAS VENTANAS
import ScreenTablas from './screens/ScreenTablas';
import ScreenFavoritos from './screens/screenFavoritos'
import ScreenAgregarFiltros from './screens/screenAgregarFIltro'
//IMPORTAMOS LOS COMANDOS DE LA BASE DE DATOS
import { initDatabase } from './database';
//iconos
import { AntDesign } from '@expo/vector-icons';

export default function App() {


  // arrays de los datos de seleccion traidos por la app
 
  useEffect(()=>{

    //realizamos los comandos de la database
    initDatabase(); // Inicializar la base de datos al cargar el componente

  },[])

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>

        <Tab.Screen name="Agregar Filtros" component={ScreenAgregarFiltros} options={{
          headerShown:false,
          tabBarIcon:({color='black', size=24 })=>(
           <AntDesign name="filter" size={size} color={color} />
          )}} />
        
        <Tab.Screen name="Buscar"  component={ScreenTablas} options={{
          headerShown:false,
          tabBarIcon: ({ color='black', size=24 }) => (
            <AntDesign name="search1" size={size} color={color} />
          )
        }} />


      <Tab.Screen name="Favoritos" component={ScreenFavoritos} options={{
          headerShown:false,
          tabBarIcon:({ color='black', size=24 })=>(
            <AntDesign name="staro" size={size} color={color} />
          )
        }}/>


       

       
      </Tab.Navigator>
    </NavigationContainer>
  );
}



//estoy realizando una app conexpo y react native necesito realizar un navigate tipo tabs