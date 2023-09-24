import { Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('misCursos.db');

//CRUD PARA LAS TAREAS INTITUCIONALES DOCENTES 

//init
export const INITtareasInstitucionales=(token)=>{
    db.transaction((tx)=>{
        tx.executeSql(`CREATE TABLE IF NOT EXISTS tareasInstitucionales_${token}
        (id INTEGER PRIMARY KEY AUTOINCREMENT, tarea TEXT, fecha TEXT, estado BOOLEAN)`,[],()=>{})
    })
}

//add
export const ADDtareasInstitucionales = (token, tarea, estado) => {
    const fecha = new Date(); // OBTENEMOS LA FECHA ACTUAL FORMATO DD/MM/YYYY
    const fechaFormateada = fecha.toLocaleDateString('es-ES'); // Formatear la fecha
  
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO tareasInstitucionales_${token} (tarea, fecha, estado) VALUES (?, ?, ?)`,
        [tarea, fechaFormateada, estado],
        (tx, result) => {
          if (result.rowsAffected > 0) {
            Alert.alert('Atención', 'Se guardó la tarea institucional correctamente', [
              { text: 'OK', onPress: () => {} }
            ]);
          } else {
            Alert.alert('Error', 'No se guardó la tarea institucional', [{ text: 'OK', onPress: () => {} }]);
          }
        }
      );
    });
  };
  


//fetch

export const FETCHtareasInstitucionales = (token, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tareasInstitucionales_${token}`,
        [],
        (tx, result) => {
          callback(result.rows);
        }
      );
    });
  };
  

//update

export const updateTAREAtareaInstitucional = (token, id, tarea) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE tareasInstitucionales_${token} SET tarea = ? WHERE id = ?`,
        [tarea, id],
        (tx, result) => {
          if (result.rowsAffected > 0) {
            Alert.alert('Atención', 'La tarea institucional se actualizó correctamente', [
              { text: 'OK', onPress: () => {} }
            ]);
          } else {
            Alert.alert('Error', 'No se pudo actualizar la tarea institucional', [
              { text: 'OK', onPress: () => {} }
            ]);
          }
        }
      );
    });
  };



//update BOLEANO

export const updateBOLEANOtareaInstitucional = (token, id, estado) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE tareasInstitucionales_${token} SET  estado = ? WHERE id = ?`,
        [estado, id],
        (tx, result) => {
          if (result.rowsAffected > 0) {
         console.log("-cambio de estado")
          } else {
            console.error("-NO se cambio el estado")
          }
        }
      );
    });
  };
  

//delete


export const DELETEtareaInstitucional = (token, id) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM tareasInstitucionales_${token} WHERE id = ?`,
        [id],
        (tx, result) => {
          if (result.rowsAffected > 0) {
            Alert.alert('Atención', 'La tarea institucional se eliminó correctamente', [
              { text: 'OK', onPress: () => {} }
            ]);
          } else {
            Alert.alert('Error', 'No se pudo eliminar la tarea institucional', [
              { text: 'OK', onPress: () => {} }
            ]);
          }
        }
      );
    });
  };
  

