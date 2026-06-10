const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Sérialisation : Définit quelle info de l'utilisateur est stockée dans la session (l'ID)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Désérialisation : Récupère l'utilisateur complet depuis la base PostgreSQL via l'ID stocké
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Configuration de la stratégie Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Ajoute cette variable dans ton .env
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      // Récupérer l'email principal fourni par le profil Google
      const email = profile.emails[0].value;
      const name = profile.displayName;

      // Chercher si l'utilisateur existe déjà dans PostgreSQL
      let user = await User.findOne({ where: { email } });

      if (!user) {
        // Inscription automatique si l'utilisateur n'existe pas encore
        user = await User.create({
          name: name,
          email: email,
          password: `GOOGLE_AUTH_${profile.id}` // Placeholder sécurisé pour le champ obligatoire
        });
        console.log(`[Passport] Nouvel utilisateur créé via Google: ${email}`);
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

module.exports = passport;