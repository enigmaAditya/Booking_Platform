import { useLocation, useNavigate } from 'react-router-dom';
import BookingForm from '../components/Booking/BookingForm';

export default function BookService() {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  if (!service) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <BookingForm service={service} />
    </div>
  );
}
