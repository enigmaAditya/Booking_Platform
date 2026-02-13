const pool = require('../../db/connection');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const result = await pool.query(
      'SELECT * FROM services ORDER BY category, name'
    );
    
    res.status(200).json({
      success: true,
      services: result.rows
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      hint: 'Check your DATABASE_URL and ensure the "services" table exists.'
    });
  }
};
