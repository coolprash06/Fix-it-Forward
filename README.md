DebugMart: Reconstructed 🚀
A Production-Ready Full-Stack E-commerce Evolution

📖 Project Overview
DebugMart is a comprehensive reconstruction of the "Fix-It Forward" prototype. I transformed an unstable, front-end-only demo into a secure, scalable, and high-performance retail application. This project demonstrates advanced capabilities in handling full-stack integration, cloud database architecture, and premium UI/UX design under rapid development constraints.

📺 Demo Video
Watch the Before & After Technical Walkthrough here: https://drive.google.com/file/d/1IdRXLoDwj3dvH5GYSLBLgFC770UFdYVx/view?usp=sharing

🔗 Live Production Environment
Deployment URL: https://fix-it-forward-beta.vercel.app/

🛠️ Technical Masterpiece (100% Extension Coverage)
I successfully implemented every optional extension to mirror modern industry standards:

🔐 1. Advanced Identity & Security Layer
JWT-Based Authentication: Integrated Supabase Auth for secure, token-based user registration and login.

Session Management: Developed a persistent session restoration engine that syncs with localStorage to ensure zero-friction user return visits.

Server-Side Security (RLS): Configured PostgreSQL Row Level Security policies. This ensures data isolation—users can strictly only view orders associated with their unique auth.uid().

📊 2. Cloud-Native Backend Architecture
Relational Schema Design: Designed an orders table using PostgreSQL to store complex data types, including JSONB arrays for itemized receipts.

Asynchronous Fetching Engine: Developed a custom data-access layer that retrieves order history with real-time feedback.

Premium UX States: Implemented Shimmer Skeleton Loading and smooth CSS transitions to eliminate "layout shift" while fetching cloud data.

📈 3. Real-Time Business Intelligence
Analytics Event Service: Built a custom event tracker that captures user behavior (conversion attempts, successful checkouts, and promo code usage).

Cloud Logging: These events are synchronized directly to a dedicated Supabase analytics_events table, providing a ready-to-use dataset for business analysis.

🎨 4. Premium UI/UX Engineering
Theme Context Engine: Developed a centralized theme manager that handles prefers-color-scheme and user-saved preferences.

High-Fidelity Aesthetics: Utilized Glassmorphism (backdrop-filters) and high-z-index sticky navigation to create a modern, high-end retail feel.

Micro-interactions: Staggered card animations (Entrance API) and badge pulsing for tactile user feedback.

💰 5. Complex Business Logic
Dynamic Inventory Engine: Created a state-managed stockMap that updates in real-time. The UI reacts instantly to stock depletion, disabling purchase buttons to prevent "overselling."

Promo & Tax Engine: A sophisticated calculation layer that handles 8.5% sales tax and real-time discount applications (Code: FIXIT2026).

🏗️ The Engineering Stack
Frontend Architecture: Vanilla JavaScript (Modular Service-Oriented Pattern), CSS3 Grid/Flexbox, HTML5.

Backend Infrastructure: Supabase (Auth, PostgreSQL, Real-time Engine).

CI/CD & Hosting: Vercel (Automated Build & Deployment Pipelines).

Version Control: Git/GitHub (Atomic Commit Strategy).

🚀 Setup & Local Development
Clone the repository: git clone https://github.com/coolprash06/DebugMart.git

Since this is a vanilla JS project, no npm install is required.

Open index.html via a local server (like VS Code Live Server) to prevent CORS issues with Supabase API calls.

Ensure your environment variables for Supabase are correctly mapped in app.js.

🏁 Final Submission Note
This project represents a full lifecycle development: from auditing a broken codebase to deploying a resilient, cloud-integrated storefront. Every bug was treated as a learning opportunity to build a more robust system.
