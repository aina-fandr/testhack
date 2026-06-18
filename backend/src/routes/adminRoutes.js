const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// ⚠️ AUCUN middleware d'authentification - juste pour test

// Récupérer tous les utilisateurs
router.get('/users', adminController.getAllUsers);

// Récupérer les statistiques
router.get('/stats', adminController.getUserStats);

module.exports = router;