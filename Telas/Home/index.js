
import { react } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, StatusBar as BarraSuperior } from 'react-native';
//import styles from './styles';



export default function Home({ navigation }) {
    return (

        <View style={styles.container}>
            <BarraSuperior
                animated={true}
                backgroundColor="#61dafb" />

            <Text style={styles.titulo} >Cadastro de atividades</Text>
            <Text>Estou na Home</Text>
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


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        //marginTop: BarraSuperior.currentHeight,
    },
    titulo: {
        fontSize: 30,
        marginBottom: 50,
        fontWeight: 'bold'
    },
    conteinerBotao: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignContent:'space-between'

    },
    botaoHome: {
        borderColor: '#82B366',
        borderWidth: 1,
        borderRadius: 5,
        width: 160,
        height: 70,
        backgroundColor: '#D5E8D4',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30
    },
    textoBotao: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});  