# Orion Mall Gorakhpur

Official website for **Orion Mall**, Mohaddipur, Gorakhpur — a contemporary five-level retail, dining, and multiplex destination in Uttar Pradesh.

---

## Project Overview

This is a single-page React application that serves as the digital showcase for Orion Mall Gorakhpur. The website lets visitors explore every floor of the mall, discover fashion brands, browse dining options, check PVR INOX cinema showtimes, and plan their visit — all through an immersive, visually rich interface with video backdrops, parallax animations, and an interactive 3D mall walkthrough powered by Three.js.

---

## Features

- **Home Page** — Full-screen video hero, architectural story section, animated floor ribbon, brand spotlight gallery, and dining/cinema showcase
- **Explore Page** — Interactive 3D mall walkthrough (Three.js WebGL) with per-floor navigation, zoom controls, and auto-tour mode
- **Shopping Page** — Floor-by-floor brand directory (Ground, First, Second floors) with brand imagery and category details
- **Dining Page** — Third Floor restaurant showcase for KFC, Burger King, and Domino's Pizza with photo galleries
- **Entertainment Page** — PVR INOX Cinemas hub with Now Showing, Coming Soon, and Previously Released movie listings, plus direct booking links
- **Visit Page** — Location, hours, transit directions, parking information, and visitor amenities
- **Dark / Light Theme Toggle** — Persistent user preference stored in localStorage
- **Guided Auto-Scroll** — Animated scroll playback bar with play/pause/speed controls
- **Fully Responsive** — Mobile-first layout across all screen sizes

---

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI library |
| Vite | 8 | Build tool and development server |
| Tailwind CSS | 4 | Utility-first styling |
| Three.js | 0.187 | Interactive 3D mall explorer (WebGL) |
| Motion (Framer Motion) | 12 | Page transitions and scroll animations |
| Lucide React | 0.546 | Icon library |
| TypeScript | 7 | Type checking (`.ts` config only, source is JSX) |
| `@google/genai` | 2 | Gemini AI SDK (bundled, not actively called in UI) |
| Express | 4 | Optional Node.js static file server |
| dotenv | 17 | Environment variable loading |

---

## Project Structure

```
orion-mall-gorakhpur/
│
├── public/                        # Static assets served at root URL
│   ├── videos/                    # Background MP4 video loops (14 files)
│   └── _redirects                 # Netlify SPA fallback rule
│
├── src/
│   ├── animations/
│   │   └── MotionPrimitives.jsx   # Reusable scroll-driven animation components
│   ├── assets/
│   │   ├── images/                # Brand and movie poster images (57 JPGs)
│   │   └── mediaRegistry.js       # Central import registry for all media assets
│   ├── components/
│   │   ├── AutoScrollBar.jsx      # Guided scroll playback controls bar
│   │   ├── BrandMark.jsx          # Brand logo badge renderer
│   │   ├── Footer.jsx             # Site-wide footer with links and booking CTA
│   │   ├── Header.jsx             # Sticky navigation header with theme toggle
│   │   ├── MallExplorer3D.jsx     # Three.js WebGL interactive mall walkthrough
│   │   └── VideoBackdropSection.jsx # Scroll-reactive parallax video section wrapper
│   ├── pages/
│   │   ├── DiningPage.jsx         # Third Floor dining destinations
│   │   ├── EntertainmentPage.jsx  # PVR INOX cinema listings
│   │   ├── ExplorePage.jsx        # 3D walkthrough page
│   │   ├── HomePage.jsx           # Landing page
│   │   ├── ShoppingPage.jsx       # Retail brand directory
│   │   └── VisitPage.jsx          # Location, hours, and transit info
│   ├── sections/
│   │   ├── ArchitecturalStorySplit.jsx   # Home: atrium architecture narrative
│   │   ├── BrandSpotlightGallery.jsx     # Home: rotating brand feature carousel
│   │   ├── DiningCinemaShowcase.jsx      # Home: split dining/cinema preview
│   │   ├── HeroVideoStage.jsx            # Home: main hero section
│   │   └── HorizontalAtriumRibbon.jsx    # Home: animated floor selector ribbon
│   ├── styles/
│   │   ├── animations.css         # Custom keyframe animations
│   │   └── themes.css             # CSS custom property theme tokens (light/dark)
│   ├── utils/
│   │   ├── autoScrollContext.jsx  # Auto-scroll state and RAF animation logic
│   │   ├── mallData.js            # All mall content data (floors, brands, movies)
│   │   ├── router.jsx             # Custom client-side router (History API)
│   │   └── themeContext.jsx       # Dark/light theme context provider
│   ├── App.jsx                    # Root app component with layout and routing
│   ├── index.css                  # Global CSS entry point (Tailwind + fonts)
│   └── main.jsx                   # React DOM entry point
│
├── index.html                     # HTML entry point with meta tags and font preloads
├── vite.config.ts                 # Vite build configuration
├── tsconfig.json                  # TypeScript configuration (type-check only)
├── package.json                   # Project dependencies and scripts
├── netlify.toml                   # Netlify deployment configuration
├── vercel.json                    # Vercel deployment configuration
├── .env.example                   # Example environment variable file
└── .gitignore                     # Git ignore rules
```

