# Content Management Guide

## Overview

Your portfolio is **fully dynamic and JSON-driven**. All content sections automatically update based on the JSON files in the `content/` directory. When you add, modify, or remove items from these files, the corresponding UI elements (cards, buttons, tags, links) are automatically created or removed.

---

## 🎯 How It Works

### Automatic Rendering System

The portfolio uses a **data-driven architecture** where:

1. **JSON files** contain all content data
2. **Loader functions** validate and load the data with Zod schemas
3. **React components** map over the data arrays to automatically generate UI elements
4. **TypeScript types** ensure type safety across the system

### Key Principle: `.map()` Creates Everything

All sections use JavaScript's `.map()` method to iterate over arrays and create UI elements:

```typescript
// Example: Projects section
{projects.map((project, index) => (
  <ProjectCard key={project.name} project={project} index={index} />
))}
```

This means:
- ✅ **Add a project** → A new card appears automatically
- ✅ **Remove a project** → The card disappears automatically
- ✅ **Modify project details** → Changes reflect immediately
- ✅ **Add new links** → New buttons are created automatically
- ✅ **Add tech stack items** → New tech chips appear automatically

---

## 📁 Content Structure

### Projects (`content/projects.json`)

**What's Dynamic:**
- Number of projects
- Tech stack chips (any number of items)
- Tags (any number of tags)
- Links/Resources (any link type)
- Highlights (any number of bullet points)

**Example: Adding a new link type**
```json
{
  "name": "My Project",
  "links": {
    "github": "https://github.com/...",
    "slides": "https://docs.google.com/...",
    "figma": "https://figma.com/...",
    "customLinkType": "https://example.com/..."
  }
}
```

All links will automatically get buttons in the modal! Unknown link types will:
- Get a generic external link icon
- Have their name auto-capitalized and formatted
- Work exactly like predefined link types

**Predefined Link Types with Custom Icons:**
- `website` → "Live site" with external link icon
- `github` → "GitHub" with GitHub icon
- `demo` → "Interactive demo" with play icon
- `docs` → "Documentation" with book icon
- `video` → "Video walkthrough" with video icon
- `caseStudy` → "Case study" with document icon
- `slides` → "Presentation" with Google Drive icon

**Adding New Projects:**
```json
[
  {
    "name": "New Project",
    "tagline": "One-line description",
    "description": "Detailed description",
    "highlights": ["Point 1", "Point 2"],
    "tech": ["Tech1", "Tech2"],
    "links": {
      "github": "https://github.com/..."
    },
    "tags": ["backend", "cloud"],
    "year": "2025",
    "image": "/projects/new-project.svg"
  }
  // ... other projects
]
```

The card will appear immediately with all buttons, chips, and sections auto-generated!

---

### Experience (`content/experience.json`)

**What's Dynamic:**
- Number of roles
- Highlights (any number of bullet points per role)
- Timeline nodes and connecting lines

**Example:**
```json
[
  {
    "title": "Senior Backend Engineer",
    "organization": "Tech Company",
    "location": "Remote",
    "startDate": "2024-01",
    "endDate": null,
    "highlights": [
      "Achievement 1",
      "Achievement 2",
      "Achievement 3"
    ]
  }
  // ... more roles
]
```

Adding a new role automatically creates a new timeline card with icon, highlights, and proper date formatting.

---

### Awards (`content/awards.json`)

**What's Dynamic:**
- Number of awards
- Highlights (any number per award)
- Icons (any valid react-icons icon name)

**Example:**
```json
[
  {
    "title": "Excellence Award",
    "issuer": "Organization Name",
    "date": "2024-10",
    "description": "Award description",
    "image": "/awards/award-cert.jpg",
    "credentialUrl": "https://...",
    "highlight": "Key achievement",
    "icon": "FiAward"
  }
]
```

---

### Certifications (`content/certifications.json`)

**What's Dynamic:**
- Number of certifications
- Status badges ("Active", "Expires 2026", etc.)
- Highlights
- Icons

**Example:**
```json
[
  {
    "title": "AWS Certified Solutions Architect",
    "issuer": "Amazon Web Services",
    "date": "2024-09",
    "status": "Active",
    "description": "Certification details",
    "highlights": ["Skill 1", "Skill 2"],
    "icon": "SiAmazon",
    "image": "/certifications/aws-cert.jpg",
    "credentialUrl": "https://..."
  }
]
```

---

### Testimonials (`content/testimonials.json`)

**What's Dynamic:**
- Number of testimonials
- Quote length (automatically formatted)

**Example:**
```json
[
  {
    "name": "John Doe",
    "role": "CTO",
    "company": "Tech Corp",
    "quote": "Amazing work! The system was...",
    "image": "/testimonials/john.jpg"
  }
]
```

---

### Skills (`content/site.json` → `skills` array)

**What's Dynamic:**
- Number of skill categories
- Number of skills per category
- Icons (any valid simple-icons icon)

