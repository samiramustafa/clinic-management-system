import React, { useState, useRef, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

function ChatBot() {
    // State management
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Welcome! How can I assist you with your clinic needs today?", sender: "bot", timestamp: new Date() }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Load/save chat history
    useEffect(() => {
        const savedChat = localStorage.getItem('clinic_chat_history');
        if (savedChat) {
            try {
                const parsedChat = JSON.parse(savedChat);
                // Convert string timestamps back to Date objects
                const chatWithDates = parsedChat.map(msg => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
                setMessages(chatWithDates);
            } catch (e) {
                console.error("Failed to load chat history", e);
            }
        }
    }, []);

    useEffect(() => {
        if (messages.length > 1) {
            localStorage.setItem('clinic_chat_history', JSON.stringify(messages));
        }
    }, [messages]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // AI Response Handler
    const getAIResponse = async (userMessage) => {
        setIsTyping(true);
        try {
            const response = await axios.post(
                "http://localhost:8000/chat/api/",  // Matches your Django URL config
                { message: userMessage },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                }
            );
            return response.data.reply || "I'm processing your request...";
        } catch (error) {
            console.error("Chat API Error:", error);
            if (error.response?.status === 401) {
                return "Please login to continue chatting with our support team.";
            }
            return "Our chat service is temporarily unavailable. Please try again later.";
        } finally {
            setIsTyping(false);
        }
    };

    // Message handling
    const handleSendMessage = async () => {
        const trimmedMessage = inputMessage.trim();
        if (!trimmedMessage || isTyping) return;

        // Add user message
        const userMessage = { 
            text: trimmedMessage, 
            sender: "user", 
            timestamp: new Date() 
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage("");

        // Get AI response
        const aiResponse = await getAIResponse(trimmedMessage);
        
        // Add AI response
        setMessages(prev => [
            ...prev, 
            { 
                text: aiResponse, 
                sender: "bot", 
                timestamp: new Date() 
            }
        ]);
    };

    return (
        <div>
            {/* Original "Chat me" button - unchanged */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        backgroundColor: '#13C5DD',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        zIndex: 1000
                    }}
                >
                    <i className="bi bi-chat-dots"></i>
                    <span>Chat me</span>
                </button>
            )}

            {/* Original chat window - unchanged styling */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '300px',
                    height: '400px',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1000
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <h5 style={{ margin: 0 }}>Clinic Support</h5>
                        <button 
                            onClick={() => setIsOpen(false)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            <i className="bi bi-x"></i>
                        </button>
                    </div>

                    {/* Message area */}
                    <div style={{
                        flex: 1,
                        padding: '10px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {messages.map((msg, index) => (
                            <div 
                                key={index}
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    marginBottom: '8px',
                                    padding: '8px 12px',
                                    borderRadius: msg.sender === 'user' 
                                        ? '15px 15px 0 15px' 
                                        : '15px 15px 15px 0',
                                    backgroundColor: msg.sender === 'user' 
                                        ? '#007bff' 
                                        : '#f0f0f0',
                                    color: msg.sender === 'user' ? 'white' : 'black'
                                }}
                            >
                                {msg.text}
                                <div style={{
                                    fontSize: '0.7em',
                                    opacity: 0.7,
                                    textAlign: 'right',
                                    marginTop: '3px'
                                }}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div style={{
                                alignSelf: 'flex-start',
                                maxWidth: '80%',
                                marginBottom: '8px',
                                padding: '8px 12px',
                                borderRadius: '15px 15px 15px 0',
                                backgroundColor: '#f0f0f0'
                            }}>
                                <span style={{ animation: 'typing 1s infinite' }}>•••</span>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>
                    
                    {/* Input area */}
                    <div style={{
                        padding: '10px',
                        borderTop: '1px solid #eee',
                        display: 'flex'
                    }}>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type your message..."
                            style={{
                                flex: 1,
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '20px',
                                marginRight: '8px',
                                outline: 'none'
                            }}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={isTyping}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: isTyping ? '#ccc' : '#007bff',
                                color: 'white',
                                border: 'none',
                                cursor: isTyping ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background-color 0.3s'
                            }}
                        >
                            <i className="bi bi-send"></i>
                        </button>
                    </div>

                    <style>{`
                        @keyframes typing {
                            0%, 100% { opacity: 0.4; }
                            50% { opacity: 1; }
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
}

export default ChatBot;