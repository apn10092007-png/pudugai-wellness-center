import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  Trash2,
  Save,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Sparkles,
  Edit2,
  X,
  Plus,
  Eye,
  EyeOff,
  RotateCcw
} from 'lucide-react';
import HeroCarousel from '../../components/HeroCarousel';
import { dataService, INITIAL_HERO_CONTENT, INITIAL_HERO_GALLERY } from '../../services/dataService';
import './AdminHomeSettingsPage.css';

export default function AdminHomeSettingsPage() {
  const [heroData, setHeroData] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // Editable text fields
  const [tagline, setTagline] = useState('');
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');

  // Upload staging state
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  // Replace single item state
  const [replaceTargetId, setReplaceTargetId] = useState(null);

  // Edit details modal state
  const [editingItem, setEditingItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Delete modal state
  const [deletingId, setDeletingId] = useState(null);
  const [processingDelete, setProcessingDelete] = useState(false);

  // Feedback alerts
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [savingText, setSavingText] = useState(false);

  const fileInputRef = useRef(null);
  const replaceInputRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const hero = await dataService.getHomeHero();
        if (mounted) {
          const resolved = { ...INITIAL_HERO_CONTENT, ...hero };
          setHeroData(resolved);
          setTagline(resolved.tagline || '');
          setHeadline(resolved.headline || '');
          setSubheadline(resolved.subheadline || '');

          const rawGallery = Array.isArray(resolved.gallery) && resolved.gallery.length > 0
            ? resolved.gallery
            : INITIAL_HERO_GALLERY;
          setGallery(rawGallery.slice().sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load hero settings:', err);
        if (mounted) {
          setErrorMsg('Could not load current hero settings. Showing default configuration.');
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      mounted = false;
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, []);

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  // Validate image file
  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Please upload a valid image file (JPG, PNG, or WebP).');
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error(`File "${file.name}" exceeds the 5MB limit (${formatFileSize(file.size)}). Please choose a smaller photo.`);
    }
  };

  // 1. Handle New Upload Selection
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateFile(file);
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      const objectUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewUrl(objectUrl);
      setNewTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      setNewDescription('');
      setErrorMsg('');
      setSuccessMsg('Photo selected for preview. Add optional details below and click "Save & Add to Gallery".');
    } catch (err) {
      setErrorMsg(err.message);
      setSuccessMsg('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDiscardStaging = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setNewTitle('');
    setNewDescription('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setErrorMsg('');
    setSuccessMsg('');
  };

  // 2. Save New Staged Image to Gallery
  const handleSaveNewGalleryImage = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const newItem = await dataService.addHeroGalleryItem({
        file: selectedFile,
        title: newTitle,
        description: newDescription
      });

      const updatedList = await dataService.getAllHeroGallery();
      setGallery(updatedList);
      handleDiscardStaging();
      setSuccessMsg('New photo successfully uploaded and added to the hero gallery! Live website updated.');
    } catch (err) {
      console.error('Error adding gallery image:', err);
      setErrorMsg(err.message || 'Failed to upload and save image.');
    } finally {
      setUploading(false);
    }
  };

  // 3. Replace an Existing Gallery Item
  const handleTriggerReplace = (id) => {
    setReplaceTargetId(id);
    if (replaceInputRef.current) {
      replaceInputRef.current.value = '';
      replaceInputRef.current.click();
    }
  };

  const handleExecuteReplace = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !replaceTargetId) return;

    setUploading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      validateFile(file);
      const publicUrl = await dataService.uploadHeroImage(file);
      await dataService.updateHeroGalleryItem(replaceTargetId, { image_path: publicUrl });
      const updatedList = await dataService.getAllHeroGallery();
      setGallery(updatedList);
      setSuccessMsg('Photo replaced successfully! Live website updated.');
    } catch (err) {
      console.error('Error replacing image:', err);
      setErrorMsg(err.message || 'Failed to replace image.');
    } finally {
      setUploading(false);
      setReplaceTargetId(null);
    }
  };

  // 4. Toggle Active / Inactive
  const handleToggleActive = async (id) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await dataService.toggleHeroGalleryItemActive(id);
      const updatedList = await dataService.getAllHeroGallery();
      setGallery(updatedList);
      setSuccessMsg('Image status updated. Public carousel immediately reflects active items.');
    } catch (err) {
      console.error('Error toggling active:', err);
      setErrorMsg(err.message || 'Failed to update image status.');
    }
  };

  // 5. Reorder: Move Up / Down
  const handleMoveOrder = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= gallery.length) return;

    setErrorMsg('');
    setSuccessMsg('');
    try {
      const updatedList = await dataService.reorderHeroGallery(index, targetIndex);
      setGallery(updatedList);
      setSuccessMsg('Gallery order saved successfully! The public carousel now follows this order.');
    } catch (err) {
      console.error('Error reordering gallery:', err);
      setErrorMsg(err.message || 'Failed to save new order.');
    }
  };

  // 6. Delete Item with Confirmation
  const handleConfirmDelete = async () => {
    if (!deletingId) return;

    setProcessingDelete(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await dataService.deleteHeroGalleryItem(deletingId);
      const updatedList = await dataService.getAllHeroGallery();
      setGallery(updatedList);
      setDeletingId(null);
      setSuccessMsg('Image removed from gallery. Public carousel updated.');
    } catch (err) {
      console.error('Error deleting image:', err);
      setErrorMsg(err.message || 'Failed to delete image.');
    } finally {
      setProcessingDelete(false);
    }
  };

  // 7. Edit Optional Details (Title & Description)
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setEditTitle(item.title || '');
    setEditDesc(item.description || '');
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    setErrorMsg('');
    setSuccessMsg('');
    try {
      await dataService.updateHeroGalleryItem(editingItem.id, {
        title: editTitle.trim(),
        description: editDesc.trim()
      });
      const updatedList = await dataService.getAllHeroGallery();
      setGallery(updatedList);
      setEditingItem(null);
      setSuccessMsg('Image details updated successfully!');
    } catch (err) {
      console.error('Error updating details:', err);
      setErrorMsg(err.message || 'Failed to update details.');
    }
  };

  // 8. Save Headlines Text
  const handleSaveHeadlines = async (e) => {
    e.preventDefault();
    setSavingText(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const updated = {
        ...heroData,
        tagline: tagline.trim() || INITIAL_HERO_CONTENT.tagline,
        headline: headline.trim() || INITIAL_HERO_CONTENT.headline,
        subheadline: subheadline.trim() || INITIAL_HERO_CONTENT.subheadline,
        gallery
      };
      await dataService.updateHomeHero(updated);
      setHeroData(updated);
      setSuccessMsg('Hero headlines saved successfully! Public Home Page updated.');
    } catch (err) {
      console.error('Error saving headlines:', err);
      setErrorMsg(err.message || 'Failed to save hero headlines.');
    } finally {
      setSavingText(false);
    }
  };

  const activeCount = gallery.filter((g) => g.active).length;

  if (loading) {
    return (
      <div className="admin-page-loading">
        <div className="spinner"></div>
        <p>Loading Hero Gallery Settings...</p>
      </div>
    );
  }

  return (
    <div className="admin-home-settings-page">
      {/* Hidden file input for Replace action */}
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleExecuteReplace}
        style={{ display: 'none' }}
      />

      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Home Page Settings & Hero Gallery</h1>
          <p className="admin-page-subtitle">
            Manage the dynamic hero image carousel, image order, active/inactive visibility, and marketing headlines.
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

      {/* Main Grid: Gallery List + Live Preview Sticky Side */}
      <div className="home-settings-grid">
        {/* LEFT COLUMN: HERO GALLERY MANAGEMENT */}
        <div className="management-card">
          <div className="card-header-strip">
            <ImageIcon size={22} className="strip-icon" />
            <div>
              <h2>Hero Gallery Management</h2>
              <span>Upload, reorder, enable/disable, and replace images for the Home Page carousel</span>
            </div>
          </div>

          {/* Top Actions: Upload Button & Counter */}
          <div className="gallery-top-actions">
            <div className="gallery-count-badge">
              <span>{activeCount} of {gallery.length} Images Active on Live Site</span>
            </div>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                id="gallery-file-upload"
              />
              <label htmlFor="gallery-file-upload" className="btn btn-primary btn-sm">
                <Plus size={15} />
                <span>Add Image to Gallery</span>
              </label>
            </div>
          </div>

          {/* Unsaved Preview / Staging Box */}
          {previewUrl && (
            <div className="unsaved-staging-box">
              <div className="unsaved-staging-header">
                <span className="unsaved-badge">
                  <Upload size={14} />
                  <span>New Image Preview (Unsaved)</span>
                </span>
                <button
                  type="button"
                  onClick={handleDiscardStaging}
                  className="btn btn-outline btn-sm"
                  title="Discard"
                >
                  <X size={14} />
                  <span>Cancel</span>
                </button>
              </div>

              <img
                src={previewUrl}
                alt="New upload preview"
                className="unsaved-staging-img"
              />

              <div className="unsaved-form-row">
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Optional Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Personalized Nutrition Guidance"
                    className="form-input"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Optional Short Description</label>
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="e.g. Body screening & healthy habits"
                    className="form-input"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div className="unsaved-actions">
                <button
                  type="button"
                  onClick={handleSaveNewGalleryImage}
                  disabled={uploading}
                  className="btn btn-primary btn-sm"
                >
                  <Save size={15} />
                  <span>{uploading ? 'Uploading to Storage...' : 'Save & Add to Gallery'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDiscardStaging}
                  disabled={uploading}
                  className="btn btn-secondary btn-sm"
                >
                  Discard
                </button>
              </div>
            </div>
          )}

          {/* List of Gallery Items */}
          <div className="gallery-items-stack" style={{ marginTop: '1rem' }}>
            {gallery.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === gallery.length - 1;

              return (
                <div
                  key={item.id || index}
                  className={`gallery-item-card ${item.active ? 'active' : 'inactive'}`}
                >
                  <span className="gallery-order-num">#{item.display_order || index + 1}</span>

                  <div className="gallery-thumb-box">
                    <img
                      src={item.image_path || '/assets/hero-wellness.jpg'}
                      alt={item.title || 'Gallery item'}
                      className="gallery-thumb-img"
                      onError={(e) => {
                        e.currentTarget.src = '/assets/hero-wellness.jpg';
                      }}
                    />
                  </div>

                  <div className="gallery-item-info">
                    <span className="gallery-item-title">{item.title || 'Untitled Photo'}</span>
                    <span className="gallery-item-desc">
                      {item.description || 'No caption provided'}
                    </span>
                  </div>

                  {/* Active / Inactive Pill Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(item.id)}
                    className={`gallery-status-btn ${item.active ? 'active' : 'inactive'}`}
                    title={item.active ? 'Click to deactivate (hide from carousel)' : 'Click to activate (show on carousel)'}
                  >
                    {item.active ? <Eye size={12} /> : <EyeOff size={12} />}
                    <span>{item.active ? 'Active' : 'Inactive'}</span>
                  </button>

                  {/* Reorder and Item Actions */}
                  <div className="gallery-item-actions">
                    <button
                      type="button"
                      onClick={() => handleMoveOrder(index, 'up')}
                      disabled={isFirst}
                      className="icon-ctrl-btn"
                      title="Move Up"
                    >
                      <ArrowUp size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMoveOrder(index, 'down')}
                      disabled={isLast}
                      className="icon-ctrl-btn"
                      title="Move Down"
                    >
                      <ArrowDown size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="icon-ctrl-btn"
                      title="Edit Title & Description"
                    >
                      <Edit2 size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTriggerReplace(item.id)}
                      className="icon-ctrl-btn"
                      title="Replace Photo"
                    >
                      <RefreshCw size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingId(item.id)}
                      className="icon-ctrl-btn delete"
                      title="Delete Photo"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
            <p><strong>Note:</strong> Reordering or toggling status saves automatically and syncs directly to the live website.</p>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY LIVE CAROUSEL PREVIEW + HEADLINES */}
        <div className="preview-sticky-wrap">
          <div className="carousel-preview-card">
            <div className="carousel-preview-header">
              <h3>Live Public Carousel Preview</h3>
              <span className="gallery-count-badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                Preview Mode
              </span>
            </div>

            {/* Live Interactive Preview */}
            <HeroCarousel
              items={gallery.filter((g) => g.active)}
              fallbackImage="/assets/hero-wellness.jpg"
            />

            <p className="carousel-preview-note">
              Shows only active gallery images in saved display order. Cycles every 4.5 seconds with touch swipe enabled.
            </p>
          </div>

          {/* HEADLINES EDITOR CARD */}
          <div className="management-card" style={{ padding: '1.5rem' }}>
            <div className="card-header-strip" style={{ marginBottom: '1rem', paddingBottom: '0.75rem' }}>
              <Sparkles size={18} className="strip-icon" />
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-primary)' }}>Hero Headlines</h3>
                <span style={{ fontSize: '0.775rem' }}>Text alongside carousel on Home Page</span>
              </div>
            </div>

            <form onSubmit={handleSaveHeadlines}>
              <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                <label className="form-label" style={{ fontSize: '0.825rem' }}>Tagline Badge</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                <label className="form-label" style={{ fontSize: '0.825rem' }}>Main Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="form-input"
                  style={{ padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" style={{ fontSize: '0.825rem' }}>Supporting Description</label>
                <textarea
                  value={subheadline}
                  onChange={(e) => setSubheadline(e.target.value)}
                  rows={3}
                  className="form-textarea"
                  style={{ padding: '0.55rem 0.75rem', fontSize: '0.85rem' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button
                  type="submit"
                  disabled={savingText}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  <Save size={14} />
                  <span>{savingText ? 'Saving...' : 'Save Headlines'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTagline(INITIAL_HERO_CONTENT.tagline);
                    setHeadline(INITIAL_HERO_CONTENT.headline);
                    setSubheadline(INITIAL_HERO_CONTENT.subheadline);
                  }}
                  className="btn btn-outline btn-sm"
                  title="Reset to Defaults"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Edit Details Modal */}
      {editingItem && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header-strip">
              <h3>Edit Image Details</h3>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="modal-close-btn"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="modal-body">
              <div className="form-group">
                <label className="form-label">Image Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="e.g. Body Composition & Screenings"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Short Description / Subtitle</label>
                <input
                  type="text"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  placeholder="e.g. Scientific BMI and metabolic assessments"
                  className="form-input"
                />
              </div>
              <div className="modal-actions-bar">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  <Save size={14} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '420px' }}>
            <div className="modal-body" style={{ textAlign: 'center', padding: '1.75rem 1.25rem' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}
              >
                <AlertTriangle size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>
                Delete this image?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                This image will be permanently removed from your Home Page carousel. This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => setDeletingId(null)}
                  className="btn btn-secondary btn-sm"
                  disabled={processingDelete}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="btn btn-danger btn-sm"
                  disabled={processingDelete}
                >
                  {processingDelete ? 'Deleting...' : 'Yes, Delete Image'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
