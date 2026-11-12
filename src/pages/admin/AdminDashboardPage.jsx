import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Sparkles,
  Mail,
  UserCheck,
  ArrowRight,
  Plus,
  Clock,
  Phone,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import './AdminDashboardPage.css';

export default function AdminDashboardPage() {
  const [services, setServices] = useState([]);
  const [stories, setStories] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      try {
        const [serv, stor, enq, coachesList] = await Promise.all([
          dataService.getAllServices(),
          dataService.getAllSuccessStories(),
          dataService.getAllEnquiries(),
          dataService.getAllCoaches()
        ]);
        if (mounted) {
          setServices(serv);
          setStories(stor);
          setEnquiries(enq);
          setCoaches(coachesList || []);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
        if (mounted) setLoading(false);
      }
    }
    fetchStats();
    return () => { mounted = false; };
  }, []);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;
  const publishedServicesCount = services.filter((s) => s.published).length;
  const publishedStoriesCount = stories.filter((s) => s.published).length;

  if (loading) {
    return (
      <div className="admin-page-loading">
        <div className="spinner"></div>
        <p>Loading dashboard metrics...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard Overview</h1>
          <p className="admin-page-subtitle">
            Welcome to the Pudugai Wellness Center administrative dashboard.
          </p>
        </div>
        <div className="admin-header-actions">
          <Link to="/admin/home-settings" className="btn btn-outline btn-sm">
            <ImageIcon size={15} />
            <span>Hero Image</span>
          </Link>
          <Link to="/admin/services" className="btn btn-primary btn-sm">
            <Plus size={15} />
            <span>Add Service</span>
          </Link>
          <Link to="/admin/success-stories" className="btn btn-secondary btn-sm">
            <Plus size={15} />
            <span>Add Success Story</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="metric-cards-grid">
        <div className="metric-card">
          <div className="metric-icon-wrap green">
            <Layers size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total Services</span>
            <span className="metric-value">{services.length}</span>
            <span className="metric-sub">{publishedServicesCount} Published on Live Site</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap teal">
            <Sparkles size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Success Stories</span>
            <span className="metric-value">{stories.length}</span>
            <span className="metric-sub">{publishedStoriesCount} Active Journeys</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap amber">
            <Mail size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Customer Enquiries</span>
            <span className="metric-value">{enquiries.length}</span>
            <span className="metric-sub">
              {newEnquiriesCount > 0 ? (
                <strong style={{ color: 'var(--color-amber)' }}>{newEnquiriesCount} New unread</strong>
              ) : (
                'All caught up'
              )}
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap purple">
            <UserCheck size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Wellness Coaches</span>
            <span className="metric-value-text">
              {coaches.length > 0 ? coaches.map((c) => c.coach_name).join(' & ') : 'Thangapandian S'}
            </span>
            <span className="metric-sub">Pudukkottai Center</span>
          </div>
        </div>
      </div>

      {/* Dashboard Body Grid: Recent Enquiries & Quick Actions */}
      <div className="dashboard-sections-grid">
        {/* Recent Enquiries Box */}
        <div className="dashboard-box">
          <div className="box-header">
            <div>
              <h2 className="box-title">Recent Client Enquiries</h2>
              <span className="box-subtitle">Direct requests from website visitors</span>
            </div>
            <Link to="/admin/enquiries" className="box-view-all">
              <span>View All ({enquiries.length})</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {enquiries.length > 0 ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Received</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.slice(0, 5).map((enq) => (
                    <tr key={enq.id}>
                      <td>
                        <strong>{enq.customer_name}</strong>
                        {enq.service && (
                          <small style={{ display: 'block', color: 'var(--color-teal)', fontWeight: 600, fontSize: '0.75rem' }}>
                            {enq.service}
                          </small>
                        )}
                      </td>
                      <td>
                        <a href={`tel:${enq.phone}`} className="phone-link">
                          <Phone size={13} />
                          <span>{enq.phone}</span>
                        </a>
                      </td>
                      <td>
                        <span className={`status-badge ${enq.status}`}>
                          {enq.status === 'new' && 'New'}
                          {enq.status === 'contacted' && 'Contacted'}
                          {enq.status === 'completed' && 'Completed'}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                        {new Date(enq.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <Link to="/admin/enquiries" className="btn btn-secondary btn-sm">
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="box-empty-state">
              <p>No customer enquiries received yet.</p>
            </div>
          )}
        </div>

        {/* Coach & Center Overview Box */}
        <div className="dashboard-box">
          <div className="box-header">
            <div>
              <h2 className="box-title">Coach Profile & Site Content</h2>
              <span className="box-subtitle">Dynamic branding & bio settings</span>
            </div>
            <Link to="/admin/about" className="box-view-all">
              <span>Manage Profile</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="coach-quick-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {coaches.map((c) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  paddingBottom: '0.65rem',
                  borderBottom: '1px solid var(--color-border-subtle)'
                }}
              >
                <img
                  src={c.image_path || (c.coach_name?.includes('Thenmozhi') ? '/assets/avatar-thenmozhi.svg' : '/assets/coach-pandian.png')}
                  alt={c.coach_name}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface-alt)'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = c.coach_name?.includes('Thenmozhi') ? '/assets/avatar-thenmozhi.svg' : '/assets/coach-pandian.png';
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-primary)' }}>{c.coach_name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-teal)', fontWeight: 600 }}>{c.title}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: '0.25rem' }}>
              <Link to="/admin/about" className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                Manage Coaches & Bios
              </Link>
            </div>
          </div>

          <div className="quick-links-strip">
            <Link to="/admin/home-settings" className="quick-link-item">
              <ImageIcon size={16} />
              <span>Hero Image Management</span>
            </Link>
            <Link to="/admin/services" className="quick-link-item">
              <Layers size={16} />
              <span>Manage 18+ Programs</span>
            </Link>
            <Link to="/admin/success-stories" className="quick-link-item">
              <Sparkles size={16} />
              <span>Tamil & English Story Form</span>
            </Link>
            <Link to="/admin/enquiries" className="quick-link-item">
              <Mail size={16} />
              <span>Customer Enquiries</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
