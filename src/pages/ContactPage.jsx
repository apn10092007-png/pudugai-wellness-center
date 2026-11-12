import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Phone,
  MessageSquare,
  MapPin,
  ExternalLink,
  Send,
  CheckCircle,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { InstagramIcon as Instagram } from '../components/Icons';
import { dataService } from '../services/dataService';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '../config/business';
import './ContactPage.css';

// Verified PWC Service Categories for the dropdown
const SERVICE_CATEGORIES = [
  {
    category: 'Weight Management',
    services: ['Weight Loss', 'Weight Gain']
  },
  {
    category: 'Health Screening',
    services: [
      'BMI (Body Mass Index)',
      'BMR (Basal Metabolic Rate)',
      'Body Fat Analysis',
      'Metabolic Age',
      'Skeletal Muscle Evaluation'
    ]
  },
  {
    category: 'Special Programs',
    services: [
      "Children's Health",
      "Women's Health",
      "Men's Health",
      'Energy & Fitness',
      'Eyes Health'
    ]
  },
  {
    category: 'Nutrition Guidance',
    services: ['Personalized Diet Plans', 'Healthy Habits']
  },
  {
    category: 'Wellness Solutions',
    services: [
      'Heart Health',
      'Digestive Health',
      'Bone & Joints',
      'Skin & Hair',
      'Immunity',
      'Brain & Sleep'
    ]
  }
];

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service');

  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    service: initialService || '',
    message: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync service if search params change
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (errorMsg) setErrorMsg('');
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.customer_name.trim()) {
      errors.customer_name = 'Please enter your full name.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.service.trim()) {
      errors.service = 'Please select an interested service or consultation program.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 1. WhatsApp Submission Flow (Opens prefilled WhatsApp message in a new tab)
  const handleContinueToWhatsApp = async () => {
    setErrorMsg('');
    if (!validateForm()) {
      setErrorMsg('Please complete all required fields before continuing to WhatsApp.');
      return;
    }

    // Construct the WhatsApp link
    const whatsappUrl = getWhatsAppUrl({
      name: formData.customer_name,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      recipientNumber: BUSINESS_CONFIG.whatsappNumber
    });

    // Optionally record enquiry to Supabase/dataService in the background
    try {
      await dataService.submitEnquiry({
        customer_name: formData.customer_name,
        phone: formData.phone,
        service: formData.service,
        message: formData.message?.trim() || 'Enquiry initiated via WhatsApp'
      });
    } catch (err) {
      // Do not block customer or falsely claim save; WhatsApp will still open directly
      console.warn('Background enquiry save note:', err.message);
    }

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // 2. Standard Web Submission Flow (Saves to Supabase with verification)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateForm()) {
      setErrorMsg('Please complete all required fields marked with *');
      return;
    }

    setSubmitting(true);
    try {
      const saved = await dataService.submitEnquiry({
        customer_name: formData.customer_name,
        phone: formData.phone,
        service: formData.service,
        message: formData.message?.trim() || 'Not provided'
      });

      if (!saved || !saved.success) {
        throw new Error('Database did not confirm enquiry submission. Please try again.');
      }

      setSuccess(true);
      setFormData({ customer_name: '', phone: '', service: '', message: '' });
      setFieldErrors({});
    } catch (err) {
      setErrorMsg(err.message || 'Unable to record enquiry. Please contact us directly via phone call.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="contact-header-section">
        <div className="container">
          <span className="section-tag">Direct Connect</span>
          <h1 className="contact-page-title">Contact & Location</h1>
          <p className="contact-page-lead">
            Reach out to Wellness Coach Thangapandian S for program details, personalized body
            composition screenings, and consultation timings.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section contact-main-section">
        <div className="container">
          <div className="contact-grid">
            {/* Left: Contact Info & Action Buttons */}
            <div className="contact-info-column">
              <div className="contact-card-box">
                <h2 className="info-box-title">Get in Touch Directly</h2>
                <p className="info-box-sub">
                  Coach Thangapandian is available for direct calls, WhatsApp chats, and in-person
                  visits at our Pudukkottai center.
                </p>

                {/* Direct Action Buttons */}
                <div className="action-buttons-stack">
                  <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="btn btn-primary btn-lg action-btn">
                    <Phone size={18} />
                    <span>Call Coach: {BUSINESS_CONFIG.phoneDisplay}</span>
                  </a>

                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg action-btn"
                  >
                    <MessageSquare size={18} />
                    <span>WhatsApp: {BUSINESS_CONFIG.phoneDisplay}</span>
                  </a>

                  <a
                    href={BUSINESS_CONFIG.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-lg action-btn"
                  >
                    <Instagram size={18} />
                    <span>Instagram: @coach_pandian</span>
                  </a>
                </div>

                {/* Center Location Cards: Pudugai & Peravurani */}
                <div className="contact-locations-section">
                  <div className="locations-header">
                    <MapPin size={20} className="locations-pin-icon" />
                    <h3 className="locations-main-title">Our Locations</h3>
                  </div>

                  <div className="locations-cards-grid">
                    {/* Location 1 – Pudugai */}
                    <div className="location-card">
                      <div className="location-card-header">
                        <h4 className="location-name">Pudugai</h4>
                      </div>
                      <a
                        href="https://maps.app.goo.gl/JAdNVeq53M3PdrW1A"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm location-maps-btn"
                      >
                        <span>View on Google Maps</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>

                    {/* Location 2 – Peravurani */}
                    <div className="location-card">
                      <div className="location-card-header">
                        <h4 className="location-name">Peravurani</h4>
                      </div>
                      <a
                        href="https://maps.app.goo.gl/DFpxMGuHuTudNYFb6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm location-maps-btn"
                      >
                        <span>View on Google Maps</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Enquiry Form with WhatsApp flow */}
            <div className="contact-form-column">
              <div className="form-card-box">
                <div className="form-card-header">
                  <h2>Send an Assessment Enquiry</h2>
                  <p>
                    Share your goals below. You can send your enquiry directly to Coach Thangapandian
                    via WhatsApp or submit through our web form.
                  </p>
                </div>

                {success ? (
                  <div className="enquiry-success-state">
                    <div className="success-icon-wrap">
                      <CheckCircle size={40} />
                    </div>
                    <h3>Enquiry Submitted Successfully!</h3>
                    <p>
                      Thank you for contacting Pudugai Wellness Center. Your enquiry has been saved and Coach Thangapandian S will
                      review your details and get in touch with you shortly.
                    </p>

                    <div className="enquiry-success-actions">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setSuccess(false)}
                      >
                        <span>Submit Another Enquiry</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
                    {errorMsg && (
                      <div className="form-alert-error">
                        <AlertCircle size={16} />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* 1. Full Name */}
                    <div className="form-group">
                      <label htmlFor="customer_name" className="form-label">
                        Full Name <span className="req-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="customer_name"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Kumar"
                        className={`form-input ${fieldErrors.customer_name ? 'input-error' : ''}`}
                        required
                      />
                      {fieldErrors.customer_name && (
                        <span className="field-error-text">{fieldErrors.customer_name}</span>
                      )}
                    </div>

                    {/* 2. Phone Number */}
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone Number <span className="req-star">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 94434 43261 or 98765 43210"
                        className={`form-input ${fieldErrors.phone ? 'input-error' : ''}`}
                        required
                      />
                      {fieldErrors.phone ? (
                        <span className="field-error-text">{fieldErrors.phone}</span>
                      ) : (
                        <span className="form-help">
                          Coach Thangapandian will reach out via call or WhatsApp.
                        </span>
                      )}
                    </div>

                    {/* 3. Interested Service */}
                    <div className="form-group">
                      <label htmlFor="service" className="form-label">
                        Interested Service <span className="req-star">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`form-select ${fieldErrors.service ? 'input-error' : ''}`}
                        required
                      >
                        <option value="">Select a wellness program or screening</option>
                        <option value="General Wellness & Nutrition Consultation">
                          General Wellness & Nutrition Consultation
                        </option>
                        {SERVICE_CATEGORIES.map((catGroup) => (
                          <optgroup key={catGroup.category} label={`── ${catGroup.category} ──`}>
                            {catGroup.services.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      {fieldErrors.service && (
                        <span className="field-error-text">{fieldErrors.service}</span>
                      )}
                    </div>

                    {/* 4. Message / Enquiry Details */}
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Message / Enquiry Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your goals (e.g., target weight loss, energy recovery, body fat screening, diet plan)..."
                        className="form-textarea"
                        rows={3}
                      />
                      <span className="form-help">
                        Optional. If left blank, it will show as "Not provided" in WhatsApp.
                      </span>
                    </div>

                    {/* Submit & WhatsApp Action Buttons */}
                    <div className="form-actions-stack">
                      {/* Primary WhatsApp Action Button */}
                      <button
                        type="button"
                        onClick={handleContinueToWhatsApp}
                        className="btn btn-whatsapp btn-lg whatsapp-enquiry-btn"
                        title="Continue directly to WhatsApp with prefilled message"
                      >
                        <MessageSquare size={18} />
                        <span>Continue to WhatsApp ↗</span>
                      </button>

                      {/* Web Form Submit Button */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-outline btn-lg submit-btn"
                      >
                        {submitting ? (
                          <>
                            <div className="btn-spinner"></div>
                            <span>Recording Web Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Web Enquiry</span>
                            <Send size={16} />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="form-privacy-note">
                      <ShieldCheck size={16} className="privacy-icon" />
                      <span>
                        <strong>Privacy Notice:</strong> Your contact information is kept strictly
                        confidential. We never share customer phone numbers or send spam.
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="section map-embed-section">
        <div className="container">
          <div className="map-header">
            <span className="section-tag">Interactive Map</span>
            <h2>Locate Pudugai Wellness Center</h2>
            <p>
              Located on East Main Road, T Nagar, Buvaneswari Nagar, Pudukkottai.
            </p>
          </div>

          <div className="map-frame-wrapper">
            <iframe
              title="Pudugai Wellness Center Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.8647575294577!2d78.8242442!3d10.3798485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0079bf197bcc2f%3A0x9a3083b3bfa6b77d!2sPUDUGAI%20WELLNESS%20CENTER!5e0!3m2!1sen!2sin!4v1729752000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
