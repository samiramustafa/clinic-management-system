import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Open Chat Button */}
            {!isOpen && (
                <button 
                    className="btn btn-primary chat-button"
                    onClick={() => setIsOpen(true)}
                >
                    <i className="bi bi-chat-dots"></i> Open Chat
                </button>
            )}

            {/* Chat Box */}
            {isOpen && (
                <div className="chat-box">
                    <div className="chat-header bg-primary">
                        <h5>Chat</h5>
                        <button className="btn btn-danger btn-sm" onClick={() => setIsOpen(false)}>
                            <i className="bi bi-x"></i>
                        </button>
                    </div>
                    <div className="chat-content">
                        <p>Welcome! How can I assist you?</p>
                    </div>
                </div>
            )}

            {/* CSS Styling */}
            <style>{`
                .chat-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1000;
                }
                
                .chat-box {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 300px;
                    height: 400px;
                    background: white;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    z-index: 1000;
                }

                .chat-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    background: #007bff;
                    color: white;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }

                .chat-content {
                    flex: 1;
                    padding: 10px;
                    overflow-y: auto;
                }
            `}</style>
        </div>
    );
}

export default ChatBot;
