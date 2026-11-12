import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import ContactPage from './pages/ContactPage';
import OurStoryPage from './pages/OurStoryPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminHomeSettingsPage from './pages/admin/AdminHomeSettingsPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import AdminSuccessStoriesPage from './pages/admin/AdminSuccessStoriesPage';
import AdminAboutPage from './pages/admin/AdminAboutPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';

function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <span className="section-tag">404 Error</span>
      <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0 1rem' }}>Page Not Found</h1>
      <p style={{ maxWidth: '480px', margin: '0 auto 2rem' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">Return to Homepage</Link>
        <Link to="/contact" className="btn btn-secondary">Contact Center</Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public Customer Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/stories" element={<SuccessStoriesPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/story" element={<Navigate to="/our-story" replace />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="home-settings" element={<AdminHomeSettingsPage />} />
        <Route path="content" element={<AdminHomeSettingsPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="success-stories" element={<AdminSuccessStoriesPage />} />
        <Route path="about" element={<AdminAboutPage />} />
        <Route path="enquiries" element={<AdminEnquiriesPage />} />
        <Route path="settings" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