**Example:**
```json
{
  "skills": [
    {
      "category": "Backend",
      "skills": [
        { "name": "Node.js", "icon": "SiNodedotjs" },
        { "name": "Python", "icon": "SiPython" }
      ]
    }
  ]
}
```

---

## 🔧 Technical Implementation

### Type Safety

The system uses TypeScript + Zod for runtime validation:

**File: `content/types.ts`**
- Defines all TypeScript types
- `LinkSet` now supports dynamic keys with `[key: string]: string | undefined`

**File: `content/projects.ts` (and similar loaders)**
- Zod schemas validate JSON on load
- `.catchall()` allows unknown link types
- Throws detailed errors if validation fails

### Component Architecture

**ProjectCard.tsx:**
- Maps over `tech` array → Creates tech chips
- Maps over `tags` array → Creates tag badges
- Automatically slices arrays to show preview (e.g., first 5 tech items)

**ProjectModal.tsx:**
- Maps over all link entries → Creates resource buttons
- Automatically formats unknown link types
- Maps over highlights → Creates bullet points

**Page.tsx (app/page.tsx):**
- Uses `useMemo()` to load data once
- Maps over all data arrays to create sections
- Grid centering logic automatically adjusts for any number of items

---

## ✅ Adding New Content: Step-by-Step

### Adding a New Project

1. Open `content/projects.json`
2. Add your project object to the array:
   ```json
   {
     "name": "Project Name",
     "tagline": "Short description",
     "description": "Full description",
     "highlights": ["Key point 1", "Key point 2"],
     "tech": ["Tech1", "Tech2", "Tech3"],
     "links": {
       "github": "https://...",
       "demo": "https://..."
     },
     "tags": ["backend", "cloud"],
     "year": "2025",
     "image": "/projects/image.svg"
   }
   ```
3. Save the file
4. The project card appears automatically!

### Adding a New Link Type

1. Open `content/projects.json`
2. Add the link to any project's `links` object:
   ```json
   "links": {
     "github": "https://...",
     "myCustomLink": "https://..."
   }
   ```
3. **Optional:** Add a custom icon in `components/ProjectModal.tsx`:
   ```typescript
   const LINK_META: Partial<Record<keyof LinkSet, { label: string; Icon: IconType }>> = {
     // ... existing entries
     myCustomLink: { label: 'My Custom Link', Icon: FiCustomIcon },
   };
   ```
4. If you don't add custom metadata, it will auto-format: `myCustomLink` → "My Custom Link" with generic icon

### Adding a New Award/Certification

1. Open `content/awards.json` or `content/certifications.json`
2. Add the object:
   ```json
   {
     "title": "Award Name",
     "issuer": "Organization",
     "date": "2025-03",
     "description": "Details...",
     "image": "/awards/cert.jpg",
     "icon": "FiAward"
   }
   ```
3. The card appears automatically in the grid!

---

## 🎨 Styling Automatic Elements

All dynamically generated elements use TailwindCSS classes:

- **Tech chips**: `rounded-full border border-white/10 bg-white/5 px-3 py-1`
- **Tag badges**: `rounded-full border border-white/10 bg-white/10 px-3 py-1`
- **Link buttons**: `inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2`

Styling is consistent across all generated elements.

---

## 🚀 Advanced: Custom Link Icons

To add a custom icon for a new link type:

1. **Import the icon** in `ProjectModal.tsx`:
   ```typescript
   import { FiMyIcon } from 'react-icons/fi';
   ```

2. **Add to LINK_META**:
   ```typescript
   const LINK_META: Partial<Record<keyof LinkSet, { label: string; Icon: IconType }>> = {
     // ... existing
     myNewType: { label: 'My New Type', Icon: FiMyIcon },
   };
   ```

3. **Update types** in `content/types.ts` (optional for TypeScript autocomplete):
   ```typescript
   export type LinkSet = {
     // ... existing
     myNewType?: string;
     [key: string]: string | undefined;
   };
   ```

4. **Update Zod schema** in `content/projects.ts` (optional but recommended):
   ```typescript
   const LinkSet = z.object({
     // ... existing
     myNewType: z.string().url().optional(),
   }).catchall(z.string().url());
   ```

---

## 🔍 Validation & Error Handling

The system validates all JSON files on load:

- **Invalid URLs** → Build fails with specific error
- **Missing required fields** → Build fails with field path
- **Wrong data types** → Build fails with type mismatch

Example error:
```
Invalid projects.json:
0.links.github - Expected string, received number
```

This ensures content integrity before deployment!

---

## 📝 Summary

Your portfolio is **fully automatic**:

✅ **Add items** → Cards/buttons/chips appear  
✅ **Remove items** → Elements disappear  
✅ **Modify content** → Changes reflect immediately  
✅ **Add new link types** → Buttons auto-generate  
✅ **Add new tech** → Chips auto-generate  
✅ **Add new tags** → Badges auto-generate  

**No code changes needed** for content updates! Just edit the JSON files and everything updates automatically. 🎉
