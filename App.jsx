import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Header from './assets/components/header';
import Formulario from './assets/components/Formulario';

export default function App() {
  return (
    <>
    <Header />
    <Image 
    style={styles.imagen}
    source={require('../CriptomonedasProject/assets/img/criptomonedas.png')}/>
    <View style={styles.contenido}>
      <Formulario />
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
