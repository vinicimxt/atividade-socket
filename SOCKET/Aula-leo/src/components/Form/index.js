import { React, useState } from "react";
import { TextInput, Text, View, Pressable, FlatList } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form()
{
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [messageImc, setMessageImc] = useState("Preencha o peso e a altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");

    const [imcList, setImcList] = useState([]);

    function imcCalculator()
    {
        let totalImc = (weight/(height*height)).toFixed(2)

        setImcList((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])

        setImc(totalImc);
    }

    function validatorImc()
    {
        console.log(imcList)
        if (weight != null && height != null) {
            imcCalculator()
            setHeight()
            setWeight()
            setMessageImc("Seu IMC é igual: ")
            setTextButton("Calcular novamente")
        } else {
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("preencha o peso e a altura")
        }        
    }

    return(
        <View style={styles.formContext}>
            
            {imc == null ? 
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput 
                    onChangeText={setHeight} 
                    placeholder="Ex.: 1.75" 
                    inputMode="numeric" 
                    value={height}
                    style={styles.formInput}
                />

                <Text style={styles.formLabel}>Peso</Text>
                <TextInput 
                    onChangeText={setWeight} 
                    placeholder="Ex.: 67.5" 
                    inputMode="numeric"
                    value={weight}
                    style={styles.formInput}
                />

                <Pressable
                    title={textButton} 
                    onPress={() => validatorImc()}
                    style={styles.formButton}
                >
                    <Text style={styles.formButtonText}>{textButton}</Text>
                </Pressable>
            </View>
            : 
            <View style={styles.showImc}>
                <ResultImc messageResultImc={messageImc} resultImc={imc}/>
                <Pressable
                    title={textButton} 
                    onPress={() => validatorImc()}
                    style={styles.formButton}
                >
                    <Text style={styles.formButtonText}>{textButton}</Text>
                </Pressable>
            </View>
            }

            <FlatList 
                style={styles.imcList}
                data={imcList.reverse()}
                renderItem={({item}) => {
                    return (
                        <Text style={styles.imcListItem}>
                            <Text style={styles.imcListItemText}>Resultados IMC = </Text>
                            {item.imc}
                        </Text>
                    )
                }}
                keyExtractor={(item) => {
                    item.id
                }}
            />
        </View>
    );
}
