import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('mydatabase.db');

export const initDatabase = () => {
    console.log("conectando con la data base");
  database.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS tableFiltros (id INTEGER PRIMARY KEY AUTOINCREMENT, distrito TEXT, nivel TEXT, cargo TEXT)'
    );
    //tx.executeSql('DROP TABLE IF EXISTS tableFavoritos');
     tx.executeSql(
       'CREATE TABLE IF NOT EXISTS tableFavoritos (id INTEGER PRIMARY KEY AUTOINCREMENT, ige TEXT)' 
     );
  });
};


//FUNCIONES PARA LA TABLA DE LOS FAVORITOS
      export const insertFav=(ige)=>{
        database.transaction((tx)=>{
          tx.executeSql('INSERT INTO tableFavoritos (ige) values  (?)', [ige])
        })
        console.log("se guardaron los datos, iges:"+ige);
      }

      export const deleteFav=(ige)=>{
        database.transaction((tx)=>{
          tx.executeSql('DELETE FROM tableFavoritos WHERE ige = ?', [ige]);
        })
      }


      export const fetchFav = (callback) => {
        database.transaction((tx) => {
          tx.executeSql('SELECT * FROM tableFavoritos', [], (_, { rows }) => {
            callback(rows._array);
            
          });
        });
      };





//FUNCIONES PARA LA TABLA DE LOS FILTROS
export const insertFiltro = (dis, niv, car) => {
  database.transaction((tx) => {
    tx.executeSql('INSERT INTO tableFiltros (distrito,nivel,cargo) VALUES (?,?,?)', [dis,niv,car]);
  });
};

export const deleteRow = (id) => {
    database.transaction((tx) => {
      tx.executeSql('DELETE FROM tableFiltros WHERE id = ?', [id]);
    });
    console.log("se elimino "+id)
  }

export const deleteRowsWhere = (dis) => {
    database.transaction((tx) => {
      tx.executeSql('DELETE FROM tableFiltros WHERE distrito = ?', [dis]);
    });
    console.log("se eliminaron las filas cuando distrito: "+dis)
  }

  export const copyDistrito = (disActual, newDis) => {
    database.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tableFiltros (distrito, nivel, cargo) SELECT ?, nivel, cargo FROM tableFiltros WHERE distrito = ?',
        [newDis, disActual]
      );
    });
    console.log('Se copiaron y reemplazaron las filas para el distrito: ' + newDis);
  };
  
  

export const fetchData = (callback) => {
  database.transaction((tx) => {
    tx.executeSql('SELECT * FROM tableFiltros', [], (_, { rows }) => {
      callback(rows._array);
      
    });
  });
};
