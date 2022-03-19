import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar as BarraSuperior } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from './Telas/Home/index';
import Atividade from './Telas/Atividade/index';
import TipoAtividade from './Telas/TipoAtividade/index';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    Atividade,
    TipoAtividade,
  })
);


export default function App() {
  return (
    <>
      <BarraSuperior
        animated={true}
        backgroundColor="#61dafb" />
      <Routes />
    </>
    /*     <View style={styles.container}>
          <Text>Cadastro de atividades!</Text>
          <StatusBar style="auto" />
        </View> */
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
