import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageSquare,
  User,
  Building2,
  ArrowRight,
} from 'lucide-react';
import Turnstile from '@/components/Turnstile';
import { isValidEmailAddress } from '@/lib/contactValidation';
import { siteConfig } from '@/lib/data';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceInterest: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

function validateForm(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  const email = form.email.trim();
  const phone = form.phone.trim();

  if (!form.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmailAddress(email)) {
    errors.email = 'Enter a valid email address, such as name@example.com.';
  }

  if (phone) {
    const digits = phone.replace(/\D/g, '');
    if (!/^\+?[0-9().\s-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = 'Enter a valid phone number with 7 to 15 digits.';
    }
  }

  if (!form.message.trim()) {
    errors.message = 'Please enter a message.';
  }

  return errors;
}

const serviceOptions = [
  'Cloud Hosting & Migration',
  'Managed IT Services',
  'Microsoft 365 Licensing & Support',
  'Google Workspace Licensing & Migration',
  'Cybersecurity Solutions',
  'Hardware & Device Procurement',
  'Network Infrastructure',
  'Data Storage & Backup',
  'Other / General Inquiry',
];

const contactCards = [
  {
    icon: Phone,
    label: 'Call Us',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
    description: 'Mon–Sat, 9 AM – 7 PM IST',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    description: 'We respond within 24 hours',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value: siteConfig.address,
    href: '#',
    description: 'Our office headquarters',
  },
];

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceInterest: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [turnstileSiteKey, setTurnstileSiteKey] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileError, setTurnstileError] = useState('');
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/turnstile-config')
      .then(async (response) => {
        if (!response.ok) throw new Error('Security verification is not configured yet.');
        const result: unknown = await response.json();
        if (
          !result ||
          typeof result !== 'object' ||
          !('siteKey' in result) ||
          typeof result.siteKey !== 'string' ||
          !result.siteKey
        ) {
          throw new Error('Security verification is not configured yet.');
        }
        if (!cancelled) setTurnstileSiteKey(result.siteKey);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setTurnstileError(
            error instanceof Error ? error.message : 'Unable to load the security check.',
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setFieldErrors((currentErrors) => {
      if (!(name in currentErrors)) return currentErrors;
      const nextErrors = { ...currentErrors };
      delete nextErrors[name as keyof FormState];
      return nextErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    if (!turnstileToken) {
      setTurnstileError('Please complete the security check before sending.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken }),
      });

      const result: unknown = await response.json();
      if (!response.ok) {
        const message =
          result &&
          typeof result === 'object' &&
          'error' in result &&
          typeof result.error === 'string'
            ? result.error
            : 'Unable to send your message. Please try again.';
        throw new Error(message);
      }

      setStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceInterest: '',
        message: '',
      });
      setFieldErrors({});
      setTurnstileToken('');
      setTurnstileResetKey((currentKey) => currentKey + 1);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
      setTurnstileToken('');
      setTurnstileResetKey((currentKey) => currentKey + 1);
    }
  };

  return (
    <div className="bg-[#0a0f1e]">
      {/* ── Page Hero ── */}
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="glow-orb w-[400px] h-[400px] bg-primary-600/20 top-0 left-0" />
        <div className="glow-orb w-[300px] h-[300px] bg-accent-500/15 bottom-0 right-0" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in">
            <MessageSquare className="w-4 h-4 text-accent-400" />
            <span className="text-xs font-medium text-gray-300 tracking-wide">
              Get in Touch
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.1] animate-fade-in-up stagger-1">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto animate-fade-in-up stagger-2">
            Ready to elevate your IT infrastructure? Reach out to our team of experts and
            discover how Akhil Technology can transform your business.
          </p>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section className="relative py-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <a
                  key={card.label}
                  href={card.href}
                  className="group glass rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-sm font-heading font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    {card.label}
                  </h3>
                  <p className="text-lg font-heading font-semibold text-white mb-1">
                    {card.value}
                  </p>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="relative py-12 overflow-hidden">
        <div className="glow-orb w-96 h-96 bg-primary-600/10 top-0 right-0" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left: Info panel */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-5">
                <Send className="w-4 h-4 text-primary-400" />
                <span className="text-xs font-medium text-gray-300 tracking-wide">
                  Send a Message
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4">
                Let's Start a Conversation
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Fill out the form and our team will get back to you within 24 hours.
                Whether you need cloud migration, cybersecurity solutions, or hardware
                procurement — we've got you covered.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Clock className="w-5 h-5 text-primary-400 flex-shrink-0" />
                  Response time: Within 24 hours
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  Free initial consultation
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                  No obligation, no pressure
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="glass rounded-2xl p-6 sm:p-8">
                {status === 'success' ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-success-500/20 flex items-center justify-center mb-5">
                      <CheckCircle className="w-8 h-8 text-success-500" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-400 max-w-sm">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 px-6 py-2.5 rounded-lg glass-light text-white text-sm font-medium hover:border-primary-500/40 transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {status === 'error' && (
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-error-500/10 border border-error-500/20">
                        <AlertCircle className="w-5 h-5 text-error-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-error-500">
                            Failed to send message
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{errorMessage}</p>
                        </div>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name <span className="text-error-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
                            aria-invalid={Boolean(fieldErrors.name)}
                            aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                            placeholder="John Doe"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${fieldErrors.name ? 'border-error-500' : 'border-white/10 focus:border-primary-500/50'}`}
                          />
                        </div>
                        {fieldErrors.name && (
                          <p id="contact-name-error" role="alert" className="mt-2 text-xs text-error-500">
                            {fieldErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email <span className="text-error-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="email"
                            name="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            aria-invalid={Boolean(fieldErrors.email)}
                            aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                            placeholder="john@company.com"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${fieldErrors.email ? 'border-error-500' : 'border-white/10 focus:border-primary-500/50'}`}
                          />
                        </div>
                        {fieldErrors.email && (
                          <p id="contact-email-error" role="alert" className="mt-2 text-xs text-error-500">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            aria-invalid={Boolean(fieldErrors.phone)}
                            aria-describedby={fieldErrors.phone ? 'contact-phone-error' : undefined}
                            placeholder="+91 98765 43210"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${fieldErrors.phone ? 'border-error-500' : 'border-white/10 focus:border-primary-500/50'}`}
                          />
                        </div>
                        {fieldErrors.phone && (
                          <p id="contact-phone-error" role="alert" className="mt-2 text-xs text-error-500">
                            {fieldErrors.phone}
                          </p>
                        )}
                      </div>

                      {/* Company */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="text"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Your company name"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-600 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Service Interest */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Service of Interest
                      </label>
                      <select
                        name="serviceInterest"
                        value={form.serviceInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                      >
                        <option value="" className="bg-[#0d1426]">
                          Select a service
                        </option>
                        {serviceOptions.map((option) => (
                          <option key={option} value={option} className="bg-[#0d1426]">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Message <span className="text-error-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        aria-invalid={Boolean(fieldErrors.message)}
                        aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                        placeholder="Tell us about your IT needs and how we can help..."
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all resize-none ${fieldErrors.message ? 'border-error-500' : 'border-white/10 focus:border-primary-500/50'}`}
                      />
                      {fieldErrors.message && (
                        <p id="contact-message-error" role="alert" className="mt-2 text-xs text-error-500">
                          {fieldErrors.message}
                        </p>
                      )}
                    </div>

                    <div>
                      {turnstileSiteKey ? (
                        <Turnstile
                          siteKey={turnstileSiteKey}
                          resetKey={turnstileResetKey}
                          onToken={(token) => {
                            setTurnstileToken(token);
                            setTurnstileError(
                              token ? '' : 'The security check expired. Please complete it again.',
                            );
                          }}
                          onError={setTurnstileError}
                        />
                      ) : (
                        <p className="text-sm text-gray-400">
                          {turnstileError || 'Loading security verification...'}
                        </p>
                      )}
                      {turnstileError && turnstileSiteKey && (
                        <p role="alert" className="mt-2 text-xs text-error-500">
                          {turnstileError}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'submitting' || !turnstileToken}
                      className="group w-full flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map / Location CTA ── */}
      <section className="relative py-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-7 h-7 text-primary-400" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-white">
                  Visit Our Office
                </h3>
                <p className="text-sm text-gray-400 mt-1">{siteConfig.address}</p>
              </div>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-light text-white font-semibold hover:border-primary-500/40 transition-all duration-300 hover:scale-105 flex-shrink-0"
            >
              Explore Our Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
