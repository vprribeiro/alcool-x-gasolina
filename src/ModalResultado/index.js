import React from "react";
import { View , Text , Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ModalResultado(props){

    const formatarMoeda = (valor) => {
        const num = parseFloat(valor);
        // Se for um número válido, formata
        if (!isNaN(num)) {
            return num.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL'
            });
        }
        // Retorna a string original ou um fallback se não for um número
        return 'R$ 0,00';
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerModal}>
                <Image
                    style={styles.imagem}
                    source={require('../../assets/gas.png')}
                />

                <Text style={styles.textoResultado}>
                    Compensa usar {props.melhorOpcao}
                </Text>
                
                <Text style={styles.texto}>Com os Preços: </Text>
                <Text style={styles.texto}>Álcool: {formatarMoeda(props.valorAlcool)}</Text>
                <Text style={styles.texto}>Gasolina: {formatarMoeda(props.valorGasolina)}</Text>

                <TouchableOpacity 
                    style={styles.botaoModal}
                    onPress={props.voltar}
                >
                    <Text style={styles.textoBotaoModal}>Calcular novamente</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'flex-end',
        marginRight:15,
        marginLeft:15,
        flex:1
    },
    containerModal: {
        width:'100%',
        height:'99%',
        backgroundColor: '#151515',
        alignItems: 'center',
  },
  imagem:{
    marginTop:100,
    width:200,
    height:200,
  },
  textoResultado:{
    fontSize:28,
    fontWeight:'bold',
    color:'#FFF',
    marginTop:10,
    marginBottom:10,
  },
  texto:{
    color:'#FFF',
    fontSize:22,
    marginBottom:10
  },
  botaoModal:{
    backgroundColor:'#ff4f30',
    width:'90%',
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
  },
  textoBotaoModal:{
    color:'#FFF',
    fontWeight:'bold',
    padding:8,
    fontSize:22,
  },
})