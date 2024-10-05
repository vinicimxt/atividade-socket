import React, {useState, useEffect} from 'react';
import { TextInput, Text, Pressable, View, FlatList} from 'react-native'

export default function Message() {
    const [mesage, setMessage] = useState('')
    const [mesageList, setMessageList] = useState('') //responsavel por carregar a lista de mensagens

    function sendMessage(){

    }

    return (
        <View>
            <Text>Digite uma mensagem:</Text>
            <TextInput/>

            <Pressable
                title="Enviar"
                onPress={() => sendMessage()}
            />

            <Text>Mensagens enviadas:</Text>
            <FlatList
                data={messageList.reverse()}
                renderItem={({item}) =>{
                    return (
                        <Text>{item}</Text>
                    )
                }}
                keyExtractor= {(item) =>{item}}
            />
        </View>
    );
}

