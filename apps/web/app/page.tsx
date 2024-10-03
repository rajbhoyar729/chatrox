'use client';
import classes from './page.module.css';
import { useState } from 'react';
import { useSocket } from '../context/SocketProvider';

export default function Home() {
 const { sendMessage } = useSocket();
 const [message, setMessage] = useState('');

 return (
  <div className={classes['chat-container']}>
   <div>
    <h1 className={classes['H']}>All Messages Will Appear Here</h1>
   </div>

   {/* Messages container */}
   <div className={classes['chat-messages']}>
    {/* Here is where the chat messages will appear */}
   </div>

   {/* Input and button */}
   <div className={classes['chat-input-container']}>
    <input
     type="text"
     value={message}
     onChange={(e) => setMessage(e.target.value)}
     className={classes['chat-input']}
     placeholder="Type your message..."
    />
    <button
     className={classes['chat-button']}
     onClick={() => sendMessage(message)}
    >
     Send
    </button>
   </div>
  </div>
 );
}
