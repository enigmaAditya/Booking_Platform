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

function generateBookingId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `BK-${date}-${random}`;
}

function calculateEstimatedArrival() {
  const now = new Date();
  return new Date(now.getTime() + 15 * 60 * 1000); // +15 min
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebase_uid = decodedToken.uid;
    const userEmail = decodedToken.email;
    const userName = decodedToken.name || 'User';

    const { service_id, service_address, booking_date, notes } = req.body;

    // Get or create user
    let userResult = await pool.query(
      'SELECT id FROM users WHERE firebase_uid = $1',
      [firebase_uid]
    );

    let userId;
    if (userResult.rows.length === 0) {
      const newUser = await pool.query(
        'INSERT INTO users (firebase_uid, email, name) VALUES ($1, $2, $3) RETURNING id',
        [firebase_uid, userEmail, userName]
      );
      userId = newUser.rows[0].id;
    } else {
      userId = userResult.rows[0].id;
    }

    const bookingId = generateBookingId();
    const estimatedArrival = calculateEstimatedArrival();

    const booking = await pool.query(
      `INSERT INTO bookings 
       (booking_id, user_id, service_id, service_address, booking_date, estimated_arrival, notes, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [bookingId, userId, service_id, service_address, booking_date || new Date(), 
       estimatedArrival, notes || '', 'confirmed']
    );

    const service = await pool.query('SELECT * FROM services WHERE id = $1', [service_id]);

    res.status(201).json({
      success: true,
      booking: {
        ...booking.rows[0],
        service: service.rows[0]
      }
    });
  } catch (error) {
    console.error('Booking Creation Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      hint: 'Ensure all tables (users, bookings) exist and FIREBASE_PRIVATE_KEY is correct.'
    });
  }
};
