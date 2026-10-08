import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Cloud,
  Headphones,
  Lock,
  Laptop,
  Network,
  HardDrive,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Award,
} from 'lucide-react';
import { services, dataCenterImage, securityImage } from '@/lib/data';

const processSteps = [
  {
    title: 'Discovery & Assessment',
    description: 'We analyze your current infrastructure, identify gaps, and define clear objectives for your IT transformation.',
    icon: Globe,
  },
  {
    title: 'Strategy & Planning',
    description: 'A tailored roadmap with milestones, resource allocation, and risk mitigation strategies for seamless execution.',
    icon: TrendingUp,
  },
  {
    title: 'Implementation',
    description: 'Expert deployment with zero-downtime migration, rigorous testing, and continuous stakeholder communication.',
    icon: Zap,
  },
  {
    title: 'Support & Optimization',
    description: 'Ongoing monitoring, proactive maintenance, and continuous optimization to keep your systems performing at peak.',
    icon: Shield,
  },
];

export default function Services() {
  return (
    <div className="bg-[#0a0f1e]">
      {/* ── Page Hero ── */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="glow-orb w-[400px] h-[400px] bg-primary-600/20 top-0 right-0" />
        <div className="glow-orb w-[300px] h-[300px] bg-accent-500/15 bottom-0 left-0" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in">
            <Award className="w-4 h-4 text-accent-400" />
            <span className="text-xs font-medium text-gray-300 tracking-wide">
              Expert IT Services
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.1] animate-fade-in-up stagger-1">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto animate-fade-in-up stagger-2">
            Comprehensive IT solutions engineered for enterprise excellence. From cloud migration
            to cybersecurity, we deliver technology that transforms your business operations.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="relative py-12 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="card-glow group glass rounded-2xl p-8 hover:border-primary-500/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                >
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary-400" />
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="glow-orb w-96 h-96 bg-accent-500/10 top-20 right-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={dataCenterImage}
                  alt="Enterprise data center infrastructure"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/60 to-transparent" />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-5">
                <Shield className="w-4 h-4 text-primary-400" />
                <span className="text-xs font-medium text-gray-300 tracking-wide">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
                Enterprise-Grade Excellence
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                We combine deep technical expertise with a customer-first approach to deliver
                IT solutions that are reliable, scalable, and secure. Our certified team ensures
                your infrastructure runs at peak performance.
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { title: 'Certified Experts', desc: 'Vendor-authorized professionals', icon: Award },
                  { title: '24/7 Support', desc: 'Round-the-clock monitoring', icon: Headphones },
                  { title: 'Proven Track Record', desc: '500+ successful projects', icon: TrendingUp },
                  { title: 'Secure & Compliant', desc: 'Enterprise-grade security', icon: Lock },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-heading font-semibold text-white">{item.title}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="glow-orb w-96 h-96 bg-primary-600/10 bottom-0 left-0" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-5">
              <Zap className="w-4 h-4 text-accent-400" />
              <span className="text-xs font-medium text-gray-300 tracking-wide">
                How We Work
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Our Process
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              A proven methodology that ensures successful delivery from assessment to optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative glass rounded-2xl p-6 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.12}s`, opacity: 0 }}
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-heading font-bold text-sm shadow-lg shadow-primary-500/30">
                    {i + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary-500/15 flex items-center justify-center mb-4 mt-2">
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-base font-heading font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-10 sm:p-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Need Expert IT Advice?
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed max-w-xl mx-auto">
              Our team is ready to help you design, implement, and manage the perfect IT
              infrastructure for your business.
            </p>
            <Link
              to="/contact"
              className="mt-8 group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
