# Atman Portfolio Website Requirements

## Version: 1.0

## Last Updated: 2025-07-06

## 1. Project Overview

Personal portfolio website showcasing Atman's profile, web applications, and tech blog links.

## 2. Purpose

- Display professional profile and work samples
- Provide access to developed applications
- Serve as a gateway to external tech blog content

## 3. Target Users

- Potential employers/clients
- Technical community members
- Personal network contacts

## 4. System Architecture

- Frontend: React-based SPA
- Hosting: Static site hosting (Vercel/Netlify)
- CI/CD: GitHub Actions

## 5. Functional Requirements

### 5.1 Core Features

- Profile display with photo and brief introduction
- Tab-based navigation (Apps/Blogs)
- Config-driven content management

### 5.2 Tab Functionality

- **Apps Tab (Default)**:
  - Card-based web application showcase
  - Each card contains: Title, Description, Screenshot, Live Demo Link
- **Blogs Tab**:
  - External blog post cards (Zenn/Medium)
  - Each card contains: Title, Excerpt, Publication Date, External Link

## 6. Non-Functional Requirements

- Performance: Page load < 2s
- Responsiveness: Mobile-first design
- Accessibility: WCAG AA compliant
- SEO: Basic metadata optimization

## 7. UI Design

### 7.1 Page Layout

```
[Header]
[Profile Section]
  - Photo
  - Brief Introduction
[Tab Navigation]
  - Apps (active by default)
  - Blogs 
[Content Area]
  - Cards Grid (3 columns desktop, 1 column mobile)
[Footer]
```

### 7.2 Card Design

- Uniform card size (300x400px)
- Hover effects (scale + shadow)
- Consistent typography and spacing

## 8. Data Structure

### 8.1 Configuration Files

```typescript
// apps.config.ts
interface AppItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  tags: string[];
}

// blogs.config.ts 
interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  externalUrl: string;
  platform: 'zenn' | 'medium';
}

```

## 9. Development Environment

- React 18
- TypeScript 5
- Vite
- Tailwind CSS
- Zustand (state management for theme and application state)
- shadcn/ui (customizable UI components)
- GitHub repository

### 9.1 Technology Stack Details

- **Zustand**:
  - Theme management (light/dark mode)
  - Tab state management
  - Application-wide shared state

- **shadcn/ui**:
  - Pre-built accessible components
  - Customizable design system
  - Theme integration with Tailwind CSS

## 10. Testing Strategy

- Component testing (React Testing Library)
- E2E testing (Playwright)
- Visual regression testing

## 11. Release Plan

- Phase 1: MVP (Profile + Apps)
- Phase 2: Blogs integration
- Phase 3: Analytics integration
