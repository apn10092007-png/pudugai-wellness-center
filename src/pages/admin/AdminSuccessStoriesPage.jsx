import React, { useEffect, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  X,
  AlertTriangle,
  Languages
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import './AdminSuccessStoriesPage.css';

export default function AdminSuccessStoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    client_name: '',
    language: 'en', // 'ta' or 'en'
    title: '',
    story: '',
    program_duration: '',
    image_path: '',
    published: true
  });

  const loadStories = async () => {
    try {
      const data = await dataService.getAllSuccessStories();
      setStories(data);
    } catch (err) {
      console.error('Failed to load success stories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const openAddModal = (initialLang = 'ta') => {
    setCurrentStory(null);
    setFormData({
      client_name: '',
      language: initialLang,
      title: '',
      story: '',
      program_duration: '',
      image_path: '',
      published: true
    });
    setEditModalOpen(true);
  };

  const openEditModal = (story) => {
    setCurrentStory(story);
    setFormData({
      client_name: story.client_name,
      language: story.language || 'en',
      title: story.title || '',
      story: story.story,
      program_duration: story.program_duration || '',
      image_path: story.image_path || '',
      published: story.published ?? true
    });
    setEditModalOpen(true);
  };

  const openDeleteModal = (story) => {
    setCurrentStory(story);
    setDeleteModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImg(true);
    try {
      const url = await dataService.uploadImage('story-images', file);
      setFormData((prev) => ({ ...prev, image_path: url }));
    } catch (err) {
      alert(err.message || 'Image upload failed.');
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.client_name.trim() || !formData.story.trim()) {
      alert(
        formData.language === 'ta'
          ? 'தயவுசெய்து வாடிக்கையாளர் பெயர் மற்றும் பயண விவரத்தை நிரப்பவும்.'
          : 'Please enter both client name and journey description.'
      );
      return;
    }

    setSaving(true);
    try {
      await dataService.saveSuccessStory({
        ...(currentStory ? { id: currentStory.id } : {}),
        client_name: formData.client_name.trim(),
        language: formData.language,
        title: formData.title.trim() || null,
        story: formData.story.trim(),
        program_duration: formData.program_duration.trim() || null,
        image_path: formData.image_path || null,
        published: formData.published
      });
      setEditModalOpen(false);
      await loadStories();
    } catch (err) {
      alert(err.message || 'Failed to save story.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentStory) return;
    setSaving(true);
    try {
      await dataService.deleteSuccessStory(currentStory.id);
      setDeleteModalOpen(false);
      await loadStories();
    } catch (err) {
      alert(err.message || 'Failed to delete story.');
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (story) => {
    try {
      await dataService.saveSuccessStory({
        ...story,
        published: !story.published
      });
      await loadStories();
    } catch (err) {
      alert(err.message || 'Failed to update story status.');
    }
  };

  // Language-specific labels based on selected language
  const isTamil = formData.language === 'ta';

  return (
    <div className="admin-stories-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Client Success Story Management</h1>
          <p className="admin-page-subtitle">
            Record, organize, and publish genuine client weight-loss and wellness journeys in Tamil or English.
          </p>
        </div>
        <div className="admin-header-actions">
          <button onClick={() => openAddModal('ta')} className="btn btn-secondary">
            <Languages size={16} />
            <span>புதிய தமிழ் பதிவு (+ Tamil)</span>
          </button>
          <button onClick={() => openAddModal('en')} className="btn btn-primary">
            <Plus size={16} />
            <span>+ Add English Story</span>
          </button>
        </div>
      </div>

      {/* Stories Listing Table */}
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Language</th>
              <th>Client Name</th>
              <th>Duration</th>
              <th>Story Summary</th>
              <th>Photo</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem' }}>
                  <div className="spinner" style={{ margin: '0 auto 0.5rem' }}></div>
                  <p>Loading stories...</p>
                </td>
              </tr>
            ) : stories.length > 0 ? (
              stories.map((story) => (
                <tr key={story.id}>
                  <td>
                    <button
                      onClick={() => togglePublish(story)}
                      className={`btn-toggle-pub ${story.published ? 'published' : 'draft'}`}
                      title={story.published ? 'Click to unpublish' : 'Click to publish'}
                    >
                      {story.published ? (
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
                    {story.language === 'ta' ? (
                      <span className="lang-tag-pill tamil">தமிழ் (ta)</span>
                    ) : (
                      <span className="lang-tag-pill english">English (en)</span>
                    )}
                  </td>
                  <td>
                    <strong className={story.language === 'ta' ? 'tamil-text' : ''}>
                      {story.client_name}
                    </strong>
                  </td>
                  <td style={{ color: 'var(--color-text-light)', fontSize: '0.85rem' }}>
                    {story.program_duration || '—'}
                  </td>
                  <td>
                    <p
                      className={`table-desc-truncate ${story.language === 'ta' ? 'tamil-text' : ''}`}
                    >
                      {story.story}
                    </p>
                  </td>
                  <td>
                    {story.image_path ? (
                      <div className="table-thumb-preview">
                        <img src={story.image_path} alt={story.client_name} />
                      </div>
                    ) : (
                      <span style={{ color: 'var(--color-text-light)', fontSize: '0.8rem' }}>None</span>
                    )}
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <button
                        onClick={() => openEditModal(story)}
                        className="btn-action edit"
                        title="Edit Story"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(story)}
                        className="btn-action delete"
                        title="Delete Story"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
                  <p style={{ marginBottom: '1rem' }}>No client success stories added yet.</p>
                  <button onClick={() => openAddModal('ta')} className="btn btn-primary btn-sm">
                    <Plus size={14} />
                    <span>Add First Success Story</span>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Success Story Modal with Language Selector ONLY here */}
      {editModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '680px' }}>
            <div className="modal-header">
              <div>
                <h3>
                  {currentStory
                    ? isTamil ? 'வெற்றிப் பதிவை திருத்துக' : 'Edit Success Story'
                    : isTamil ? 'புதிய வெற்றிப் பதிவு சேர்க்க' : 'Add New Success Story'}
                </h3>
                <span className="modal-subtext">
                  {isTamil
                    ? 'வாடிக்கையாளர் ஒப்புதல் பெற்ற தகவலை மட்டும் உள்ளிடவும்.'
                    : 'Enter client-approved transformation journey details.'}
                </span>
              </div>
              <button onClick={() => setEditModalOpen(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              {/* SPECIAL REQUIREMENT: Language selector appears ONLY inside this form */}
              <div className="form-language-selector-box">
                <label className="selector-box-label">
                  <Languages size={16} />
                  <span>Choose Story Entry Language / பதிவு மொழி:</span>
                </label>
                <div className="lang-buttons-group">
                  <button
                    type="button"
                    className={`lang-select-btn ${formData.language === 'ta' ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, language: 'ta' })}
                  >
                    <span className="btn-title">தமிழ் (Tamil)</span>
                    <span className="btn-sub">ta code in database</span>
                  </button>
                  <button
                    type="button"
                    className={`lang-select-btn ${formData.language === 'en' ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, language: 'en' })}
                  >
                    <span className="btn-title">English</span>
                    <span className="btn-sub">en code in database</span>
                  </button>
                </div>
              </div>

              {/* Language Specific Input Fields */}
              <div className={`form-fields-container ${isTamil ? 'tamil-active-font' : ''}`}>
                <div className="form-group">
                  <label className="form-label">
                    {isTamil ? 'வாடிக்கையாளர் பெயர் (Client Name) *' : 'Client Display Name *'}
                  </label>
                  <input
                    type="text"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder={isTamil ? 'எ.கா. திருமதி. சுமதி / அனானிமஸ்' : 'e.g. Priya S. / Anonymous'}
                    className="form-input"
                    required
                  />
                  <span className="form-help">
                    {isTamil
                      ? 'வாடிக்கையாளரின் ஒப்புதல் பெற்ற பெயர் அல்லது காட்சிப் பெயர்.'
                      : 'Client name or approved anonymous display name.'}
                  </span>
                </div>

                <div className="form-row-dual">
                  <div className="form-group">
                    <label className="form-label">
                      {isTamil ? 'தலைப்பு (Title - விருப்பத்திற்குரியது)' : 'Story Title (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder={isTamil ? 'எ.கா. 8 கிலோ எடைக் குறைப்பு மற்றும் சுறுசுறுப்பு' : 'e.g. 10 kg Healthy Fat Loss & Vitality'}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {isTamil ? 'கால அளவு (Duration - எ.கா. 3 மாதங்கள்)' : 'Program Duration (e.g. 3 Months)'}
                    </label>
                    <input
                      type="text"
                      value={formData.program_duration}
                      onChange={(e) => setFormData({ ...formData, program_duration: e.target.value })}
                      placeholder={isTamil ? '3 மாதங்கள்' : '90 Days / 3 Months'}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {isTamil ? 'பயண விவரம் மற்றும் அனுபவம் (Journey Description) *' : 'Personal Journey & Experience *'}
                  </label>
                  <textarea
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    placeholder={
                      isTamil
                        ? 'வாடிக்கையாளரின் எடைக் குறைப்பு, உணவுப் பழக்கம் மற்றும் கோச் தங்கபாண்டியன் அவர்களின் வழிகாட்டலில் ஏற்பட்ட மாற்றம் பற்றிய விவரம்...'
                        : 'Describe their health journey, nutritional habit improvements, and coaching experience...'
                    }
                    className="form-textarea"
                    rows={5}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {isTamil ? 'ஒப்புதல் பெற்ற புகைப்படம் (Optional Approved Photo)' : 'Approved Client Photo (Optional)'}
                  </label>
                  <div className="image-upload-row">
                    {formData.image_path && (
                      <div className="uploaded-preview-thumb">
                        <img src={formData.image_path} alt="Client preview" />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image_path: '' })}
                          className="remove-thumb-btn"
                          title="Remove photo"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    )}
                    <label className="btn btn-secondary btn-sm upload-label-btn">
                      <Upload size={14} />
                      <span>{uploadingImg ? 'Uploading...' : 'Upload Client Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        disabled={uploadingImg}
                      />
                    </label>
                  </div>
                  <span className="form-help">
                    Never use unverified stock images as real clients.
                  </span>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    />
                    <span>
                      {isTamil
                        ? 'இப்போதே இணையதளத்தில் வெளியிடவும் (Publish to Live Site)'
                        : 'Publish immediately on public website'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="modal-actions-bar">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="btn btn-secondary"
                >
                  {isTamil ? 'ரத்து செய்க (Cancel)' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImg}
                  className="btn btn-primary"
                >
                  {saving
                    ? isTamil ? 'சேமிக்கப்படுகிறது...' : 'Saving...'
                    : currentStory
                    ? isTamil ? 'புதுப்பிக்க (Update Story)' : 'Update Story'
                    : isTamil ? 'பதிவைச் சேமிக்க (Save Story)' : 'Save Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && currentStory && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '440px' }}>
            <div className="delete-modal-body">
              <div className="delete-warning-icon">
                <AlertTriangle size={32} />
              </div>
              <h3>Confirm Story Deletion</h3>
              <p>
                Are you sure you want to delete the transformation story of{' '}
                <strong>"{currentStory.client_name}"</strong>?
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
                  {saving ? 'Deleting...' : 'Yes, Delete Record'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
