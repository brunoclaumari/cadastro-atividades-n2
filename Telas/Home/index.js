import { useState, useEffect } from "react";
import {
  ScrollView, Text, View,
  TouchableOpacity, StatusBar as BarraSuperior,
  Switch, Alert
} from 'react-native';
import {
  alteraAtividade,
  createTable,
  obtemTodasAtividades,
  alteraStatusAtividade,
  excluiAtividade,
  excluiTodasAtividades

} from '../../services/atividadeService';
import { Ionicons, Entypo, AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import styles from "./styles";
import DropdownComponent from "../../Componentes/DropdownComponent";

export default function Home({ navigation }) {

  const [listaAtividades, setListaAtividades] = useState([]);
  const [recarregaTela, setRecarregaTela] = useState(true);
  const [criarTabela, setCriarTabela] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [status, setStatus] = useState(0);
  const [flagFiltro, setFlagFiltro] = useState('1=1');

  async function carregarTodosOsDados() {
    try {
      let resposta = await obtemTodasAtividades(flagFiltro);
      setListaAtividades(resposta);
      setRecarregaTela(false);
      //limparCampos();
    } catch (error) {
      Alert.alert("Ocorreu um erro: " + error);
    }
  }


  async function processamentoUseEffect() {
    if (!criarTabela) {
      console.log("Verificando necessidade de criar tabelas...");
      setCriarTabela(true);
      await createTable();
    }
    if (recarregaTela) {
      console.log("Recarregando dados...");
      await carregarTodosOsDados();
    }
  }


  useEffect(
    () => {
      console.log('useEffect foi disparado');
      processamentoUseEffect();
    }, [recarregaTela]);



  function retornaPendencias(numero) {
    //let vetor={cor:'red', status:'Pendente'}

    if (numero === 0)
      return { cor: 'red', status: 'Pendente', imagem: "toggle-switch-off" };
    else
      return { cor: 'green', status: 'Concluido', imagem: "toggle-switch" };
  }

  //    async function alteraStatus(thisId, thisStatus) {
  async function alteraStatus(thisId, thisStatus) {
    try {
      thisStatus === 0 ? thisStatus = 1 : thisStatus = 0;
      let resposta = await alteraStatusAtividade(thisId, thisStatus);
      console.log(`Id: ${thisId} - status: ${thisStatus} - statusAlterado?: ${resposta}`);
      //console.log(`Id: ${thisId} - status: ${thisStatus}`);
      setRecarregaTela(true);

    } catch (error) {
      Alert.alert("Ocorreu um erro: " + error);
    }

  }

  function retornaPendencias(numero) {   

    if (numero === 0)
      return { cor: "red", status: "Pendente", imagem: "toggle-switch-off" };
    else return { cor: "green", status: "Concluido", imagem: "toggle-switch" };
  }

  //    async function alteraStatus(thisId, thisStatus) {
  async function alteraStatus(thisId, thisStatus) {
    try {
      thisStatus === 0 ? (thisStatus = 1) : (thisStatus = 0);
      let resposta = await alteraStatusAtividade(thisId, thisStatus);
      /* console.log(
        `Id: ${thisId} - status: ${thisStatus} - statusAlterado?: ${resposta}`
      );*/
      //console.log(`Id: ${thisId} - status: ${thisStatus}`);
      setRecarregaTela(true);
    } catch (error) {
      Alert.alert("Ocorreu um erro: " + error);
    }
  }

  const filtro = [
    { indice: "0", descricao: "Pendente" },
    { indice: "1", descricao: "Concluído" },
    { indice: "1=1", descricao: "Todos" },
  ];

  function removerElemento(identificador) {
    Alert.alert("Atenção", `Confirma a remoção da atividade ${identificador}?`,
      [
        {
          text: 'Sim',
          onPress: () => efetivaRemoverAtividade(identificador),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  async function efetivaRemoverAtividade(identificador) {
    try {
      await excluiAtividade(identificador);      
      let msg = 'Atividade codigo '+identificador.toString()+' apagado com sucesso!!!';      
      setRecarregaTela(true);
      Alert.alert(msg);
    } catch (e) {
      Alert.alert(e);
    }
  }


  return (

    <View style={styles.container}>
      <BarraSuperior
        animated={true}
        backgroundColor="#61dafb" />

      <Text style={styles.titulo} >Cadastro de atividades</Text>
      <View style={styles.conteinerBotao}>
        <TouchableOpacity style={styles.botaoHome}
          onPress={() => navigation.navigate('Atividade')}>
          <Text style={styles.textoBotao}>Atividades</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoHome}
          onPress={() => navigation.navigate('TipoAtividade')}>
          <Text style={styles.textoBotao}>Tipo de Atividades</Text>
        </TouchableOpacity>
      </View>

      <Text></Text>
      <DropdownComponent setValue={setFlagFiltro}
        setRecarregaTela={setRecarregaTela}
        recarrega={true}
        value={flagFiltro} label="descricao" campoId="indice"
        vetor={filtro} />

      <ScrollView style={styles.listaContatos}>
        {listaAtividades.map((atividade, index) => (
          <View style={styles.atividade} key={index.toString()}>
            <View style={styles.conteinerDescricoes}>
              <Text style={styles.listaTexto}> {atividade.descricao}</Text>
              <Text style={styles.listaTexto}> {atividade.data_entrega}</Text>
              <Text style={[styles.listaTexto, { color: `${retornaPendencias(atividade.status).cor}` }]}> {retornaPendencias(atividade.status).status}</Text>
            </View>
            <View style={styles.chave}>

              <TouchableOpacity onPress={() =>
                alteraStatus(atividade.id, atividade.status)
              } >
                {/* <MaterialCommunityIcons name="toggle-switch-off-outline" size={45} color="black" /> */}
                <MaterialCommunityIcons name={retornaPendencias(atividade.status).imagem} size={45} color={retornaPendencias(atividade.status).cor} />
              </TouchableOpacity>
            </View>
            <View style={styles.dadosBotoesAcao}>
              <TouchableOpacity onPress={() => removerElemento(atividade.id)}>
                <FontAwesome name="remove" size={32} color="red" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Atividade", atividade)}
              >
                <Entypo name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/*             <View style={styles.dadosBotoesAcao}>
              <TouchableOpacity
                onPress={() => removerElemento(atividade.id)}
              >
                <FontAwesome name="remove" size={32} color="red" />
              </TouchableOpacity>
              <Text></Text>
              <TouchableOpacity onPress={() => editar(atividade.id)}>
                <Entypo name="edit" size={24} color="black" />
              </TouchableOpacity>
            </View> */}
          </View>
        ))}
      </ScrollView>


    </View>
  );
}

