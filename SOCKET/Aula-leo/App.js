import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView } from "react-native";
import socket from "./socket"; 

export default function App() {
    const [room1] = useState('room1');
    const [room2] = useState('room2');
    
    const [message1, setMessage1] = useState('');
    const [messages1, setMessages1] = useState([]);

    const [message2, setMessage2] = useState('');
    const [messages2, setMessages2] = useState([]);

    const sendMessage1 = () => {
        if (message1.trim() === '') return;
        console.log('Enviando mensagem para Room 1:', message1);
        socket.emit('send_message', { room: room1, message: message1 });
        setMessage1('');
    };

    const sendMessage2 = () => {
        if (message2.trim() === '') return;
        console.log('Enviando mensagem para Room 2:', message2);
        socket.emit('send_message', { room: room2, message: message2 });
        setMessage2('');
    };

    useEffect(() => {
        socket.emit('join_room', room1);
        socket.emit('join_room', room2);

        socket.on('receive_message', (msg) => {
            console.log('Mensagem recebida:', msg);
            if (msg.room === room1) {
                setMessages1((prev) => [...prev, msg.message]); // Armazena na lista de room2
            } else if (msg.room === room2) {
                setMessages2((prev) => [...prev, msg.message]); // Armazena na lista de room1
            }
        });

        return () => {
            socket.off('receive_message');
        };
    }, [room1, room2]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chris Brown</Text>
            <ScrollView style={styles.messageList}>
                {messages1.map((msg, index) => (
                    <Text key={index}>{msg}</Text>
                ))}
            </ScrollView>
            <TextInput
                placeholder='Digite sua mensagem'
                value={message1}
                onChangeText={setMessage1}
                style={styles.input}
            />
            <Pressable style={styles.button} onPress={sendMessage1}>
                <Text style={styles.buttonText}>Enviar mensagem</Text>
            </Pressable>

            <Text style={styles.title}>Rihanna</Text>
            <ScrollView style={styles.messageList}>
                {messages2.map((msg, index) => (
                    <Text key={index}>{msg}</Text>
                ))}
            </ScrollView>
            <TextInput
                placeholder='Digite sua mensagem'
                value={message2}
                onChangeText={setMessage2}
                style={styles.input}
            />
            <Pressable style={styles.button} onPress={sendMessage2}>
                <Text style={styles.buttonText}>Enviar mensagem</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    messageList: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
    },
});
