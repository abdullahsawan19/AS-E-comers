
# 🛒 AS E-Commerce

**AS E-Commerce** is a modern, fully responsive Single Page Application (SPA) built with **React** and **Material UI**. It features a dynamic product catalog, a comprehensive shopping cart system synced with Firestore, user authentication, and a dedicated admin dashboard.

The application leverages **Context API** for global state management and **Firebase** for backend services (Authentication & Database).

## 🚀 Live Demo

[Insert Link to Live Demo Here] 
## ✨ Features

### 👤 User Experience
* **Authentication:** Secure Sign-up, Login, and Logout functionality using **Firebase Auth**.
* **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop using **Material UI**.
* **Dark/Light Mode:** Theme persistence using LocalStorage.
* **Product Browsing:** * Fetch products from external API (DummyJSON).
    * Filter products by categories (Mobile, Laptop, Furniture, Fashion, etc.).
    * Real-time Search functionality.
* **Product Details:** * Image slider/carousel for product viewing.
    * Detailed description, price, rating, and reviews.
* **Shopping Cart:** * Add/Remove items.
    * Increase/Decrease quantities.
    * **Real-time Sync:** Cart data is saved to **Firebase Firestore**, so users don't lose their cart when switching devices.

### 🛡️ Admin Dashboard
* **User Management:** View all registered users.
* **Order Monitoring:** Admin can view the current cart/orders of each user.

### ⚙️ Technical Highlights
* **State Management:** Utilizes React Context API (`CartContext`, `AuthContext`, `SearchContext`, `DarkModeContext`) to avoid prop-drilling.
* **Routing:** Client-side routing with `react-router-dom`.
* **Toast Notifications:** Interactive feedback using MUI Snackbars (e.g., "Product added successfully").

## 🛠️ Tech Stack

**Frontend:**
* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React.js**
* ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white) **Material UI**
* ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) **Vite**
* **Axios** (API Requests)
* **Framer Motion** (Animations)

**Backend / BaaS:**
* ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase) **Firebase Authentication & Firestore**

## 💻 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/abdullahsawan19/AS-E-comers.git](https://github.com/abdullahsawan19/AS-E-comers.git)
    cd AS-E-comers
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Firebase Configuration:**
    * Create a `firebase.js` file in your `src` folder.
    * Add your Firebase configuration keys:
    ```javascript
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```

4.  **Run the Project:**
    ```bash
    npm run dev
    ```

## 👨‍💻 Author

**Abdullah Sawan**
* **Role:** MERN Stack Developer
* **GitHub:** [@abdullahsawan19](https://github.com/abdullahsawan19)
* **LinkedIn:** [Abdullah Sawan](https://www.linkedin.com/in/abdullah-sawan-064ba127a/)

---
*This project was built for educational purposes to demonstrate proficiency in React and Firebase integration.*
