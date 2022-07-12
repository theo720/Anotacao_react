import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput, AsyncStorage} from 'react-native';
import { backgroundColor, borderEndColor, color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function App() {
  const [estado, setarestado] = useState('Leitura');
  const [anotacao, setaranotacao] = useState('');
  console.disableYellowBox = true;
  useEffect(() =>{
    (async()=>{
      try {
        const anotacaoleitura = await AsyncStorage.getItem('anotacao');
        setaranotacao(anotacaoleitura);
      } catch (error) {}
    })();
  },[])
  setData = async() =>{
    try {
      await AsyncStorage.setItem('anotacao', anotacao);
    } catch (error) {
      
    }
    alert("Foi salvo com sucesso");
  }
  function salvar(){
    setarestado('Leitura');
    setData();
  }
  if (estado == 'Leitura') {
  
    
  return (
    <View style={{flex:1}}>
      <StatusBar style = "light" />
    <View style={styles.header} ><Text style={styles.textoHeader}>Aplicativo da anotação</Text></View>
    {
    (anotacao != '')?
    <View style={{padding:20}}><Text style={{fontSize:14}}>{anotacao}</Text></View>
    :
    <View><Text style={{opacity:0.4}}>Não existe anotação</Text></View>
  }
    {
      (anotacao == '')?
    <TouchableOpacity onPress={()=> setarestado('atualizando')}style={styles.btmAnotacao}><Text style={styles.btmAnotacaTexto}>+</Text></TouchableOpacity>
    :
    <TouchableOpacity onPress={()=> setarestado('atualizando')}style={styles.btmAnotacaoeditar}><Text style={styles.btmAnotacaTexto}>Editar</Text></TouchableOpacity>
    }
    </View>
  );
  }else if (estado=='atualizando') {
        
  return (
    <View style={{flex:1}}>
      <StatusBar style = "light" />

    <View style={styles.header} ><Text style={styles.textoHeader}>Aplicativo da anotação</Text></View>
    <TextInput autoFocus={true} onChangeText={(text)=> setaranotacao(text)} multiline={true} numberOfLines={5} value={anotacao} style={{textAlignVertical:'top', height:300, padding:20}}></TextInput>
    <TouchableOpacity  onPress={()=> salvar()}style={styles.btmAnotacaosalvar}><Text style={styles.btmAnotacaTexto}>Salvar</Text></TouchableOpacity>
    </View>
  );
  }
}
const styles = StyleSheet.create({
  header:{
    width: '100%',
    padding: 20,
    backgroundColor: '#069'
  }, textoHeader: {
    textAlign: 'center',
    color: 'white', 
    fontSize: 18
  },
  btmAnotacao: {
    position: 'absolute',
    right:20,
    bottom:20,
    width:50,
    height: 50,
    backgroundColor:"#069",
    borderRadius: 25
  },
  btmAnotacaosalvar: {
    position: 'absolute',
    right:20,
    bottom:20,
    width:150,
    height: 50,
    backgroundColor:"#5db505",
    borderRadius : 10
  },
  btmAnotacaTexto: {
    textAlign:'center',
    color:'white',
    position: 'relative',
    fontSize: 35,
    top: 0

  },
  btmAnotacaoeditar: {
    position: 'absolute',
    right:20,
    bottom:20,
    width:150,
    height: 50,
    backgroundColor:"#eb4034",
    borderRadius : 10
  }
  
});
