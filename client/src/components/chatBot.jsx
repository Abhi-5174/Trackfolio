import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, BotMessageSquare } from 'lucide-react';
import { chat } from '../lib/gemini';
import { ChatMessage } from './chatMessage';
import '../styles/chatBot.css';

const suggestedQuestions = [
  { question: "What is Trackfolio?", answer: "Trackfolio is an investment portfolio tracker that helps users manage stocks, crypto, and other assets in real-time." },
  { question: "How do I add an asset to my portfolio?", answer: "You can add assets by clicking on the 'Add Asset' button in the dashboard and entering the required details." },
  { question: "Does Trackfolio provide real-time market data?", answer: "Yes! Trackfolio integrates with live market data APIs to keep your portfolio updated with real-time values." },
  { question: "Can I compare assets in Trackfolio?", answer: "Yes, Trackfolio allows you to compare multiple assets side by side to analyze their performance over time." },
  { question: "Is my data secure on Trackfolio?", answer: "Absolutely! Trackfolio ensures the security of user data with encryption and secure authentication." }
];

export function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [showFloatingMessage, setShowFloatingMessage] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFloatingMessage(false);
    }, 10000); 
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setShowInitialMessage(false);
    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await chat(userMessage);
      setMessages((prev) => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: 'Oops! Something went wrong. Please try again.', isBot: true }]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleSuggestedQuestion = (question, answer) => {
    setMessages((prev) => [...prev, { text: question, isBot: false }, { text: answer, isBot: true }]);
    setShowInitialMessage(false);
  };

  // Refresh Chat
  const handleRefresh = () => {
    setMessages([]);
    setShowInitialMessage(true);
  };

  return (
    <div>
     
      {showFloatingMessage && (
        <div className="floating-message">Hey, I'm Trackfolio AI! ✨ If you need any help, tell me.</div>
      )}

      {/* Chatbot Floating Icon */}
      <button className="chatbot-icon" onClick={toggleChat}>
        <BotMessageSquare size={30} />
      </button>

      {/* Chatbox Container */}
      <div style={{ borderRadius:"12px"}} className={`chatbot-container ${isChatOpen ? 'show' : ''}`}>
        <header style={{ borderTopLeftRadius:"12px", borderTopRightRadius:"12px"}} className="chatbot-header">
          <span>Trackfolio AI Chatbot ✨</span>
          <button className="refresh-btn" onClick={handleRefresh}>🔄 Refresh</button>
          <button className="close-btn" onClick={toggleChat}>×</button>
        </header>

        <div className="chatbot-messages">
          {showInitialMessage && messages.length === 0 && (
            <div className="initial-message fade-in">I am the Trackfolio AI ✨ Chat. How can I help you? 🤖</div>
          )}

          {/* Suggested Questions */}
          {messages.length === 0 && (
            <div className="suggested-questions">
              {suggestedQuestions.map((q, index) => (
                <button key={index} onClick={() => handleSuggestedQuestion(q.question, q.answer)} className="suggested-question">
                  {q.question}
                </button>
              ))}
            </div>
          )}

          {messages.map((message, index) => (
            <ChatMessage key={index} message={message.text} isBot={message.isBot} />
          ))}

          {isLoading && (
            <div className="loading-dots">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <footer style={{ borderBottomLeftRadius:"12px", borderBottomRightRadius:"12px"}} className="chatbot-footer">
          <form onSubmit={handleSubmit} className="chatbot-form">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShowInitialMessage(false);
              }}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              <SendHorizontal size={20} />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
