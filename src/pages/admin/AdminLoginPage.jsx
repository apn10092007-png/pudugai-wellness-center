import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './AdminLoginPage.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both admin email and password.');
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Invalid administrator login credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card-wrapper">
        <div className="login-header">
          <Link to="/" className="login-brand">
            <img src="/assets/pwc-logo.jpeg" alt="PWC Logo" className="login-logo-img" />
            <div>
              <span className="login-brand-title">Pudugai Wellness Center</span>
              <span className="login-brand-sub">Management Portal</span>
            </div>
          </Link>
          <h2>Administrator Sign In</h2>
          <p>Sign in to manage services, coach profile, success stories, and customer enquiries.</p>
        </div>

        {errorMsg && (
          <div className="login-alert-error">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Admin Email Address</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-icon" />
              <input
                type="email"
                id="admin-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pudugaiwellness.com"
                className="form-input has-icon"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <div className="input-with-icon">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                id="admin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="form-input has-icon"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-lg login-submit-btn"
          >
            {submitting ? (
              <>
                <div className="btn-spinner"></div>
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer-links">
          <Link to="/" className="back-to-site-link">&larr; Return to Public Website</Link>
        </div>
      </div>
    </div>
  );
}
