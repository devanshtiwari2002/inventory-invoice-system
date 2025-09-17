```md
# Inventory & Billing System 🧾📦

A full-stack Inventory and Sales Management System built with **Next.js**, **Tailwind CSS**, **Node.js**, and **MongoDB**. Designed for small to mid-sized businesses to manage products, staff, stock, and generate professional invoices in one place.

---
## Features

### Core Features
- Role-based login system (`admin`, `staff`)
- Dashboard with:
  - Daily Sales Summary
  - Weekly Sales Chart
  - Staff Performance Table
  - Stock Overview
- Product management (Add / Edit / Delete)
- Invoice generation with auto-calculated totals
- Staff user management
- PDF invoice generation
- Real-time toast notifications

###  Auth & Access Control
- JWT-based authentication
- Role-based protected routes and UI
- Staff and Admin have access to different dashboard views

### Admin Dashboard
- Today's sales total
- Weekly sales chart (line graph)
- Staff-wise sales performance
- Current stock overview
- Quick access to product and staff management

---
## 🛠 Tech Stack
| Frontend             | Backend               | Database |
| -------------------- | --------------------- | -------- |
| Next.js (App Router) | Node.js + Express.js  | MongoDB  |
| Tailwind CSS         | JWT Auth Middleware   | Mongoose |
| React Hot Toast      | RESTful APIs          |          |
| Recharts (Dashboard) | PDFKit (for invoices) |          |

---

##  Project Structure
```
root
├── backend/ # Express server & APIs
│ ├── routes/
│ ├── models/
│ ├── controllers/
│ └── utils/
├── src/app/ # Next.js App Router
│ ├── dashboard/
│ ├── login/
│ ├── sales/
│ ├── users/
│ └── products/
├── src/components/ # Shared components
│ ├── Sidebar.jsx
│ ├── adminDashboard/ # Admin-specific components
├── src/utils/ # JWT helper, fetch utils, etc.
└── public/ # Logo, favicon, static files

````

---
## 🚧 Setup & Run Locally
### 1. Clone the repo
```bash
git clone https://github.com/your-username/inventory-system.git
cd inventory-system
````

### 2. Install dependencies
```bash
# For frontend (Next.js)
cd frontend
npm install

# For backend (Express)
cd ../backend
npm install
```

### 3. Create `.env` files

- `.env` for backend:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

```
- Optionally, configure `.env.local` for frontend if needed.
### 4. Start dev servers

```bash
# Backend
cd backend
nodemon index.js

# Frontend
cd ../frontend
npm run dev
```
---

##  Contributing

Open to suggestions, feature ideas, or PRs. Let’s build something useful!

---

## Author

Made with ❤️ by \[Devansh Tiwari]
[GitHub](https://github.com/your-username)

---

```

```
