import { Cloud, Server, Shield, Laptop, Network, Settings, Cpu, HardDrive, Monitor, Lock, Mail, Phone, MapPin, CheckCircle, ArrowRight, Globe, Zap, Headphones, Package, Layers } from 'lucide-react';

export const siteConfig = {
  name: 'Akhil Technology',
  tagline: 'Your IT Partner for a Secure Future',
  phone: '+91 9270720913',
  email: 'gethelp@akhiltechnology.com',
  address: 'Mundhwa, Pune, Maharashtra 411036',
  copyright: '© 2026 Akhil Technology. Providing elite SaaS, cloud, and enterprise IT solutions worldwide.',
};

export const heroImage = 'https://images.pexels.com/photos/14314638/pexels-photo-14314638.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
export const dataCenterImage = 'https://images.pexels.com/photos/37730212/pexels-photo-37730212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
export const securityImage = 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
export const infraSupportImage = 'https://images.pexels.com/photos/4705628/pexels-photo-4705628.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export const hardwareGallery = [
  { url: 'https://images.pexels.com/photos/265101/pexels-photo-265101.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Modern office desk setup with laptop and stylish decor' },
  { url: 'https://images.pexels.com/photos/1466609/pexels-photo-1466609.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Contemporary workspace featuring a Dell laptop and stationery' },
  { url: 'https://images.pexels.com/photos/270694/pexels-photo-270694.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Top view of a tidy workspace with laptop, smartphone, and notebook' },
  { url: 'https://images.pexels.com/photos/34140/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Workspace showcasing a laptop, tablet, and smartphones' },
  { url: 'https://images.pexels.com/photos/34804001/pexels-photo-34804001.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Open laptop displaying code in a modern office' },
  { url: 'https://images.pexels.com/photos/3944802/pexels-photo-3944802.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Stylish office desk with laptop, camera, and notebook' },
  { url: 'https://images.pexels.com/photos/8424478/pexels-photo-8424478.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Office desk with coffee mug and laptop in background' },
  { url: 'https://images.pexels.com/photos/7378/startup-photos-7378.jpg?auto=compress&cs=tinysrgb&h=650&w=940', alt: 'Modern workspace with laptop, notebook, and pen' },
];

export const partnerLogos = [
  { name: 'Microsoft 365', icon: Package },
  { name: 'Google Workspace', icon: Mail },
  { name: 'Microsoft Azure', icon: Cloud },
  { name: 'AWS', icon: Server },
  { name: 'Google Cloud', icon: Globe },
  { name: 'Cisco', icon: Network },
  { name: 'Dell', icon: Monitor },
  { name: 'VMware', icon: Layers },
];

export const solutions = [
  {
    title: 'Platform Shift',
    description: 'Seamless deployment to major hosting providers including AWS, Azure, and Google Cloud with zero-downtime migration strategies.',
    icon: Cloud,
    features: ['Multi-cloud deployment', 'Zero-downtime migration', 'Auto-scaling infrastructure', 'Container orchestration'],
  },
  {
    title: 'App Bundles',
    description: 'Microsoft 365 and Google Workspace licensing, setup, support, and migration services for secure, productive teams.',
    icon: Package,
    features: ['Microsoft 365 licensing', 'Google Workspace licensing', 'Email & tenant migration', 'Ongoing user support'],
  },
  {
    title: 'Network Guard',
    description: 'Secure virtual logins, VPN tunnels, and asset protection with enterprise-grade encryption and real-time threat monitoring.',
    icon: Shield,
    features: ['VPN & secure access', 'Endpoint protection', 'Threat detection', 'Identity management'],
  },
];

export const infrastructureItems = [
  { title: 'Remote Managed Support', description: '24/7 proactive monitoring and resolution for your entire IT ecosystem from anywhere.', icon: Headphones },
  { title: 'Software Plan Management', description: 'Comprehensive license tracking, renewal automation, and cost optimization across all vendors.', icon: Settings },
  { title: 'Mixed Infrastructure Build', description: 'Custom hybrid infrastructure combining on-premise, cloud, and edge computing for optimal performance.', icon: Cpu },
  { title: 'Certified Product Vendor', description: 'Authorized reseller for leading technology brands with genuine warranty and enterprise pricing.', icon: CheckCircle },
  { title: 'Inbox Switch Professional', description: 'Seamless email migration and management across platforms with zero data loss guarantee.', icon: Mail },
];

export const services = [
  {
    title: 'Cloud Hosting & Migration',
    description: 'Migrate your workloads to the cloud with confidence. We handle assessment, planning, execution, and post-migration optimization.',
    icon: Cloud,
    features: ['Cloud readiness assessment', 'Lift-and-shift migration', 'Cloud-native architecture', 'Cost optimization analysis'],
  },
  {
    title: 'Managed IT Services',
    description: 'End-to-end IT management with proactive monitoring, rapid incident response, and dedicated support teams.',
    icon: Headphones,
    features: ['24/7 monitoring', 'Help desk support', 'Patch management', 'SLA-backed response'],
  },
  {
    title: 'Microsoft 365 Licensing & Support',
    description: 'Right-size Microsoft 365 plans, manage licenses, secure your tenant, and keep your users productive with responsive support.',
    icon: Package,
    features: ['Business & enterprise licensing', 'Tenant setup and administration', 'License optimization', 'User and admin support'],
  },
  {
    title: 'Google Workspace Licensing & Migration',
    description: 'Move to Google Workspace with a clear migration plan, flexible licensing, and dependable support for Gmail, Drive, and collaboration tools.',
    icon: Mail,
    features: ['Workspace licensing', 'Gmail and Drive migration', 'Domain and tenant setup', 'Ongoing workspace support'],
  },
  {
    title: 'Cybersecurity Solutions',
    description: 'Multi-layered security architecture protecting your data, applications, and network from modern threats.',
    icon: Lock,
    features: ['Security audits', 'Firewall management', 'Endpoint protection', 'Compliance consulting'],
  },
  {
    title: 'Hardware & Device Procurement',
    description: 'Source high-performance laptops, servers, and networking equipment from certified vendors at enterprise pricing.',
    icon: Laptop,
    features: ['Laptop & desktop procurement', 'Server hardware', 'Networking equipment', 'Asset lifecycle management'],
  },
  {
    title: 'Network Infrastructure',
    description: 'Design, build, and maintain robust network infrastructure optimized for performance, security, and scalability.',
    icon: Network,
    features: ['Network design & planning', 'VPN & secure access', 'Bandwidth optimization', 'Network monitoring'],
  },
  {
    title: 'Data Storage & Backup',
    description: 'Reliable storage solutions with automated backup, disaster recovery, and business continuity planning.',
    icon: HardDrive,
    features: ['Backup strategy & automation', 'Disaster recovery', 'Storage optimization', 'Data archiving'],
  },
];
