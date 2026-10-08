import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Server,
  Shield,
  Cloud,
  Package,
  Headphones,
  Settings,
  Cpu,
  CheckCircle,
  Mail,
  ChevronRight,
  Zap,
  Globe,
  Lock,
  TrendingUp,
} from 'lucide-react';
import {
  heroImage,
  dataCenterImage,
  infraSupportImage,
  hardwareGallery,
  partnerLogos,
  solutions,
  infrastructureItems,
  siteConfig,
} from '@/lib/data';

const infrastructureIcons = [Headphones, Settings, Cpu, CheckCircle, Mail];

export default function Home() {
  return (
    <div className="bg-[#0a0f1e]">
      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="glow-orb w-[500px] h-[500px] bg-primary-600/20 top-10 -left-32" />
        <div className="glow-orb w-[400px] h-[400px] bg-accent-500/15 bottom-0 right-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
                <span className="text-xs font-medium text-gray-300 tracking-wide">
                  Trusted IT Partner Since 2026
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.1] animate-fade-in-up stagger-1">
                Global Enterprise
                <br />
                <span className="gradient-text">Solutions</span>
              </h1>

              <h2 className="mt-3 text-xl sm:text-2xl font-heading font-semibold text-gray-300 animate-fade-in-up stagger-2">
                Next-Gen Tech Ecosystem
              </h2>

              <p className="mt-6 text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl animate-fade-in-up stagger-3">
                Elevate your operations with optimized cloud hosting, enterprise-grade security,
                and scalable infrastructure. We empower businesses with technology that drives
                growth, resilience, and innovation.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up stagger-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-base shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105"
                >
                  Start Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass-light text-white font-semibold text-base hover:border-primary-500/40 transition-all duration-300 hover:scale-105"
                >
                  Expert Advice
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 animate-fade-in-up stagger-5">
                {[
                  { value: '500+', label: 'Projects Delivered' },
                  { value: '99.9%', label: 'Uptime Guarantee' },
                  { value: '24/7', label: 'Support Coverage' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl sm:text-3xl font-heading font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="relative animate-fade-in-up stagger-3">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={heroImage}
                  alt="Global enterprise cloud network solutions"
                  className="w-full h-[420px] sm:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />
              </div>

              {/* Floating card 1 */}
              <div className="absolute -top-4 -left-4 glass rounded-xl p-4 animate-float hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-success-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Secure Infrastructure</div>
                    <div className="text-xs text-gray-400">Enterprise-grade protection</div>
                  </div>
                </div>
              </div>

              {/* Floating card 2 */}
              <div
                className="absolute -bottom-4 -right-4 glass rounded-xl p-4 animate-float hidden sm:block"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Lightning Fast</div>
                    <div className="text-xs text-gray-400">Optimized performance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary-400 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Technology Partners Showcase ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="glow-orb w-96 h-96 bg-accent-500/10 top-0 left-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-5">
              <Globe className="w-4 h-4 text-accent-400" />
              <span className="text-xs font-medium text-gray-300 tracking-wide">
                Authorized Partner Showcase
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Technology Partners
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              As an authorized partner with elite global technology leaders, we bring you
              certified solutions, direct vendor support, and preferred enterprise pricing
              across the entire technology stack.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105"
            >
              Find Your Path
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Partner logos grid */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partnerLogos.map((partner, i) => {
              const Icon = partner.icon;
              return (
                <div
                  key={partner.name}
                  className="group glass rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-primary-500/30 transition-all duration-300 hover:scale-105 cursor-default animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
                >
                  <Icon className="w-8 h-8 text-gray-500 group-hover:text-primary-400 transition-colors duration-300" />
                  <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors text-center">
                    {partner.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Our IT Solutions ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="glow-orb w-96 h-96 bg-primary-600/10 bottom-0 right-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-5">
              <Package className="w-4 h-4 text-primary-400" />
              <span className="text-xs font-medium text-gray-300 tracking-wide">
                Our IT Solutions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Scalable Digital Hub
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Comprehensive technology solutions designed to scale with your business —
              from cloud platforms and workplace licensing to security infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((solution, i) => {
              const Icon = solution.icon;
              return (
                <div
                  key={solution.title}
                  className="card-glow group glass rounded-2xl p-8 hover:border-primary-500/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.12}s`, opacity: 0 }}
                >
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary-400" />
                    <div className="absolute inset-0 rounded-xl bg-primary-500/0 group-hover:bg-primary-500/10 transition-colors duration-300" />
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-white mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-5">
                    {solution.description}
                  </p>

                  <ul className="space-y-2.5">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/services"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors group/link"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Hardware & Laptop Solutions ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="glow-orb w-96 h-96 bg-accent-500/10 top-20 left-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-5">
              <Server className="w-4 h-4 text-accent-400" />
              <span className="text-xs font-medium text-gray-300 tracking-wide">
                Hardware Solutions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Hardware &amp; Laptop Solutions
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              High-performance hardware and laptop solutions sourced from certified vendors,
              plus the licensing and support your modern workplace depends on.
              From enterprise-grade workstations to portable powerhouses, we equip your team
              with the right technology to excel.
            </p>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hardwareGallery.map((item, i) => (
              <div
                key={i}
                className={`group relative rounded-xl overflow-hidden cursor-default animate-scale-in ${
                  i === 0 ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' : ''
                }`}
                style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
              >
                <img
                  src={item.url}
                  alt={item.alt}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    i === 0 ? 'h-full min-h-[300px]' : 'h-48'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <p className="text-xs text-gray-200 font-medium">{item.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Infrastructure Support ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="glow-orb w-96 h-96 bg-primary-600/10 bottom-0 left-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Items list */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-5">
                <Settings className="w-4 h-4 text-primary-400" />
                <span className="text-xs font-medium text-gray-300 tracking-wide">
                  Infrastructure Support
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
                Complete Infrastructure Management
              </h2>

              <div className="space-y-0">
                {infrastructureItems.map((item, i) => {
                  const Icon = infrastructureIcons[i];
                  return (
                    <div key={item.title}>
                      <div className="group flex items-start gap-4 py-5 hover:bg-white/5 -mx-4 px-4 rounded-xl transition-colors duration-200">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/15 to-accent-500/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-primary-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-base font-heading font-semibold text-white mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-primary-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-3" />
                      </div>
                      {i < infrastructureItems.length - 1 && (
                        <div className="border-b border-white/5" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={infraSupportImage}
                  alt="IT infrastructure support and hardware repair"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/60 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute top-6 right-6 glass rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success-500/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Certified Experts</div>
                    <div className="text-xs text-gray-400">Vendor authorized</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Running Text Section ── */}
      <section className="relative py-12 bg-gradient-to-r from-primary-900/20 via-[#0a0f1e] to-accent-900/20 border-y border-white/5 overflow-hidden">
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee items-center">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-700 mx-8 tracking-wide"
              >
                AKHIL TECHNOLOGY
                <span className="text-primary-500/40 mx-4">·</span>
                IT SALES, SERVICES AND SOLUTIONS
                <span className="text-accent-500/40 mx-4">·</span>
                CLOUD HOSTING
                <span className="text-primary-500/40 mx-4">·</span>
                CYBERSECURITY
                <span className="text-accent-500/40 mx-4">·</span>
                MANAGED INFRASTRUCTURE
                <span className="text-primary-500/40 mx-4">·</span>
                ENTERPRISE SOLUTIONS
                <span className="text-accent-500/40 mx-4">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-primary-600/15 top-0 left-1/2 -translate-x-1/2" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-10 sm:p-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Ready to Transform Your IT?
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed max-w-xl mx-auto">
              Partner with Akhil Technology for end-to-end IT solutions that drive growth,
              security, and innovation. Get expert advice tailored to your business needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105"
              >
                Contact Us Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass-light text-white font-semibold hover:border-primary-500/40 transition-all duration-300 hover:scale-105"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
