import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  areaBotoes: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 30,
  },

  areaDados: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    // marginVertical: 10,
  },
  areaDescricao: {
    width: "90%",
    flexDirection: "row",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 50,
  },

  dadosBotoesAcao: {
    width: "10%",
  },

  listaContatos: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    marginTop: 20,
  },

  titulo: {
    fontSize: 25,
    marginBottom: 50,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 30,
  },

  listaTexto: {
    width: "50%",
    fontSize: 18,
    paddingRight: 10,
  },

  textoDescricao: {
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },

  caixaTexto: {
    borderColor: "#000",
    borderWidth: 1,
    height: 40,
    width: "60%",
    marginHorizontal: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
  },

  botao: {
    width: "30%",
    height: 50,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#040d59",
  },

  botaoApagarTudo: {
    backgroundColor: "red",
    color: "#FFF",
  },

  tipoAtividade: {
    backgroundColor: "#82edb4",
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    margin: 10,
    borderRadius: 5,
    shadowColor: "#000",
    paddingHorizontal: 20,
    justifyContent: "space-around",
    /*shadowOffset: {
      width: 0,
      height: 1,*/
  },

  botaoCancelar: {
    backgroundColor: "#e3dc10",
  },

  botaoSalvar: {
    backgroundColor: "#82aded",
  },

  textoBotao: {
    color: "#000",
  },

  cabecalho: {
    flexDirection: "row",
    width: "90%",
  },
});

export default styles;
