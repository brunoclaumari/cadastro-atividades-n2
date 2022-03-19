import { react } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';


export default function Atividade({ navigation }) {
  return (

    <View style={styles.container}>
      <Text>Cadastro de atividades</Text>
      <Text>Estou no Cadastro de Atividades</Text>
      <Text></Text>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back-circle" size={40} color="green" />
          <Text>Ir para Home</Text>
        </TouchableOpacity>

      </View>
    </View>

  );
}