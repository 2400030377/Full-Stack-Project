# Constitution of India Portal - Technical Documentation

## 🛠️ Technology Stack

### Core Technologies
- **React.js 18.3.1** - Component-based UI library
- **JavaScript/TypeScript** - Programming language (TSX/JSX)
- **HTML5** - Markup structure
- **CSS** - Styling (via Tailwind CSS)
- **Vite 6.3.5** - Build tool and dev server

### Styling & UI
- **Tailwind CSS v4.1.12** - Utility-first CSS framework
- **Custom CSS** - Theme variables and fonts (`/src/styles/`)
  - `theme.css` - Color tokens and design system
  - `fonts.css` - EB Garamond and Crimson Text serif fonts

### Routing
- **React Router 7.13.0** - Client-side routing
- Browser-based navigation with data mode pattern

### Animation
- **Motion (Framer Motion) 12.23.24** - Smooth animations and transitions
  - Entry screen animations
  - Page transitions
  - Color transitions

### Icons
- **Lucide React 0.487.0** - Beautiful icon library

## 📁 Project Structure

```
/src
├── app/
│   ├── App.tsx                    # Main app component with entry screen logic
│   ├── routes.ts                  # React Router configuration
│   ├── components/
│   │   ├── entry-screen.tsx       # Animated entry screen with State Emblem
│   │   ├── main-layout.tsx        # Header, footer, navigation, language dropdown
│   │   ├── home-page.tsx          # Landing page
│   │   ├── read-page.tsx          # Constitution parts & schedules
│   │   ├── explore-page.tsx       # Framers, committees, timeline
│   │   ├── history-page.tsx       # Presidents & milestones
│   │   ├── preamble-page.tsx      # Preamble display
│   │   ├── not-found-page.tsx     # 404 page
│   │   └── figma/
│   │       └── ImageWithFallback.tsx  # Image component with fallback
│   └── hooks/
│       └── use-india-colors.ts    # Color rotation hook (10 sec intervals)
├── styles/
│   ├── theme.css                  # Design tokens and CSS variables
│   └── fonts.css                  # Font imports (EB Garamond, Crimson Text)
└── imports/                       # State Emblem image assets

```

## 🎨 Key Features Implemented

### 1. Animated Entry Screen
- **State Emblem of India** image with scale animation
- "We, The People of India" text with fade-in
- Tricolor bottom border with expand animation
- Auto-closes after 3.5 seconds
- Session storage prevents re-showing on navigation

