const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Évite de polluer le terminal avec les requêtes SQL brutes
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('[Database] Connexion à PostgreSQL réussie avec Sequelize.');
    
    // Synchronise les modèles avec la base de données (crée les tables si elles n'existent pas)
    await sequelize.sync({ force: false }); 
    console.log('[Database] Tables synchronisées.');
  } catch (error) {
    console.error('[Database] Impossible de se connecter à la base de données:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };