# Atman Portfolio Development Tasks

## Phase 1: MVP (Profile + Apps Section)

### Core Layout Implementation (Ref: 7.1)

- [x] Create base page layout components:
  - Header with site title/logo
  - Profile section (photo + introduction)
  - Tab navigation component (Apps/Blogs/Games)
  - Footer with copyright/links

### Apps Tab Implementation (Ref: 5.2)

- [ ] Develop card grid component:
  - Responsive 3-column (desktop) / 1-column (mobile)
  - Uniform card sizing (300x400px)
- [ ] Create AppCard component:
  - Title, Description, Screenshot, Demo Link
  - Hover effects (scale + shadow)
- [ ] Implement apps.config.ts (Ref: 8.1)
  - Define AppItem interface
  - Create sample data structure

### Theme Management (Ref: 9.1)

- [ ] Set up Zustand store:
  - Light/dark mode state
  - Theme toggle functionality
- [ ] Integrate with shadcn/ui components
- [ ] Apply Tailwind CSS theme variables

## Phase 2: Blogs Integration

### Blogs Tab Implementation

- [ ] Extend card grid for blog posts
- [ ] Create BlogCard component:
  - Title, Excerpt, Date, Platform icon
  - External link handling
- [ ] Implement blogs.config.ts:
  - Define BlogItem interface
  - Add platform-specific styling (Zenn/Medium)

## Phase 3: Games Section

### Games Tab Implementation

- [ ] Extend card grid for games
- [ ] Create GameCard component:
  - Title, Description, Screenshot, Play Link
  - Embedded game launcher
- [ ] Implement games.config.ts:
  - Define GameItem interface
  - Support for different game types

## Phase 4: Analytics & Enhancements

### Performance Tracking

- [ ] Add basic analytics (page views)
