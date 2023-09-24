

                
import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('misCursos.db');

//TABLA ASISTENCIA ALUMNOS
//crea la tabla
export const initAsistencia=(token)=>{
    db.transaction((tx)=>{
            tx.executeSql(`
                    CREATE TABLE IF NOT EXISTS asistencia_${token} 
                    (id INTEGER PRIMARY KEY, 
                    FOREIGN KEY (id_alumno)
                    REFERENCES listaAlumnos_${token} (id))`,[],()=>{
                            tx.executeSql(
                                    `INSERT INTO asistencia_${token}
                                            (id_alumno, estado) SELECT id,
                                            '' FROM listaAlumnos_${token}`,
                                    [],
                                    () => {}
                                    );
                    })
    })
}
export const addDiaAsistencia=(token,dia)=>{
    
    const currentDate = dia == null ? new Date().toISOString().split('T')[0] : dia;

            db.transaction((tx)=>{
                    tx.executeSql(`ALTER TABLE asistencia_${token}
                    ADD COLUMN ${currentDate} BOOLEAN DEFAULT true;
                    `,[],()=>{})
            })
}

export const boleanoFalseAsistencia=(token, fecha, id_alumno)=>{
//                const currentDate = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'               
            db.transaction((tx)=>{
                    tx.executeSql(`
                    UPDATE asistencia_${token} 
                    SET ${fecha} = 0 
                    WHERE id_alumno = ${id_alumno}`
                    ,[],()=>{})
            })
}

export const boleanoTrueAsistencia=(token, fecha, id_alumno)=>{
    //                const currentDate = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'               
                            db.transaction((tx)=>{
                                    tx.executeSql(`
                                    UPDATE asistencia_${token} 
                                    SET ${fecha} = 1 
                                    WHERE id_alumno = ${id_alumno}`
                                    ,[],()=>{})
                            })
            }
