/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', { transports: ['websocket'] });

socket.on('connect', () => {
  console.log('connected:', socket.id);
});

socket.emit('client-info', {
    deviceName: "e2e-test-script",
    timestamp: getTimestamp()
});

socket.on('health-poll-response', (payload) => console.log('health:', payload));
socket.on('client-info:ack', (msg)=> console.log('client-info:ack', msg));


function getTimestamp(){
    return new Date().toLocaleString('en-SG', {
        timeZone: 'Asia/Singapore',
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
}