---

## Prerequisites

| Requirement | Minimum Version | Notes |
|---|---|---|
| Node.js | 20 LTS or later | [nodejs.org](https://nodejs.org) |
| npm | 10 or later | Comes with Node.js |
| VS Code | Any recent version | Recommended editor |

> **Note:** This project has a peer dependency conflict between `esbuild ^0.28` (required by Vite 8) and `tsx` (which bundles an older esbuild). Always use the `--legacy-peer-deps` flag when installing, or use the exact command shown below.

---

## Local Installation and Setup

### 1. Download or Clone the Repository

```bash
git clone https://github.com/your-username/orion-mall-gorakhpur.git
cd orion-mall-gorakhpur
```

Or download and extract the ZIP, then open a terminal in the project folder.

### 2. Open in VS Code

```bash
code .
```

### 3. Install Dependencies

```bash
npm install --legacy-peer-deps
```

> The `--legacy-peer-deps` flag is required due to a peer dependency version conflict between Vite 8 and the `tsx` package. This is safe and does not affect functionality.

### 4. Configure Environment Variables

Copy the example environment file:

```bash
copy .env.example .env.local
```

Open `.env.local` and fill in the values:

```env
GEMINI_API_KEY=your_gemini_api_key_here
APP_URL=http://localhost:3000
```

> **Note:** `GEMINI_API_KEY` and `APP_URL` are present in the codebase for potential AI integration. The current UI does not make active API calls, so these variables are optional for local development. The site will load without them.

### 5. Start the Development Server

```bash
npm run dev
```

Vite will start the development server. If port 3000 is busy, it will automatically try the next available port (3001, 3002, etc.). The actual URL is printed in the terminal output, for example:

```
  VITE v8.3.8  ready in 350 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

### 6. Open the Website

Open the URL printed by Vite in your browser. The following routes are available:

| Route | Page |
|---|---|
| `/` | Home |
| `/explore` | 3D Mall Explorer |
| `/shopping` | Shopping & Brands |
| `/dining` | Dining & Salon |
| `/entertainment` | PVR INOX Cinemas |
| `/visit` | Visit Info & Directions |

---

## Available Scripts

All commands are run from the project root directory.

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server on port 3000 (falls back to next free port) |
| `npm run build` | Create a production build in the `dist/` folder |
| `npm run preview` | Serve the production build locally for testing |
| `npm run lint` | Run TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Remove the `dist/` folder and `server.js` |

---

## Production Build

### Create the Build

```bash
npm run build
```

This outputs the complete production-ready site to the `dist/` folder:

- `dist/index.html` — Entry HTML file
- `dist/assets/` — Hashed JS, CSS, and image assets
- `dist/videos/` — Background video files (copied from `public/videos/`)

### Preview the Build Locally

```bash
npm run preview
```

Vite will serve the `dist/` folder locally. Use this to verify the production build before deploying.

### Expected Build Output

- `index.html` — ~1.5 KB gzipped
- `index.css` — ~76 KB (12 KB gzipped)
- `index.js` — ~1,046 KB (284 KB gzipped — includes Three.js and all images)

> **Build warning:** Vite reports a chunk size warning for the JS bundle. This is expected because all images are statically imported and Three.js is a large library. This warning does not indicate an error. The site loads and runs correctly.

---

## Deployment

This project is a **client-side Single Page Application (SPA)**. The router uses the HTML5 History API (`pushState`). On static hosts, any direct URL access to a sub-route (e.g. refreshing `/dining`) must be rewritten to `index.html`. Deployment configuration files for the most common hosts are already included.

### Netlify (Recommended)

The project includes `netlify.toml` with the correct build command and SPA redirect rule.

1. Push the repository to GitHub (or GitLab/Bitbucket)
2. Connect the repository to Netlify
3. Netlify will auto-detect `netlify.toml` — no manual configuration needed
4. Click **Deploy**

The included `netlify.toml` runs:
```toml
[build]
  command = "npm install --legacy-peer-deps && npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel

The project includes `vercel.json` with the correct SPA rewrite rule.

1. Push the repository to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Set the **Framework Preset** to `Vite`
4. Set the **Build Command** to: `npm install --legacy-peer-deps && npm run build`
5. Set the **Output Directory** to: `dist`
6. Click **Deploy**

### Cloudflare Pages

1. Connect your GitHub repository in the Cloudflare Pages dashboard
2. Set **Build command**: `npm install --legacy-peer-deps && npm run build`
3. Set **Build output directory**: `dist`
4. Add a redirect rule: `/*` → `/index.html` (HTTP 200)

### Manual Static Hosting (Apache / Nginx)

Upload the entire contents of the `dist/` folder to your web server.

**Apache** — add to `.htaccess`:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

**Nginx** — add to your `server` block:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### Environment Variables on Hosting Platforms

If you use the Gemini API integration, set these in your hosting platform's environment variable dashboard:

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `APP_URL` | The public URL where the app is hosted |

---

## Troubleshooting

### `npm install` fails with ERESOLVE peer dependency conflict

**Error:**
```
npm error ERESOLVE could not resolve
npm error peerOptional esbuild@"^0.27.0 || ^0.28.0" from vite@8.x
```

**Solution:** Always use the `--legacy-peer-deps` flag:
```bash
npm install --legacy-peer-deps
```

---

### Port 3000 is already in use

**Error:** Vite prints `Port 3000 is in use, trying another one...`

**Solution:** This is not an error. Vite automatically picks the next free port (3001, 3002, etc.). Check the terminal output for the actual URL and use that.

---

### Blank screen after refreshing a sub-route on a live deployment

**Symptom:** Navigating to `/dining` or `/explore` directly in the browser or refreshing the page shows a 404 error.

**Root cause:** The HTML5 History API router requires all URLs to serve `index.html`. On static hosts without a rewrite rule configured, the host returns a 404 for any path that doesn't match a physical file.

**Solution:** Ensure the deployment platform has the SPA fallback configured:
- **Netlify:** `netlify.toml` is already included — this is handled automatically
- **Vercel:** `vercel.json` is already included — this is handled automatically
- **Other hosts:** Add the appropriate rewrite rule as shown in the Deployment section above

---

### 3D Mall Explorer shows a fallback message instead of 3D scene

**Symptom:** The Explore page shows a text message instead of the Three.js 3D scene.

**Root cause:** The 3D explorer requires WebGL hardware acceleration. It automatically detects software rendering (SwiftShader, llvmpipe) and falls back gracefully.

**Solution:** Ensure the browser has hardware acceleration enabled:
- Chrome: `Settings → System → Use hardware acceleration when available`
- Firefox: `about:config → layers.acceleration.force-enabled = true`

This is a browser/device limitation, not a code bug.

---

### Videos do not play

**Symptom:** Video backgrounds show a static poster image but never animate.

**Root cause:** Videos are designed to play only while the user is scrolling (to conserve CPU). This is intentional behaviour.

**What to check:**
1. Scroll the page — videos play during active scrolling and pause when still
2. Ensure the browser allows autoplay for muted videos (all major browsers do by default)
3. Confirm `dist/videos/` or `public/videos/` contains all 14 `.mp4` files

---

### Google Fonts fail to load

**Symptom:** Headings use a fallback serif font instead of Cormorant Garamond.

**Root cause:** The app loads fonts from `fonts.googleapis.com`. An offline environment or strict content security policy will block this.

**Solution:** This is expected behaviour in offline environments. For offline or self-hosted deployments, download the fonts and serve them locally, then update the `@import` in `index.html`.

---

### TypeScript errors during `npm run lint`

**Solution:** Ensure TypeScript 7 is installed (it is pinned in `devDependencies`). Run:
```bash
npm install --legacy-peer-deps
npm run lint
```

The project uses `noEmit: true` — TypeScript only type-checks and never compiles source files. The actual build is handled entirely by Vite.

---

## License

This project is provided for portfolio and demonstration purposes. No open-source license is applied. All brand names, logos, and trademarks referenced within the site (MAX Fashion, Levi's, KFC, Burger King, Domino's, PVR INOX, etc.) are the property of their respective owners. This website is not an official property of any of those brands.
