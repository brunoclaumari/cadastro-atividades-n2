import { react } from "react";
import { Text, View, Alert, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import {
  createTable,
  deleteTable,
  obtemTodosTiposAtividades,
  adicionaTipoAtividade,
  alteraTipoAtividade,
  excluiTipoAtividade,
  excluiTodosTipoAtividade,
} from "../../services/tipoAtividadeService";
import {} from "react-native-web";

export default function TipoAtividade({ navigation }) {
  /*  async function adicionaDados(teste_json) {
    await adicionaTipoAtividade(teste_json);
  }*/

  //deleteTable();

  /*createTable();

  let teste_json = {
    descricao: "N2_Teste",
  };

  adicionaDados(teste_json);*/

  async function carregaTodos() {
    try {
      let obj = await obtemTodosTiposAtividades();
      console.log(JSON.stringify(obj));
      //console.log(obj.descricao);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  carregaTodos();

  return (
    <View style={styles.container}>
      <Text>Cadastro de tipo de atividades</Text>
      <Text>Estou no Cadastro de Tipos de Atividade</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Ionicons name="arrow-back-circle" size={40} color="green" />
        <Text>Ir para Home</Text>
      </TouchableOpacity>
    </View>
  );
}
