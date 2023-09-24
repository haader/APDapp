import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { INITtareasInstitucionales } from './componentesModal/databaseComponentesModal/tareasInstitucionalesDocentesDB/INITtareasInstitucionales';

const db = SQLite.openDatabase('misCursos.db');



//CREAMOS TABLAS DE TOKES
                        export const initTokesMisCursos=()=>{ 
                                db.transaction((tx)=>{
                                tx.executeSql(
                                //'DROP TABLE IF EXISTS tokesMisCursos',
                                'CREATE TABLE IF NOT EXISTS tokenMisCursos (id INTEGER PRIMARY KEY, token INTEGER)',
                                                [],(_,rows)=>{if(rows.rowsAffected>0){console.log('se creo correctamente la tabla tokensMisCursos')}},(error)=>{console.error(error);})
                                        }) 
                                }
                        export const fetchTokens=(callback)=>{
                                db.transaction((tx)=>{
                                        tx.executeSql('SELECT token FROM tokenMisCursos ',
                                        [],(_,{rows})=>{callback(rows._array)})})
                        }
                        export const addToken=(token)=>{
                                db.transaction((tx)=>{
                                        tx.executeSql(
                                                'INSERT INTO tokenMisCursos (token) VALUES (?)',[token],
                                                (obj,result)=>{if(resultSet.rowsAffected>0){
                                                        console.log(result)
                                                }}
                                        )
                                })
                        }
                        export const deleteToken=()=>{
                                db.transaction((tx)=>{
                                        tx.executeSql('DELETE FROM tokenMisCursos WHERE token = ?',[token],
                                        (obj,result)=>{})
                                })
                        }



//iniciamos la tabla mis cursos

export const initMisCursos=()=>{ 
        db.transaction((tx)=>{
            tx.executeSql(
//'DROP TABLE IF EXISTS misCursos',
'CREATE TABLE IF NOT EXISTS misCursos (id INTEGER PRIMARY KEY, token INTEGER, dia TEXT, horaInicio TEXT, minutosInicio TEXT, horaFin TEXT, minutosFin TEXT, establecimiento TEXT, materia TEXT, desde TEXT, hasta TEXT)',
                [],(_,rows)=>{if(rows.rowsAffected>0){console.log('se creo correctamente la tabla misCursos')}},(error)=>{console.error(error);})
        })
}

// dia,
// horaInicio, 
// horaFin, 
// establecimiento, 
// materia, 
// desde, 
// hasta,

//CRUD
export const addMisCursos=(token,dia,horaInicio,minutosInicio,horaFin,minutosFin,escuela,materia,desde,hasta)=>{
        console.log("entro")
        db.transaction((tx)=>{
        tx.executeSql(`INSERT INTO misCursos (
                token,
                dia,
                horaInicio, 
                minutosInicio, 
                horaFin,
                minutosFin, 
                establecimiento, 
                materia, 
                desde, 
                hasta
                ) VALUES (?,?,?,?,?,?,?,?,?,?)`,[token,dia,horaInicio,minutosInicio,horaFin,minutosFin,escuela,materia,desde,hasta],
                (_,rows)=>{
                        if(rows.rowsAffected>0){
                                
                                INITtareasInstitucionales(token)
                                
                                Alert.alert("Atención",'el curso se guardo correctamente',[{
                                        text:'ok',
                                        onPress:()=>{}
                                                        }])
                                                }
                          },(error)=>{console.log(error)}
                )

        })
}

export const fetchMisCursos =(callback)=>{
        db.transaction((tx)=>{
                tx.executeSql('SELECT * FROM misCursos ',
                [],(_,{rows})=>{callback(rows._array)})})
}


export const updateMisCursos=(id)=>{
        db.transaction((tx)=>{
                tx.executeSql('UPDATE misCursos set value WHERE id = ?',[id],(txObj,resultSet)=>{
                        if(resultSet.rowsAffected>0){
                                Alert.alert('Atención','los datos fueron editados correctamente',[{text:'ok',onPress:()=>{}}])
                        }else{
                                Alert.alert('Error','los datos NO fueron editados correctamente',[{text:'ok',onPress:()=>{}}])
                        }
                },(Error)=>console.error('ocurrio un error al EDITAR:',Error))
        }) 
}

export const deleteMisCursos=(id)=>{
        db.transaction((tx)=>{
                tx.executeSql('DELETE * FROM misCursos WHERE id = ?',[id],(txtObj,resultSet)=>{
                        if(resultSet.rowsAffected>0){
                                Alert.alert("Atención","Se eliminaron los datos correctamente",[{text:"ok",onPress:()=>{}}])
                        }else{
                                Alert.alert("Error","NO se eliminaron los datos correctamente",[{text:"ok",onPress:()=>{}}])

                        }
                })
        },(error)=>{console.error('ocurrio un error al eliinar los datos',error)})
}