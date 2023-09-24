import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('misCursos.db');

//TABLAS DELISTA DE ALUMNOS
                export const initListaAlumnos=(token)=>{
                        db.transaction((tx)=>{
                                tx.executeSql(`CREATE TABLE IF NOT EXISTS 
                                                listaAlumnos_${token} 
                                                (id INTEGER PRIMARY KEY, 
                                                apellido text, nombres text, 
                                                dni text, 
                                                descripcion text, 
                                                icono text)`,[],(obj,result)=>{})

                        })
                }
                