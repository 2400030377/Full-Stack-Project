# Bharat Samvidhan - Project Structure

## 📁 Root Directory
```
bharat-samvidhan/
├── 📄 index.html                 # Entry HTML file
├── 📄 package.json               # Project dependencies and scripts
├── 📄 vite.config.ts             # Vite build configuration
├── 📄 postcss.config.mjs         # PostCSS configuration
├── 📄 README.md                  # Project documentation
├── 📄 TECH_STACK.md              # Technology stack details
├── 📄 BUILD_SUMMARY.md           # Build information
├── 📄 ATTRIBUTIONS.md            # Third-party attributions
├── 📄 JAVASCRIPT_FILES.md        # JavaScript files documentation
└── 📄 PROJECT_STRUCTURE.md       # This file
```

## 📂 Source Code (`src/`)
```
src/
├── 📄 main.tsx                   # Application entry point
│
├── 📂 app/                       # Main application directory
│   ├── 📄 App.tsx                # Root App component
│   ├── 📄 routes.ts              # Route definitions
│   │
│   ├── 📂 components/            # React components
│   │   ├── 📄 entry-screen.tsx   # Landing/splash screen
│   │   ├── 📄 main-layout.tsx    # Main layout wrapper (header/footer)
│   │   ├── 📄 home-page.tsx      # Home page component
│   │   ├── 📄 explore-page.tsx   # Constitution framers & history
│   │   ├── 📄 history-page.tsx   # Constitutional milestones
│   │   ├── 📄 preamble-page.tsx  # Constitution preamble
│   │   ├── 📄 read-page.tsx      # Constitution reading interface
│   │   ├── 📄 not-found-page.tsx # 404 error page
│   │   ├── 📄 LeaderCard.tsx     # Leader profile card (compact)
│   │   ├── 📄 LeadersSection.tsx # Constitution framers section
│   │   │
│   │   ├── 📂 figma/             # Figma exported components
│   │   │   └── 📄 ImageWithFallback.tsx
│   │   │
│   │   └── 📂 ui/                # Reusable UI components (shadcn/ui)
│   │       ├── 📄 accordion.tsx
│   │       ├── 📄 alert.tsx
│   │       ├── 📄 avatar.tsx
│   │       ├── 📄 badge.tsx
│   │       ├── 📄 button.tsx
│   │       ├── 📄 card.tsx
│   │       ├── 📄 dialog.tsx
│   │       ├── 📄 dropdown-menu.tsx
│   │       ├── 📄 form.tsx
│   │       ├── 📄 input.tsx
│   │       ├── 📄 navigation-menu.tsx
│   │       ├── 📄 select.tsx
│   │       ├── 📄 separator.tsx
│   │       ├── 📄 sidebar.tsx
│   │       ├── 📄 tabs.tsx
│   │       ├── 📄 tooltip.tsx
│   │       └── ... (30+ UI components)
│   │
│   └── 📂 hooks/                 # Custom React hooks
│       └── 📄 use-india-colors.ts # Theme color hook
│
├── 📂 assets/                    # Static assets
│   └── 📂 leaders/               # Historical photographs
│       ├── 🖼️ dr-br-ambedkar.jpg
│       ├── 🖼️ sardar-vallabhbhai-patel.jpg
│       ├── 🖼️ dr-rajendra-prasad.jpg
│       └── 🖼️ jawaharlal-nehru-1947.jpg
│
└── 📂 styles/                    # Global styles
    ├── 📄 index.css              # Main stylesheet
    ├── 📄 tailwind.css           # Tailwind directives
    ├── 📄 theme.css              # Theme variables
    └── 📄 fonts.css              # Font definitions
```

## 📂 Guidelines Directory
```
guidelines/
└── 📄 Guidelines.md              # Development guidelines
```

## 🏗️ Project Architecture

### **Component Organization**
- **Pages**: Top-level route components (`*-page.tsx`)
- **Layouts**: Structural wrappers (`main-layout.tsx`)
- **Features**: Domain-specific components (`LeadersSection.tsx`)
- **UI**: Reusable primitives (`ui/` directory)
- **Figma**: Design system imports (`figma/` directory)

### **Key Technologies**
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI Library**: Radix UI + shadcn/ui

### **Naming Conventions**
- **Components**: PascalCase (e.g., `LeaderCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `use-india-colors.ts`)
- **Routes**: kebab-case (e.g., `/explore`, `/read`)
- **Assets**: kebab-case (e.g., `dr-br-ambedkar.jpg`)

### **File Types**
- **`.tsx`**: TypeScript + JSX components
- **`.ts`**: TypeScript modules (routes, configs)
- **`.jsx`**: JavaScript + JSX (legacy)
- **`.css`**: Stylesheets
- **`.md`**: Documentation

## 🚀 Development Workflow

### **Getting Started**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **File Imports**
```typescript
// Alias @ for src directory
import { Component } from '@/app/components/Component'

// Asset imports
import logo from 'figma:asset/logo.png'
import photo from '../../assets/leaders/leader.jpg'
```

## 📦 Build Output
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js           # Main JavaScript bundle
│   ├── index-[hash].css          # Main CSS bundle
│   └── [assets with hashes]      # Images, fonts, etc.
```

---

**Project Name**: Bharat Samvidhan  
**Version**: 0.0.1  
**License**: Private  
**Last Updated**: February 26, 2026
