import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import CreateProperty from './pages/CreateProperty';
import SearchResults from './pages/SearchResults';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { setUser } from './store/slices/authSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to validate the token with the backend
      // For now, we'll just check if it exists
      const userData = localStorage.getItem('user');
      if (userData) {
        dispatch(setUser(JSON.parse(userData)));
      }
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-property"
            element={
              <ProtectedRoute>
                <CreateProperty />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
