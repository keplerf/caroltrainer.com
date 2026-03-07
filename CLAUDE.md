# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal training business website for Carol Almeida, a Vancouver-based personal trainer. It's a single-page marketing site built with React 19 and Vite.

## Commands

```bash
npm run dev      # Start dev server with HMR (exposes to network via --host)
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

### Hybrid Static/React Structure

The site uses a hybrid approach where the hero section and navigation are static HTML in `index.html`, while dynamic sections are rendered by React into `#root`. This improves initial load performance for the above-fold content.

**Static content (index.html):**
- Navigation bar with scroll-based sticky behavior
- Hero section with responsive images
- About section
- Google Analytics and structured data (JSON-LD)

**React-rendered content (src/App.jsx):**
- Services section
- FAQ accordion
- Contact form (lazy-loaded)
- Footer (lazy-loaded)

### Key Files

- `index.html` - Contains inline critical CSS for nav/hero plus static HTML content
- `src/App.jsx` - Main React app entry, uses lazy loading for ContactForm and Footer
- `src/content/faq.js` - FAQ data with HTML strings parsed via html-react-parser
- `src/css/main.scss` - Global styles and hero section styles
- `src/css/index.scss` - Style imports

### Component Structure

Components use CSS Modules (`.module.scss` or `.module.css`) for scoped styling. Each major section is its own component:
- `src/components/Services/` - Training services cards with react-feather icons
- `src/components/FAQ/` - Expandable FAQ accordion
- `src/components/ContactForm.jsx` - Form with axios POST to PHP backend, includes honeypot spam protection
- `src/components/Footer/`

### Build Configuration

- Vite with `@vitejs/plugin-react` and `babel-plugin-react-compiler` enabled
- SCSS via sass-embedded
- Tailwind v4 is installed but currently disabled in vite.config.js

### Contact Form

The ContactForm POSTs to `https://www.caroltrainer.com/app/contact.php`. It includes a honeypot field (`midName`) for spam protection.
