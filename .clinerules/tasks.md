# Atman Portfolio Development Tasks

## Phase 1: MVP (Profile + Apps Section)

### Core Layout Implementation (Ref: 7.1)

- [x] Create base page layout components:
  - Header with site title/logo
  - Profile section (photo + introduction)
  - Tab navigation component (Apps/Blogs/Games)
  - Footer with copyright/links

### Apps Tab Implementation (Ref: 5.2)

- [x] Develop card grid component:
  - Responsive 3-column (desktop) / 1-column (mobile)
  - Uniform card sizing (300x400px)
- [x] Create AppCard component:
  - Title, Description, Screenshot, Demo Link
  - Hover effects (scale + shadow)
- [x] Implement apps.config.ts (Ref: 8.1)
  - Define AppItem interface
  - Create sample data structure

### Theme Management (Ref: 9.1)

- [x] Set up Zustand store:
  - Light/dark mode state
  - Theme toggle functionality
- [x] Integrate with shadcn/ui components
- [x] Apply Tailwind CSS theme variables

## Phase 2: Blogs Integration

### Blogs Tab Implementation

- [x] Extend card grid for blog posts
- [x] Create BlogCard component:
  - Title, Excerpt, Date, Platform icon
  - External link handling
- [x] Implement blogs.config.ts:
  - Define BlogItem interface
  - Add platform-specific styling (Zenn/Medium)
