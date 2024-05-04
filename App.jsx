import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Header from './assets/components/header';
import Formulario from './assets/components/Formulario';
import axios from 'axios';

export default function App() {

  
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptoMoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false);

  useEffect(() =>{
      const cotizarCriptomoneda = async () => {
        if(consultarAPI){
          //Consultar la API para la cotización
          const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${criptomoneda}&tsyms=${moneda}`
          const resultado = await axios.get(url);

          console.log(resultado.data.DISPLAY)

          guardarConsultarAPI(false);
        }

      }
      cotizarCriptomoneda();
  }, [consultarAPI])
  return (
    <>
    <Header />
    <Image 
    style={styles.imagen}
    source={require('../CriptomonedasProject/assets/img/criptomonedas.png')}/>
    <View style={styles.contenido}>
      <Formulario 
        moneda={moneda}
        criptomoneda={criptomoneda}
        guardarMoneda={guardarMoneda}
        guardarCriptoMoneda={guardarCriptoMoneda}
      />
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2.5%'
  },
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  }
});
