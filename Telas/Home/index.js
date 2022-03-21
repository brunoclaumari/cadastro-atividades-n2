import { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StatusBar as BarraSuperior,
  Switch,
} from "react-native";
import {
  alteraAtividade,
  createTable,
  obtemTodasAtividades,
  alteraStatusAtividade,
} from "../../services/atividadeService";
import {
  Ionicons,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

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
  }

  async function processamentoUseEffect() {
    if (!criarTabela) {
      console.log("Verificando necessidade de criar tabelas...");
      setCriarTabela(true);
      await createTable();
    }


    useEffect(
        () => {
            console.log('useEffect foi disparado');
            processamentoUseEffect();
        }, [recarregaTela]);

    const toggleSwitch = () => {
        //let chavear=false;
        setStatus(0);
        let textSwitch = { status: 0, cor: 'red', texto: 'Pendente' }
        setIsEnabled(previousState => !previousState)
        if (isEnabled == false) {
            textSwitch.status = 1;
            textSwitch.cor = 'green';
            textSwitch.texto = 'Concluído';
            setStatus(1);
            //textSwitch = {cor:'green', texto:'Concluído'};      
        }
        else {
            textSwitch.status = 0;
            textSwitch.cor = 'red';
            textSwitch.texto = 'Pendente';
            setStatus(0);
        }
        setTextoSwitch(textSwitch)
        console.log('mudou cor' + textSwitch.status)
    };

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
    setTextoSwitch(textSwitch);
    //console.log("mudou cor" + textSwitch.status);
  };

  function retornaPendencias(numero) {
    //let vetor={cor:'red', status:'Pendente'}

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

  return (
    <View style={styles.container}>
      <BarraSuperior animated={true} backgroundColor="#61dafb" />

      <Text style={styles.titulo}>Cadastro de atividades</Text>

      <View style={styles.conteinerBotao}>
        <TouchableOpacity
          style={styles.botaoHome}
          onPress={() => navigation.navigate("Atividade")}
        >
          <Text style={styles.textoBotao}>Atividades</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoHome}
          onPress={() => navigation.navigate("TipoAtividade")}
        >
          <Text style={styles.textoBotao}>Tipo de Atividades</Text>
        </TouchableOpacity>
      </View>
      {/*             <DropdownComponent setValue={setFlagFiltro}
              value={indice} label="descricao" campoId="indice"
              vetor={filtro} /> */}


    let filtro = [{ indice: '0', descricao: "Pendente" },
    { indice: '1', descricao: "Concluído" }, { indice: '1=1', descricao: "Todos" }]

    return (

        <View style={styles.container}>
            <BarraSuperior
                animated={true}
                backgroundColor="#61dafb" />

            <Text style={styles.titulo} >Cadastro de atividades</Text>
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
                            <TouchableOpacity
                                onPress={() => removerElemento(atividade.id)}
                            >
                                <FontAwesome name="remove" size={32} color="red" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => editar(atividade.id)}>
                                <Entypo name="edit" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>


        </View>
    );
}  

