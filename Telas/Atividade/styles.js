import {StyleSheet, StatusBar} from 'react-native';


//let largBotao = '33%';
//let tamanhoBorda = 2;
let dimensions={
    raio:10,
    largBotao: '32%',
    alturaBotao:50,
    tamanhoBorda: 2

}


const styles = StyleSheet.create({    
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        //marginTop: BarraSuperior.currentHeight,
    },
    forms:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
    },
    containerCampo: {
        //backgroundColor:'green',
        margin: 2,
        padding: 6
    },
    campoValor: {  
        width: 300, 
        height: 40,      
        borderWidth: 1,
        borderColor: '#4895d4',
        borderRadius: 7,
        paddingHorizontal: 10,
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 5,
        marginBottom:5,
    },
    legendaCampo: {
        fontSize: 20,
        color: '#0c5591', 
        marginTop:2  
        //width:200,
        //backgroundColor:'green',
        //alignItems:'flex-start',
        //textAlign:'left',        
    },
    legendaCadastro:{
        fontWeight:'bold',
        fontSize:20
    },
    voltar:{
        marginTop:5,
        backgroundColor:'#80ff9d',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingHorizontal:5,
        borderRadius:20,
        borderColor:'#12db41',
        borderWidth:1
    },
    voltarTexto:{
        fontWeight:'bold',
        fontSize:18
    },
    titulo: {
        fontSize: 30,
        //marginBottom: 50,
        fontWeight: 'bold'
    },
    conteinerBotao: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignContent:'space-between'
    },
    textoBotao: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    botaoSalvar: {
        backgroundColor: '#8eb3e6',
        borderColor: '#0f3c7a',
        borderWidth: dimensions.tamanhoBorda,
        borderRadius: dimensions.raio,        
        width: dimensions.largBotao,
        height: dimensions.alturaBotao,
        
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,        
        elevation: 7,
    },
    botaoCancelar: {
        backgroundColor: '#edc947',
        borderColor: '#917716',
        borderWidth: dimensions.tamanhoBorda,
        borderRadius: dimensions.raio,
        //width: '33%',
        width: dimensions.largBotao,
        height: dimensions.alturaBotao,        
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,        
        elevation: 7,
    },
    botaoApagaTudo: {        
        backgroundColor: '#ff8093',
        borderColor: '#780c35',
        borderWidth: dimensions.tamanhoBorda,
        borderRadius: dimensions.raio,
        //width: '32%',
        width: dimensions.largBotao,
        height: dimensions.alturaBotao,        
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,        
        elevation: 7,
    },
    switchConteiner:{
        backgroundColor:'yellow',
        height:60

    },
    switchStatus:{
        flexDirection:'row',
        alignItems:'center'
    },
    switchObj:{

    }

});  

export default styles;

/*
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
*/