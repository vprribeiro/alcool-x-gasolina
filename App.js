import React, {useState} from 'react';
import { StyleSheet, Text, View , Image, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import ModalResultado from './src/ModalResultado';

export default function App() {

  const [valorAlcool, setValorAlcool] = useState('');
  const [valorGasolina, setValorGasolina] = useState('');
  const [melhorOpcao, setMelhorOpcao] = useState('');

  const [visibleModal, setVisibleModal] = useState(false)

  const handleInputChange = (text, setState) => {

    let cleanedText = text.replace(/[^0-9.,]/g, '');
    cleanedText = cleanedText.replace(/,/g, '.')
    const parts = cleanedText.split('.');

    if (parts.length > 2) {
      // Se houver mais de um ponto, junta a parte inteira e a primeira decimal, ignorando os demais pontos
      cleanedText = parts[0] + '.' + parts.slice(1).join('');
    }

    setState(cleanedText);
  };

  function calcular(){
    const alcoolNum = parseFloat(valorAlcool);
    const gasolinaNum = parseFloat(valorGasolina);

    if (isNaN(alcoolNum) || isNaN(gasolinaNum) || alcoolNum <= 0 || gasolinaNum <= 0){
      alert('Informe valores numéricos válidos e maiores que zero.');
      return;
    }

    const razao = alcoolNum / gasolinaNum;

    if (razao < 0.7){
      setMelhorOpcao('Álcool');
    }
    else{
      setMelhorOpcao('Gasolina');
    }

    console.log('Razão: ' + razao);
    setVisibleModal(true);

  }

  function retornar(){
    setVisibleModal(false);
    setValorAlcool('');
    setValorGasolina('');
    setMelhorOpcao('');
  }

  return (
    <KeyboardAvoidingView  style={styles.keyboardAvoiding}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={styles.container}>

          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
          />

          <Text style={styles.titulo}>Qual melhor opção?</Text>
          
          <Text style={styles.label}>Álcool (preço por litro)</Text>
          <TextInput
            placeholder='4.50'
            style={styles.input}
            keyboardType='numeric'
            value={valorAlcool}
            onChangeText={ (valor) => handleInputChange(valor, setValorAlcool)}
          />

          <Text style={styles.label}>Gasolina (preço por litro)</Text>
          <TextInput
            placeholder='7.50'
            style={styles.input}
            keyboardType='numeric'
            value={valorGasolina}
            onChangeText={ (valor) => handleInputChange(valor, setValorGasolina)}
          />

          <TouchableOpacity 
            style={styles.botao}
            onPress={calcular}
          >
            <Text style={styles.textoBotao}>Calcular</Text>
          </TouchableOpacity>

          <Modal
            transparent={true}
            animationType="slide"
            visible={visibleModal}
      
          >
            <ModalResultado 
              voltar={retornar}
              valorAlcool = {valorAlcool}
              valorGasolina = {valorGasolina}
              melhorOpcao = {melhorOpcao}
              visibleModal = {visibleModal}
            />
          </Modal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoiding:{
    flex: 1,
    backgroundColor: '#151515',
    marginTop:25,
    marginBottom:45,
  },
  container: {
    flex: 1,
    backgroundColor: '#151515',
    alignItems: 'center',
    marginTop:25,
    marginBottom:45,
  },
  logo:{
    marginTop:50,
    width:200,
    height:200,
  },
  titulo:{
    color:'#FFF',
    fontSize:26,
    fontWeight:'bold',
    marginTop:20,
    marginBottom:50,
  },
  label:{
    color:'#FFF',
    fontSize:18,
    marginBottom:5,
    fontWeight:'bold'
  },
  input:{
    backgroundColor:'#FFF',
    width:'90%',
    borderRadius:5,
    padding:10,
    fontSize:18,
    marginBottom:15,
  },
  botao:{
    backgroundColor:'#ff4f30ff',
    width:'90%',
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
  },
  textoBotao:{
    color:'#FFF',
    fontWeight:'bold',
    padding:8,
    fontSize:22,
  }
});
