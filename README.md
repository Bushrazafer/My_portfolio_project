# 🚀 Personal Developer Portfolio

A stunning, animated, fully responsive personal portfolio website built with pure **HTML**, **CSS**, and **JavaScript** — no frameworks, no build tools, just clean professional code.

![Portfolio Preview](assets/images/preview.png)

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 Dark Theme | Deep dark design with purple accent system |
| ✍️ Typewriter | Animated cycling role titles in hero section |
| 🌐 Particles | Interactive canvas particle network background |
| 📊 Skill Bars | Animated progress bars triggered on scroll |
| 🔢 Counters | Smooth number count-up animations |
| 🗂️ Filter | Instant project category filtering |
| 📧 EmailJS | Real contact form (no backend needed) |
| 🍔 Hamburger | Smooth mobile drawer navigation |
| ♿ Accessible | ARIA labels, focus management, reduced motion |
| 📱 Responsive | Mobile-first, works on all screen sizes |
| ⚡ Performance | Throttled scroll, debounced resize, lazy images |

## 📁 Project Structure

```
portfolio/
├── index.html                          # Main HTML document
├── style.css                           # Complete stylesheet
├── script.js                           # All JavaScript logic
├── README.md                           # This file
└── assets/
    ├── resume.pdf                      # Your resume (replace)
    └── images/
        ├── profile.jpg                 # Your profile photo
        ├── favicon.png                 # Browser tab icon
        └── project-thumbnails/
            ├── project-1.jpg
            ├── project-2.jpg
            ├── project-3.jpg
            ├── project-4.jpg
            ├── project-5.jpg
            └── project-6.jpg
```

## 🛠️ Setup Guide

### Step 1 — Clone or Download

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

Or simply download the ZIP and extract it.

### Step 2 — Add Your Assets

```
assets/images/profile.jpg      → Your headshot (400×400px recommended)
assets/resume.pdf              → Your latest CV
assets/images/project-thumbnails/ → Screenshots of your projects (800×480px)
```

### Step 3 — Customize Content

Open `index.html` and update:

- **Name** — Search `Bushra Zafar` → replace with your name
- **Bio** — Update the About section paragraph
- **Stats** — Update `data-target` values
- **Skills** — Update `data-width` and skill names
- **Projects** — Replace card content, links, categories
- **Social links** — Replace `johndoe` in all hrefs
- **Contact** — Update email and phone

### Step 4 — Set Up EmailJS (Free)

