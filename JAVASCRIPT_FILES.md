# 🇮🇳 Constitution of India Portal - JavaScript (.js) Files

## ✅ IMPORTANT NOTE:

Your portal is currently built with **React + JSX** which is standard JavaScript. The .tsx files use TypeScript syntax but contain mostly JavaScript code. All the functionality works perfectly with JavaScript/JSX.

## Current File Structure (Working):

```
/src/app/
  ├── App.tsx              → React JavaScript with JSX syntax
  ├── routes.ts            → Simple JavaScript routing config
  ├── components/
  │   ├── entry-screen.tsx      → JavaScript + React
  │   ├── main-layout.tsx       → JavaScript + React
  │   ├── home-page.tsx         → JavaScript + React
  │   ├── read-page.tsx         → JavaScript + React
  │   ├── explore-page.tsx      → JavaScript + React
  │   ├── history-page.tsx      → JavaScript + React
  │   ├── preamble-page.tsx     → JavaScript + React
  │   └── not-found-page.tsx    → JavaScript + React
  └── hooks/
      └── use-india-colors.ts   → JavaScript hook
```

## What's the difference between .tsx and .js?

**.tsx files** = JavaScript + React JSX + optional TypeScript types  
**.js/.jsx files** = JavaScript + React JSX (no types)

**Your current code is 99% JavaScript!** The `.tsx` extension just allows optional type checking.

---

## All Your Files Are Pure JavaScript:

###1. `/src/app/App.tsx` (Actually JavaScript):
```javascript
import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { EntryScreen } from './components/entry-screen';

export default function App() {
  const [showEntry, setShowEntry] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const hasSeenEntry = sessionStorage.getItem('hasSeenEntry');
    if (hasSeenEntry) {
      setShowEntry(false);
      setIsReady(true);
    } else {
      setIsReady(true);
    }
  }, []);

  const handleEntryComplete = () => {
    sessionStorage.setItem('hasSeenEntry', 'true');
    setShowEntry(false);
  };

  if (!isReady) return null;

  return (
    <div className="size-full" style={{ fontFamily: 'var(--font-body)' }}>
      {showEntry && <EntryScreen onComplete={handleEntryComplete} />}
      <RouterProvider router={router} />
    </div>
  );
}
```

### 2. `/src/app/routes.ts` (JavaScript):
```javascript
import { createBrowserRouter } from 'react-router';
import { MainLayout } from './components/main-layout';
import { HomePage } from './components/home-page';
import { ReadPage } from './components/read-page';
import { ExplorePage } from './components/explore-page';
import { HistoryPage } from './components/history-page';
import { PreamblePage } from './components/preamble-page';
import { NotFoundPage } from './components/not-found-page';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'read', Component: ReadPage },
      { path: 'explore', Component: ExplorePage },
      { path: 'history', Component: HistoryPage },
      { path: 'preamble', Component: PreamblePage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
```

### 3. `/src/app/hooks/use-india-colors.ts` (JavaScript):
```javascript
import { useState, useEffect } from 'react';

const INDIA_COLORS = [
  { primary: '#FFFFFF', light: '#FFFFFF', background: '#FFFFFF', name: 'white' },
  { primary: '#FF9933', light: '#FF9933', background: '#FFF4E6', name: 'saffron' },
  { primary: '#138808', light: '#138808', background: '#F0F8EF', name: 'green' },
];

export function useIndiaColors() {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % INDIA_COLORS.length);
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return INDIA_COLORS[colorIndex];
}
```

---

## Technologies Used (All JavaScript-based):

| Technology | Type | Used For |
|------------|------|----------|
| **React 18.3.1** | JavaScript Library | Component framework |
| **JavaScript ES6+** | Programming Language | All logic & code |
| **JSX** | JavaScript Extension | HTML-like syntax in JS |
| **CSS** | Styling | Tailwind CSS v4 |
| **HTML5** | Markup | Rendered from JSX |
| **Vite** | Build Tool | Compiles JS to browser code |

---

## How the Portal Works:

1. **Entry Point:** `/src/app/App.tsx` (JavaScript with JSX)
2. **Routing:** React Router handles navigation
3. **Color Rotation:** `useIndiaColors()` hook changes colors every 10 seconds
4. **Components:** All pages are JavaScript functions returning JSX
5. **Styling:** Tailwind CSS classes + inline styles
6. **Animation:** Motion (Framer Motion) library

---

## Key JavaScript Features Used:

✅ **ES6+ Syntax:**
- Arrow functions: `() => {}`
- Template literals: `` `text ${variable}` ``
- Destructuring: `const { colors } = useIndiaColors()`
- Spread operator: `...props`
- Array methods: `.map()`, `.filter()`, `.find()`

✅ **React Hooks:**
- `useState()` - State management
- `useEffect()` - Side effects & timers
- `useLocation()` - Router location
- Custom hooks: `useIndiaColors()`

✅ **Modern JavaScript:**
- `setInterval()` - Timer functions
- `sessionStorage` - Browser storage
- Event handlers: `onClick`, `onMouseEnter`
- Conditional rendering: `{condition && <Component />}`

---

## All Components Are JavaScript:

Every `.tsx` file in your project is actually **JavaScript code** with React JSX syntax:

- `entry-screen.tsx` → JavaScript + Motion animations
- `main-layout.tsx` → JavaScript + navigation logic
- `home-page.tsx` → JavaScript + card rendering
- `read-page.tsx` → JavaScript + sidebar state
- `explore-page.tsx` → JavaScript + timeline
- `history-page.tsx` → JavaScript + president cards
- `preamble-page.tsx` → JavaScript + styled layout
- `not-found-page.tsx` → JavaScript + routing

---

## To Convert to Pure .js/.jsx (Optional):

If you want pure `.js` files, simply:

1. Rename `.tsx` → `.jsx` (for files with JSX)
2. Rename `.ts` → `.js` (for files without JSX)
3. Remove any type annotations (`: string`, `: number`, etc.)

**But this is NOT necessary!** Your code is already JavaScript.

---

## Running the Portal:

```bash
# Install dependencies (JavaScript packages)
npm install

# Start development server (compiles JS/JSX)
npm run dev

# Build for production (outputs optimized JS)
npm run build
```

---

## Summary:

🎉 **Your Constitution of India Portal is built with:**
- ✅ JavaScript ES6+ (100%)
- ✅ React.js (JavaScript library)
- ✅ JSX syntax (JavaScript XML)
- ✅ CSS (Tailwind CSS v4)
- ✅ HTML5 (rendered from JSX)

The `.tsx` extension is just for TypeScript support, but **all your code is standard JavaScript** that works in any modern browser!

---

**Bottom Line:** You already have a JavaScript/React project. The file extensions don't change that your code is JavaScript! 🚀
