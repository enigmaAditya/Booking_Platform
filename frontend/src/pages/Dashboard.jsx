import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import ServiceCard from '../components/Services/ServiceCard';

export default function Dashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await apiService.getServices();
      setServices(response.data.services);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">BookingPlatform</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/bookings')}
              className="text-gray-700 hover:text-blue-600"
            >
              My Bookings
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-2">Available Services</h2>
        <p className="text-gray-600 mb-8">Choose a service to book instantly</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service}
              onSelect={(s) => navigate('/book', { state: { service: s } })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
