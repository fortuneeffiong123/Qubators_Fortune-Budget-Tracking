# Fortune Budget Tracking

A simple, clean, and responsive web application that helps small business owners and entrepreneurs plan daily spending, track expenses, and stay within their monthly business budget.

Live Test App
: https://fortune-budget-tracking.netlify.app/

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Table of Contents

- [Problem](#problem)
- [Target Users](#target-users)
- [Features](#features)
- [Main User Journey](#main-user-journey)
- [Getting Started](#getting-started)
  - [Run Locally](#run-locally)
  - [Deploy to the Web](#deploy-to-the-web)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Data & Privacy](#data--privacy)
- [Tech Stack](#tech-stack)
- [Roadmap](#roadmap)
- [License](#license)

---

## Problem

Many small business owners struggle to:

- Plan their daily spending,
- Track expenses consistently,
- Control overspending,
- Stay within their monthly budget.

Existing tools are often overly complex — full of accounting, payroll, or bank-integration features that small business owners don't need. This creates friction and leads to abandoned tracking.

## Target Users

**Small business owners and entrepreneurs** who need a fast, low-friction way to monitor their business finances without learning a complex accounting platform.

## Features

| Feature | Description |
| --- | --- |
| **Monthly Budget** | Set a monthly business budget that drives the entire dashboard. |
| **Spending Categories** | Create your own categories (e.g. Supplies, Utilities, Marketing). |
| **Daily Spending Plan** | Automatically calculated from your monthly budget and remaining days. |
| **Record Daily Expenses** | Quickly log an expense with amount, category, date, and an optional note. |
| **Total Spending & Remaining Budget** | See where you stand at a glance. |
| **Compare With Plan** | Visual progress bars compare actual spending against the monthly budget and the daily spending plan. |
| **Smart Alerts** | Notifications warn you when spending nears or exceeds the planned limits. |

## Main User Journey

1. Set a monthly budget.
2. Create spending categories.
3. Receive an automatic daily spending plan.
4. Record daily expenses.
5. Monitor daily and monthly spending.
6. See the remaining budget at a glance.
7. Get alerts when approaching or exceeding limits.

## Getting Started

### Run Locally

Fortune Budget Tracking is a static web app with no build step and no dependencies.

**Prerequisites:** Any modern web browser.

1. Download or clone the project:

   ```bash
   git clone https://github.com/yourusername/fortune-budget-tracking.git
   cd fortune-budget-tracking
   ```

2. Open the app:

   - **Option A (recommended):** Run a local server.

     Using Python:
     ```bash
     python -m http.server 8080
     ```
     Then visit http://localhost:8080

     Using VS Code, install the "Live Server" extension, right-click `index.html`, and choose *Open with Live Server*.

   - **Option B:** Simply double-click `index.html` to open it directly in your browser.

> **Note:** Opening the file directly still works for this app. A local server is recommended for the best experience.

### Deploy to the Web

Because the app is fully static, you can host it anywhere static sites are served:

- **Netlify** — drag-and-drop the project folder at [app.netlify.com/drop](https://app.netlify.com/drop)
- 
https://fortune-budget-tracking.netlify.app

- **Vercel** — `vercel` from the project folder
- **GitHub Pages** — push the folder to a repository and enable Pages

## How It Works

### Daily Spending Plan

At the start of each month, the app calculates:

```
Daily plan = Remaining budget ÷ Remaining days in the month (including today)
```

This "remaining-looking-forward" approach is more realistic than a flat monthly-rate because it automatically adjusts your pace as the month progresses and as you spend.

### Alerts

The app warns you when:

- Monthly spending reaches **80%** of the budget,
- Monthly spending **exceeds** the budget,
- Today's spending exceeds **80%** of the daily plan,
- Today's spending **exceeds** the daily plan.

## Project Structure

```
fortune-budget-tracking/
├── index.html      # Dashboard layout, forms, and panels
├── styles.css      # Responsive, professional styling
├── app.js          # All application logic (budget, categories, expenses, alerts)
└── README.md       # Project documentation
```

## Data & Privacy

All data is stored **locally in your browser** using `localStorage`. Nothing is sent to a server, and no accounts are required. Clearing your browser data will erase your records.

## Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — responsive layout (mobile-first) with a clean professional design system
- **JavaScript (ES6)** — vanilla, no frameworks or build tools required
- **localStorage** — browser-native persistence

## Roadmap

- Export expenses to CSV
- Edit expense categories after creation
- Monthly budget carry-over between months
- Multiple business profiles

## License


Made for small business owners who want to control their finances without the complexity.
