# ONLINE LIBRARY — Full-Stack Web Application
ONLINE LIBRARY is a professional full-stack web application designed for digital library management. Built as a final project for the Web Technologies course, it transforms a modular authenticated API into a production-ready application. It features a modern dark-themed UI, secure authentication, and complex relational data structures.
## Key Features
### For Users:
 * **Authentication:** Secure Login and Registration flow using JSON Web Tokens (JWT).
 * **Library Browsing:** Explore a curated collection of books with real-time UI updates.
 * **Digital Reading:** Direct access to PDF versions of books.
 * **Detailed Insights:** Interactive modal windows to view book descriptions and author biographies (populated via MongoDB relations).
### For Administrators:
 * **Advanced RBAC:** Role-Based Access Control ensuring only admins can perform sensitive actions.
 * **Author Management:** Create and manage author profiles including biographies and bibliographies.
 * **Book Management:** Full CRUD capabilities to publish new books or remove existing ones from the database.
## Project Screenshots
### 1. Authentication Screen (Login / Register)
<img width="1470" height="880" alt="Снимок экрана 2026-02-08 в 17 01 34" src="https://github.com/user-attachments/assets/2092d8dd-8736-49e7-81e6-2a5a1490be1d" />

Description: Minimalist and responsive authentication interface with dynamic toggle between Login and Sign Up modes.

### 2. Main Library Dashboard
<img width="1470" height="880" alt="Снимок экрана 2026-02-08 в 17 02 17" src="https://github.com/user-attachments/assets/1018aed1-7118-4d3c-8aab-a91ab9586520" />

Description: The main user interface displaying book cards with genres, titles, and action buttons.

### 3. Administrator Control Panel
<img width="1470" height="881" alt="Снимок экрана 2026-02-08 в 17 03 15" src="https://github.com/user-attachments/assets/0b41885c-04a5-4c50-87e7-65454146a01d" />

Description: Secure dashboard available only to users with the 'admin' role to manage the library content.

### 4. Interactive Modals (Relational Data)
<img width="1470" height="878" alt="Снимок экрана 2026-02-08 в 17 03 56" src="https://github.com/user-attachments/assets/0e564ce5-a8f3-4443-be1c-fc924739d7ad" />


Description: Professional modal windows displaying detailed data fetched through Mongoose 'populate' (Relational Integrity).
## Technology Stack
* Backend: Node.js, Express.js
* Database: MongoDB Atlas (Mongoose ODM)
* Security: JSON Web Tokens (JWT) & BcryptJS (password hashing)
* Frontend: HTML5, CSS3 (Custom Dark Teal Theme), JavaScript (Vanilla ES6+)
* Deployment: Render (Backend), MongoDB Atlas (Cloud Database)

## Project Structure (MVC)
* ```/models``` — MongoDB schemas (User, Book, Author) ensuring relational integrity.
* ```/routes``` — RESTful API endpoints for authentication and business logic.
* ```/middleware``` — Custom middleware for JWT verification and Admin role validation.
* ```/public``` — Frontend assets including the single-page application logic and styles.
## Installation & Setup
Clone the repository:
```
git clone https://github.com/XelVarful/assignment4.A.Adilbek2WebTech.git
```
Install dependencies:
```
npm install
```
Configure Environment Variables (.env):
Create a .env file in the root directory and add:
```
Env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_random_secret_key
```
Run the application:
```
node server.js
```
Access the app:

Open ```http://localhost:3000 ``` in your browser.
## Mongo Atlas database tree
<img width="1470" height="878" alt="Снимок экрана 2026-02-08 в 17 08 07" src="https://github.com/user-attachments/assets/4f7f7210-4e5d-4908-84aa-e8682cac89fe" />


