'use client';
import classes from './page.module.css';
import { useState } from 'react';
import { useSocket } from '../context/SocketProvider';

export default function Home() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className={classes['chat-container']}>
      <h1 className={classes['chat-header']}>Chat App</h1>
      
      <div className={classes['messages-container']}>
        {messages.map((msg, index) => (
          <div key={index} className={classes['message']}>
            {msg}
          </div>
        ))}
      </div>
      
      <div className={classes['chat-input-container']}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={classes['chat-input']}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          className={classes['chat-button']}
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}