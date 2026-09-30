/** Capability inks used for colour-coding across the site. */
export type Capability = 'fe' | 'be' | 'ops' | 'seo';

export interface Logo {
  src: string;
  alt: string;
  /** Intrinsic size, used to reserve space and avoid layout shift. */
  width: number;
  height: number;
}

export interface CapabilityItem {
  key: Capability;
  name: string;
  summary: string;
  proof: string;
}

export interface ShippedFor {
  name: string;
  note: string;
  href: string;
  logo: Logo;
}

export interface Part {
  item: number;
  name: string;
  context: string;
  href?: string;
  /** Id of the case study that describes this part. */
  caseId: string;
  capabilities: Capability[];
  builtWith: string;
  scope: string;
  status: string;
}

export interface CaseStudy {
  id: string;
  items: string;
  title: string;
  role: string;
  capabilities: Capability[];
  logo?: Logo;
  featured: boolean;
  badge?: string;
  problem?: string;
  built: string[];
  outcome: { label: string; text: string };
  links: { label: string; href: string }[];
}

export interface Post {
  title: string;
  summary: string;
  href: string;
}

export interface Role {
  company: string;
  title: string;
  place: string;
  dates: string;
  logo: Logo;
}

export interface SkillGroup {
  name: string;
  capability?: Capability;
  skills: string[];
}

export interface Credential {
  name: string;
  detail: string;
  href?: string;
  linkLabel?: string;
  logo?: Logo;
}

export interface Stat {
  value: string;
  label: string;
}

export interface LegendEntry {
  name: string;
  detail: string;
}
