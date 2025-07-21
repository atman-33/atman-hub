# Technology Stack

## Core Framework
- **React Router v7** - Full-stack React framework with file-based routing
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development
- **Vite** - Fast build tool and dev server

## Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Customizable component library (New York style)
- **Radix UI** - Accessible headless components
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management

## State Management
- **Zustand** - Lightweight state management for theme and app state

## Code Quality
- **Biome** - Fast linter and formatter (replaces ESLint/Prettier)
- **TypeScript** - Strict type checking enabled

## Build & Deployment
- **GitHub Pages** - Static hosting
- **GitHub Actions** - CI/CD pipeline

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run typecheck    # Run TypeScript type checking
```

### Build & Deploy
```bash
npm run build        # Build for production
npm run start        # Preview production build
npm run deploy       # Deploy to GitHub Pages
```

### Code Quality
```bash
npm run biome:check:write  # Format and fix code issues
npm run ci:check          # CI linting check
npm run ci:build          # CI build check
```

## Configuration Notes
- Uses ES modules (`"type": "module"`)
- Path aliases: `~/*` maps to `./app/*`
- SSR disabled for static site generation
- Production builds use basename for GitHub Pages