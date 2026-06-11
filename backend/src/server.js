const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const adminRoutes = require('./routes/adminRoutes'); // ⬅️ AJOUTER

// Charger les variables d'environnement EN PREMIER
dotenv.config();

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middlewares
app.use(cors({ 
    origin: FRONTEND_URL, 
    credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session (OBLIGATOIRE pour passport)
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_super_securise',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connexion à la base de données
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes); // ⬅️ AJOUTER - pour la liste des utilisateurs

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'API testhack fonctionne !' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});