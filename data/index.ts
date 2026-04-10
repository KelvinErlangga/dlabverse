import { 
  Code, Smartphone, Rocket, ShieldCheck, 
  Building2, Coffee, Globe2, Briefcase, MonitorPlay 
} from "lucide-react";

export const servicesData = [
  {
    title: "Web Development",
    description: "Building high-performance websites using modern technologies like Next.js and React.",
    icon: Code,
  },
  {
    title: "Mobile Apps",
    description: "Intuitive and responsive Android & iOS applications to reach more users effectively.",
    icon: Smartphone,
  },
  {
    title: "Digital Transformation",
    description: "Automate your business processes with efficient ERP systems or custom software solutions.",
    icon: Rocket,
  },
];

export const portfolioData = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    category: "Web App",
    description: "Real-time inventory management and sales analytics system for large-scale retail.",
    color: "from-blue-400 to-indigo-600"
  },
  {
    id: 2,
    title: "Fintech Mobile App",
    category: "Mobile App",
    description: "Digital wallet application featuring QRIS payments and mutual fund investments.",
    color: "from-emerald-400 to-teal-600"
  },
  {
    id: 3,
    title: "Hospital ERP System",
    category: "Enterprise",
    description: "Integrated platform for patient medical records, pharmacy, and billing management.",
    color: "from-orange-400 to-red-600"
  },
  {
    id: 4,
    title: "AI Education Platform",
    category: "Web App",
    description: "Learning Management System with AI-driven curriculum recommendations.",
    color: "from-purple-400 to-pink-600"
  }
];

export const clientsData = [
  { name: "TechCorp", icon: Building2 },
  { name: "Kopi Senja", icon: Coffee },
  { name: "GlobalNet", icon: Globe2 },
  { name: "StudioKarya", icon: Briefcase },
  { name: "MediaNusantara", icon: MonitorPlay },
  // Duplicated for seamless marquee animation
  { name: "TechCorp", icon: Building2 },
  { name: "Kopi Senja", icon: Coffee },
  { name: "GlobalNet", icon: Globe2 },
  { name: "StudioKarya", icon: Briefcase },
  { name: "MediaNusantara", icon: MonitorPlay },
];

export const teamData = [
  {
    id: 1,
    name: "Kelvin Erlangga Satriagung",
    role: "Fullstack Developer",
    image: "https://ui-avatars.com/api/?name=Kelvin+Erlangga&background=2563EB&color=fff&size=256",
  },
  {
    id: 2,
    name: "Daniel Kurnia Putra",
    role: "Fullstack Developer",
    image: "https://ui-avatars.com/api/?name=Daniel+Kurnia&background=4F46E5&color=fff&size=256",
  },
  {
    id: 3,
    name: "Rahmadani Suryanto Dwi Putra",
    role: "Fullstack Developer",
    image: "https://ui-avatars.com/api/?name=Rahmadani+Suryanto&background=059669&color=fff&size=256",
  }
];