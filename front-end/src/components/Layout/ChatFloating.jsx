// src/components/ChatFloating.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser, FaSpinner } from 'react-icons/fa';

export default function ChatFloating() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider ? 🤖",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getAIResponse = async (userMessage) => {
        await new Promise(resolve => setTimeout(resolve, 800));

        const responses = {
            'bonjour': 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
            'ça va': 'Ça va très bien, merci ! Et vous ?',
            'merci': 'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions.',
            'aide': 'Je peux vous aider avec :\n- Répondre à vos questions\n- Vous guider dans l\'application\n- Vous donner des informations sur Madagascar\n- Discuter avec vous !',
            'madagascar': 'Madagascar est une île magnifique ! Découvrez la carte dans l\'onglet "Carte" !',
            'carte': 'La carte de Madagascar est disponible dans le menu principal !',
            'au revoir': 'Au revoir ! À bientôt ! 👋',
        };

        const lowerMessage = userMessage.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return "Intéressant ! Pouvez-vous m'en dire plus ? 😊";
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiResponse = await getAIResponse(input);

        const aiMessage = {
            id: Date.now() + 1,
            text: aiResponse,
            sender: 'ai',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    };

    // Dans ChatFloating.jsx, ajoutez cet état
    const [hasNewMessage, setHasNewMessage] = useState(false);

    // Modifiez le bouton flottant
    <button
        onClick={() => {
            setIsOpen(!isOpen);
            setHasNewMessage(false);
        }}
        className="fixed bottom-6 right-6 z-50 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 relative"
    >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}

        {/* Notification */}
        {hasNewMessage && !isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
        )}
    </button>

    return (
        <>
            {/* Bouton flottant */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110"
            >
                {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
            </button>

            {/* Fenêtre de chat flottante */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
                    {/* En-tête */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FaRobot size={20} />
                            <span className="font-semibold">Assistant IA</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 transition"
                        >
                            <FaTimes size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-500' : 'bg-purple-500'
                                        }`}>
                                        {message.sender === 'user' ? (
                                            <FaUser className="text-white text-xs" />
                                        ) : (
                                            <FaRobot className="text-white text-xs" />
                                        )}
                                    </div>

                                    <div className={`rounded-lg p-2 ${message.sender === 'user'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-800 shadow-sm'
                                        }`}>
                                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                                            }`}>
                                            {formatTime(message.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex gap-2">
                                    <div className="flex-shrink-0 w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center">
                                        <FaRobot className="text-white text-xs" />
                                    </div>
                                    <div className="bg-white rounded-lg p-2 shadow-sm">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Zone de saisie */}
                    <form onSubmit={handleSend} className="border-t border-gray-200 p-3 bg-white">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Écrivez votre message..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                            >
                                {isLoading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane size={14} />}
                            </button>
                        </div>

                        {/* Suggestions rapides */}
                        <div className="mt-2 flex flex-wrap gap-1">
                            {['Bonjour', 'Aide', 'Madagascar', 'Carte'].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => setInput(suggestion)}
                                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-full transition"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}