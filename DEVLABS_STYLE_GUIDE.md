---
DevLabs Frontend Styling + Branding Guide (for App Academy Fullstack Project)

---
1. Branding Identity (No Template Clones)
Project Name: DevLabs
Mission Tagline: "Postmodern Labs for the Future of Fullstack"
Brand Values:
- Clean, minimal, and developer-centric
- Brutalist-inspired layout with modern design principles
- All UI must look handcrafted, no boilerplate
2. Color Palette (Dark First)
Primary Background:     #0f1115     (deep charcoal)
Secondary Background:   #1a1d23     (slightly lighter charcoal)
Accent Primary:         #00ffcc     (neon mint)
Accent Secondary:       #ffb86c     (soft orange)
Text Primary:           #ffffff     (pure white)
Text Secondary:         #cfcfcf     (dimmed white)
Button Default:         #242424     (grey-black)
Border Color:           #33393f
Use gradients, outlines, and glow sparingly but precisely.
3. Typography
Font Family: 'JetBrains Mono', monospace
Headings:    Uppercase, tight letter spacing
Body:        Normal case, ~1.5 line-height
Buttons:     Uppercase or bold caps
Tailwind config:
theme: {
  fontFamily: {
    mono: ['JetBrains Mono', 'monospace']
  },
  extend: {
    letterSpacing: {
      tightest: '-.075em'
    }
  }
}
4. Layout and Grid
- Flexbox or Grid only; never Bootstrap
- Fixed max-width containers (~1280px)
- Use whitespace generously
- Layout sections: Header, Hero, Lab Listings, Footer
5. Components Required (Custom, No Libs)
- Custom NavBar
- Hero Section (with glowing DevLabs logo and tagline)
- LabCard (custom tile with image, rating, price, location)
- Modal (Sign up / Log in)
- Booking Form
- Review Display
- Footer (plain, links only)
6. Image Specs
Generate or prepare 20 images for labs/:
- 1 Hero banner (1920x600)
- 19 Lab thumbnails (400x300)
 Each should feature:
- Futuristic architectural workspace
- Postmodern lighting, code screens, or neon elements
- No real people, all 3D renders or AI art
7. Deployment Requirements
- Frontend: Vite, deployed to Render.com
- Backend: PostgreSQL with Sequelize/Express
- ENV: CORS configured for two origins (local and production)
- Must connect seamlessly (API fetches should show real data)
- Must build cleanly with npm run build and serve with npm start
8. How to Ensure No Template Traces
- Remove Tailwind component libraries (e.g. DaisyUI, Flowbite)
- Avoid component boilerplate like HeroIcons unless rebuilt by hand
- Recreate buttons, modals, cards from scratch with Tailwind classes
9. Repo Instructions for Render
- Add .render config file if needed
- Add "start": "vite preview" in frontend package.json
- Set DATABASE_URL and proxy vars in backend Render dashboard
- Add CORS whitelist for frontend URL

---
This document is to be saved in your repo as DEVLABS_STYLE_GUIDE.md and referenced in your ReadMe to certify original design for grading purposes.