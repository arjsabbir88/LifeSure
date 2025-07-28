# LifeSure – Life Insurance Management Platform

LifeSure is a modern MERN stack web application designed to simplify life insurance management for customers, agents, and admins. Built for a tech-driven insurance startup, the platform offers a seamless, secure, and fully digital experience for exploring, purchasing, and managing life insurance policies.

---

## 🚀 Live Site

[Live Demo Link](https://lifesure-57740.web.app)

---

## ✨ Key Features

- 🔐 **Role-Based Access:** Admin, Agent, and Customer dashboards with tailored features.
- 🔑 **Secure Authentication:** Firebase email/password & Google login with JWT token API auth.
- 🏠 **Dynamic Home Page:** Hero slider, popular policies, benefits, reviews, blogs, newsletter, and agents.
- 📋 **All Policies:** Filter, search (case-insensitive), and paginate insurance policies.
- 📝 **Quote Estimator:** Get premium estimates via an interactive, multi-step form.
- 🎫 **Policy Applications:** Detailed forms, nominee & health disclosure, and status tracking.
- 💳 **Stripe Payments:** Secure online payments for policy premiums.
- 📄 **PDF Policy Download:** Download your approved policy as a PDF.
- 👥 **Admin Panel:** Manage users, agents, policies, applications, blogs, and Stripe transactions.
- 🧑‍💼 **Agent Panel:** Assigned customers, manage blogs, handle applications, and update policy status.
- 👤 **Customer Dashboard:** My policies, payment status, submit reviews, and claim requests.
- 📰 **Blog/Articles:** Dynamic blog system with visit counts, agent authors, and modals.
- 🗺 **Responsive Navbar:** Conditional links, profile, and dashboard based on login state.
- 📈 **Statistics:** Earnings chart and transaction filters for admins.
- ✉️ **Newsletter:** Subscription form saves data to DB (no login needed).
- 🧐 **FAQs & Forum:** Accordion-style Q&A with helpful votes.
- 📊 **Progress Bars:** Multi-step indicators for user flows.
- 🚫 **Error Handling:** Custom 401/403/404 pages and rejection feedback modals.
- 🌐 **Fully Responsive:** Optimized for mobile, tablet, and desktop.
- 🎨 **Modern UI:** Built with Tailwind CSS, Flowbite/Mamba UI, and no Lorem Ipsum!

---

## 🗂️ Tech Stack & Tools

- **Frontend:** React, React Router, Tanstack Query, React Helmet Async, React Hook Form, Tailwind CSS, Flowbite/Mamba UI
- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Auth:** Firebase Auth (Email/Password, Google)
- **Payments:** Stripe
- **PDF:** jsPDF or react-pdf
- **Alerts:** React Toastify/SweetAlert2
- **State/Data:** Tanstack Query (@tanstack/react-query)
- **Environment:** .env for sensitive variables (Firebase, MongoDB, JWT)

---

## 📖 Main Pages & Features

### 🏠 Home Page
- Hero slider with tagline and CTA ("Get a Free Quote")
- 6 most popular dynamic policies
- 4–6 benefit cards (quotes, support, claims, payments, dashboard)
- Customer reviews carousel (from dashboard)
- Latest 4 blogs/articles (from admin)
- Newsletter subscription (public)
- 3 featured agents (dynamic)

### 🗺 All Policies
- Filter by category (Term Life, Senior, etc.)
- Case-insensitive search bar
- Pagination (6 per page)
- Policy cards link to details

### 📄 Policy Details
- Full info: eligibility, premium logic, benefits, etc.
- CTA: "Get Quote" → Quote page (private)
- "Book Agent Consultation" button

### 📈 Quote Page (Private)
- Dynamic premium estimator (age, gender, amount, duration, smoker)
- Result display (monthly/annual)
- CTA: "Apply for Policy"

### ✍ Application Form (Private)
- Personal, nominee, and health info
- Submits as "Pending" application

### 🧑‍💼 Admin Dashboard
- Manage Applications: View, assign agents, reject (with feedback), status
- Manage Users: Promote/demote, view/filter, delete
- Manage Policies: Add/edit/delete, full CRUD
- Manage Transactions: Stripe payments, filters, earnings chart
- Manage Agents: Review apps, approve/reject, demote, activity

### 🧑 Agent Dashboard
- Assigned customers, update status, view profiles
- Manage personal blogs (CRUD), add new blogs

### 👤 Customer Dashboard
- My policies, status, view details, submit reviews (star + text)
- Payment status (due/paid), pay via Stripe
- Claim request form (active policies only)
- Profile page (edit name/photo, see badge, last login)

### 📰 Blog/Articles
- Cards with image, title, snippet, author, date, visits
- "Read More" modal/details (increments visit count)

### 🧐 FAQs & Forum
- Expandable Q&A, helpful votes

---

## 🛡️ Security & UX

- All sensitive keys in `.env`
- No default text/alerts; all feedback via Toast or SweetAlert
- JWT-protected API calls, localStorage/cookies for tokens
- Handles 401 (unauth) & 403 (forbidden) with custom messages/redirects
- Validates registration passwords (uppercase, lowercase, ≥6 chars)
- Responsive and accessible design

---

## 📝 Setup Instructions

1. **Clone Client and Server:**
   ```sh
   https://github.com/arjsabbir88/LifeSure.git
   ```
2. **Install Dependencies:**
   ```sh
   cd lifesure-client && npm install
   cd ../lifesure-server && npm install
   ```
3. **Configure `.env` Files:**
   - Add Firebase, MongoDB, and JWT secrets in both client and server `.env` files per sample `.env.example`.

4. **Run Development Servers:**
   ```sh
   cd lifesure-server
   npm run dev
   # in a new terminal
   cd ../lifesure-client
   npm run dev
   ```

---

## 🔗 Useful Libraries

- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Tanstack Query](https://tanstack.com/query/latest)
- [React Helmet Async](https://github.com/staylor/react-helmet-async)
- [React Hook Form](https://react-hook-form.com/)
- [Stripe React](https://stripe.com/docs/stripe-js/react)
- [jsPDF](https://github.com/parallax/jsPDF)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

---

## 📣 Credits

Built with ❤️ by the LifeSure Dev Team for [Assignment 12, Category 019].

---

> **Note:** For a full feature demonstration, admin credentials, and live site, refer to the top sections above. All code and commits follow best practices and security guidelines.
