import React, { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  AlertTriangle,
  Upload
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import './AdminServicesPage.css';

const CATEGORIES = [
  'Weight Management',
  'Health Screening',
  'Special Programs',
  'Nutrition Guidance',
  'Wellness Solutions'
];

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');

  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Weight Management',
    image_path: '',
    published: true,
    display_order: 0
  });

  const loadServices = async () => {
    try {
      const data = await dataService.getAllServices();
      setServices(data);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openAddModal = () => {
    setCurrentService(null);
    setFormData({
      title: '',
      description: '',
      category: 'Weight Management',
      image_path: '',
      published: true,
      display_order: services.length + 1
    });
    setEditModalOpen(true);
  };

  const openEditModal = (service) => {
    setCurrentService(service);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      image_path: service.image_path || '',
      published: service.published ?? true,
      display_order: service.display_order ?? 0
    });
    setEditModalOpen(true);
  };

  const openDeleteModal = (service) => {
    setCurrentService(service);
    setDeleteModalOpen(true);
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImg(true);
    try {
      const url = await dataService.uploadImage('service-images', file);
      setFormData((prev) => ({ ...prev, image_path: url }));
    } catch (err) {
      alert(err.message || 'Image upload failed.');
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in both service title and description.');
      return;
    }

    setSaving(true);
    try {
      await dataService.saveService({
        ...(currentService ? { id: currentService.id } : {}),
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        image_path: formData.image_path || null,
        published: formData.published,
        display_order: Number(formData.display_order) || 0
      });
      setEditModalOpen(false);
      await loadServices();
    } catch (err) {
      alert(err.message || 'Failed to save service.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentService) return;
    setSaving(true);
    try {
      await dataService.deleteService(currentService.id);
      setDeleteModalOpen(false);
      await loadServices();
    } catch (err) {
      alert(err.message || 'Failed to delete service.');
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (service) => {
    try {
      await dataService.saveService({
        ...service,
        published: !service.published
      });
      await loadServices();
    } catch (err) {
      alert(err.message || 'Failed to update status.');
    }
  };

  const filtered = services.filter((s) => {
    const matchCat = filterCat === 'All' || s.category === filterCat;
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="admin-services-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Service & Program Management</h1>
          <p className="admin-page-subtitle">
            Create, edit, organize, and publish wellness programs and health screenings.
          </p>
        </div>
        <button onClick={openAddModal} className="btn btn-primary">
          <Plus size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Control Bar: Filter and Search */}
      <div className="admin-controls-card">
        <div className="controls-row">
          <div className="search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input search-input"
            />
          </div>

          <div className="filter-wrap">
            <label className="filter-label">Filter Category:</label>
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="form-select filter-select"
            >
              <option value="All">All Categories ({services.length})</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Service Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Order</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                  <div className="spinner" style={{ margin: '0 auto 0.5rem' }}></div>
                  <p>Loading services...</p>
                </td>
              </tr>
            ) : filtered.length > 0 ? (
              filtered.map((service) => (
                <tr key={service.id}>
                  <td>
                    <button
                      onClick={() => togglePublish(service)}
                      className={`btn-toggle-pub ${service.published ? 'published' : 'draft'}`}
                      title={service.published ? 'Click to Unpublish' : 'Click to Publish'}
                    >
                      {service.published ? (
                        <>
                          <Eye size={13} />
                          <span>Live</span>
                        </>
                      ) : (
                        <>
                          <EyeOff size={13} />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td>
                    <strong>{service.title}</strong>
                  </td>
                  <td>
                    <span className="cat-pill">{service.category}</span>
                  </td>
                  <td>
                    <p className="table-desc-truncate">{service.description}</p>
                  </td>
                  <td style={{ color: 'var(--color-text-light)' }}>
                    {service.display_order ?? 0}
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <button
                        onClick={() => openEditModal(service)}
                        className="btn-action edit"
                        title="Edit Service"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(service)}
                        className="btn-action delete"
                        title="Delete Service"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                  <p>No services found matching your criteria.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {editModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{currentService ? 'Edit Service' : 'Add New Service'}</h3>
              <button onClick={() => setEditModalOpen(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Service Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Weight Loss or Body Fat Analysis"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Program Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                  required
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain what the client receives and the wellness focus..."
                  className="form-textarea"
                  rows={4}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Service Image (Optional)</label>
                <div className="image-upload-row">
                  {formData.image_path && (
                    <div className="uploaded-preview-thumb">
                      <img src={formData.image_path} alt="Service preview" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image_path: '' })}
                        className="remove-thumb-btn"
                        title="Remove image"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}
                  <label className="btn btn-secondary btn-sm upload-label-btn">
                    <Upload size={14} />
                    <span>{uploadingImg ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      style={{ display: 'none' }}
                      disabled={uploadingImg}
                    />
                  </label>
                </div>
              </div>

              <div className="form-row-dual">
                <div className="form-group">
                  <label className="form-label">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group" style={{ alignSelf: 'center', marginTop: '1.25rem' }}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    <span>Publish Immediately</span>
                  </label>
                </div>
              </div>

              <div className="modal-actions-bar">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" disabled={saving || uploadingImg} className="btn btn-primary">
                  {saving ? 'Saving...' : currentService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && currentService && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '440px' }}>
            <div className="delete-modal-body">
              <div className="delete-warning-icon">
                <AlertTriangle size={32} />
              </div>
              <h3>Confirm Service Deletion</h3>
              <p>
                Are you sure you want to delete <strong>"{currentService.title}"</strong>? This
                action cannot be undone.
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
                  disabled={saving}
                  className="btn btn-danger"
                >
                  {saving ? 'Deleting...' : 'Yes, Delete Service'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
