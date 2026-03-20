<div align="center">

<img src="https://i.postimg.cc/5tTNWYqp/rd.png" width="90" height="90" alt="Rikesh Dahal" style="border-radius:50%" />

<br />
<br />

# Rikesh Dahal

### Data Engineer · Full-Stack Developer · Game Developer

*Sinamangal, Kathmandu, Nepal*

<br />

[![Live Site](https://img.shields.io/badge/Live%20Site-rikeshdahal.com.np-6d27d9?style=flat-square&logo=vercel&logoColor=white)](https://rikeshdahal.com.np)
[![Terminal](https://img.shields.io/badge/Terminal%20Mode-Try%20it-22c55e?style=for-the-badge&logo=gnubash&logoColor=white)](https://rikeshdahal.github.io/Terminal-Portfolio/)
[![CV](https://img.shields.io/badge/Download%20CV-Hacker%20Style-8f5cdf?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](https://rikeshdahal.github.io/Hacker-cv/Hacker-CV)
[![License](https://img.shields.io/badge/License-Restricted%20%E2%80%94%20Credit%20Required-ef4444?style=for-the-badge)](LICENSE)

<br />

> *Building data pipelines, games, and web apps — from raw data to polished interfaces.*

</div>

---

## About

Personal portfolio of **Rikesh Dahal**, BCA student at Patan College and Data Engineering intern at Insight Workshop. Built entirely in vanilla HTML, CSS, and JavaScript — no frameworks, no build step. Just open `index.html`.

Connects to **Supabase** for all dynamic content and **EmailJS** for contact delivery. Features a dark-first design with a purple accent system, interactive bhajan music player, gooey navbar effect, AI chat widget, full blog editor, and a complete admin panel.

---

## Stack

<div align="center">

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML5 · CSS3 · JavaScript ES2022 |
| Database | Supabase (PostgreSQL + Auth + Storage + Realtime) |
| Email | EmailJS |
| Fonts | Cabinet Grotesk · Special Elite · JetBrains Mono |
| Icons | Font Awesome 6 |
| Hosting | GitHub Pages / any static host |

</div>

---

## Features

<table>
<tr>
<td width="50%">

**✦ Interface**
- Gooey sliding blob navbar effect
- Custom dot + ring cursor
- Dark / light mode with persistence
- Scroll-triggered reveal animations
- Hero canvas particle field
- Live viewer counter (CountAPI)

</td>
<td width="50%">

**✦ Content**
- Supabase-powered projects carousel
- Full-screen markdown blog editor
- Testimonials carousel with star ratings
- Experience timeline with scroll progress
- Skills grid with animated progress bars
- Data engineering pipeline visualiser

</td>
</tr>
<tr>
<td>

**✦ Community**
- OAuth guestbook (GitHub + Google)
- Guestbook image uploads via Supabase Storage
- Realtime guestbook updates
- Footer like button with heart animations
- Testimonial submission with review queue

</td>
<td>

**✦ System**
- Supabase Auth (email + OAuth)
- Full admin panel (CRUD for all content)
- Role-based access (User / Admin)
- Bhajan music player with waveform
- Kimi AI chat iframe widget
- Manifest / bucket list with eSewa QR

</td>
</tr>
</table>

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/rikeshdahal/web.git
cd web

# 2. Open — that's it
open index.html
```

No `npm install`. No build step. No config files.

---

## Configuration

All credentials live in the `CFG` object at the top of `index.html`:

```js
const CFG = {
  ejKey:      'YOUR_EMAILJS_PUBLIC_KEY',
  ejSvc:      'YOUR_EMAILJS_SERVICE_ID',
  ejTpl:      'YOUR_CONTACT_TEMPLATE_ID',
  ejTplTesti: 'YOUR_TESTIMONIAL_TEMPLATE_ID',
  sbUrl:      'https://YOUR_PROJECT.supabase.co',
  sbKey:      'YOUR_SUPABASE_ANON_KEY',
};

const AUTH_CFG = {
  adminIds: ['YOUR_SUPABASE_USER_UUID'],
  adminKey: 'YOUR_ADMIN_SECRET_KEY',
};
```

---

## Database

Seven Supabase tables power all dynamic content:

| Table | Purpose |
|---|---|
| `projects` | Project carousel cards |
| `writings` | Blog posts (user-submitted + admin-authored) |
| `testimonials` | Reviews with approval queue |
| `guestbook` | Public messages with image support |
| `bucket_list` | Manifest / bucket list items |
| `gear_items` | Hardware and software showcase |
| `portfolio_likes` | Like button counts (one row per session) |

SQL setup files are included in `/sql`.

---

## Deployment

### GitHub Pages

```bash
git add index.html README.md
git commit -m "deploy"
git push origin main
# Settings → Pages → Deploy from main
```

### Other Hosts

Upload `index.html` to any static host — Vercel, Netlify, Cloudflare Pages, Render, Firebase Hosting. No server required.

---

## Project Structure

```
web/
├── index.html                    # entire site
├── README.md
├── LICENSE
└── sql/
    └── portfolio_likes_setup.sql
```

---

## Screenshots

| Section | Preview |
|---|---|
| Hero | Particle canvas · typed roles · bhajan player · devotion card |
| Blog | Full-screen markdown editor · live preview · syntax highlighting |
| Admin | CRUD panel for all 7 data tables |
| Footer | Like section · guestbook · manifest · gear |

---

## License

This project uses a **Restricted Source License** — it is **not** MIT or open source.

You **must** display visible credit on any page using this work:

```
Built on a design by Rikesh Dahal — github.com/rikeshdahal
```

Commercial use, redistribution as a template, and claiming this as original work without credit are **prohibited**.

See [`LICENSE`](LICENSE) for full terms. Commercial licensing: [rikeshdahal0526@gmail.com](mailto:rikeshdahal0526@gmail.com)

---

<div align="center">

Made with ♥ in Kathmandu, Nepal

*राधे कृष्ण* 🪈

**[rikeshdahal0526@gmail.com](mailto:rikeshdahal0526@gmail.com) · [LinkedIn](https://www.linkedin.com/in/rikeshdahal/) · [GitHub](https://github.com/rikeshdahal)**

</div>
