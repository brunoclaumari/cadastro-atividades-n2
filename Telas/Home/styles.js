import { StyleSheet } from "react-native";

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
        marginVertical: 10,
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
    },
    //Abaixo os estilos da lista de Atividades
    listaContatos: {
        //alignContent:'center',
        width: "95%",
        height: "100%",
        backgroundColor: "#FFF",
        marginTop: 20,
    },
    atividade: {
        backgroundColor: "#82edb4",
        flexDirection: "row",
        height: 100,
        alignItems: "center",
        margin: 8,
        borderRadius: 5,
        shadowColor: "#000",
        paddingHorizontal: 2,
        justifyContent: "space-between",
    },
    listaTexto: {
        //borderWidth: 0.8,
        width: 280,
        fontSize: 18,
        paddingRight: 10,
    },
    dadosBotoesAcao: {
        //borderWidth: 1.0,
        width: "10%",
    },
    conteinerDescricoes: {

    },
    chave: {
        justifyContent: 'flex-end',
        //width: "10%",
        //borderWidth: 1.0,
    }
});

export default styles;
