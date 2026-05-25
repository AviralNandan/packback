# 🎒 Packback – Student Academic Marketplace (Bhopal)

**A React-based educational e-commerce platform for buying and selling second-hand learning resources among engineering students in Bhopal, M.P.**

Built for: RGPV · MANIT · LNCT · TIT · Sagar Institute · Oriental College · RKDF University and more.

---

## 📦 What's Included

```
packback/
├── index.html              ← HTML entry point
├── vite.config.js          ← Vite bundler config
├── package.json            ← Dependencies & scripts
├── README.md               ← This file
├── public/
│   └── favicon.svg         ← App icon
└── src/
    ├── main.jsx            ← React root render
    └── App.jsx             ← Complete Packback application
```

---

## ✅ Prerequisites

Before starting, make sure you have these installed on your computer:

| Tool | Minimum Version | Check Command |
|------|----------------|---------------|
| **Node.js** | v18 or higher | `node --version` |
| **npm** | v9 or higher | `npm --version` |
| A **code editor** (VS Code recommended) | Any | — |
| A **modern browser** (Chrome / Edge / Firefox) | Latest | — |

### How to install Node.js (if not installed)
1. Go to https://nodejs.org
2. Download the **LTS (Long Term Support)** version
3. Run the installer and follow the steps
4. Restart your terminal/command prompt
5. Verify: `node --version` should print something like `v20.11.0`

---

## 🚀 Setup Steps (Run These in Order)

### Step 1 – Download / Extract the Project

If you downloaded a ZIP file, extract it to a folder of your choice.
Example: `C:\Projects\packback` on Windows or `~/Projects/packback` on Mac/Linux.

### Step 2 – Open Terminal in the Project Folder

**Windows:**
- Open the `packback` folder in File Explorer
- Click the address bar, type `cmd`, press Enter
- OR right-click inside the folder → "Open in Terminal"

**Mac / Linux:**
- Open Terminal
- Type: `cd ~/Projects/packback` (adjust path as needed)
- Press Enter

### Step 3 – Install Dependencies

Run this command once (it downloads React and Vite):

```bash
npm install
```

You will see output like:
```
added 143 packages in 15s
```

This creates a `node_modules/` folder. Do NOT edit or delete it.

### Step 4 – Start the Development Server

```bash
npm run dev
```

You will see:
```
  VITE v5.x.x  ready in 400ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

### Step 5 – Open in Browser

The browser will open automatically at **http://localhost:3000**

If it doesn't open, manually go to: `http://localhost:3000`

**You should see the Packback homepage!** 🎉

### Step 6 – Stop the Server

Press `Ctrl + C` in the terminal to stop the development server.

---

## 🌐 How to Use the App

### Browse Products (Home Page)
- **Search**: Type in the search bar to filter products by name, seller, or subject
- **Category Pills**: Click any category button to filter (Books, Calculators, Electronics, etc.)
- **Filters**: Use dropdowns for College, Condition, Sort order
- **Price Slider**: Drag to set maximum price (₹50 – ₹3,000)
- **Click any card**: Opens the full product detail modal

### Product Detail Modal
- See full description, Fair Price Analysis breakdown, and seller info
- **💬 Chat with Seller** – Opens in-app chat
- **🛒 Buy Now** – Records purchase, shows confirmation
- **❤️ Wishlist** – Saves item to your wishlist
- **🚩 Report** – Reports a suspicious listing

### Buyer Dashboard (click "Buyer" in nav)
- **Browse Saved** – Recommended products
- **Wishlist** – Your saved items
- **Purchases** – Items you've bought (click ⭐ Review to leave feedback)
- **Recent Searches** – Search history and trending items

### Seller Dashboard (click "Seller" in nav)
- **My Listings** – Edit ✏️, Mark Sold ✅, or Delete 🗑 your listings
- **Sold Items** – Revenue tracker for sold products
- **My Analytics** – Views chart, weekly activity, pricing tips
- **Inquiries** – Reply or dismiss buyer messages

### Admin Panel (click "Admin" in nav)
- **Overview** – Platform-wide metrics and growth charts
- **Users** – Ban/Unban/View all registered users
- **Listings** – Approve or Remove any listing
- **Reports** – Resolve, Investigate, or Remove flagged listings
- **Colleges** – Approve pending colleges, manage active Bhopal colleges

### Sell an Item (click "+ Sell" button)
1. Fill in the product title
2. Choose category, condition, and subject
3. Enter original price and your selling price
4. Select age, demand level, college, and Bhopal area
5. Write a description
6. Watch the **Live Fair Price Score** update as you type
7. Click **🚀 Publish Listing**

---

## 🏷️ Fair Price Score Explained

Every product gets an automatic Fair Price Score:

| Score | Meaning | When |
|-------|---------|------|
| 🔥 Excellent Bargain | ≤ 85% of expected market value | Great deal for buyer |
| 🟢 Fair Deal | 86% – 105% of expected value | Balanced pricing |
| 🟡 Slightly High | 106% – 120% of expected value | Consider lowering |
| 🔴 Overpriced | > 120% of expected value | Lower price for visibility |

**Algorithm:**
```
ExpectedPrice = OriginalPrice × ConditionFactor × AgeFactor × DemandFactor

ConditionFactor: New=1.0, Excellent=0.9, Good=0.75, Fair=0.6, Poor=0.4
AgeFactor: max(0.4, 1 - years × 0.075)
DemandFactor: Low=0.85, Medium=1.0, High=1.1, Very High=1.2
```

---

## 🏗️ Build for Production (Deploy Online)

To create an optimized production build:

```bash
npm run build
```

This creates a `dist/` folder with all files ready to deploy.

### Deploy to Vercel (Free – Recommended)
1. Go to https://vercel.com and sign up (free)
2. Install Vercel CLI: `npm install -g vercel`
3. Run: `vercel` inside the packback folder
4. Follow the prompts — your site will be live in ~1 minute
5. You'll get a URL like: `https://packback.vercel.app`

### Deploy to Netlify (Free)
1. Go to https://app.netlify.com
2. Drag and drop the `dist/` folder onto the Netlify dashboard
3. Your site is live instantly

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|---------|
| `node: command not found` | Install Node.js from https://nodejs.org |
| `npm install` fails | Delete `node_modules/` and `package-lock.json`, then retry |
| Port 3000 already in use | Change port in `vite.config.js`: `port: 3001` |
| Images not loading | Check your internet connection (images load from Unsplash) |
| Blank white screen | Open browser DevTools (F12) → Console tab, share the error |
| `Cannot find module` | Run `npm install` again |

---

## 📁 Future Backend Setup (Version 3.0)

To add real authentication, a database, and payments:

```bash
# Backend setup (future)
mkdir packback-api
cd packback-api
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
npm install -D nodemon

# Run backend
node server.js
```

Planned stack: Node.js + Express + MongoDB Atlas + Razorpay + Socket.IO

---

## 👨‍💻 Project Details

| Field | Value |
|-------|-------|
| **Project Name** | Packback v2.0 |
| **College** | Lakshmi Narain College of Technology, Bhopal |
| **Department** | CSE-IoT |
| **Session** | 2025-26 |
| **Students** | Shriyanshi Soni (0103IS221194), Aviral Nandan (0103IS221054) |
| **Guide** | Prof. Rahul Manjhi |
| **University** | RGPV Bhopal |
| **Framework** | React 18 + Vite 5 |
| **Language** | JavaScript (ES2022) |

---

## 📄 License

This project is submitted as a Major Project-II for Bachelor of Technology (CSE-IoT) at LNCT Bhopal under RGPV. All rights reserved by the authors.
