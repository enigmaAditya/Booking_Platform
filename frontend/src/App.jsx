import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import BookService from './pages/BookService';
import BookingConfirmation from './components/Booking/BookingConfirmation';
import MyBookings from './pages/MyBookings';

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/book" element={<ProtectedRoute><BookService /></ProtectedRoute>} />
        <Route path="/confirmation" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
        <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
