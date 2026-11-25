# 🌿 ஸ்ரீ Foods — Homestyle Food Catering & Subscription Platform

A full-stack, responsive web application for authentic South Indian homestyle food catering and subscription services. Built with a separate **React + Vite + Tailwind CSS** frontend and **Node.js / Express** backend.

---

## 🎨 Branding & Theme
- **Name & Logo**: **ஸ்ரீ** in Tamil calligraphy and **FOODS** in English inside an organic, fresh banana leaf emblem.
- **Color Palette**: Fresh appetizing greens (`#15803d`, `#16a34a`, `#22c55e`, `#f0fdf4`) and crisp white.
- **Hero Section**: Authentic kitchen visual of traditional South Indian women cooks preparing fresh hot meals with thumbs-up gesture, accompanied by a prominent **"Show Packages & Plans"** action button.
- **Craving Parallax Animation**: Crispy golden **Medu Vada**, syrupy **Gulab Jamun**, and blistered **Appalam** (Papad) float and rotate dynamically as users scroll fast.
- **Two-Page Switcher Toggle**:
  1. **Monthly Subscription**: Daily home-cooked meal boxes (Lunch Feast, Executive Twin 2-Meals, Traditional Tiffin Club).
  2. **Event Food (10 - 30 Members)**: Intimate family functions, poojas, birthdays, and housewarmings with fresh banana leaves included.
- **Interactive Ringing WhatsApp Widget**:
  - Pulsing radar & ringing animation at bottom right.
  - Opens an on-screen live WhatsApp chat dialog directly on the site.
  - Interactive **Delivery Location Selector** right on the screen.
  - Allows customers to type custom queries and sends pre-formatted details directly to WhatsApp.
- **3D Real Lady Kitchen Avatar Assistant (Chef Lakshmi)**:
  - 3D friendly lady chef in crisp white chef attire with green trim.
  - Live speech balloon and interactive trust recommendation wizard.
- **Booking Desk & 50% Advance Payment**:
  - Full customer information form with preferred delivery time slots.
  - Transparent calculation: **50% Advance Payable NOW** (to lock kitchen slot) and **50% Balance on Delivery**.
  - Interactive checkout modal with generated Order ID (`SHREE-2026-XXXX`), dynamic UPI QR code, and instant WhatsApp booking confirmation.

---

## 📁 Project Architecture

```text
Lakshmi Foods/
├── backend/                  # Separate Express.js Backend API
│   ├── package.json
│   └── server.js             # REST API (Packages, Orders, 50% Advance calculation, Inquiries)
│
├── frontend/                 # Separate React + Vite + Tailwind Frontend
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js        # Configured with proxy to backend /api
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public/
│   │   └── assets/           # High-res SVGs (Logo, Vada, Gulab Jamun, Appalam, Ladies, Avatar)
│   └── src/
│       ├── main.jsx
│       ├── index.css
│       ├── App.jsx
│       └── components/
│           ├── Navbar.jsx            # Banana leaf logo + Nav links + CTAs
│           ├── HeroSection.jsx       # Ladies with thumbs up + "Show Packages" button
│           ├── ParallaxFood.jsx      # Scroll-driven floating Vada, Jamun, Appalam
│           ├── PackageSwitcher.jsx   # Two-page toggle: Monthly vs Event (10-30 Pax)
│           ├── ChefLakshmiAvatar.jsx # 3D white-coat lady avatar & trust wizard
│           ├── WhatsAppWidget.jsx    # Ringing widget + in-screen chat + location picker
│           ├── BookingDesk.jsx       # Order form + delivery time + 50% advance calculator
│           └── PaymentModal.jsx      # Advance receipt + UPI QR + WhatsApp order dispatch
│
├── assets/                   # Source SVG assets
├── index.html                # Standalone preview HTML
├── styles.css                # Standalone styles
├── app.js                    # Standalone client script
├── package.json              # Root orchestration package
└── README.md
```

---

## 🚀 How to Run

### 1. Start the Backend API (Port 5000)
```bash
npm run server
# or: cd backend && node server.js
```
The backend API will start on `http://localhost:5000` with the following endpoints:
- `GET /api/health` — API health check
- `GET /api/packages` — Returns all Monthly and Event packages
- `POST /api/orders` — Creates order, calculates 50% advance, returns order reference & WhatsApp confirmation link
- `POST /api/inquiries` — Records chat inquiries & location choices

### 2. Start the React Frontend (Port 3000)
In a separate terminal:
```bash
npm run client
# or: cd frontend && npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build React for Production
```bash
npm run client:build
```
Produces an optimized production bundle inside `frontend/dist/`.
