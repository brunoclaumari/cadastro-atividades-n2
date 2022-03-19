import * as SQLite from "expo-sqlite";

// variaveis usadas nas querys
let tabela = "tbTipoAtividade";

export function getDbConnection() {
  const cx = SQLite.openDatabase("dbAtividades.db");
  return cx;
}

export async function createTable() {
  console.log("function createTable");
  return new Promise((resolve, reject) => {
    //Esse método é Promise porque eu preciso saber na hora que chamar o método createTable
    //quando ele vai terminar, e só depois ele terminar , que eu posso consultar os dados da tabela
    //porque a tabela pode não existir
    const query = `CREATE TABLE IF NOT EXISTS ${tabela}
          (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            descricao  TEXT NOT NULL
          )`;

    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) =>
        tx.executeSql(
          //dentro do [] que vai passar os valores da query, nesse caso não tem
          query,
          [],
          //quando der certo (criação do createTable)...
          //vai retornar o que está dentro do resolve (true)
          (tx, resultado) => resolve(true)
        ),
      //quando der errado...
      (error) => {
        console.log(error.toString());
        resolve(false);
      }
    );
  });
}

export function adicionaTipoAtividade(tipo_atividade) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO ${tabela} (descricao) values (?)`;
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        //os parametros devem ser passados na ordem id, nome, telefone.
        tx.executeSql(query, [tipo_atividade.descricao], (tx, resultado) => {
          // (resultado.rowsAffected > 0) retornar um booleano, se
          // Sendo "resultado.rowsAffected > 0" retornará true
          console.log(tipo_atividade.descricao);
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

export function obtemTodosTiposAtividades() {
  console.log("obtendo todos os contatos");
  return new Promise((resolve, reject) => {
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        let query = `select * from ${tabela}`;
        //let query = `select descricao from ${tabela}`;
        tx.executeSql(
          query,
          [],
          // dando certo, vai retornar a transação e os registros
          (tx, registros) => {
            console.log("Criando o vetor para guardar a lista");
            console.log(registros.rows.length);
            var retorno = []; // vetor para guardar a lista
            for (let n = 0; n < registros.rows.length; n++) {
              console.log(n.descricao);
              let obj = {
                id: registros.rows.item(n).id,
                descricao: registros.rows.item(n).descricao,
              };
              retorno.push(obj);
            }
            // quando terminar de preencher toda a lista, vai ser feito um resolve no retorno
            resolve(retorno);
          }
        );
      },

      (error) => {
        console.log(error);
        resolve([]);
      }
    );
  });
}

export function excluiTodosContatos() {
  console.log("Apagando todos os contatos...");
  return new Promise((resolve, reject) => {
    let query = "delete from tbContatos";
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [], (tx, resultado) =>
          resolve(resultado.rowsAffected > 0)
        );
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

export function deleteTable() {
  console.log("Apagando toda a tabela");

  return new Promise((resolve, reject) => {
    let query = `DROP TABLE IF EXISTS ${tabela}`;
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [], (tx, resultado) =>
          resolve(resultado.rowsAffected > 0)
        );
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}
