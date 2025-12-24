import React from 'react';
import './Footer.css';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">© {new Date().getFullYear()} IndiQuant — Built with ❤️</div>
    </footer>
  );
}
