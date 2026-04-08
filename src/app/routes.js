// Re-export from routes.jsx to satisfy any imports of routes.js
// This file contains no JSX so Vite can parse it without error.
import { router } from './routes.jsx';
export { router };
