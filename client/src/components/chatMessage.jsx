import React from 'react';
import { Bot, User } from 'lucide-react';
import '../styles/chatMessage.css'; 

export function ChatMessage({ message, isBot }) {
  return (
    <div className={`chat-message ${isBot ? 'bot-message' : 'user-message'}`}>
      <div className="avatar">
        {isBot ? <Bot size={20} className="icon" /> : <User size={20} className="icon" />}
      </div>
      <div className="message-content">
        <p>{message}</p>
      </div>
    </div>
  );
}
