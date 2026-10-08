import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { siteConfig } from '@/lib/data';

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
];

const serviceLinks = [
  'Cloud Hosting & Migration',
  'Managed IT Services',
  'Microsoft 365 Licensing & Support',
  'Google Workspace Licensing & Migration',
  'Cybersecurity Solutions',
  'Hardware Procurement',
  'Network Infrastructure',
  'Data Storage & Backup',
];

export default function Footer() {
  return (
    <footer className="relative bg-[#070b16] border-t border-white/5 overflow-hidden">
      <div className="glow-orb w-96 h-96 bg-primary-600/10 top-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-5 text-sm text-gray-400 leading-relaxed">
              We deliver enterprise-grade IT sales, services, and solutions — from cloud migration to
              cybersecurity, hardware procurement to managed infrastructure support.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={`Social link ${i + 1}`}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/30 transition-all duration-200 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-primary-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-5">
              Our Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-primary-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">{siteConfig.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            {siteConfig.copyright}
          </p>
          <p className="text-xs text-gray-500">
            Designed & built with precision for enterprise excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
