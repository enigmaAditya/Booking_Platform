import { useState } from 'react';
import { apiService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function BookingForm({ service }) {
  const [formData, setFormData] = useState({
    service_address: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiService.createBooking({
        service_id: service.id,
        service_address: formData.service_address,
        booking_date: new Date().toISOString(),
        notes: formData.notes
      });

      navigate('/confirmation', { state: { booking: response.data.booking } });
    } catch (error) {
      alert('Booking failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Book {service.name}</h2>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Service</p>
            <p className="font-semibold">{service.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Price</p>
            <p className="font-semibold text-blue-600">₹{service.base_price}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold">~{service.estimated_duration} min</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Service Address *</label>
          <textarea
            required
            rows={3}
            value={formData.service_address}
            onChange={(e) => setFormData({...formData, service_address: e.target.value})}
            placeholder="Enter your complete address"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Any special requirements or instructions"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-medium"
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}
