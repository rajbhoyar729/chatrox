'use client';
import { on } from 'events';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {io ,Socket} from 'socket.io-client'

interface SocketContextProps {
    children ?: React.ReactNode;
}

interface ISocketContext{
    sendMessage:(msg:string)=>any;
    messages :string[];
}

const  SocketContext = React.createContext<ISocketContext|null>(null);

export const useSocket = () =>{
    const state = useContext(SocketContext);
    if(!state) throw new Error('state is undefined');

    return state;
};

export const SocketProvider: React.FC<SocketContextProps> = ({children}) => {
    const [socket ,setSocket] = useState<Socket>()
    const [messages, setMessage] = useState<string[]>([])  

    const sendMessage: ISocketContext["sendMessage"] = useCallback(
        (msg) => {
          console.log("Send Message", msg);
          if (socket){
            socket.emit('event:message',{ message:msg})
          }
   },[socket]);

   const  onMessageRec =  useCallback((msg:string)=>{
   console.log('from server msg rec',msg)  
   const {message} = JSON.parse(msg)  as {message:string}  
   setMessage((prev)=>[...prev, message]);
},[]);


    useEffect(()=>{
        const _socket = io('https://chatrox.onrender.com');
        setSocket(_socket)
        
        _socket.on("message",onMessageRec);

        return () => {
            _socket.disconnect();
            _socket.off("message",onMessageRec);
            setSocket(undefined)
        };
    
    },[])

    return(
        <SocketContext.Provider value={ {sendMessage, messages} }>{ children}</SocketContext.Provider>
    );
} 