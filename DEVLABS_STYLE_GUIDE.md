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
CSS Implementation:
```css
body {
  font-family: 'JetBrains Mono', monospace;
  line-height: 1.5;
}
h1, h2, h3, h4, h5, h6 {
  text-transform: uppercase;
  letter-spacing: -0.075em;
}
button {
  text-transform: uppercase;
  font-weight: bold;
}
```
4. Layout and Grid
- CSS Flexbox or Grid only; never Bootstrap or UI frameworks
- Fixed max-width containers (~1280px)
- Use whitespace generously
- Layout sections: Header, Hero, Lab Listings, Footer
- Use standard CSS classes with descriptive names
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
- No real people, all 3D renders or digital art
7. Deployment Requirements
- Frontend: Vite, deployed to Render.com
- Backend: PostgreSQL with Sequelize/Express
- ENV: CORS configured for two origins (local and production)
- Must connect seamlessly (API fetches should show real data)
- Must build cleanly with npm run build and serve with npm start
8. How to Ensure No Template Traces
- Use only custom CSS with standard JSX className attributes
- Avoid any CSS frameworks or component libraries
- Create all components from scratch using vanilla CSS and JSX
- Use semantic CSS class names (e.g., .nav-button, .hero-section, .lab-card)
9. Repo Instructions for Render
- Add .render config file if needed
- Add "start": "vite preview" in frontend package.json
- Set DATABASE_URL and proxy vars in backend Render dashboard
- Add CORS whitelist for frontend URL
