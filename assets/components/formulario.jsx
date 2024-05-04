import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, TouchableHighlight, Alert } from "react-native";
import { Picker } from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({moneda, criptomoneda, guardarMoneda, guardarCriptoMoneda, guardarConsultarAPI}) => {

    const [criptomonedas, guardarCriptoMonedas] = useState([]);

    
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptoMonedas(resultado.data.Data);
        }
        consultarAPI();
    }, [])
    
    //Almacena las selecciones del usuario
    const obtenerMoneda = moneda => {
        guardarMoneda(moneda)
    }

    const obtenerCriptoMoneda = cripto => {
        guardarCriptoMoneda(cripto)
    }

    const cotizarPrecio = () =>{
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            mostrarAlerta();
            return;
        }

        //Cambia el state de consultar api
        guardarConsultarAPI(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Ambos campos son obligatorios',
            [
                {text: 'OK'}
            ]
        )
    }

    return(
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={ moneda=> obtenerMoneda(moneda)}
                itemStyle={{ height : 120 }}
            >
                <Picker.Item  label="- Seleccione -" value=""/>
                <Picker.Item  label="Dólar de Estados Unidos" value="USD"/>
                <Picker.Item  label="Peso Mexicano" value="MXN"/>
                <Picker.Item  label="Euro" value="EUR"/>
                <Picker.Item  label="Libra Esterlina" value="GBP"/>
            </Picker>
            <Text style={styles.label}>Criptomonedas</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={ cripto=> obtenerCriptoMoneda(cripto)}
                itemStyle={{ height : 120 }}
            >
                <Picker.Item  label="- Seleccione -" value=""/>
                { criptomonedas.map( cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name}/>
                )) }
 
            </Picker>

            <TouchableHighlight 
            style={styles.btnCotizar}
            onPress={ () => cotizarPrecio()}>
                <Text style={styles.textCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 22,
        marginVertical: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
    },
    textCotizar: {
        color: '#FFF',
        fontSize: 18,
        textTransform: 'uppercase',
        textAlign: 'center'
    }
});

export default Formulario;