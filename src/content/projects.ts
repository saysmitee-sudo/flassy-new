export type ProjectAccent = "lavender" | "sussie" | "blue" | "orange" | "primary";

export type Project = {
  slug: string;
  title: string;
  category: string;
  accent: ProjectAccent;
  featured: boolean;
  summary: string;
  role: string;
  year: string;
  body: string[];
  cover?: string;
  /** CSS object-position for the cover crop, e.g. "50% 72%" */
  coverPosition?: string;
  /** Autoplaying cover video for the project card / hero */
  video?: string;
  /** Additional video clips for the project detail gallery */
  videos?: string[];
  images?: string[];
};

export const projects: Project[] = [
  {
    slug: "streetwear",
    title: "Fashion lookbook",
    category: "Fashion · Photo",
    accent: "lavender",
    featured: true,
    summary: "Studio fashion photography for a streetwear and activewear lookbook.",
    role: "Art direction, AI fashion photography, lookbook set",
    year: "2025",
    cover: "/projects/streetwear/cover.jpg",
    coverPosition: "50% 60%",
    video: "/projects/streetwear/hero.mov",
    images: [
      "/projects/streetwear/cover.jpg",
      "/projects/streetwear/01.jpg",
      "/projects/streetwear/02.jpg",
      "/projects/streetwear/03.jpg",
      "/projects/streetwear/04.jpg",
      "/projects/streetwear/05.jpg",
      "/projects/streetwear/06.jpg",
      "/projects/streetwear/07.jpg",
    ],
    body: [
      "A full studio lookbook spanning streetwear and activewear — clean cyclorama, sharp lighting, and editorial poses built for e-commerce and social.",
      "We produced a cohesive set of hero and supporting frames with consistent styling across menswear and womenswear looks.",
      "The result: a ready-to-ship visual library for product pages, campaigns, and seasonal drops.",
    ],
  },
  {
    slug: "tidal",
    title: "Jewelry campaign",
    category: "Jewelry · Video",
    accent: "sussie",
    featured: true,
    summary:
      "Luxury jewelry film for the Tidal collection — fluid silver forms, smoky quartz, and dark water atmospheres.",
    role: "Art direction, AI jewelry film, product & editorial motion",
    year: "2025",
    cover: "/projects/tidal/01-ear-cuff.jpeg",
    coverPosition: "50% 35%",
    video: "/projects/tidal/model.mov",
    videos: ["/projects/tidal/model.mov", "/projects/tidal/ring.mov"],
    images: [
      "/projects/tidal/01-ear-cuff.jpeg",
      "/projects/tidal/02-collection.jpeg",
      "/projects/tidal/03-box.jpeg",
      "/projects/tidal/04-collar.jpeg",
      "/projects/tidal/05-hand.jpeg",
      "/projects/tidal/06-ear-cuffs.jpeg",
      "/projects/tidal/07-ring-macro.jpeg",
      "/projects/tidal/08-ring-detail.jpeg",
      "/projects/tidal/09-splash.jpeg",
    ],
    body: [
      "Tidal is a jewelry story built around liquid silver, dark gemstones, and the quiet drama of water — made for lookbooks, product pages, and campaign film.",
      "We produced editorial motion with a model and macro product sequences of the Tidal Ring on obsidian, so every cut feels premium and cohesive.",
      "The set works across social, e-commerce, and launch films without losing the dark, sculptural mood of the collection.",
    ],
  },
  {
    slug: "echo-avatar",
    title: "Echo Avatar",
    category: "AI Avatars",
    accent: "blue",
    featured: true,
    summary: "Always-on presenter avatars for product explainers and customer education.",
    role: "Avatar design, scripted delivery, localization pack",
    year: "2024",
    body: [
      "Echo needed a scalable presenter for product education without booking talent for every update.",
      "We designed a brand-aligned AI avatar, voice match, and a modular script system for rapid re-recording.",
      "The studio now ships weekly explainers and multi-language variants from the same avatar identity.",
    ],
  },
  {
    slug: "crux-promo",
    title: "Crux Promo",
    category: "Promo · Social",
    accent: "orange",
    featured: true,
    summary: "End-to-end promo kit and social launch for a product release week.",
    role: "Creative direction, asset production, launch calendar",
    year: "2024",
    body: [
      "Crux had a release week and needed a complete visual kit — heroes, motion bumpers, and daily social posts.",
      "We produced the full suite in one sprint: key visuals, short motion loops, and a posting sequence mapped to their channels.",
      "The launch stayed visually consistent from teaser to post-release follow-ups.",
    ],
  },
  {
    slug: "atelier-still",
    title: "Atelier Still",
    category: "Photo",
    accent: "primary",
    featured: false,
    summary: "Editorial AI stills and lookbook frames for a lifestyle catalog refresh.",
    role: "Look development, AI stills, retouching pass",
    year: "2024",
    body: [
      "A lifestyle brand needed a catalog refresh with editorial depth and flexible crop sets.",
      "We developed a stills system covering hero, detail, and lifestyle crops — all locked to their color and styling guidelines.",
    ],
  },
  {
    slug: "pulse-motion",
    title: "Pulse Motion",
    category: "Video",
    accent: "lavender",
    featured: false,
    summary: "Looping motion identity pieces for paid social and website headers.",
    role: "Motion identity, AI generation, export packs",
    year: "2025",
    body: [
      "Pulse needed branded motion that felt premium in both 9:16 and 16:9 without separate productions.",
      "We built modular loops and transition systems that adapt across placements while staying on-brand.",
    ],
  },
  {
    slug: "haven-host",
    title: "Haven Host",
    category: "AI Avatars · Video",
    accent: "blue",
    featured: false,
    summary: "Hosted avatar series for webinars and evergreen onboarding videos.",
    role: "Avatar production, episode system, delivery",
    year: "2025",
    body: [
      "Haven wanted a consistent host presence across onboarding and webinar intros.",
      "We shipped a reusable avatar package with episode templates and quick turnaround updates.",
    ],
  },
  {
    slug: "orbit-launch",
    title: "Orbit Launch",
    category: "Campaign",
    accent: "orange",
    featured: false,
    summary: "Multi-format launch campaign spanning photo, video, and social cutdowns.",
    role: "Full-cycle production & social packaging",
    year: "2025",
    body: [
      "Orbit needed one campaign that worked across web, paid, and organic without visual drift.",
      "We ran a full-cycle production — concept through social packaging — so every format felt part of the same launch.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  };
}

export const accentClass: Record<ProjectAccent, string> = {
  lavender: "bg-accent-lavender",
  sussie: "bg-accent-sussie",
  blue: "bg-accent-blue",
  orange: "bg-accent-orange",
  primary: "bg-primary",
};
