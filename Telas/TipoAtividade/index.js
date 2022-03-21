import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { Ionicons, AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";

import {
  createTable,
  //deleteTable,
  obtemTodosTiposAtividades,
  adicionaTipoAtividade,
  alteraTipoAtividade,
  excluiTipoAtividade,
  excluiTodosTipoAtividade,
} from "../../services/tipoAtividadeService";

import { recebeCodigo } from "../../services/atividadeService";

export default function TipoAtividade({ navigation }) {
  const [id, setId] = useState();
  const [descricao, setDescricao] = useState();
  const [listaTipoAtividade, setlistaTipoAtividade] = useState([]);
  const [recarregaTela, setRecarregaTela] = useState(true);
  const [criarTabela, setCriarTabela] = useState(false);

  async function processamentoUseEffect() {
    if (!criarTabela) {
      console.log("Verificando a necessidade de criar tabelas...");
      setCriarTabela(true);
      // Só depois que tiver a resposta do createTable que ele prossegue
      await createTable();
      // Vai para o próximo if apenas quando tiver certeza que o banco foi criado
    }
    if (recarregaTela) {
      console.log("Recarregando dados...");
      await carregaDados();
    }
  }

  useEffect(() => {
    //carregaDados();
    console.log("executando useffect");
    //método (processamentoUseEffect) é necessário pois esse método é assincrono, e não posso
    // chamar um método assíncrono dentro de um método que não é assíncrono (useEffect)
    console.log("useEffect foi disparado");
    processamentoUseEffect();
  }, [recarregaTela]);

  async function salvaDados() {
    let novoRegistro = false;
    let identificador = id;
    if (identificador == undefined) {
      // identificador = createUniqueId();
      novoRegistro = true;
    }

    console.log(identificador);

    let obj = {
      id: identificador,
      descricao: descricao,
    };

    try {
      // inclusão
      if (novoRegistro) {
        let resposta = await adicionaTipoAtividade(obj);

        if (resposta) Alert.alert("Adicionado com sucesso!");
        else Alert.alert("Falhou miseravelmente!");
      }
      //alteracao
      else {
        console.log("Vamos alterar o tipo de atividade");
        let resposta = await alteraTipoAtividade(obj);
        if (resposta) Alert.alert("Alterado com sucesso!");
        else Alert.alert("Falhou miseravelmente!");
      }
      console.log(
        "Aqui é para exececutar só depois de ter alterado ou incluido um novo tipo de atividade"
      );
      Keyboard.dismiss();
      limparCampos();
      setRecarregaTela(true);
    } catch (e) {
      Alert.alert(e);
    }
  }

  async function carregaDados() {
    try {
      let tipoAtividade = await obtemTodosTiposAtividades();
      setlistaTipoAtividade(tipoAtividade);
      setRecarregaTela(false);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function editar(identificador) {
    console.log("Função para editar");
    console.log(identificador);
    const tipoAtividade = listaTipoAtividade.find(
      (tipoAtividade) => tipoAtividade.id == identificador
    );

    if (tipoAtividade != undefined) {
      setId(tipoAtividade.id);
      setDescricao(tipoAtividade.descricao);
    }

    console.log(tipoAtividade);
  }

  async function limparCampos() {
    setDescricao("");
    setId(undefined);
    Keyboard.dismiss();
  }

  async function efetivaExclusao() {
    try {
      await excluiTodosTipoAtividade();
      setRecarregaTela(true);
      Alert.alert("Já era...");
    } catch (e) {
      Alert.alert(e);
    }
  }

  function apagarTudo() {
    if (
      Alert.alert(
        "Muita atenção!!!",
        "Confirma a exclusão de todos os tipos de atividades?",
        [
          {
            text: "Sim, confirmo!",
            onPress: () => {
              efetivaExclusao();
            },
          },
          {
            text: "Não!!!",
            style: "cancel",
          },
        ]
      )
    );
  }

  function removerElemento(identificador) {
    Alert.alert("Atenção", "Confirma a remoção desse tipo de atividade?", [
      {
        text: "Sim",
        onPress: () => efetivaRemoverTipodeAtividade(identificador),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  async function efetivaRemoverTipodeAtividade(identificador) {
    try {
      await excluiTipoAtividade(identificador);
      Keyboard.dismiss();
      limparCampos();
      setRecarregaTela(true);
      Alert.alert("Contato apagado com sucesso!!!");
    } catch (e) {
      Alert.alert(e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        {/* <Text>Estou no Cadastro de Tipos de Atividade</Text> */}

        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back-circle" size={40} color="green" />
          <Text>Home</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Cadastro de tipo de atividades</Text>
      </View>

      <View style={styles.areaDados}>
        <View style={styles.areaDescricao}>
          <Text style={styles.textoDescricao}>Tipo de Atividade </Text>
          <TextInput
            style={styles.caixaTexto}
            onChangeText={(texto) => setDescricao(texto)}
            value={descricao}
            /*value={mostraDescricao()}*/
          />
        </View>
      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity
          style={[styles.botao, styles.botaoSalvar]}
          onPress={() => salvaDados()}
        >
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.botaoCancelar]}
          onPress={() => limparCampos()}
        >
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.botaoApagarTudo]}
          onPress={() => apagarTudo()}
        >
          <Text style={styles.textoBotao}>Apagar tudo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listaContatos}>
        {listaTipoAtividade.map((tipoAtividade, index) => (
          <View style={styles.tipoAtividade} key={index.toString()}>
            <Text style={styles.listaTexto}> {tipoAtividade.descricao}</Text>

            <View style={styles.dadosBotoesAcao}>
              <TouchableOpacity
                onPress={() => removerElemento(tipoAtividade.id)}
              >
                <FontAwesome name="remove" size={32} color="red" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => editar(tipoAtividade.id)}>
                <Entypo name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}
