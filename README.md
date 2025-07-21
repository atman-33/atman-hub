# Atman Hub

A modern personal portfolio website showcasing professional profile, web applications, and tech blog content. Built with React Router v7 and deployed on GitHub Pages.

## 🌟 Features

- **Professional Profile Display** - Personal introduction with photo and contact information
- **Application Showcase** - Interactive cards displaying developed web applications with demos
- **Blog Content Hub** - Centralized access to technical writing across multiple platforms
- **Responsive Design** - Mobile-first approach with seamless desktop experience
- **Theme Support** - Light/dark mode toggle with persistent preferences
- **Static Site Generation** - Optimized for fast loading and SEO

## 🚀 Live Demo

Visit the live site: [https://atman-33.github.io/atman-hub](https://atman-33.github.io/atman-hub)

## 🛠️ Technology Stack

### Core Framework
- **React Router v7** - Full-stack React framework with file-based routing
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development
- **Vite** - Fast build tool and dev server

### Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Customizable component library (New York style)
- **Radix UI** - Accessible headless components
- **Lucide React** - Icon library
- **class-variance-authority** - Component variant management

### State Management
- **Zustand** - Lightweight state management for theme and app state

### Code Quality
- **Biome** - Fast linter and formatter (replaces ESLint/Prettier)
- **TypeScript** - Strict type checking enabled

### Build & Deployment
- **GitHub Pages** - Static hosting
- **GitHub Actions** - CI/CD pipeline

## 📁 Project Structure

```
├── app/                    # Main application code
│   ├── components/         # Reusable React components
│   │   ├── icons/         # Custom icon components
│   │   └── ui/            # shadcn/ui components
│   ├── config/            # Configuration files
│   │   ├── apps-config.ts # Web applications showcase data
│   │   ├── blogs-config.ts# Blog posts data
│   │   └── site-config.ts # Site-wide configuration
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and helpers
│   ├── routes/            # React Router v7 file-based routes
│   ├── stores/            # Zustand state management
│   ├── root.tsx           # Root layout component
│   ├── routes.ts          # Route configuration
│   └── app.css            # Global styles and Tailwind imports
├── public/                # Static assets
│   ├── favicons/          # Favicon files for different devices
│   ├── icons/             # SVG icons (GitHub, X/Twitter)
│   └── images/            # Static images (logos, profile photo)
├── docs/                  # Project documentation
├── tools/                 # Development tools
├── .kiro/                 # Kiro AI assistant configuration
└── build/                 # Production build output
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/atman-33/atman-hub.git
cd atman-hub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

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

## ⚙️ Configuration

### Site Configuration

Edit `app/config/site-config.ts` to update:
- App URL and base path
- Profile image URL
- Social media links
- Contact information

### Applications Showcase

Add or modify applications in `app/config/apps-config.ts`:
```typescript
export interface AppItem {
  title: string;
  icon?: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  tags: string[];
}
```

### Blog Links

Update blog platforms in `app/config/blogs-config.ts`:
```typescript
export interface BlogItem {
  title: string;
  description: string;
  url: string;
  image?: string;
}
```

## 🎨 Customization

### Theme
- Light/dark mode toggle is available in the header
- Theme preference is persisted using Zustand store
- Customize colors in Tailwind CSS configuration

### Components
- UI components are built with shadcn/ui and Radix UI
- Custom components follow the established patterns
- Icons use Lucide React library

### Styling
- Tailwind CSS v4 with utility-first approach
- Responsive design with mobile-first methodology
- Custom animations and transitions

## 🚀 Deployment

The site is automatically deployed to GitHub Pages using GitHub Actions:

1. Push changes to the `main` branch
2. GitHub Actions runs CI checks (linting, type checking, build)
3. On successful CI, the site is built and deployed to GitHub Pages
4. Live site is available at the configured GitHub Pages URL

### Manual Deployment

```bash
npm run deploy
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: gpbjk0304@gmail.com
- **GitHub**: [@atman-33](https://github.com/atman-33)
- **X/Twitter**: [@atman_33](https://x.com/atman_33)

---

Built with ❤️ using React Router v7 and modern web technologies.