### 2. Dynamic Color Rotation System
**Color Cycle (Every 10 seconds):**
- **White** background → **Light Saffron/Orange** (#FFF4E6) → **Light Green** (#F0F8EF) → Repeat

**Smart Text Contrast:**
- White background → Navy Blue (#000080) text
- Saffron background → Saffron (#FF9933) text
- Green background → Green (#138808) text

**Applied to:**
- Page backgrounds (MainLayout)
- Headings and titles
- Navigation active states
- Icons and decorative elements
- Buttons and interactive elements
- Card borders (on hover)
- Timeline markers
- Statistics displays
- Search input focus rings

### 3. Multi-Language Support
**14 Official Indian Languages:**
1. English (English)
2. Hindi (हिन्दी)
3. Bengali (বাংলা)
4. Telugu (తెలుగు)
5. Marathi (मराठी)
6. Tamil (தமிழ்)
7. Gujarati (ગુજરાતી)
8. Urdu (اردو)
9. Kannada (ಕನ್ನಡ)
10. Odia (ଓଡ଼ିଆ)
11. Malayalam (മലയാളം)
12. Punjabi (ਪੰਜਾਬੀ)
13. Assamese (অসমীয়া)
14. Sanskrit (संस्कृतम्)

Features:
- Dropdown shows both English and native script names
- Scrollable list for easy selection
- Persistent selection across navigation

### 4. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Collapsible navigation for mobile
- Responsive typography and spacing
- Flexible grid layouts

### 5. Five Main Sections

#### Home Page
- Hero section with State Emblem
- 4 navigation cards (Read, Explore, History, Preamble)
- Quote section with Preamble excerpt
- Color-changing accents

#### Read Page
- Sidebar with Parts (I-XXII) and Schedules (1-12)
- Sample articles from Part III (Fundamental Rights)
- Collapsible categories
- Selected state highlighting

#### Explore Page
- Constitution framers with photos
- Constituent Assembly statistics
- Key committees information
- Timeline of events with animated markers

#### History Page
- Former Presidents of India (6 displayed)
- Constitutional milestones
- Statistics dashboard
- Image galleries

#### Preamble Page
- Centered parchment-style layout
- Decorative double borders
- Full Preamble text
- Explanation cards

## 🎯 Design Principles

### Typography
- **Serif Fonts:** EB Garamond, Crimson Text (headings, formal content)
- **Body Font:** System fonts for readability
- Hierarchical text sizing
- Proper line-height and spacing

### Color Palette
- **Saffron:** #FF9933 (Indian flag)
- **White:** #FFFFFF (Indian flag, purity)
- **Green:** #138808 (Indian flag)
- **Navy Blue:** #000080 (Authority, government)
- **Gray Scale:** Various shades for text and borders

### Layout
- Maximum width containers (max-w-7xl)
- Consistent padding and spacing
- Card-based information architecture
- Clear visual hierarchy

## 🔧 Custom Hooks

### `useIndiaColors()`
Located in `/src/app/hooks/use-india-colors.ts`

**Purpose:** Provides synchronized color rotation across all components

**Returns:**
```typescript
{
  primary: string;      // Main color
  light: string;        // Light variant
  background: string;   // Background color
  name: string;         // Color name
}
```

**Usage:**
```tsx
import { useIndiaColors } from '../hooks/use-india-colors';

const colors = useIndiaColors();
const textColor = colors.name === 'white' ? '#000080' : colors.primary;
```

## 🚀 Build & Development

### Development Server
```bash
npm run dev
# or
pnpm dev
```

### Production Build
```bash
npm run build
# or
pnpm build
```

### Build Output
- Optimized bundle with code splitting
- Minified CSS and JavaScript
- Asset optimization
- Tree-shaking for unused code

## 🌐 Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📦 Key Dependencies

### Production
- `react` & `react-dom` (18.3.1) - Core React
- `react-router` (7.13.0) - Routing
- `motion` (12.23.24) - Animations
- `lucide-react` (0.487.0) - Icons
- `tailwindcss` (4.1.12) - Styling

### Development
- `vite` (6.3.5) - Build tool
- `@vitejs/plugin-react` (4.7.0) - React support
- `@tailwindcss/vite` (4.1.12) - Tailwind integration

## 🎨 Asset Management

### Images
- **State Emblem:** `figma:asset/3f2aee9b7deb0d39b0314a28b63fbee3c2e82c24.png`
- **Unsplash Images:** Used for President and framer photos
- **Fallback Component:** ImageWithFallback for error handling

### Fonts
- Loaded via Google Fonts
- System font fallbacks for reliability

## ⚡ Performance Optimizations

1. **Code Splitting:** Routes loaded on demand
2. **Image Optimization:** Responsive images with srcset
3. **CSS Purging:** Unused Tailwind classes removed
4. **Lazy Loading:** Components loaded as needed
5. **Session Storage:** Entry screen state persistence
6. **Memoization:** Prevent unnecessary re-renders

## 🔐 Best Practices

- ✅ Component-based architecture
- ✅ React Hooks for state management
- ✅ TypeScript for type safety
- ✅ Responsive design patterns
- ✅ Accessible markup (semantic HTML)
- ✅ Clean code structure
- ✅ Reusable components
- ✅ Consistent naming conventions

## 📄 File Formats

- **Components:** `.tsx` (TypeScript + JSX)
- **Styles:** `.css` (CSS with Tailwind)
- **Routes:** `.ts` (TypeScript)
- **Config:** `.json` (package.json, tsconfig.json)

---

**Built with ❤️ for the Constitution of India**
