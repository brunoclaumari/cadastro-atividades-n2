import * as SQLite from "expo-sqlite";

// variaveis usadas nas querys
let tabela = "tbAtividade";

export function getDbConnection() {
  const cx = SQLite.openDatabase("dbAtividades.db");
  return cx;
}
