const pool = require('../../db/connection');

module.exports = async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({
      success: true,
      time: result.rows[0].now,
      dbStatus: 'Connected'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
