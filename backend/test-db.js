require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    console.log('Testing connection to:', process.env.DATABASE_URL.split('@')[1]);
    const res = await pool.query('SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != \'pg_catalog\' AND schemaname != \'information_schema\';');
    console.log('Tables found:', res.rows.map(r => r.tablename).join(', '));
    
    if (res.rows.some(r => r.tablename === 'services')) {
      const services = await pool.query('SELECT count(*) FROM services');
      console.log('Services count:', services.rows[0].count);
    } else {
      console.log('CRITICAL: "services" table not found!');
    }
  } catch (err) {
    console.error('Connection Error:', err.message);
  } finally {
    await pool.end();
  }
}

test();
