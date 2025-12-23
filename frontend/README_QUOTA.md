# Quota Frontend MVP

## Project Structure
- `app/` - Next.js App Router root
  - `page.tsx` - Landing page with LightRays
  - `dashboard/` - Dashboard routes
- `components/`
  - `LightRays.tsx` - WebGL Background (OGL)
  - `Sidebar.tsx` - Dashboard navigation
  - `TopNav.tsx` - Dashboard header
  - `ui/` - shadcn/ui components

## Setup Actions Taken
1. Initialized Next.js 15 + Tailwind CSS v4 (or v3 compat).
2. Installed `ogl` for WebGL.
3. Installed `framer-motion` for animations.
4. Installed `shadcn/ui` components.
5. Configured Dark Mode defaults.

## How to Run
1. `cd frontend`
2. `npm install` (already done)
3. `npm run dev`
4. Open http://localhost:3000

## Styling Notes
- **Z-Index Layering**:
  - `LightRays` (Canvas): z-0
  - Content: z-10 (relative positioning)
  - Modals/Nav: z-50
- **Colors**:
  - Cyan-500 (#06b6d4) is the primary accent.
  - Backgrounds are Zinc-950/Black.
