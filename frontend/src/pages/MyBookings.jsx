import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await apiService.getBookingHistory();
      setBookings(response.data.bookings);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-600 hover:underline"
          >
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 mb-4">No bookings yet</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Book a Service
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {booking.service_icon} {booking.service_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Booking ID: {booking.booking_id}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {booking.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Address</p>
                    <p className="font-medium">{booking.service_address}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Arrival Time</p>
                    <p className="font-medium">
                      {new Date(booking.estimated_arrival).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
