import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import Header from './assets/components/header';
import Formulario from './assets/components/Formulario';
import Cotizacion from './assets/components/Cotizacion';
import axios from 'axios';

export default function App() {

  
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptoMoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando]  = useState(false);

  useEffect(() =>{
      const cotizarCriptomoneda = async () => {
        if(consultarAPI){
          //Consultar la API para la cotización
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
          const resultado = await axios.get(url);

          //console.log(resultado.data.DISPLAY[criptomoneda][moneda]);
          guardarCargando(true)

          //Ocultar el spinner y mostrar el resultado
          setTimeout(() => {
            guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
            guardarConsultarAPI(false);
            guardarCargando(false);
          }, 3000);
        }

      }
      cotizarCriptomoneda();
  }, [consultarAPI])

  //mostrar el spinner o el resultado
  const componente = cargando ? <ActivityIndicator size="large" color="#5E49E2" /> : <Cotizacion resultado={resultado} />

  return (
    <>
    <ScrollView>
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
        guardarConsultarAPI={guardarConsultarAPI}
      />
    </View>
    <View style={{ marginTop: 40}}>
    {componente}
    </View>

    </ScrollView>
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
