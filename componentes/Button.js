import React from 'react';
import {StyleSheet,Text,TouchableOpacity} from 'react-native'

export default button=({texto,press})=>{
    return(
        <TouchableOpacity style={styles.button} onPress={press}>
            <Text style={styles.buttonText}>{texto}</Text>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
button: {
    // Agrega tus estilos personalizados aquí, por ejemplo:
    width:'100%',
    backgroundColor: '#b040a8',
    padding: 10,
    borderRadius: 5,
    },
buttonText:{
    fontSize: 18,
    textAlign:'center',
    color:'#fff',
    textShadowColor:'black',
    textShadowRadius:2
    }
}
)

