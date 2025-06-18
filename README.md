# 🛒 Exclusive - E-Commerce Web App

Exclusive is a modern, full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It features user authentication, product listings, cart management, and secure order handling with JWT-based sessions and Stripe for payments.

## 📁 Folder Structure

```

project-root/
│
├── client/        # React frontend
│   └── ...
│
├── server/        # Node.js + Express backend
│   ├── Configs/
│   ├── Controllers/
│   ├── Middlewares/
│   ├── Models/
│   ├── Routes/
│   ├── .env
│   └── server.js
│
└── README.md

```

---

## 🚀 Live URLs

- **Frontend**: [https://ecom-exclusive.vercel.app](https://ecom-exclusive.vercel.app/)
- **Backend (API)**: [https://ecom-exclusive-server.vercel.app/](https://ecom-exclusive-server.vercel.app/)

---

## 🛠️ Technologies Used

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- Stripe for payments

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- cookie-parser
- dotenv

---

## 🔐 Features

- User registration and login
- JWT-based authentication with HTTP-only cookies
- Protected routes for authenticated users
- Product catalog with search and filter
- Shopping cart with quantity management
- Stripe integration for payments
- Order history
- Admin access (optional)

---

## 🧪 Local Development

### Prerequisites

- Node.js (v16+)
- MongoDB
- Vercel CLI (for deployment, optional)

### Environment Variables

#### `server/.env`
```

PORT=3000
MONGO\_URI=your\_mongodb\_connection\_string
JWT\_SECRET=your\_jwt\_secret
FRONTEND\_URI=[http://localhost:5173](http://localhost:5173)
NODE\_ENV=development

```

#### `client/.env`
```

VITE\_API\_BASE=[http://localhost:3000/api](http://localhost:3000/api)
VITE\_STRIPE\_PUBLISHABLE\_KEY=your\_stripe\_key

````

---

## 🔧 Installation

### Backend

```bash
cd server
npm install
npm run dev  # or node server.js
````

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🧾 API Endpoints

| Route          | Method | Description             |
| -------------- | ------ | ----------------------- |
| `/api/auth`    | POST   | User registration/login |
| `/api/user`    | GET    | User profile/info       |
| `/api/product` | GET    | List all products       |
| `/api/cart`    | CRUD   | Manage cart items       |
| `/api/order`   | POST   | Create/view orders      |
| `/api/upload`  | POST   | Upload product image    |

---

## 📦 Deployment

### Frontend (Vercel)

```bash
cd client
vercel --prod
```

### Backend (Vercel)

Ensure you have a `vercel.json` inside the `server/` folder:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

Then:

```bash
cd server
vercel --prod
```

---

## 🤝 Contribution

Feel free to fork this project and create pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Burhan Ahmad** – [Portfolio](https://burhanahmad.netlify.app) | [Fiverr](https://www.fiverr.com/s/vv2xX5e)

---

```

Let me know if you would like to customize it further — e.g., add screenshots, deployment steps for other platforms, or tech badges.
```
