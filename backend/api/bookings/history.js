const pool = require('../../db/connection');
const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebase_uid = decodedToken.uid;

    const userResult = await pool.query(
      'SELECT id FROM users WHERE firebase_uid = $1',
      [firebase_uid]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = userResult.rows[0].id;

    const bookings = await pool.query(
      `SELECT 
        b.*,
        s.name as service_name,
        s.category as service_category,
        s.icon as service_icon,
        s.base_price as service_price
       FROM bookings b
       JOIN services s ON b.service_id = s.id
       WHERE b.user_id = $1
       ORDER BY b.created_at DESC`,
      [userId]
    );

    res.status(200).json({
      success: true,
      bookings: bookings.rows
    });
  } catch (error) {
    console.error('History Fetch Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      hint: 'Ensure your firebase credentials are correct and database is connected.'
    });
  }
};
