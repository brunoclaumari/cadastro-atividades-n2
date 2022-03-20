import * as SQLite from "expo-sqlite";

// variaveis usadas nas querys
let tabela = "tbAtividade";

export function getDbConnection() {
  const cx = SQLite.openDatabase("dbAtividades.db");
  return cx;
}
/* let ativ = {
  id:'',
  id_tipo_atividade:'',
  descricao:'',
  local_atividade:'',
  data_entrega:'',
  hora_entrega:'',
  status:''
} 
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            descricao  TEXT NOT NULL

*/

export async function createTable() {
  return new Promise((resolve, reject) => {
    const comando = `CREATE TABLE IF NOT EXISTS ${tabela}
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_tipo_atividade INTEGER NOT NULL,
      descricao TEXT NOT NULL,
      local_atividade TEXT NOT NULL,
      data_entrega TEXT NOT NULL,
      hora_entrega TEXT NOT NULL,
      status INTEGER NOT NULL   
      
      FOREIGN KEY (id_tipo_atividade)
      REFERENCES tbTipoAtividade (id) 
    )`;

    let dbConn = getDbConnection();
    dbConn.transaction(
      (tr) => tr.executeSql(comando, [],
        (tr, resposta) => resolve(true)
      ),
      error => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

//Busca todas as Atividades
export function obtemTodasAtividades() {
  return new Promise((resolve, reject) => {

    let dbCx = getDbConnection();
    //var retorno = {};
    dbCx.transaction(tx => {
      let comando = `select * from ${tabela}`;
      console.log(comando);
      tx.executeSql(comando, [],
        (tx, registros) => {
          //console.log(`Registros: ${JSON.stringify(registros)}`);
          console.log(`Registros rows: ${JSON.stringify(registros.rows)}`);

          var retorno = [];
          if (registros.rows.length > 0) {
            for (let n = 0; n < registros.rows.length; n++) {
              let obj = {
                id: registros.rows.item(n).id,
                id_tipo_atividade: registros.rows.item(n).id_tipo_atividade,
                descricao: registros.rows.item(n).descricao,
                local_atividade: registros.rows.item(n).local_atividade,
                data_entrega: registros.rows.item(n).data_entrega,
                hora_entrega: registros.rows.item(n).hora_entrega,
                status: registros.rows.item(n).status
              }
              console.log(`Objeto ${n} - ${JSON.stringify(obj)}`)
              retorno.push(obj);
            }
          }

          console.log(`Retorno: ${JSON.stringify(retorno)}`);
          resolve(retorno);
        })
    },
      error => {
        console.log(error);
        resolve([]);
      }
    )
  }
  );
}

//Adiciona uma atividade no banco
export function adicionaAtividade(atividade) {
  /* 
  id_tipo_atividade:'',
  descricao:'',
  local_atividade:'',
  data_entrega:'',
  hora_entrega:'',
  status:''
  */
  return new Promise((resolve, reject) => {
    let comando = `INSERT INTO ${tabela} 
      (id_tipo_atividade, descricao, local_atividade, data_entrega, hora_entrega, status)
       VALUES (?,?,?,?,?,?)`;
    let dbCx = getDbConnection();

    dbCx.transaction(tx => {
      tx.executeSql(comando,
        [atividade.id_tipo_atividade,
        atividade.descricao,
        atividade.local_atividade,
        atividade.data_entrega,
        atividade.hora_entrega,
        atividade.status],
        (tx, resultado) => {
          resolve(resultado.rowsAffected > 0);
        })
    },
      error => {
        console.log(error);
        resolve(false);
      }
    )
  }
  );
}

//Altera Atividade
export function alteraAtividade(atividade) {
  console.log('Início do método alteraUsuario');
  return new Promise((resolve, reject) => {
    //let comando = `UPDATE ${tabela} set nome=?, email=?, senha=?, confirmaSenha=?  WHERE codigo=?`;
    let comando = `UPDATE ${tabela} SET 
    id_tipo_atividade=?, descricao=?, local_atividade=?, data_entrega=?, hora_entrega=?, status=?  
    WHERE id=?`;
    let dbCx = getDbConnection();

    dbCx.transaction(tx => {
      tx.executeSql(comando,
        [atividade.id_tipo_atividade,
        atividade.descricao,
        atividade.local_atividade,
        atividade.data_entrega,
        atividade.hora_entrega,
        atividade.status,
        atividade.id],
        (tx, resultado) => {
          resolve(resultado.rowsAffected > 0);
        })
    },
      error => {
        console.log(error);
        resolve(false);
      }
    )
  }
  );
}

//Exclui atividade pelo 'id'
export function excluiAtividade(id) {
  console.log('Apagando atividade código: ' + id);
  return new Promise((resolve, reject) => {
      let comando = `DELETE from ${tabela} where id=?`;
      let dbCx = getDbConnection();

      dbCx.transaction(tx => {
          tx.executeSql(comando, [id],
              (tx, resultado) => {
                  resolve(resultado.rowsAffected > 0);
              })
      },
          error => {
              console.log(error);
              resolve(false);
          }
      )
  }
  );
}

//Exclui todas as atividades
export function excluiTodosUsuarios() {
  console.log("Apagando todas as atividades...");
  return new Promise((resolve, reject) => {
      //let query = 'delete from tbContatos';
      let comando = `DELETE FROM ${tabela}`;
      let dbCx = getDbConnection();
      dbCx.transaction(tx => {
          tx.executeSql(comando, [],
              (tx, resultado) => resolve(resultado.rowsAffected > 0)
          );
      },
          error => {
              console.log(error);
              resolve(false);
          }
      );
  }
  );
}


