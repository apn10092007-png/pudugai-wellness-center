import React, { useEffect, useState } from 'react';
import {
  Search,
  Trash2,
  Phone,
  MessageSquare,
  Eye,
  X,
  AlertTriangle
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import './AdminEnquiriesPage.css';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadEnquiries = async () => {
    try {
      const data = await dataService.getAllEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const openDetailModal = (enq) => {
    setSelectedEnquiry(enq);
    setDetailModalOpen(true);
  };

  const openDeleteModal = (enq) => {
    setSelectedEnquiry(enq);
    setDeleteModalOpen(true);
  };

  const handleStatusChange = async (enquiryId, newStatus) => {
    setActionLoading(true);
    try {
      await dataService.updateEnquiryStatus(enquiryId, newStatus);
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
      await loadEnquiries();
    } catch (err) {
      alert(err.message || 'Failed to update enquiry status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEnquiry) return;
    setActionLoading(true);
    try {
      await dataService.deleteEnquiry(selectedEnquiry.id);
      setDeleteModalOpen(false);
      setDetailModalOpen(false);
      await loadEnquiries();
    } catch (err) {
      alert(err.message || 'Failed to delete enquiry.');
    } finally {
      setActionLoading(false);
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchStatus = statusFilter === 'all' || e.status === statusFilter;
    const matchSearch =
      e.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.toLowerCase().includes(search.toLowerCase()) ||
      e.message.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="admin-enquiries-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Client Enquiry Management</h1>
          <p className="admin-page-subtitle">
            Private visitor submissions. Call or message leads directly and track consultation progress.
          </p>
        </div>
      </div>

      {/* Control Strip */}
      <div className="admin-controls-card">
        <div className="controls-row">
          <div className="search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, phone or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input search-input"
            />
          </div>

          <div className="status-tabs-group">
            {['all', 'new', 'contacted', 'completed'].map((st) => (
              <button
                key={st}
                className={`status-tab-btn ${statusFilter === st ? 'active' : ''}`}
                onClick={() => setStatusFilter(st)}
              >
                <span>{st.toUpperCase()}</span>
                <span className="count-badge">
                  {st === 'all'
                    ? enquiries.length
                    : enquiries.filter((e) => e.status === st).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Message Snippet</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                  <div className="spinner" style={{ margin: '0 auto 0.5rem' }}></div>
                  <p>Loading enquiries...</p>
                </td>
              </tr>
            ) : filtered.length > 0 ? (
              filtered.map((enq) => (
                <tr key={enq.id}>
                  <td>
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                      className={`status-select ${enq.status}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <strong>{enq.customer_name}</strong>
                  </td>
                  <td>
                    <a href={`tel:${enq.phone}`} className="phone-link">
                      <Phone size={13} />
                      <span>{enq.phone}</span>
                    </a>
                  </td>
                  <td>
                    <p className="table-desc-truncate">{enq.message}</p>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
                    {new Date(enq.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <a
                        href={`https://wa.me/91${enq.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-action whatsapp"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare size={15} />
                      </a>
                      <button
                        onClick={() => openDetailModal(enq)}
                        className="btn-action view"
                        title="View Full Details"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(enq)}
                        className="btn-action delete"
                        title="Delete Enquiry"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3.5rem' }}>
                  <p>No enquiries found for this filter.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Enquiry Detail Modal */}
      {detailModalOpen && selectedEnquiry && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h3>Enquiry Details</h3>
              <button onClick={() => setDetailModalOpen(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>

            <div className="enquiry-modal-body">
              <div className="detail-status-bar">
                <span className="detail-label">Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                  className={`status-select ${selectedEnquiry.status}`}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                </select>
                <span className="date-received">
                  Received on {new Date(selectedEnquiry.created_at).toLocaleString()}
                </span>
              </div>

              <div className="enquiry-field-card">
                <span className="field-title">Customer Full Name</span>
                <p className="field-val highlight">{selectedEnquiry.customer_name}</p>
              </div>

              <div className="enquiry-field-card">
                <span className="field-title">Phone Number</span>
                <div className="phone-connect-row">
                  <p className="field-val">{selectedEnquiry.phone}</p>
                  <div className="connect-btn-group">
                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      className="btn btn-primary btn-sm"
                    >
                      <Phone size={13} />
                      <span>Call Client</span>
                    </a>
                    <a
                      href={`https://wa.me/91${selectedEnquiry.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                    >
                      <MessageSquare size={13} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="enquiry-field-card">
                <span className="field-title">Message / Wellness Goal</span>
                <p className="field-val message-box">{selectedEnquiry.message}</p>
              </div>

              <div className="modal-actions-bar" style={{ justifyContent: 'space-between' }}>
                <button
                  type="button"
                  onClick={() => openDeleteModal(selectedEnquiry)}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 size={14} />
                  <span>Delete Enquiry</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDetailModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && selectedEnquiry && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '440px' }}>
            <div className="delete-modal-body">
              <div className="delete-warning-icon">
                <AlertTriangle size={32} />
              </div>
              <h3>Delete Client Enquiry?</h3>
              <p>
                Are you sure you want to permanently delete the enquiry from{' '}
                <strong>"{selectedEnquiry.customer_name}"</strong>?
              </p>
              <div className="modal-actions-bar" style={{ justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={actionLoading}
                  className="btn btn-danger"
                >
                  {actionLoading ? 'Deleting...' : 'Yes, Delete Permanently'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
