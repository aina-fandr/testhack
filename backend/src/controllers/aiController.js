const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.chat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        error: 'Le message est obligatoire.' 
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        error: 'GROQ_API_KEY non configurée dans .env' 
      });
    }

    // Construire les messages pour Groq
    const messages = [
      { 
        role: 'system', 
        content: 'Tu es un assistant utile et amical. Réponds en français.' 
      },
      ...history.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content || msg.message
      })),
      { role: 'user', content: message }
    ];

    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1000,
    });

    const reply = completion.choices[0].message.content;

    res.json({
      success: true,
      reply: reply,
      provider: 'groq'
    });

  } catch (error) {
    console.error('[AI] Erreur:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Erreur IA: ' + error.message 
    });
  }
};