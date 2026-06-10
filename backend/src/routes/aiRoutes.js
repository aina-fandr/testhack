const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Route pour le chat IA
router.post('/chat', aiController.chat);

module.exports = router;