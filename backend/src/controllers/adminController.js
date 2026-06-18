const User = require('../models/User');

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'authProvider', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      success: true,
      count: users.length,
      users: users
    });
  } catch (error) {
    console.error('[Admin] Erreur:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la récupération des utilisateurs.' 
    });
  }
};

// Récupérer les statistiques
exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const googleUsers = await User.count({ where: { authProvider: 'google' } });
    const localUsers = await User.count({ where: { authProvider: 'local' } });
    
    res.json({
      success: true,
      stats: {
        totalUsers,
        googleUsers,
        localUsers
      }
    });
  } catch (error) {
    console.error('[Admin] Erreur stats:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la récupération des statistiques.' 
    });
  }
};