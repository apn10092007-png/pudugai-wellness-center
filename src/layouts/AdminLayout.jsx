import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  UserCheck,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  AlertTriangle,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './AdminLayout.css';

export default function AdminLayout() {
  const { user, loading, logout, isDemoMode } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Home Page Settings', path: '/admin/home-settings', icon: <ImageIcon size={18} /> },
    { label: 'Services', path: '/admin/services', icon: <Layers size={18} /> },
    { label: 'Success Stories', path: '/admin/success-stories', icon: <Sparkles size={18} /> },
    { label: 'Coach & About', path: '/admin/about', icon: <UserCheck size={18} /> },
    { label: 'Enquiries', path: '/admin/enquiries', icon: <Mail size={18} /> },
    { label: 'Settings & DB', path: '/admin/settings', icon: <Settings size={18} /> }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-root">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-brand">
            <img src="/assets/pwc-logo.jpeg" alt="PWC" className="admin-brand-logo" />
            <div className="admin-brand-info">
              <span className="admin-brand-name">PWC Portal</span>
              <span className="admin-brand-badge">Management</span>
            </div>
          </Link>
          <button className="admin-sidebar-close" onClick={closeSidebar}>
            <X size={20} />
          </button>
        </div>

        {/* Demo Mode Notice Banner */}
        {isDemoMode && (
          <div className="admin-demo-alert">
            <AlertTriangle size={15} />
            <span>Local Preview Mode</span>
          </div>
        )}

        <nav className="admin-nav-menu">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-link ${active ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-card">
            <div className="admin-avatar">
              {user.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="admin-user-info">
              <span className="admin-user-email" title={user.email}>
                {user.email}
              </span>
              <span className="admin-user-role">Administrator</span>
            </div>
          </div>

          <div className="admin-sidebar-actions">
            <Link to="/" target="_blank" className="admin-action-btn view-site">
              <ExternalLink size={15} />
              <span>View Public Site</span>
            </Link>
            <button onClick={handleLogout} className="admin-action-btn logout">
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content */}
      <div className="admin-main-wrap">
        <header className="admin-topbar">
          <button
            className="admin-mobile-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>

          <div className="admin-topbar-title">
            <span>Pudugai Wellness Center — Admin Control Panel</span>
          </div>

          <div className="admin-topbar-right">
            <Link to="/" target="_blank" className="btn btn-outline btn-sm">
              <ExternalLink size={14} />
              <span>Live Website</span>
            </Link>
          </div>
        </header>

        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && <div className="admin-overlay" onClick={closeSidebar}></div>}
    </div>
  );
}
