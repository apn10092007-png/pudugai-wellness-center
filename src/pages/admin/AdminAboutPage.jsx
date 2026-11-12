import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  Trash2,
  Save,
  CheckCircle2,
  AlertTriangle,
  User,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import './AdminAboutPage.css';

export default function AdminAboutPage() {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoachId, setSelectedCoachId] = useState('');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Coach Form State
  const [coachName, setCoachName] = useState('');
  const [coachTitle, setCoachTitle] = useState('');
  const [coachBio, setCoachBio] = useState('');
  const [coachPhone, setCoachPhone] = useState('');
  const [coachInstagram, setCoachInstagram] = useState('');
  const [coachAddressEn, setCoachAddressEn] = useState('');
  const [coachAddressTa, setCoachAddressTa] = useState('');
  const [coachImagePath, setCoachImagePath] = useState('');

  // Site Content State
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [approachIntro, setApproachIntro] = useState('');

  // UI state
  const [savingCoach, setSavingCoach] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [coachSuccessMsg, setCoachSuccessMsg] = useState('');
  const [contentSuccessMsg, setContentSuccessMsg] = useState('');
  const [deletePhotoModal, setDeletePhotoModal] = useState(false);

  const populateCoachForm = (c) => {
    if (!c) return;
    setCoachName(c.coach_name || '');
    setCoachTitle(c.title || '');
    setCoachBio(c.biography || '');
    setCoachPhone(c.phone || '94434 43261');
    setCoachInstagram(c.instagram_url || '');
    setCoachAddressEn(c.address_en || 'E Main Rd, T Nagar, Buvaneswari Nagar, Pudukkottai, Tamil Nadu 622001');
    setCoachAddressTa(c.address_ta || 'கிழக்கு முதன்மை சாலை, டி நகர், புவனேஸ்வரி நகர், புதுக்கோட்டை, தமிழ்நாடு 622001');
    setCoachImagePath(c.image_path || '');
    setCoachSuccessMsg('');
  };

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const [coachesList, cnt] = await Promise.all([
          dataService.getAllCoaches(),
          dataService.getSiteContent('about_page')
        ]);
        if (mounted) {
          const list = coachesList && coachesList.length > 0 ? coachesList : [];
          setCoaches(list);
          setContent(cnt);

          if (list.length > 0) {
            setSelectedCoachId(list[0].id);
            populateCoachForm(list[0]);
          }

          // Populate content fields
          setMission(cnt?.mission || '');
          setVision(cnt?.vision || '');
          setApproachIntro(cnt?.approach_intro || '');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading about data:', err);
        if (mounted) setLoading(false);
      }
    }
    loadData();
    return () => { mounted = false; };
  }, []);

  // Switch between Coach 1 and Coach 2
  const handleSelectCoach = (coachId) => {
    setSelectedCoachId(coachId);
    const target = coaches.find((c) => c.id === coachId);
    if (target) {
      populateCoachForm(target);
    }
  };

  // Upload or Replace Coach Photo
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setCoachSuccessMsg('');
    try {
      const publicUrl = await dataService.uploadImage('coach-images', file);
      setCoachImagePath(publicUrl);
      setCoachSuccessMsg(`New photo uploaded for ${coachName}. Click "Save Coach Profile" to publish.`);
    } catch (err) {
      alert(err.message || 'Failed to upload image.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Delete Coach Photo with confirmation
  const handleConfirmPhotoDelete = () => {
    const defaultPlaceholder = coachName.includes('Thenmozhi')
      ? '/assets/avatar-thenmozhi.svg'
      : '';
    setCoachImagePath(defaultPlaceholder);
    setDeletePhotoModal(false);
    setCoachSuccessMsg('Photo removed. Remember to click "Save Coach Profile" to update.');
  };

  // Save Coach Profile
  const handleSaveCoachProfile = async (e) => {
    e.preventDefault();
    if (!coachName.trim() || !coachBio.trim()) {
      alert('Please fill in both coach name and biography.');
      return;
    }

    setSavingCoach(true);
    setCoachSuccessMsg('');
    try {
      const updated = await dataService.updateCoachProfile({
        id: selectedCoachId,
        coach_name: coachName.trim(),
        title: coachTitle.trim(),
        biography: coachBio.trim(),
        image_path: coachImagePath || null,
        phone: coachPhone.trim(),
        instagram_url: coachInstagram.trim(),
        address_en: coachAddressEn.trim(),
        address_ta: coachAddressTa.trim()
      });

      const updatedList = coaches.map((c) => (c.id === selectedCoachId ? updated : c));
      setCoaches(updatedList);
      setCoachSuccessMsg(`${updated.coach_name}'s profile and photo saved successfully! Live website updated.`);
    } catch (err) {
      alert(err.message || 'Failed to update coach profile.');
    } finally {
      setSavingCoach(false);
    }
  };

  // Save Site Content (Mission, Vision)
  const handleSaveContent = async (e) => {
    e.preventDefault();
    setSavingContent(true);
    setContentSuccessMsg('');
    try {
      const updatedContent = {
        ...content,
        mission,
        vision,
        approach_intro: approachIntro
      };
      await dataService.updateSiteContent('about_page', updatedContent);
      setContent(updatedContent);
      setContentSuccessMsg('Mission, vision, and wellness approach updated successfully!');
    } catch (err) {
      alert(err.message || 'Failed to update site content.');
    } finally {
      setSavingContent(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page-loading">
        <div className="spinner"></div>
        <p>Loading coach profiles and site content...</p>
      </div>
    );
  }

  const isThenmozhiSelected = coachName.includes('Thenmozhi') || selectedCoachId?.includes('0002');
  const fallbackPreview = isThenmozhiSelected ? '/assets/avatar-thenmozhi.svg' : '/assets/coach-pandian.png';

  return (
    <div className="admin-about-management-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Coaches & Site Content</h1>
          <p className="admin-page-subtitle">
            Manage Coaches Thangapandian S and Thenmozhi's verified photos, biographies, and center mission/vision.
          </p>
        </div>
        <div className="admin-header-actions">
          <Link to="/admin/home-settings" className="btn btn-outline btn-sm">
            <ImageIcon size={15} />
            <span>Manage Hero Image</span>
          </Link>
        </div>
      </div>

      <div className="about-management-grid">
        {/* SECTION 1: COACH PROFILE & PHOTO MANAGEMENT */}
        <div className="management-card">
          <div className="card-header-strip">
            <User size={20} className="strip-icon" />
            <div>
              <h2>Coach Profiles & Photographs</h2>
              <span>Switch between coaches to update their information or photos</span>
            </div>
          </div>

          {/* Coach Switcher Tabs */}
          {coaches.length > 1 && (
            <div className="coach-selector-tabs">
              {coaches.map((c) => {
                const isSelected = c.id === selectedCoachId;
                const isThenmozhi = (c.coach_name || '').includes('Thenmozhi');
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`coach-tab-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectCoach(c.id)}
                  >
                    <User size={16} />
                    <span>{c.coach_name || (isThenmozhi ? 'Thenmozhi' : 'Thangapandian S')}</span>
                    {isThenmozhi && <span className="coach-tag-pill">Coach</span>}
                  </button>
                );
              })}
            </div>
          )}

          {coachSuccessMsg && (
            <div className="save-alert-success">
              <CheckCircle2 size={16} />
              <span>{coachSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveCoachProfile}>
            {/* Photo preview, replace, delete controls */}
            <div className="coach-photo-management-block">
              <label className="form-label">{coachName} Official Photo</label>
              <div className="photo-editor-row">
                <div className="coach-photo-preview-box">
                  {coachImagePath ? (
                    <img
                      src={coachImagePath}
                      alt={`${coachName} Preview`}
                      className="coach-img-preview"
                      onError={(e) => {
                        e.currentTarget.src = fallbackPreview;
                      }}
                    />
                  ) : (
                    <div className="coach-img-empty">
                      <User size={40} />
                      <span>No Photo Set</span>
                    </div>
                  )}
                </div>

                <div className="photo-actions-col">
                  <span className="photo-guidance">
                    {isThenmozhiSelected
                      ? 'Upload an official photograph of Coach Thenmozhi to replace the temporary avatar. Max 5MB (JPG, PNG, WebP).'
                      : 'Upload an official photograph of Coach Thangapandian S. Max 5MB (JPG, PNG, WebP).'}
                  </span>
                  <div className="photo-buttons-group">
                    <label className="btn btn-primary btn-sm photo-upload-btn">
                      <Upload size={14} />
                      <span>{uploadingImage ? 'Uploading...' : coachImagePath && !coachImagePath.endsWith('.svg') ? 'Replace Photo' : 'Upload Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        style={{ display: 'none' }}
                        disabled={uploadingImage}
                      />
                    </label>

                    {coachImagePath && !coachImagePath.endsWith('.svg') && (
                      <button
                        type="button"
                        onClick={() => setDeletePhotoModal(true)}
                        className="btn btn-danger btn-sm"
                      >
                        <Trash2 size={14} />
                        <span>Delete Photo</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-row-dual" style={{ marginTop: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Coach Full Name *</label>
                <input
                  type="text"
                  value={coachName}
                  onChange={(e) => setCoachName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Professional Role / Title *</label>
                <input
                  type="text"
                  value={coachTitle}
                  onChange={(e) => setCoachTitle(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Approved Biography *</label>
              <textarea
                value={coachBio}
                onChange={(e) => setCoachBio(e.target.value)}
                className="form-textarea"
                rows={5}
                required
              />
            </div>

            <div className="form-row-dual">
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  value={coachPhone}
                  onChange={(e) => setCoachPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Instagram Profile URL</label>
                <input
                  type="url"
                  value={coachInstagram}
                  onChange={(e) => setCoachInstagram(e.target.value)}
                  placeholder="https://www.instagram.com/..."
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Center Address (English)</label>
              <input
                type="text"
                value={coachAddressEn}
                onChange={(e) => setCoachAddressEn(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Center Address (Tamil / தமிழ்)</label>
              <input
                type="text"
                value={coachAddressTa}
                onChange={(e) => setCoachAddressTa(e.target.value)}
                className="form-input"
                style={{ fontFamily: "'Noto Sans Tamil', var(--font-family)" }}
              />
            </div>

            <button
              type="submit"
              disabled={savingCoach || uploadingImage}
              className="btn btn-primary btn-lg"
              style={{ marginTop: '0.5rem' }}
            >
              <Save size={16} />
              <span>{savingCoach ? 'Saving Profile...' : `Save ${coachName} Profile`}</span>
            </button>
          </form>
        </div>

        {/* SECTION 2: ABOUT US & SITE CONTENT MANAGEMENT */}
        <div className="management-card">
          <div className="card-header-strip">
            <Sparkles size={20} className="strip-icon" />
            <div>
              <h2>Mission, Vision & Methodology</h2>
              <span>Update key brand statements displayed on the About Us page</span>
            </div>
          </div>

          {contentSuccessMsg && (
            <div className="save-alert-success">
              <CheckCircle2 size={16} />
              <span>{contentSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveContent}>
            <div className="form-group">
              <label className="form-label">Center Mission Statement</label>
              <textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="form-textarea"
                rows={3}
                placeholder="What is the daily mission of the center?"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Center Vision Statement</label>
              <textarea
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="form-textarea"
                rows={3}
                placeholder="What is the long-term vision for the Pudukkottai community?"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Wellness Approach & Philosophy</label>
              <textarea
                value={approachIntro}
                onChange={(e) => setApproachIntro(e.target.value)}
                className="form-textarea"
                rows={4}
                placeholder="Explain the non-extreme, sustainable lifestyle philosophy..."
              />
            </div>

            <button
              type="submit"
              disabled={savingContent}
              className="btn btn-secondary btn-lg"
              style={{ marginTop: '0.5rem' }}
            >
              <Save size={16} />
              <span>{savingContent ? 'Updating Content...' : 'Update Mission & Vision'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Delete Photo Modal */}
      {deletePhotoModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '440px' }}>
            <div className="delete-modal-body">
              <div className="delete-warning-icon">
                <AlertTriangle size={32} />
              </div>
              <h3>Remove Coach Photo?</h3>
              <p>
                Removing this photo will show a clean default placeholder on the public About Us page
                until a new photo is uploaded.
              </p>
              <div className="modal-actions-bar" style={{ justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => setDeletePhotoModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPhotoDelete}
                  className="btn btn-danger"
                >
                  Yes, Remove Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
