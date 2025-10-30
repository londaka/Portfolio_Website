# 🌐 Personal Portfolio Website

Welcome to my **personal portfolio website** — a modern,
fully responsive web application designed and developed to
showcase my projects, technical skills, and professional journey as a
**Full Stack Developer**.

---
## 🚀 Features

- 🎨 **Interactive UI** built with React and modern CSS
- 🔐 **User Authentication** (Signup + Login + Email Verification)
- 📄 **Downloadable CV / Resume**
- 💬 **Contact Form** connected to backend API
- 📱 **Fully Responsive** for all devices
- 🧠 **Dynamic Project Showcase** with GitHub links

---

## 🧰 Tech Stack

### **Frontend**
- React (Hooks + Context API)
- JavaScript (ES6+)
- Tailwind CSS / Framer Motion
- Axios for API calls

### **Backend**
- Node.js + Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication
- Nodemailer (for email verification)

---

## ⚙️ Installation and Setup

Follow these steps to run this project locally 👇

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/portfolio.git

# 2️⃣ Move into the project directory
cd portfolio
# 3️⃣ Install dependencies for both frontend and backend
cd backend && npm install
cd ../frontend && npm install

# 4️⃣ Create environment files
# backend/.env
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

# 5️⃣ Run both servers
# In two separate terminals:
cd backend && npm start
cd frontend && npm run dev
