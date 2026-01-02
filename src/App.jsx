// Main App Component with React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Routes with Navbar & Footer */}
          <Route path="/" element={
            <>
              <Navbar />
              <main className="main-content"><Home /></main>
              <Footer />
            </>
          } />
          <Route path="/gallery" element={
            <>
              <Navbar />
              <main className="main-content"><Gallery /></main>
              <Footer />
            </>
          } />
          <Route path="/booking" element={
            <>
              <Navbar />
              <main className="main-content"><Booking /></main>
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <main className="main-content"><Contact /></main>
              <Footer />
            </>
          } />

          {/* Admin Routes without Navbar & Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
