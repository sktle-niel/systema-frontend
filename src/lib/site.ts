export const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export type Service = {
  id: string;
  title: string;
  desc: string;
};

export const SERVICES: Service[] = [
  {
    id: "01",
    title: "Desktop Apps",
    desc: "Offline-ready desktop applications for business and productivity workflows.",
  },
  {
    id: "02",
    title: "Mobile Apps",
    desc: "Android & iOS apps with modern UI/UX and reliable performance.",
  },
  {
    id: "03",
    title: "Business Websites",
    desc: "Professional websites that represent your brand and grow your business.",
  },
  {
    id: "04",
    title: "Landing Pages",
    desc: "High-converting landing pages designed to turn visitors into customers.",
  },
  {
    id: "05",
    title: "Travel & Services",
    desc: "Booking, tourism, and service platforms built for smooth experiences.",
  },
  {
    id: "06",
    title: "Inventory Systems",
    desc: "Stock management, analysis, and reports to streamline your inventory.",
  },
];

export const STATS = [
  { value: "120+", label: "Projects Shipped" },
  { value: "60+", label: "Capstones Built" },
  { value: "99.9%", label: "Uptime Target" },
  { value: "24/7", label: "Support Window" },
] as const;

export const PROCESS = [
  {
    id: "P-01",
    title: "Discover",
    desc: "We map requirements, scope, and constraints into a clear technical brief.",
  },
  {
    id: "P-02",
    title: "Design",
    desc: "Architecture, data models, and interface blueprints before a line of code.",
  },
  {
    id: "P-03",
    title: "Build",
    desc: "Iterative development with version control, reviews, and continuous testing.",
  },
  {
    id: "P-04",
    title: "Deploy",
    desc: "Ship to production, monitor, document, and hand over with full support.",
  },
] as const;

export const TECH = [
  "REACT",
  "TYPESCRIPT",
  "NODE.JS",
  "PHP / LARAVEL",
  "PYTHON",
  "MYSQL",
  "FLUTTER",
  "C# / .NET",
  "TAILWIND",
] as const;
