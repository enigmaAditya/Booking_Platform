const { Pool } = require('pg');

module.exports = async (req, res) => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL.replace(/\/neondb/, '/postgres'),
    ssl: { rejectUnauthorized: false }
  });

  try {
    const result = await pool.query('SELECT datname FROM pg_database WHERE datistemplate = false;');
    res.status(200).json({
      success: true,
      databases: result.rows.map(r => r.datname),
      current_url_host: process.env.DATABASE_URL.split('@')[1]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  } finally {
    await pool.end();
  }
};
