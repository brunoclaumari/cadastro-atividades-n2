import { useState, useEffect } from 'react';
import {
  Alert, Text, View, ScrollView, TouchableOpacity, TextInput,
  Keyboard, Switch
} from 'react-native';
import styles from './styles';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import DropdownComponent from '../../Componentes//DropdownComponent/index'
import { obtemTodosTiposAtividades } from '../../services/tipoAtividadeService';
import { backgroundColor, color, textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';


//20/03/2022=> AINDA FALTA FAZER REGEZ PARA DATA E HORA
//OU ARRUMAR UM COMPONENTE QUE VEM COM DATA E HORA PRONTO
export default function Atividade({ navigation }) {

  /* let ativ = {
    id:'', id_tipo_atividade:'', descricao:'', local_atividade:'',
    dia:'',
    hora:'',
    status:''
  } */
  const itensTipoAtividade = [];

  const [id, setId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [idTipoAtividade, setIdTipoAtividade] = useState('');
  const [localAtividade, setLocalAtividade] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');
  const [horaEntrega, setHoraEntrega] = useState('');
  const [status, setStatus] = useState(0);
  const [recarregaTela, setRecarregaTela] = useState(true);

  const [tipoAtividade, setTipoAtividade] = useState([]);
  const [atividades, setAtividades] = useState([]);

  const [isEnabled, setIsEnabled] = useState(false);
  const [textoSwitch, setTextoSwitch] = useState({status:0,cor:'red', texto:'Pendente'});

  async function buscaTipoAtividades() {
    try {
      let resposta = await obtemTodosTiposAtividades();
      setTipoAtividade(resposta);
      //itensTipoAtividade = tipoAtividade; 
      setRecarregaTela(false);
    } catch (error) {
      Alert.alert('Ocorreu um erro: ' + error);
    }
  }

  useEffect(
    () => {
      //preventDefault();
      console.log('useEffect foi disparado');
      buscaTipoAtividades();
      setIsEnabled(false);
      console.log(JSON.stringify(tipoAtividade))
      //itensTipoAtividade.concat(arrayy);
    }, [recarregaTela]);

  function limparCampos() {
    setId(undefined)
    setDescricao('')
    setIdTipoAtividade('')
    setLocalAtividade('')
    setDataEntrega('')
    setHoraEntrega('')
    setStatus('')
    Keyboard.dismiss();
  }

  async function salvarAtividade() {
    let novoRegistro = false;
    let identificador = id;
    if (identificador == undefined) {
      novoRegistro = true;
    }

    let ativ = {
      id: identificador,
      id_tipo_atividade: idTipoAtividade,
      descricao: descricao,
      local_atividade: localAtividade,
      data_entrega: dataEntrega,
      hora_entrega: horaEntrega,
      status: status
    }

    //Validação bem genérica só para não deixar vazio
    if(idTipoAtividade=='' || descricao==''||localAtividade==''||
    dataEntrega==''||horaEntrega==''){
      Alert.alert("Não pode ter campos em branco")
    }
    else{
      console.log('obj Atividade' + JSON.stringify(ativ));
    }
    


  }
  
  const toggleSwitch = () => {
    //let chavear=false;
    setStatus(0); 
    let textSwitch={status:0,cor:'red', texto:'Pendente'}
    setIsEnabled(previousState => !previousState)
    if (isEnabled==false) {
      textSwitch.status=1;
      textSwitch.cor='green';
      textSwitch.texto='Concluído';
      setStatus(1);
      //textSwitch = {cor:'green', texto:'Concluído'};      
    }
    else {
      textSwitch.status=0;
      textSwitch.cor='red';
      textSwitch.texto='Pendente';
      setStatus(0);            
    }
    setTextoSwitch(textSwitch)
    console.log('mudou cor'+textSwitch.status)    
  };

  return (

    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titulo} >Cadastro de Atividades</Text>
        {/* <View style={styles.forms} > */}
        <View style={styles.forms} >
          <>
            <Text style={styles.legendaCampo} >Descrição das Atividades</Text>
            <View  >
              <TextInput
                style={[styles.campoValor]} placeholder='Descrição...'
                onChangeText={texto => setDescricao(texto)}
                onFocus={() => setDescricao(descricao)}
                defaultValue={descricao.toString()}
              />
            </View>
          </>
          <>
            <Text style={styles.legendaCampo} >Tipo de Atividade</Text>
            <DropdownComponent setValue={setIdTipoAtividade}
              value={idTipoAtividade} label="descricao" campoId="id"
              vetor={tipoAtividade} />
          </>
          <>
            <Text style={styles.legendaCampo} >Local da Atividades</Text>
            <View  >
              <TextInput
                style={[styles.campoValor]} placeholder='Local da atividade...'
                onChangeText={texto => setLocalAtividade(texto)}
                onFocus={() => setLocalAtividade(localAtividade)}
                defaultValue={localAtividade.toString()}
              />
            </View>
          </>
          <>
            <Text style={styles.legendaCampo} >Data de entrega</Text>
            <View  >
              <TextInput
                style={[styles.campoValor]} placeholder='Data da entrega...'
                onChangeText={texto => setDataEntrega(texto)}
                onFocus={() => setDataEntrega(dataEntrega)}
                defaultValue={dataEntrega.toString()} 
                keyboardType='name-phone-pad'
              />
            </View>
          </>
          <>
            <Text style={styles.legendaCampo} >Hora da entrega</Text>
            <View  >
              <TextInput
                style={[styles.campoValor]} placeholder='Hora da entrega...'
                onChangeText={texto => setHoraEntrega(texto)}
                onFocus={() => setHoraEntrega(horaEntrega)}
                defaultValue={horaEntrega.toString()} 
                keyboardType='name-phone-pad'
              />
            </View>
          </>
          <View style={styles.switchStatus}>
            <Text style={styles.legendaCampo} >Status</Text>
            <Switch style={styles.switchConteiner}
              //trackColor={{ false: "#767577", true: "#81b0ff" }}
              //thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              trackColor={{ false: "#e01616", true: "#43820c" }}
              thumbColor={!isEnabled ? "#edc2c2" : "#b6e38f"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={()=>toggleSwitch()}
              value={isEnabled}
              
            />
            <Text style={{ color: `${textoSwitch.cor}` }} > {textoSwitch.texto}</Text>
          </View>


        </View>
        <View style={styles.conteinerBotao}>
          <TouchableOpacity style={styles.botaoSalvar}
            onPress={() => salvarAtividade()} >
            <Text style={styles.textoBotao}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoCancelar} >
            <Text style={styles.textoBotao}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoApagaTudo}
            onPress={() => limparCampos()}>
            <Text style={styles.textoBotao}>Limpar Campos</Text>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity style={styles.voltar} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="arrow-back-circle" size={40} color="green" />
            <Text style={styles.voltarTexto} >Ir para Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView >

  );
}