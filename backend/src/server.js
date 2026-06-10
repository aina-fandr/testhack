const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// Charger les variables d'environnement EN PREMIER
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

// Session (OBLIGATOIRE pour passport)
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_super_securise',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  // true si HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24h
    }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connexion à la base de données
connectDB();

// Routes
app.use('/auth', authRoutes);

// Route de test
app.get('/', (req, res) => {
    res.json({ message: 'API testhack fonctionne !' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});