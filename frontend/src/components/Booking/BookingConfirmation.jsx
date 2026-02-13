import { useLocation, useNavigate } from 'react-router-dom';

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    navigate('/dashboard');
    return null;
  }

  const arrivalTime = new Date(booking.estimated_arrival).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600">Your service request has been confirmed</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                <p className="font-bold text-lg">{booking.booking_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Service</p>
                <p className="font-semibold">{booking.service.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Estimated Arrival</p>
                <p className="font-semibold text-blue-600">{arrivalTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {booking.status}
                </span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600 mb-1">Service Address</p>
              <p className="text-gray-800">{booking.service_address}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200"
            >
              Book Another Service
            </button>
            <button
              onClick={() => navigate('/bookings')}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              View My Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
