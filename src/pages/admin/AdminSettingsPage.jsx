import React, { useState } from 'react';
import {
  Database,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Users
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabaseClient';
import { useAuth } from '../../hooks/useAuth';
import './AdminSettingsPage.css';

export default function AdminSettingsPage() {
  const { user, isDemoMode } = useAuth();
  const [copied, setCopied] = useState(false);

  const supabaseConnected = isSupabaseConfigured();

  const sampleEnv = `# In your .env or .env.local file:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key`;

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(sampleEnv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="admin-settings-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">System Settings & Database Security</h1>
          <p className="admin-page-subtitle">
            Supabase connectivity status, database RLS policies, and administrator provisioning.
          </p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Card 1: Connection Health */}
        <div className="settings-card">
          <div className="settings-card-header">
            <Database size={20} className="card-icon" />
            <div>
              <h2>Supabase Database Connection</h2>
              <span>PostgreSQL & Storage state</span>
            </div>
          </div>

          <div className="status-indicator-box">
            {supabaseConnected ? (
              <div className="status-badge-row connected">
                <CheckCircle2 size={18} />
                <span>Connected to Live Supabase Project</span>
              </div>
            ) : (
              <div className="status-badge-row demo">
                <AlertTriangle size={18} />
                <span>Running in Local Preview Mode (Mock Storage)</span>
              </div>
            )}
          </div>

          <p className="settings-card-text">
            {supabaseConnected
              ? 'Your application is connected to the live Supabase PostgreSQL database. Queries, image uploads to Supabase Storage, and Auth sessions are operating live.'
              : 'The application is running in local preview mode. All website features, forms, and admin CRUD work locally. To connect to your live Supabase project, supply your credentials in the .env file.'}
          </p>

          <div className="env-guide-box">
            <div className="env-guide-header">
              <span className="env-label">Environment Variables Template (.env)</span>
              <button onClick={handleCopyEnv} className="btn-copy-env">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="env-code-block">{sampleEnv}</pre>
          </div>
        </div>

        {/* Card 2: Security & RLS Policies */}
        <div className="settings-card">
          <div className="settings-card-header">
            <ShieldCheck size={20} className="card-icon" />
            <div>
              <h2>Database Row Level Security (RLS)</h2>
              <span>Configured security boundaries</span>
            </div>
          </div>

          <ul className="security-checklist">
            <li className="sec-item">
              <CheckCircle2 size={16} className="sec-check" />
              <div>
                <strong>Enquiries Privacy (Protected):</strong>
                <p>Public users can only INSERT valid enquiries. Public SELECT is strictly forbidden.</p>
              </div>
            </li>
            <li className="sec-item">
              <CheckCircle2 size={16} className="sec-check" />
              <div>
                <strong>Published Services & Stories:</strong>
                <p>Only rows with <code>published = true</code> are readable by the public website.</p>
              </div>
            </li>
            <li className="sec-item">
              <CheckCircle2 size={16} className="sec-check" />
              <div>
                <strong>Zero Service-Role Key Exposure:</strong>
                <p>Browser code uses only the publishable anon key. Privileged keys are never bundled.</p>
              </div>
            </li>
            <li className="sec-item">
              <CheckCircle2 size={16} className="sec-check" />
              <div>
                <strong>Storage Bucket Permissions:</strong>
                <p>Buckets (<code>coach-images</code>, <code>service-images</code>, <code>story-images</code>) allow public read and authenticated-only write/delete.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Card 3: First Admin Setup Instructions */}
        <div className="settings-card" style={{ gridColumn: '1 / -1' }}>
          <div className="settings-card-header">
            <Users size={20} className="card-icon" />
            <div>
              <h2>How to Provision Authorized Administrators</h2>
              <span>Secure, invite-only admin access instructions</span>
            </div>
          </div>

          <div className="provisioning-steps-grid">
            <div className="prov-step-card">
              <span className="step-num-pill">Step 1</span>
              <h3>Execute Database Script</h3>
              <p>
                Run the script located at <code>supabase/setup.sql</code> inside your Supabase Project's <strong>SQL Editor</strong>.
              </p>
            </div>

            <div className="prov-step-card">
              <span className="step-num-pill">Step 2</span>
              <h3>Create Admin in Supabase Auth</h3>
              <p>
                In Supabase Dashboard, navigate to <strong>Authentication &rarr; Users &rarr; Add User &rarr; Create User</strong>. Enter the coach's email and password.
              </p>
            </div>

            <div className="prov-step-card">
              <span className="step-num-pill">Step 3</span>
              <h3>Sign In to Admin Portal</h3>
              <p>
                Navigate to <code>/admin/login</code> and sign in with the newly created administrator credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
