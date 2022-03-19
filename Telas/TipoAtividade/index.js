import {react} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';


export default function TipoAtividade({navigation}) {
    return (
      
      <View style={styles.container}>
        <Text>Cadastro de tipo de atividades</Text>
        <Text>Estou no Cadastro de Tipos de Atividade</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back-circle" size={40} color="green" />
          <Text>Ir para Home</Text>
        </TouchableOpacity>
      </View>
    );
  }