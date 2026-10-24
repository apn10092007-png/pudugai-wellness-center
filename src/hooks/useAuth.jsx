import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured());

  useEffect(() => {
    let mounted = true;

    if (isSupabaseConfigured()) {
      setIsDemoMode(false);
      // Fetch initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      });

      // Listen for auth state changes
      const {
        data: { subscription }
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      });

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    } else {
      // Local demo mode check
      const demoUser = localStorage.getItem('pwc_demo_admin');
      if (demoUser) {
        setUser(JSON.parse(demoUser));
      }
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return data;
    } else {
      // Demo authentication mode
      if (email.trim() && password.length >= 6) {
        const dummyUser = {
          id: 'admin-local-1',
          email: email.trim(),
          role: 'authenticated',
          user_metadata: { name: 'PWC Admin' }
        };
        localStorage.setItem('pwc_demo_admin', JSON.stringify(dummyUser));
        setUser(dummyUser);
        return { user: dummyUser };
      } else {
        throw new Error('Please enter a valid email and password (minimum 6 characters).');
      }
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('pwc_demo_admin');
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isDemoMode: !isSupabaseConfigured(),
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
