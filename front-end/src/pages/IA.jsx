// src/pages/IA.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaSpinner } from 'react-icons/fa';

export default function IA() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant IA. Posez-moi toutes vos questions ! 🤖",
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
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = {
      'bonjour': 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
      'ça va': 'Ça va très bien, merci ! Et vous ?',
      'merci': 'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions.',
      'aide': 'Je peux vous aider avec :\n- Répondre à vos questions\n- Vous guider dans l\'application\n- Vous donner des informations sur Madagascar\n- Discuter avec vous !',
      'madagascar': 'Madagascar est une île magnifique ! Voulez-vous en savoir plus sur les villes, la culture, ou les lieux touristiques ?',
      'carte': 'Vous pouvez voir la carte de Madagascar dans l\'onglet "Carte" du menu !',
      'au revoir': 'Au revoir ! À bientôt sur notre plateforme ! 👋',
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    return "Intéressant ! Pouvez-vous m'en dire plus ? Ou posez-moi une question sur Madagascar, l'application, ou simplement discuter ! 😊";
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

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-800">Assistant IA 🤖</h1>
        <p className="text-gray-500 text-sm">Posez-moi des questions, je suis là pour vous aider !</p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-blue-500' : 'bg-purple-500'
                }`}>
                  {message.sender === 'user' ? (
                    <FaUser className="text-white text-sm" />
                  ) : (
                    <FaRobot className="text-white text-sm" />
                  )}
                </div>
                
                <div className={`rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[70%]">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <FaRobot className="text-white text-sm" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
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

        <form onSubmit={handleSend} className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message ici..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
            </button>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {['Bonjour', 'Aide', 'Madagascar', 'Carte', 'Merci', 'Au revoir'].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setInput(suggestion)}
                className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}