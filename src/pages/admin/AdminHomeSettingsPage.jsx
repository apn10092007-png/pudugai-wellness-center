import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Trash2,
  Save,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Image as ImageIcon,
  Video as VideoIcon,
  Play,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Edit2,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import HeroCarousel from '../../components/HeroCarousel';
import {
  dataService,
  INITIAL_HERO_GALLERY,
  getMediaType,
  getMediaUrl
} from '../../services/dataService';
import './AdminHomeSettingsPage.css';

export default function AdminHomeSettingsPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // Upload staging state
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [stagedMediaType, setStagedMediaType] = useState('image'); // 'image' | 'video'
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

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const previewUrlRef = useRef(null);

  useEffect(() => {
    previewUrlRef.current = previewUrl;
  }, [previewUrl]);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const rawGallery = await dataService.getAllHeroGallery();
        if (mounted) {
          const list = Array.isArray(rawGallery) && rawGallery.length > 0
            ? rawGallery
            : INITIAL_HERO_GALLERY;
          setGallery(list.slice().sort((a, b) => (a.display_order || 0) - (b.display_order || 0)));
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load hero slideshow settings:', err);
        if (mounted) {
          setErrorMsg('Could not load current hero slideshow settings. Showing default configuration.');
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      mounted = false;
      if (previewUrlRef.current && previewUrlRef.current.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrlRef.current);
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

  // Validate uploaded file (image or video)
  const validateFile = (file) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-m4v'];

    const isImage = validImageTypes.includes(file.type) || /\.(jpe?g|png|webp)$/i.test(file.name || '');
    const isVideo = validVideoTypes.includes(file.type) || /\.(mp4|webm|mov|m4v)$/i.test(file.name || '');

    if (!isImage && !isVideo) {
      throw new Error('Please select a valid image (JPG, PNG, WebP) or video (MP4, WebM).');
    }

    if (isImage && file.size > 10 * 1024 * 1024) {
      throw new Error(`Photo "${file.name}" exceeds the 10MB limit (${formatFileSize(file.size)}). Please choose a smaller image.`);
    }

    if (isVideo && file.size > 60 * 1024 * 1024) {
      throw new Error(`Video "${file.name}" exceeds the 60MB limit (${formatFileSize(file.size)}). Please choose a compressed MP4 or WebM video under 60MB.`);
    }

    return isVideo ? 'video' : 'image';
  };

  // 1. Handle New Upload Selection
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const detectedType = validateFile(file);
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      const objectUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewUrl(objectUrl);
      setStagedMediaType(detectedType);
      setNewTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      setNewDescription('');
      setErrorMsg('');
      setSuccessMsg(`${detectedType === 'video' ? 'Video' : 'Photo'} selected for preview. Review details below and click "Save & Add to Slideshow".`);
    } catch (err) {
      setErrorMsg(err.message);
      setSuccessMsg('');
      if (imageInputRef.current) imageInputRef.current.value = '';
      if (videoInputRef.current) videoInputRef.current.value = '';
    }
  };

  const handleDiscardStaging = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setStagedMediaType('image');
    setNewTitle('');
    setNewDescription('');
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
    setErrorMsg('');
    setSuccessMsg('');
  };

  // 2. Save New Staged Media to Gallery
  const handleSaveNewGalleryMedia = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await dataService.addHeroGalleryItem({
        file: selectedFile,
        title: newTitle,
        description: newDescription,
        media_type: stagedMediaType
      });

      const updatedList = await dataService.getAllHeroGallery();
      setGallery(updatedList);
      handleDiscardStaging();
      setSuccessMsg(`New ${stagedMediaType === 'video' ? 'video' : 'photo'} successfully uploaded and added to the hero slideshow! Live website updated.`);
    } catch (err) {
      console.error('Error adding gallery media:', err);
      setErrorMsg(err.message || 'Failed to upload and save media.');
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
      const detectedType = validateFile(file);
      const publicUrl = await dataService.uploadHeroMedia(file);
      await dataService.updateHeroGalleryItem(replaceTargetId, {
        media_type: detectedType,
        media_url: publicUrl,
        image_path: publicUrl,
        video_path: detectedType === 'video' ? publicUrl : null
      });

      const updatedList = await dataService.getAllHeroGallery();
      setGallery(updatedList);
      setSuccessMsg(`Slide media replaced successfully with new ${detectedType === 'video' ? 'video' : 'photo'}! Live website updated.`);
    } catch (err) {
      console.error('Error replacing media:', err);
      setErrorMsg(err.message || 'Failed to replace media.');
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
      setSuccessMsg('Slide status updated. Public slideshow immediately reflects active items.');
    } catch (err) {
      console.error('Error toggling active:', err);
      setErrorMsg(err.message || 'Failed to update slide status.');
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
      setSuccessMsg('Slideshow order saved successfully! The public slideshow now follows this order.');
    } catch (err) {
      console.error('Error reordering slideshow:', err);
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
      setSuccessMsg('Slide removed from hero slideshow. Public website updated.');
    } catch (err) {
      console.error('Error deleting media slide:', err);
      setErrorMsg(err.message || 'Failed to delete slide.');
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
      setSuccessMsg('Slide details updated successfully!');
    } catch (err) {
      console.error('Error updating details:', err);
      setErrorMsg(err.message || 'Failed to update details.');
    }
  };

  const activeCount = gallery.filter((g) => g.active !== false).length;
  const imageCount = gallery.filter((g) => getMediaType(g) === 'image').length;
  const videoCount = gallery.filter((g) => getMediaType(g) === 'video').length;

  if (loading) {
    return (
      <div className="admin-page-loading">
        <div className="spinner"></div>
        <p>Loading Hero Slideshow Settings...</p>
      </div>
    );
  }

  return (
    <div className="admin-home-settings-page">
      {/* Hidden file input for Replace action (supports both images and videos) */}
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
        onChange={handleExecuteReplace}
        style={{ display: 'none' }}
      />

      {/* Hidden file inputs for Upload */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/mp4,video/webm"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Home Page Settings & Hero Slideshow</h1>
          <p className="admin-page-subtitle">
            Manage your Home Page media slideshow (Images & Videos), slide order, and captions.
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
        <div className="save-alert-success" role="status">
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="save-alert-error" role="alert">
          <AlertTriangle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Grid: Media Slides List + Live Preview Sticky Side */}
      <div className="home-settings-grid">
        {/* LEFT COLUMN: HERO MEDIA MANAGEMENT */}
        <div className="management-card">
          <div className="card-header-strip">
            <VideoIcon size={22} className="strip-icon" />
            <div>
              <h2>Hero Media Slideshow Management</h2>
              <span>Upload images (JPG, PNG, WebP) and videos (MP4, WebM), reorder slides, and customize captions</span>
            </div>
          </div>

          {/* Top Actions: Upload Buttons & Counter */}
          <div className="gallery-top-actions">
            <div className="gallery-count-badge">
              <span>
                {activeCount} of {gallery.length} Slides Active ({imageCount} Photos, {videoCount} Videos)
              </span>
            </div>

            <div className="gallery-upload-btn-group">
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="btn btn-primary btn-sm"
                title="Upload Photo (JPG, PNG, WebP)"
              >
                <ImageIcon size={15} />
                <span>Add Photo</span>
              </button>

              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="btn btn-teal btn-sm"
                title="Upload Video (MP4, WebM)"
              >
                <VideoIcon size={15} />
                <span>Add Video</span>
              </button>
            </div>
          </div>

          {/* Unsaved Preview / Staging Box */}
          {previewUrl && (
            <div className={`unsaved-staging-box is-${stagedMediaType}`}>
              <div className="unsaved-staging-header">
                <span className={`unsaved-badge badge-${stagedMediaType}`}>
                  {stagedMediaType === 'video' ? <VideoIcon size={14} /> : <ImageIcon size={14} />}
                  <span>
                    New {stagedMediaType === 'video' ? 'Video Slide' : 'Photo Slide'} Preview (Unsaved)
                  </span>
                </span>
                <span className="unsaved-filesize">
                  {selectedFile?.name} ({formatFileSize(selectedFile?.size)})
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

              {/* Dynamic Preview: Video player or Image */}
              <div className="unsaved-preview-media-wrap">
                {stagedMediaType === 'video' ? (
                  <video
                    src={previewUrl}
                    controls
                    playsInline
                    muted
                    className="unsaved-staging-video"
                  />
                ) : (
                  <img
                    src={previewUrl}
                    alt="New upload preview"
                    className="unsaved-staging-img"
                  />
                )}
              </div>

              <div className="unsaved-form-row">
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Slide Title (Optional)</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={stagedMediaType === 'video' ? 'e.g. Center Tour & Workout Highlights' : 'e.g. Personalized Nutrition Guidance'}
                    className="form-input"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Optional Short Description / Caption</label>
                  <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="e.g. Sustainable coaching in Pudukkottai"
                    className="form-input"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div className="unsaved-actions">
                <button
                  type="button"
                  onClick={handleSaveNewGalleryMedia}
                  disabled={uploading}
                  className="btn btn-primary btn-sm"
                >
                  <Save size={15} />
                  <span>
                    {uploading
                      ? `Uploading ${stagedMediaType === 'video' ? 'Video' : 'Photo'} to Storage...`
                      : `Save & Add to Slideshow`}
                  </span>
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

          {/* List of Gallery Slides */}
          <div className="gallery-items-stack" style={{ marginTop: '1rem' }}>
            {gallery.length === 0 && (
              <div className="empty-gallery-state">
                <p>No media slides currently in the hero slideshow. Click "Add Photo" or "Add Video" above to get started.</p>
              </div>
            )}

            {gallery.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === gallery.length - 1;
              const mediaType = getMediaType(item);
              const mediaUrl = getMediaUrl(item);

              return (
                <div
                  key={item.id || index}
                  className={`gallery-item-card ${item.active !== false ? 'active' : 'inactive'} type-${mediaType}`}
                >
                  <span className="gallery-order-num">#{item.display_order || index + 1}</span>

                  {/* Thumbnail Container (Image vs Video) */}
                  <div className="gallery-thumb-box">
                    {mediaType === 'video' ? (
                      <div className="gallery-thumb-video-wrap">
                        <video
                          src={mediaUrl}
                          muted
                          preload="metadata"
                          className="gallery-thumb-video"
                        />
                        <div className="gallery-thumb-video-badge" title="Video Slide">
                          <Play size={10} fill="#ffffff" />
                        </div>
                      </div>
                    ) : (
                      <img
                        src={mediaUrl}
                        alt={item.title || 'Gallery item'}
                        className="gallery-thumb-img"
                        onError={(e) => {
                          e.currentTarget.src = '/assets/hero-wellness.jpg';
                        }}
                      />
                    )}
                  </div>

                  {/* Item Info with Media Type Badge */}
                  <div className="gallery-item-info">
                    <div className="gallery-item-title-row">
                      <span className="gallery-item-title">{item.title || 'Untitled Slide'}</span>
                      <span className={`media-type-pill ${mediaType}`}>
                        {mediaType === 'video' ? (
                          <>
                            <VideoIcon size={11} />
                            <span>Video</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon size={11} />
                            <span>Photo</span>
                          </>
                        )}
                      </span>
                    </div>
                    <span className="gallery-item-desc">
                      {item.description || 'No caption provided'}
                    </span>
                  </div>

                  {/* Active / Inactive Pill Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(item.id)}
                    className={`gallery-status-btn ${item.active !== false ? 'active' : 'inactive'}`}
                    title={item.active !== false ? 'Click to hide from slideshow' : 'Click to show on slideshow'}
                  >
                    {item.active !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                    <span>{item.active !== false ? 'Active' : 'Inactive'}</span>
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
                      title="Edit Title & Caption"
                    >
                      <Edit2 size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTriggerReplace(item.id)}
                      className="icon-ctrl-btn"
                      title="Replace with new photo or video"
                    >
                      <RefreshCw size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingId(item.id)}
                      className="icon-ctrl-btn delete"
                      title="Delete Slide"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
            <p><strong>Note:</strong> Reordering, editing captions, or toggling status syncs directly to the live website.</p>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY LIVE SLIDESHOW PREVIEW + HEADLINES */}
        <div className="preview-sticky-wrap">
          <div className="carousel-preview-card">
            <div className="carousel-preview-header">
              <h3>Live Hero Slideshow Preview</h3>
              <span className="gallery-count-badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                Interactive Preview
              </span>
            </div>

            {/* Live Interactive Preview */}
            <HeroCarousel
              items={gallery.filter((g) => g.active !== false)}
              fallbackImage="/assets/hero-wellness.jpg"
            />

            <p className="carousel-preview-note">
              Plays active photos and videos in saved order. Videos autoplay muted with interactive audio and play controls.
            </p>
          </div>
        </div>
      </div>

      {/* Edit Details Modal */}
      {editingItem && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header-strip">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3>Edit Slide Details</h3>
                <span className={`media-type-pill ${getMediaType(editingItem)}`}>
                  {getMediaType(editingItem) === 'video' ? 'Video Slide' : 'Photo Slide'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="modal-close-btn"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="modal-body">
              <div className="form-group">
                <label className="form-label">Slide Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="e.g. Body Composition & Screenings"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Short Caption / Description</label>
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
                Delete this media slide?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                This media will be permanently removed from your Home Page slideshow and storage. This action cannot be undone.
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
                  {processingDelete ? 'Deleting...' : 'Yes, Delete Slide'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
