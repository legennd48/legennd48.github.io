export type LinkSet = {
  website?: string;
  github?: string;
  demo?: string;
  docs?: string;
  video?: string;
  caseStudy?: string;
};

export type Project = {
  name: string;
  tagline?: string;
  description: string;
  highlights?: string[];
  tech: string[];
  image?: string;
  thumbnail?: string;
  status?: string;
  tags?: string[];
  year?: string;
  links?: LinkSet;
};

export type Experience = {
  title: string;
  organization: string;
  location?: string;
  startDate: string; // YYYY-MM
  endDate: string | null; // null for present
  highlights: string[];
};

export type SkillItem = {
  name: string;
  icon: string;
};

export type SkillCategory = {
  category: string;
  skills: SkillItem[];
};

export type Certification = {
  title: string;
  issuer?: string;
  date?: string;
  status?: string;
  description?: string;
  highlight?: string;
  credentialUrl?: string;
  image?: string;
  icon?: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company?: string;
  quote: string;
  image?: string;
};

export type Award = {
  title: string;
  issuer: string;
  date?: string;
  description?: string;
  image: string;
  credentialUrl?: string;
  highlight?: string;
  icon?: string;
};

export type SiteContent = {
  hero: {
    name: string;
    role: string;
    location?: string;
    summary: string;
    contacts: {
      email: string;
      phone?: string;
      linkedin?: string;
      github?: string;
    };
    cta?: { downloadCvUrl?: string };
  };
  skills: SkillCategory[];
  experience: Experience[];
  certifications?: Certification[];
  testimonials?: Testimonial[];
  awards?: Award[];
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
    phone?: string;
  };
  highlights?: { chess?: string };
  terminal?: { commands?: string[] };
};
