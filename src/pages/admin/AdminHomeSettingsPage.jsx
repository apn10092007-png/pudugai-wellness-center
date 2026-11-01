import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  Trash2,
  Save,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Activity,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  FileCheck,
  X
} from 'lucide-react';
import { dataService, INITIAL_HERO_CONTENT } from '../../services/dataService';
import './AdminHomeSettingsPage.css';

export default function AdminHomeSettingsPage() {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Editable fields for hero section
  const [tagline, setTagline] = useState('');
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [activeImagePath, setActiveImagePath] = useState('/assets/hero-wellness.jpg');

  // Preview before saving state
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileMeta, setFileMeta] = useState(null);

  // Status and feedback
  const [savingImage, setSavingImage] = useState(false);
  const [savingText, setSavingText] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    async function loadHeroContent() {
      try {
        const data = await dataService.getHomeHero();
        if (mounted) {
          const resolved = { ...INITIAL_HERO_CONTENT, ...data };
          setHeroData(resolved);
          setTagline(resolved.tagline || '');
          setHeadline(resolved.headline || '');
          setSubheadline(resolved.subheadline || '');
          setActiveImagePath(resolved.hero_image_path || '/assets/hero-wellness.jpg');
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load hero content:', err);
        if (mounted) {
          setErrorMsg('Could not load current hero settings. Showing default configuration.');
          setLoading(false);
        }
      }
    }
    loadHeroContent();
    return () => {
      mounted = false;
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, []);

  // Format file size for user display
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  // Handle local file selection and generate preview before saving
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Please upload a valid image file (JPG, PNG, or WebP).');
      setSuccessMsg('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image size exceeds 5MB limit. Please choose a smaller photo.');
      setSuccessMsg('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Revoke previous blob if exists
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
    setFileMeta({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type
    });
    setErrorMsg('');
    setSuccessMsg('Image ready for review. Click "Save & Apply to Home Page" to publish.');
  };

  // Discard previewed image
  const handleDiscardPreview = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileMeta(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setErrorMsg('');
    setSuccessMsg('');
  };

  // Upload image to Supabase Storage and update site_content home_hero
  const handleSaveHeroImage = async () => {
    if (!selectedFile) {
      setErrorMsg('Please select an image file first.');
      return;
    }

    setSavingImage(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. Upload to Supabase Storage (site-images or service-images bucket)
      const publicUrl = await dataService.uploadHeroImage(selectedFile);

      // 2. Save active hero image URL in Supabase site_content table
      const updatedHero = {
        ...heroData,
        tagline: tagline.trim() || INITIAL_HERO_CONTENT.tagline,
        headline: headline.trim() || INITIAL_HERO_CONTENT.headline,
        subheadline: subheadline.trim() || INITIAL_HERO_CONTENT.subheadline,
        hero_image_path: publicUrl
      };

      await dataService.updateHomeHero(updatedHero);

      setHeroData(updatedHero);
      setActiveImagePath(publicUrl);
      setSelectedFile(null);
      setPreviewUrl(null);
      setFileMeta(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setSuccessMsg('Hero image uploaded and published successfully! The live Home Page has been updated.');
    } catch (err) {
      console.error('Error saving hero image:', err);
      setErrorMsg(err.message || 'Failed to upload hero image. Please try again.');
    } finally {
      setSavingImage(false);
    }
  };

  // Delete custom hero image and reset to default
  const handleConfirmDeleteImage = async () => {
    setDeletingImage(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await dataService.deleteHeroImage();
      const defaultPath = '/assets/hero-wellness.jpg';
      const updatedHero = {
        ...heroData,
        hero_image_path: defaultPath
      };
      setHeroData(updatedHero);
      setActiveImagePath(defaultPath);
      setShowDeleteModal(false);
      handleDiscardPreview();
      setSuccessMsg('Hero image reset to default successfully. The live Home Page now displays the default image.');
    } catch (err) {
      console.error('Error resetting hero image:', err);
      setErrorMsg(err.message || 'Failed to reset hero image.');
    } finally {
      setDeletingImage(false);
    }
  };

  // Save text settings (Headline, Tagline, Subheadline)
  const handleSaveHeroText = async (e) => {
    e.preventDefault();
    setSavingText(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const updatedHero = {
        ...heroData,
        tagline: tagline.trim() || INITIAL_HERO_CONTENT.tagline,
        headline: headline.trim() || INITIAL_HERO_CONTENT.headline,
        subheadline: subheadline.trim() || INITIAL_HERO_CONTENT.subheadline,
        hero_image_path: activeImagePath
      };
      await dataService.updateHomeHero(updatedHero);
      setHeroData(updatedHero);
      setSuccessMsg('Home page text updated successfully!');
    } catch (err) {
      console.error('Error updating hero text:', err);
      setErrorMsg(err.message || 'Failed to update hero text.');
    } finally {
      setSavingText(false);
    }
  };

  const isCustomActive = activeImagePath && activeImagePath !== '/assets/hero-wellness.jpg';

  if (loading) {
    return (
      <div className="admin-page-loading">
        <div className="spinner"></div>
        <p>Loading Home Page Settings...</p>
      </div>
    );
  }

  return (
    <div className="admin-home-settings-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Home Page Settings & Website Content</h1>
          <p className="admin-page-subtitle">
            Manage the primary hero photograph, marketing statements, and visual elements on the public Home Page.
          </p>
        </div>
        <div className="admin-header-actions">
          <Link to="/" target="_blank" className="btn btn-outline btn-sm">
            <ExternalLink size={15} />
            <span>View Live Home Page</span>
          </Link>
        </div>
      </div>

      {/* Success & Error Banners */}
      {successMsg && (
        <div className="save-alert-success">
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="save-alert-error">
          <AlertTriangle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="home-settings-grid">
        {/* CARD 1: HERO IMAGE MANAGEMENT */}
        <div className="management-card">
          <div className="card-header-strip">
            <ImageIcon size={22} className="strip-icon" />
            <div>
              <h2>Hero Image Management</h2>
              <span>Upload, preview, replace, or reset the main Home Page showcase photo</span>
            </div>
          </div>

          {/* Status Row */}
          <div className="hero-status-row">
            <div>
              <strong style={{ fontSize: '0.85rem' }}>Active Display Status:</strong>
            </div>
            <div>
              {isCustomActive ? (
                <span className="hero-status-badge custom">
                  <CheckCircle2 size={13} />
                  <span>Custom Hero Photo Active</span>
                </span>
              ) : (
                <span className="hero-status-badge default">
                  <Sparkles size={13} />
                  <span>Default Lifestyle Photo Active</span>
                </span>
              )}
            </div>
          </div>

          {/* Currently Displayed Image Preview (Mirrors HomePage layout) */}
          <div className="hero-display-preview-wrap">
            <img
              src={activeImagePath || '/assets/hero-wellness.jpg'}
              alt="Active Home Page Hero Preview"
              className="hero-display-preview-img"
              onError={(e) => {
                e.currentTarget.src = '/assets/hero-wellness.jpg';
              }}
            />
            <div className="hero-preview-badge-overlay">
              <div className="hero-preview-badge-icon">
                <Activity size={18} />
              </div>
              <div className="hero-preview-badge-text">
                <span className="title">Personalized Guidance</span>
                <span className="subtitle">Pudukkottai Center</span>
              </div>
            </div>
          </div>

          {/* Upload, Replace, Delete Buttons */}
          <div className="hero-main-actions">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
              className="file-input-hidden"
              id="hero-file-input"
            />

            <label htmlFor="hero-file-input" className="btn btn-primary">
              <Upload size={16} />
              <span>{isCustomActive ? 'Replace Hero Photo' : 'Upload New Hero Photo'}</span>
            </label>

            {isCustomActive && (
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="btn btn-danger"
                disabled={deletingImage}
              >
                <Trash2 size={16} />
                <span>Reset to Default</span>
              </button>
            )}

            <Link to="/" target="_blank" className="btn btn-outline">
              <ExternalLink size={15} />
              <span>Preview Live Site</span>
            </Link>
          </div>

          {/* Staging / Interactive Preview Area when a new file is chosen */}
          {previewUrl && (
            <div className="unsaved-preview-card">
              <div className="unsaved-header">
                <span className="unsaved-badge">
                  <FileCheck size={14} />
                  <span>New Photo Selected (Unsaved Preview)</span>
                </span>
                <button
                  type="button"
                  onClick={handleDiscardPreview}
                  className="btn btn-outline btn-sm"
                  title="Discard this preview"
                >
                  <X size={14} />
                  <span>Discard</span>
                </button>
              </div>

              {fileMeta && (
                <div className="unsaved-file-info">
                  <strong>{fileMeta.name}</strong> • {fileMeta.size} • {fileMeta.type}
                </div>
              )}

              <img
                src={previewUrl}
                alt="Unsaved New Hero Preview"
                className="unsaved-preview-media"
              />

              <div className="unsaved-action-buttons">
                <button
                  type="button"
                  onClick={handleSaveHeroImage}
                  disabled={savingImage}
                  className="btn btn-primary"
                >
                  <Save size={16} />
                  <span>{savingImage ? 'Uploading & Publishing...' : 'Save & Apply to Home Page'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDiscardPreview}
                  disabled={savingImage}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Quick upload instructions */}
          <ul className="guidance-list">
            <li>Supported formats: JPG, PNG, or WebP.</li>
            <li>Maximum file size: 5MB.</li>
            <li>Recommended resolution: 1200 x 900 px or vertical portrait aspect ratio.</li>
            <li>Uploaded photos are stored securely in Supabase Storage with authenticated permissions.</li>
          </ul>
        </div>

        {/* CARD 2: HOME PAGE HERO TEXT (TAGLINE, HEADLINE) */}
        <div className="management-card">
          <div className="card-header-strip">
            <Sparkles size={22} className="strip-icon" />
            <div>
              <h2>Home Page Headlines</h2>
              <span>Primary headlines and messaging displayed alongside the hero photo</span>
            </div>
          </div>

          <form onSubmit={handleSaveHeroText}>
            <div className="form-group">
              <label className="form-label">Hero Badge / Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Nutrition • Fitness • Wellness"
                className="form-input"
              />
              <span className="form-helper">Displayed above the main headline</span>
            </div>

            <div className="form-group">
              <label className="form-label">Main Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Real Wellness for Your Real Life."
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subheadline / Introduction Paragraph</label>
              <textarea
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
                rows={5}
                className="form-textarea"
                placeholder="Personalized health, nutrition, and lifestyle coaching in Pudukkottai..."
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                type="submit"
                disabled={savingText}
                className="btn btn-secondary btn-lg"
              >
                <Save size={16} />
                <span>{savingText ? 'Saving Text...' : 'Update Hero Headlines'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTagline(INITIAL_HERO_CONTENT.tagline);
                  setHeadline(INITIAL_HERO_CONTENT.headline);
                  setSubheadline(INITIAL_HERO_CONTENT.subheadline);
                }}
                className="btn btn-outline"
                title="Reset text fields to defaults"
              >
                <RotateCcw size={15} />
                <span>Reset Text</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal for Resetting / Deleting Hero Image */}
      {showDeleteModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '440px' }}>
            <div className="delete-modal-body" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}
              >
                <AlertTriangle size={30} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                Reset Hero Image to Default?
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', marginBottom: '1.5rem' }}>
                This will remove the current custom hero image from the public Home Page and restore the
                default PWC wellness lifestyle photograph. You can upload a new photo anytime.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="btn btn-secondary"
                  disabled={deletingImage}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteImage}
                  className="btn btn-danger"
                  disabled={deletingImage}
                >
                  {deletingImage ? 'Resetting...' : 'Yes, Reset to Default'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
