# Carol Trainer

Personal training business website for Carol Almeida, a Vancouver-based personal trainer.

## Tech Stack

- React 19 with Vite
- SCSS Modules for styling
- Motion (Framer Motion) for animations

## Commands

```bash
npm run dev      # Start dev server with HMR
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

The site uses a hybrid approach for performance optimization:

**Static HTML (index.html):**

- Navigation with scroll-based sticky behavior
- Hero section with responsive images
- About section

**React-rendered (src/App.jsx):**

- Services section
- FAQ accordion
- Contact form (lazy-loaded)
- Footer (lazy-loaded)

## Project Structure

```
src/
  components/
    Atoms/        # Button, Typography
    features/     # Cards carousel
    FAQ/          # FAQ accordion
    Footer/
    Form/         # Contact form
    Hero/
    Services/
  content/        # FAQ data
  css/            # Global styles
  helpers/        # Utility functions
```
