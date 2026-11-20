import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  UserCheck,
  Mail,
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
  const mobileToggleRef = useRef(null);

  // Close sidebar on Escape key when open
  useEffect(() => {
    if (!sidebarOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        mobileToggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

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
    { label: 'Enquiries', path: '/admin/enquiries', icon: <Mail size={18} /> }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="admin-root">
      {/* Sidebar */}
      <aside
        id="admin-sidebar"
        className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
        aria-label="Admin Navigation Sidebar"
      >
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-brand" aria-label="Go to PWC Homepage">
            <img
              src="https://ggcsfegymkgrvwnexxay.supabase.co/storage/v1/object/public/pwc-public-assets/pwc-logo-transparent%20(1).png"
              alt="Pudugai Wellness Center Logo"
              className="admin-brand-logo"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/assets/pwc-logo.jpeg';
              }}
            />
            <div className="admin-brand-info">
              <span className="admin-brand-name">PWC Portal</span>
              <span className="admin-brand-badge">Management</span>
            </div>
          </Link>
          <button
            className="admin-sidebar-close"
            onClick={() => {
              setSidebarOpen(false);
              mobileToggleRef.current?.focus();
            }}
            aria-label="Close admin navigation sidebar"
          >
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

        <nav className="admin-nav-menu" aria-label="Admin Navigation Menu">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-link ${active ? 'active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={closeSidebar}
              >
                <span className="admin-nav-icon" aria-hidden="true">{item.icon}</span>
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
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-action-btn view-site"
              aria-label="View Public Site (opens in a new tab)"
            >
              <ExternalLink size={15} aria-hidden="true" />
              <span>View Public Site</span>
            </a>
            <button
              onClick={handleLogout}
              className="admin-action-btn logout"
              aria-label="Log Out of Admin Portal"
            >
              <LogOut size={15} aria-hidden="true" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content */}
      <div className="admin-main-wrap">
        <header className="admin-topbar">
          <button
            ref={mobileToggleRef}
            className="admin-mobile-toggle"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open admin sidebar"
            aria-expanded={sidebarOpen}
            aria-controls="admin-sidebar"
          >
            <Menu size={22} />
          </button>

          <div className="admin-topbar-title">
            <span>Pudugai Wellness Center — Admin Control Panel</span>
          </div>

          <div className="admin-topbar-right">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              aria-label="Open Live Website in a new tab"
            >
              <ExternalLink size={14} aria-hidden="true" />
              <span>Live Website</span>
            </a>
          </div>
        </header>

        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
