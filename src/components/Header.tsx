import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import { siteConfig } from '@/lib/data';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0f1e]/90 backdrop-blur-md border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" aria-label="Akhil Technology Home">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                    active
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full transition-all duration-300 ${
                      active ? 'w-6' : 'w-0 group-hover:w-6'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{siteConfig.phone}</span>
            </a>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary-500/40 transition-all duration-200 hover:scale-105"
            >
              Get a Quote
            </Link>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 bg-[#0d1426] border-l border-white/10 p-6 pt-24 transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    active
                      ? 'bg-primary-500/15 text-primary-400 border border-primary-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 pt-6 border-t border-white/10">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-sm text-gray-400 mb-4"
            >
              <Phone className="w-4 h-4 text-primary-400" />
              {siteConfig.phone}
            </a>
            <Link
              to="/contact"
              className="block w-full text-center px-5 py-3 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
