import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Picker } from '@react-native-community/picker';
import axios from 'axios';

const Formulario = () => {

    const [moneda, guardarMoneda] = useState('');
    const [criptomoneda, guardarCriptoMoneda] = useState('');
    const [criptomonedas, guardarCriptoMonedas] = useState('');

    
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptoMonedas(resultado.data.Data);
        }
        consultarAPI();
    }, [])
    

    const obtenerMoneda = moneda => {
        guardarMoneda(moneda)
    }
    return(
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={ moneda=> obtenerMoneda(moneda)}
            >
                <Picker.Item  label="- Seleccione -" value=""/>
                <Picker.Item  label="Dólar de Estados Unidos" value="USD"/>
                <Picker.Item  label="Peso Mexicano" value="MXN"/>
                <Picker.Item  label="Euro" value="EUR"/>
                <Picker.Item  label="Libra Esterlina" value="GBP"/>
            </Picker>
            <Text style={styles.label}>Criptomonedas</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={ moneda=> obtenerMoneda(moneda)}
            >
                <Picker.Item  label="- Seleccione -" value=""/>
 
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 22,
        marginVertical: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});

export default Formulario;