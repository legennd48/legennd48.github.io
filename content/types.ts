export type LinkSet = {
  website?: string;
  github?: string;
  demo?: string;
};

export type Project = {
  name: string;
  description: string;
  tech: string[];
  links?: LinkSet;
  tags?: string[];
  status?: string;
};

export type Experience = {
  title: string;
  organization: string;
  location?: string;
  startDate: string; // YYYY-MM
  endDate: string | null; // null for present
  highlights: string[];
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export type Certification = {
  title: string;
  date?: string;
  status?: string;
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
  projects: Project[];
  experience: Experience[];
  certifications?: Certification[];
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
    phone?: string;
  };
  highlights?: { chess?: string };
  terminal?: { commands?: string[] };
};
