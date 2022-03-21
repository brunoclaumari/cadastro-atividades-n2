import * as SQLite from "expo-sqlite";

//variavel para passar id para tela de edicao
var objetoAtividade;

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
      status INTEGER NOT NULL,   
      
      FOREIGN KEY (id_tipo_atividade)
      REFERENCES tbTipoAtividade (id) 
    )`;

    let dbConn = getDbConnection();
    dbConn.transaction(
      (tr) => tr.executeSql(comando, [], (tr, resposta) => resolve(true)),
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

//Busca todas as Atividades
export function obtemTodasAtividades(flagFiltro) {
  let filtro='1=1';
  console.log(flagFiltro);
  if(flagFiltro !== "1=1" && flagFiltro!=='' && flagFiltro!==undefined)
    filtro = `status = ${Number.parseInt(flagFiltro)}`;

  return new Promise((resolve, reject) => {
    let dbCx = getDbConnection();
    //var retorno = {};

    dbCx.transaction(tx => {
      let comando = `select * from ${tabela} WHERE ${filtro} `;
      console.log(comando);
      console.log(flagFiltro);
      tx.executeSql(comando, [],
        (tx, registros) => {
          //console.log(`Registros: ${JSON.stringify(registros)}`);
          //console.log(`Registros rows: ${JSON.stringify(registros.rows)}`);

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
                status: registros.rows.item(n).status,
              };
              //console.log(`Objeto ${n} - ${JSON.stringify(obj)}`)
              retorno.push(obj);
            }
          }

          //console.log(`Retorno: ${JSON.stringify(retorno)}`);
          resolve(retorno);
        });
      },
      (error) => {
        console.log(error);
        resolve([]);
      }
    );
  });
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

    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          comando,
          [
            atividade.id_tipo_atividade,
            atividade.descricao,
            atividade.local_atividade,
            atividade.data_entrega,
            atividade.hora_entrega,
            atividade.status,
          ],
          (tx, resultado) => {
            resolve(resultado.rowsAffected > 0);
          }
        );
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

//Altera Atividade
export function alteraAtividade(atividade) {
  console.log("Início do método alteraAtividade");
  return new Promise((resolve, reject) => {
    //let comando = `UPDATE ${tabela} set nome=?, email=?, senha=?, confirmaSenha=?  WHERE codigo=?`;
    let comando = `UPDATE ${tabela} SET 
    id_tipo_atividade=?, descricao=?, local_atividade=?, data_entrega=?, hora_entrega=?, status=?  
    WHERE id=?`;
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          comando,
          [
            atividade.id_tipo_atividade,
            atividade.descricao,
            atividade.local_atividade,
            atividade.data_entrega,
            atividade.hora_entrega,
            atividade.status,
            atividade.id,
          ],
          (tx, resultado) => {
            resolve(resultado.rowsAffected > 0);
          }
        );
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

//Altera status do componente
export function alteraStatusAtividade(id, status) {
  console.log("Início do método alteraStatusAtividade");

  return new Promise((resolve, reject) => {
    //let comando = `UPDATE ${tabela} set nome=?, email=?, senha=?, confirmaSenha=?  WHERE codigo=?`;
    let comando = `UPDATE ${tabela} SET status=? WHERE id=?`;
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(comando, [status, id], (tx, resultado) => {
          resolve(resultado.rowsAffected > 0);
        });
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

//Método para validar data
export function validaDataX(data) {
  // Ex: 10/01/1985
  var regex = "\\d{2}/\\d{2}/\\d{4}";
  var dtArray = data.split("/");

  if (dtArray == null) return false;

  // Checks for dd/mm/yyyy format.
  var dtDay = dtArray[0];
  var dtMonth = dtArray[1];
  var dtYear = dtArray[2];

  if (dtMonth < 1 || dtMonth > 12) return false;
  else if (dtDay < 1 || dtDay > 31) return false;
  else if (
    (dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) &&
    dtDay == 31
  )
    return false;
  else if (dtMonth == 2) {
    var isleap = dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0);
    if (dtDay > 29 || (dtDay == 29 && !isleap)) return false;
  }
  return true;
}

export function validaData(data) {
  let ehValido = false;
  let msg = "";
  const dataValida =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/[12][0-9]{3}$/;
  if (dataValida.test(data)) {
    ehValido = true;
  } else {
    msg += "Data inválida \n";
    ehValido = false;
  }
  console.log(`Data válida: ${ehValido}`);
  return msg;
}

export function validaHora(hora) {
  let ehValido = false;
  let msg = '';
  //const horaValida = /^([0-2][0-3]|[2][0-3]):[0-5][0-9]$/;
  const horaValida = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if(horaValida.test(hora)){
    ehValido=true;
  }
  else{
    ehValido=false;
    msg+="Hora inválida! \n"
  }

  console.log(`Hora válida: ${ehValido}`);
  return msg;
}

/*export function obtemUmaAtividade(id) {
  console.log("começando o o método obtemUmaAtividade");
  //console.log(tipo_atividade);
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM ${tabela} where id = ?`;
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [id], (tx, registros) => {
          var retorno = [];

          if (registros.rows.length > 0) {
            let obj = {
              id: registros.rows.item(0).id,
              id_tipo_atividade: registros.rows.item(0).id_tipo_atividade,
              descricao: registros.rows.item(0).descricao,
              local_atividade: registros.rows.item(0).local_atividade,
              data_entrega: registros.rows.item(0).data_entrega,
              hora_entrega: registros.rows.item(0).hora_entrega,
              status: registros.rows.item(0).status,
            };
            retorno.push(obj);
          }

          resolve(retorno);
        });
      },
      (error) => {
        console.log(error.toString());
        resolve([]);
      }
    );
  });
}*/

export function obtemUmaAtividade(id) {
  console.log("começando o o método obtemUmaAtividade");
  //console.log(tipo_atividade);
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM ${tabela} where id = 1`;
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [], (tx, registros) => {
          var retorno = [];

          if (registros.rows.length > 0) {
            let obj = {
              id: registros.rows.item(0).id,
              id_tipo_atividade: registros.rows.item(0).id_tipo_atividade,
              descricao: registros.rows.item(0).descricao,
              local_atividade: registros.rows.item(0).local_atividade,
              data_entrega: registros.rows.item(0).data_entrega,
              hora_entrega: registros.rows.item(0).hora_entrega,
              status: registros.rows.item(0).status,
            };
            retorno.push(obj);
            console.log(JSON.stringify(obj));
          }

          resolve(retorno.toString());
        });
      },
      (error) => {
        console.log(error.toString());
        resolve([]);
      }
    );
  });
}

export function validaTudo(data, hora) {
  let mensagemErro = "";
  mensagemErro += validaData(data) + validaHora(hora);

  return mensagemErro;
}

export function recebeAtividade() {
  return objetoAtividade;
}

export function enviaAtividade(atividade) {
  objetoAtividade = atividade;
}
