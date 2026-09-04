export interface Experience {
  company: string;
  location: string;
  role: string;
  start: string;
  end: string;
  type: string;
  products_owned?: string[];
  responsibilities: string[];
  tech: string[];
}

export interface Project {
  name: string;
  type: string;
  role: string;
  description: string;
  features: string[];
  tech: string[];
  live_url: string | null;
  status: string;
  category: 'government' | 'saas' | 'migration' | 'freelance';
}

export interface Education {
  degree: string;
  institution: string;
  university: string;
  start: string;
  end: string;
  percentage: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credential_url: string;
}

export interface SkillGroup {
  label: string;
  icon: string;
  skills: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
