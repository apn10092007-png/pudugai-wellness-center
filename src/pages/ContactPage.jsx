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
  ShieldCheck,
  Clock
} from 'lucide-react';
import { InstagramIcon as Instagram } from '../components/Icons';
import { dataService } from '../services/dataService';
import './ContactPage.css';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service');

  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    message: initialService
      ? `Hello Coach Pandian, I am interested in learning more about the "${initialService}" program.`
      : ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.customer_name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number (e.g. 94434 43261).');
      return;
    }

    if (!formData.message.trim()) {
      setErrorMsg('Please enter a brief note about your wellness goal.');
      return;
    }

    setSubmitting(true);
    try {
      await dataService.submitEnquiry({
        customer_name: formData.customer_name,
        phone: formData.phone,
        message: formData.message
      });
      setSuccess(true);
      setFormData({ customer_name: '', phone: '', message: '' });
    } catch (err) {
      setErrorMsg(err.message || 'Unable to submit enquiry. Please call or WhatsApp us directly.');
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
                  <a href="tel:9443443261" className="btn btn-primary btn-lg action-btn">
                    <Phone size={18} />
                    <span>Call Coach: 94434 43261</span>
                  </a>

                  <a
                    href="https://wa.me/919443443261"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg action-btn"
                  >
                    <MessageSquare size={18} />
                    <span>WhatsApp: 94434 43261</span>
                  </a>

                  <a
                    href="https://www.instagram.com/coach_pandian?exln=YmNsbjZkeXQ1dnc3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-lg action-btn"
                  >
                    <Instagram size={18} />
                    <span>Instagram: @coach_pandian</span>
                  </a>
                </div>

                {/* Center Location Cards */}
                <div className="center-address-card">
                  <div className="address-header">
                    <MapPin size={20} className="address-pin-icon" />
                    <h3>Pudukkottai Center Address</h3>
                  </div>

                  <div className="address-body">
                    <div className="address-lang-block">
                      <span className="address-lang-label">English:</span>
                      <p className="address-text en">
                        Pudugai Wellness Center<br />
                        E Main Rd, T Nagar, Buvaneswari Nagar,<br />
                        Pudukkottai, Tamil Nadu 622001
                      </p>
                    </div>

                    <div className="address-lang-block">
                      <span className="address-lang-label">தமிழ்:</span>
                      <p className="address-text ta">
                        புடுகை வெல்னஸ் சென்டர்<br />
                        கிழக்கு முதன்மை சாலை, டி நகர்,<br />
                        புவனேஸ்வரி நகர், புதுக்கோட்டை, தமிழ்நாடு 622001
                      </p>
                    </div>

                    <a
                      href="https://maps.app.goo.gl/JAdNVeq53M3PdrW1A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm maps-nav-btn"
                    >
                      <span>Open in Google Maps / Directions</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Enquiry Form */}
            <div className="contact-form-column">
              <div className="form-card-box">
                <div className="form-card-header">
                  <h2>Send an Assessment Enquiry</h2>
                  <p>
                    Fill in your details below and Coach Thangapandian will review your enquiry and
                    contact you directly.
                  </p>
                </div>

                {success ? (
                  <div className="enquiry-success-state">
                    <div className="success-icon-wrap">
                      <CheckCircle size={40} />
                    </div>
                    <h3>Enquiry Received Successfully!</h3>
                    <p>
                      Thank you for contacting Pudugai Wellness Center. Coach Thangapandian S will
                      review your request and get in touch with you shortly.
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setSuccess(false)}
                    >
                      <span>Submit Another Enquiry</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
                    {errorMsg && (
                      <div className="form-alert-error">
                        <AlertCircle size={16} />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="form-group">
                      <label htmlFor="customer_name" className="form-label">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="customer_name"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Kumar"
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 94434 43261 or 98765 43210"
                        className="form-input"
                        required
                      />
                      <span className="form-help">
                        We will reach out via call or WhatsApp.
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Your Wellness Goal or Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us what you'd like to achieve (e.g. Weight loss, BMI screening, diet plan, energy recovery)..."
                        className="form-textarea"
                        rows={4}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary btn-lg submit-btn"
                    >
                      {submitting ? (
                        <>
                          <div className="btn-spinner"></div>
                          <span>Sending Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <Send size={16} />
                        </>
                      )}
                    </button>

                    <div className="form-privacy-note">
                      <ShieldCheck size={16} className="privacy-icon" />
                      <span>
                        <strong>Privacy Notice:</strong> Your contact information is kept strictly
                        confidential and is never shared or used for spam.
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
