# Project Structure

## Root Directory
```
├── app/                    # Main application code
├── docs/                   # Project documentation
├── public/                 # Static assets
├── tools/                  # Development tools
├── .kiro/                  # Kiro AI assistant configuration
├── .clinerules/            # AI coding principles and rules
└── build/                  # Production build output
```

## App Directory (`app/`)
```
app/
├── components/             # Reusable React components
│   ├── icons/             # Custom icon components
│   └── ui/                # shadcn/ui components
├── config/                # Configuration files
│   ├── apps-config.ts     # Web applications showcase data
│   ├── blogs-config.ts    # Blog posts data
│   └── site-config.ts     # Site-wide configuration
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and helpers
│   ├── cookie.ts          # Cookie management utilities
│   └── utils.ts           # General utility functions
├── routes/                # React Router v7 file-based routes
├── stores/                # Zustand state management
│   └── theme.ts           # Theme state (light/dark mode)
├── root.tsx               # Root layout component
├── routes.ts              # Route configuration
└── app.css                # Global styles and Tailwind imports
```

## Public Assets (`public/`)
```
public/
├── favicons/              # Favicon files for different devices
├── icons/                 # SVG icons (GitHub, X/Twitter)
└── images/                # Static images (logos, profile photo)
```

## Key Conventions

### File Naming
- React components: PascalCase (e.g., `Button.tsx`)
- Utilities/configs: kebab-case (e.g., `apps-config.ts`)
- Routes: Follow React Router v7 file-based routing conventions

### Import Aliases
- `~/` - Maps to `app/` directory
- Use absolute imports with `~/` prefix for app code
- Relative imports only for same-directory files

### Component Organization
- UI components in `app/components/ui/` (shadcn/ui)
- Custom icons in `app/components/icons/`
- Page-specific components co-located with routes

### Configuration Pattern
- All content data in `app/config/` directory
- TypeScript interfaces for type safety
- Export as default from config files

### State Management
- Zustand stores in `app/stores/`
- One store per domain (theme, etc.)
- Use hooks pattern for store access