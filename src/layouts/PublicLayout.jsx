import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PublicLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="public-layout-root">
      <Header />
      <main id="main-content" style={{ flex: 1, width: '100%', maxWidth: '100%', overflowX: 'clip' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
