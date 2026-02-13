const pool = require('../db/connection');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  // Very basic "security" check
  if (req.query.key !== 'admin123') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const schemaPath = path.join(process.cwd(), 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    let results = [];
    for (const statement of statements) {
      try {
        await pool.query(statement);
        results.push({ statement: statement.substring(0, 50) + '...', status: 'Success' });
      } catch (e) {
        results.push({ statement: statement.substring(0, 50) + '...', status: 'Error', message: e.message });
      }
    }
    
    res.status(200).json({
      success: true,
      results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
