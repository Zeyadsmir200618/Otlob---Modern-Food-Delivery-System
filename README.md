# Otlob---Modern-Food-Delivery-System

Otlob is a full-stack food delivery application modeled after industry leaders like Talabat and Uber Eats. It features a decoupled MVC architecture, a secure PHP/MySQL backend, and a highly interactive React frontend with advanced CSS animations.

🚀 Key Features
Dual Dashboard System: Dedicated interfaces for Customers (ordering, history, profile) and Admins (order management, user control, messaging).

Complete Order Flow: Real-time cart management, checkout with multiple payment/fulfillment strategies (Delivery vs. Pickup), and order tracking.

User Account Management: Secure registration and login, including a "Strategy Pattern" validation engine and profile editing.

Professional UI/UX: Built with Glassmorphism, staggered entrance animations, and responsive design using React Icons.

Contact & Support: Integrated messaging system allowing customers to reach out and admins to manage inquiries.

🛠️ Software Engineering & Design Patterns
This project was built to demonstrate 100% compliance with professional software engineering standards:

MVC (Model-View-Controller): Total separation of concerns between PHP Models (User.php, Order.php), backend logic controllers, and React Views.

SOLID Principles: * Single Responsibility: Each class/component handles one specific task.

Dependency Inversion: Models utilize constructor injection for database connections.

Design Patterns:

Singleton: Centralized database connection instance in database.php.

Strategy Pattern: Used for interchangeable form validation logic in ValidationStrategy.js.

Observer Pattern: Implemented via React useEffect hooks to sync UI state with backend data.

🏗️ Technical Stack
Frontend: React.js, React Router, React Icons, CSS-in-JS (Animations).

Backend: PHP (OOP), PDO (Secure Prepared Statements).

Database: MySQL (Relational schema with Foreign Keys).

Tools: VS Code, XAMPP/WAMP, Axios/Fetch API.

📂 Folder Structure
Plaintext
food-delivery-system/
├── backend/
│   ├── config/          # Database Singleton connection
│   ├── models/          # PHP Classes (User, Order, Menu, Message)
│   └── controllers/     # API Endpoints (login, place_order, etc.)
├── frontend/
│   ├── src/
│   │   ├── pages/       # React UI Components (KFC, Cart, Profile)
│   │   ├── utils/       # Strategy Pattern utilities
│   │   └── App.jsx      # Main Router & Authentication logic
└── README.md
⚙️ Setup Instructions
1. Database Setup
Open phpMyAdmin.

Create a database named food_delivery_system.

Import the provided .sql file to generate the tables (users, orders, menu_items, contact_messages).

2. Backend Setup
Place the backend folder in your local server directory (e.g., C:/xampp/htdocs/food-delivery-system/).

Ensure backend/config/database.php has your correct database credentials.

3. Frontend Setup
Navigate to the frontend folder in your terminal.

Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
👥 Contributors
Zeyad Mohamed - Team Lead & Full-Stack Developer

Mariam Mohamed - UI/UX Engineer

Myriam Hamam - Backend & Database Engineer

Mariam Mostafa - QA & Documentation
