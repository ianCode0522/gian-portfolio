import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getMe } from '../services/api';
import { User } from '../types';
import { 
  FiLogOut, 
  FiHome, 
  FiFileText, 
  FiAward, 
  FiCode,
  FiMenu,
  FiX
} from 'react-icons/fi';
import UpdatesManager from '../components/admin/UpdatesManager';
import CertificatesManager from '../components/admin/CertificatesManager';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState('updates');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await getMe();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      navigate('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'updates':
        return <UpdatesManager />;
      case 'certificates':
        return <CertificatesManager />;
      default:
        return <UpdatesManager />;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h4 className="mb-0">Portfolio Admin</h4>
          <button 
            className="btn btn-link text-white d-md-none"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="sidebar-menu">
          <button
            className={`menu-item ${activeSection === 'updates' ? 'active' : ''}`}
            onClick={() => setActiveSection('updates')}
          >
            <FiFileText className="me-2" />
            Portfolio Updates
          </button>
          <button
            className={`menu-item ${activeSection === 'certificates' ? 'active' : ''}`}
            onClick={() => setActiveSection('certificates')}
          >
            <FiAward className="me-2" />
            Certificates
          </button>
        </div>

        <div className="sidebar-footer">
          <a href="/" className="btn btn-outline-light w-100 mb-2">
            <FiHome className="me-2" />
            View Site
          </a>
          <button onClick={handleLogout} className="btn btn-danger w-100">
            <FiLogOut className="me-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="top-bar">
          <button 
            className="btn btn-link d-md-none"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={24} />
          </button>
          <div className="ms-auto d-flex align-items-center">
            <span className="me-3">Welcome, {user?.name}</span>
          </div>
        </div>

        <div className="content-area">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;