1. Go to [emailjs.com](https://www.emailjs.com) → Create free account
2. **Add Email Service** → Connect Gmail/Outlook → note your `Service ID`
3. **Create Email Template** → Use these variables:

```
From:    {{user_name}} <{{user_email}}>
Subject: Portfolio Contact: {{subject}}
Body:
Name:    {{user_name}}
Email:   {{user_email}}
Subject: {{subject}}
Message: {{message}}
```

Note your `Template ID`

4. Go to **Account** → copy your **Public Key**
5. Open `script.js` and update:

```javascript
const CONFIG = {
    emailjs: {
        publicKey:  "your_real_public_key",
        serviceID:  "your_real_service_id",
        templateID: "your_real_template_id",
    },
    // ...
};
```

### Step 5 — Open Locally

```bash
# Option A: VS Code Live Server (recommended)
# Install "Live Server" extension → right-click index.html → Open with Live Server

# Option B: Python
python -m http.server 3000

# Option C: Node.js
npx serve .
```

Open `http://localhost:3000` in your browser.

## 🚀 Deployment

### Netlify (Recommended — Free)

```bash
# Drag & drop your portfolio folder at:
# https://app.netlify.com/drop
```

Or via CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```

### GitHub Pages (Free)

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main

# Then: Repo Settings → Pages → Source: main branch → /root
```

Your site will be live at: `https://yourusername.github.io/portfolio`

### Vercel (Free)

```bash
npm install -g vercel
vercel --prod
```

## 🎨 Customization

### Change Color Scheme

Edit the CSS custom properties at the top of `style.css`:

```css
:root {
    --clr-primary:   #6C63FF;   /* Main purple → change to any color */
    --clr-secondary: #FF6584;   /* Pink accent */
    --clr-success:   #43D9AD;   /* Teal / green */
    --bg-root:       #09090f;   /* Page background */
}
```

Popular alternatives:

```css
/* Blue theme */
--clr-primary: #3B82F6;

/* Green theme */
--clr-primary: #10B981;

/* Orange theme */
--clr-primary: #F97316;
```

### Add More Projects

Copy this card block inside `#projects-grid`:

```html
<article class="project-card" data-category="react">
    <div class="project-thumbnail">
        <img src="assets/images/project-thumbnails/project-7.jpg" alt="My New Project" loading="lazy" width="400" height="240" />
        <div class="project-overlay" aria-hidden="true">
            <a href="https://github.com/you/project" target="_blank" rel="noopener noreferrer" class="project-overlay-btn" tabindex="-1">
                <i class="fa-brands fa-github"></i>
            </a>
            <a href="https://project-demo.netlify.app" target="_blank" rel="noopener noreferrer" class="project-overlay-btn" tabindex="-1">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
        </div>
    </div>
    <div class="project-body">
        <div class="project-tags">
            <span class="project-tag">React</span>
            <span class="project-tag">TypeScript</span>
        </div>
        <h3 class="project-title">My New Project</h3>
        <p class="project-description">Brief description of what this project does and the problems it solves.</p>
        <div class="project-links">
            <a href="https://github.com/you/project" target="_blank" rel="noopener noreferrer" class="project-link">
                <i class="fa-brands fa-github" aria-hidden="true"></i> Source Code
            </a>
            <a href="https://project-demo.netlify.app" target="_blank" rel="noopener noreferrer" class="project-link project-link-live">
                <i class="fa-solid fa-globe" aria-hidden="true"></i> Live Demo
            </a>
        </div>
    </div>
</article>
```

**Available categories:** `react` | `javascript` | `html-css` | `fullstack`

### Add More Skills

Copy this block inside `#skills-grid`:

```html
<div class="skill-card" data-category="frontend">
    <div class="skill-card-icon">
        <i class="fa-brands fa-vuejs" aria-hidden="true"></i>
    </div>
    <div class="skill-card-info">
        <div class="skill-card-header">
            <h4 class="skill-card-name">Vue.js</h4>
            <span class="skill-card-percent">75%</span>
        </div>
        <div class="skill-bar-track" aria-label="Vue.js skill level: 75%">
            <div class="skill-bar-fill" data-width="75"></div>
        </div>
    </div>
</div>
```

**Available categories:** `frontend` | `backend` | `tools`

## 📦 Libraries Used

| Library | Version | Purpose | CDN |
|---|---|---|---|
| [Font Awesome](https://fontawesome.com) | 6.5.0 | Icons | ✅ |
| [Google Fonts](https://fonts.google.com) | — | Inter + Fira Code | ✅ |
| [AOS.js](https://michalsnik.github.io/aos/) | 2.3.4 | Scroll animations | ✅ |
| [EmailJS](https://www.emailjs.com) | 4.x | Contact form emails | ✅ |

No npm, no webpack, no build step required.

## ♿ Accessibility

- All images have descriptive `alt` text
- Interactive elements have `aria-label` attributes
- Form fields have associated `label` elements
- Error messages use `role="alert"` and `aria-live`
- Keyboard navigation fully supported
- Respects `prefers-reduced-motion` — all animations disabled
- Color contrast meets WCAG 2.1 AA standard
- Focus indicators visible on all interactive elements

## ⚡ Performance

- Images use `loading="lazy"` (except hero)
- Scroll handlers throttled (100–200ms)
- Resize handlers debounced (200–300ms)
- Particle animation pauses when tab is hidden
- Fonts loaded with `display=swap`
- No unused CSS or JavaScript

## 🌐 Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Opera 76+ | ✅ Full |
| IE 11 | ❌ Not supported |

## 📄 License

```
MIT License — Copyright (c) 2025 Bushra Zafar

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software.
```

## 👤 Author

**Bushra Zafar**
- Website: [johndoe.dev](https://johndoe.dev)
- GitHub: [@johndoe](https://github.com/johndoe)
- LinkedIn: [johndoe](https://linkedin.com/in/johndoe)
- Email: [john@example.com](mailto:john@example.com)

---

<div align="center">
    Built with ❤️ using pure HTML, CSS & JavaScript<br/>
    ⭐ Star this repo if it helped you!
</div>