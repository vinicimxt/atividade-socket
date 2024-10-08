import { io } from "socket.io-client"; //instancia do socket

const SOCKET_URL = 'http://localhost:3000'; //importando o socket

const socket = io(SOCKET_URL, {  // configurando indicando que é um socket
    transports: ['websocket']
});

export default socket; //nem toda requisição gera um evento, exportando instancia

