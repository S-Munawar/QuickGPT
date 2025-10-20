# 🚀 QuickGPT - AI-Powered Chat & Image Generation Platform

<div align="center">

<div align="center">

<p>
    <a href="https://quick-gpt-1-six.vercel.app/">
        <img alt="QuickGPT" title="Visit QuickGPT" src="https://img.shields.io/badge/-QuickGPT-6C63FF?style=for-the-badge&logo=openai&logoColor=white"/>
    </a>
    <a href="https://www.typescriptlang.org/">
        <img alt="TypeScript" title="TypeScript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
    </a>
    <a href="https://reactjs.org/">
        <img alt="React" title="React" src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
    </a>
    <a href="https://nodejs.org/">
        <img alt="Node.js" title="Node.js" src="https://img.shields.io/badge/-Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
    </a>
    <a href="https://www.mongodb.com/">
        <img alt="MongoDB" title="MongoDB" src="https://img.shields.io/badge/-MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
    </a>
</p>

</div>


**A modern, full-stack AI chat application with text and image generation capabilities**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

**QuickGPT** is a cutting-edge AI platform that combines the power of OpenAI's GPT models with image generation capabilities. Built with modern web technologies, it offers a seamless chat experience with support for both text conversations and AI-generated images. The platform includes a credit-based system with Stripe payment integration and a community feature to share AI-generated content.

---

## ✨ Features

### 🤖 AI Capabilities
- **Text Generation**: Powered by OpenAI's GPT models for intelligent conversations
- **Image Generation**: Create stunning AI-generated images using DALL-E
- **Markdown Support**: Rich text formatting with syntax highlighting (Prism.js)
- **Real-time Responses**: Instant AI responses with loading indicators

### 💳 Payment & Credits
- **Stripe Integration**: Secure payment processing for credit purchases
- **Multiple Plans**: Basic, Pro, and Premium credit packages
- **Webhook Support**: Automated credit allocation after payment
- **Transaction History**: Track all purchases and credit usage

### 🎨 User Experience
- **Dark/Light Mode**: Seamless theme switching
- **Responsive Design**: Works flawlessly on desktop, tablet, and mobile
- **Community Gallery**: Share and discover AI-generated images
- **Chat Management**: Create, view, and manage multiple chat sessions
- **User Authentication**: Secure JWT-based authentication system

### 🔒 Security & Performance
- **Secure Authentication**: BCrypt password hashing
- **Protected Routes**: Middleware-based route protection
- **Environment Variables**: Secure configuration management
- **Error Handling**: Comprehensive error handling with toast notifications

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **TailwindCSS 4.1** - Utility-first CSS framework
- **React Router 7.9** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **React Markdown** - Markdown rendering
- **Prism.js** - Syntax highlighting
- **Moment.js** - Date formatting

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1** - Web framework
- **TypeScript** - Type safety
- **MongoDB 8.19** - NoSQL database
- **Mongoose** - MongoDB ODM

### APIs & Services
- **OpenAI API** - GPT & DALL-E integration
- **Stripe 19.1** - Payment processing
- **ImageKit** - Image hosting and CDN
- **JWT** - Authentication tokens

### Development Tools
- **TSX** - TypeScript execution
- **ESLint** - Code linting
- **Nodemon** - Auto-restart server
- **Stripe CLI** - Webhook testing

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

You'll also need accounts for:
- [OpenAI API](https://platform.openai.com/)
- [Stripe](https://stripe.com/)
- [ImageKit](https://imagekit.io/)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/S-Munawar/QuickGPT.git
cd QuickGPT
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

### 4. Set Up Environment Variables

Create `.env` files in both `server` and `client` directories (see [Environment Variables](#-environment-variables) section).

### 5. Start the Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

---

## 🔐 Environment Variables

### Server (.env)

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### Client (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:3000
```

---

## 💻 Usage

### Creating an Account

1. Navigate to the login page
2. Click "Sign Up"
3. Enter your name, email, and password
4. Click "Create Account"

### Starting a Chat

1. Click "New Chat" in the sidebar
2. Select "Text" or "Image" mode
3. Type your prompt
4. Press Enter or click the send button

### Purchasing Credits

1. Click on "Credits" in the sidebar
2. Choose a plan (Basic, Pro, or Premium)
3. Complete the Stripe checkout process
4. Credits will be automatically added to your account

### Community Features

1. When generating images, check "Upload to Community"
2. Navigate to "Community" to view shared images
3. Browse AI-generated content from other users

---

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login User
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Get User Profile
```http
GET /api/user/profile
Authorization: Bearer <token>
```

### Chat Endpoints

#### Create Chat
```http
POST /api/chat/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Chat"
}
```

#### Get User Chats
```http
GET /api/chat
Authorization: Bearer <token>
```

### Message Endpoints

#### Send Text Message
```http
POST /api/message/text
Authorization: Bearer <token>
Content-Type: application/json

{
  "prompt": "Your question here",
  "chatId": "chat_id",
  "isPublished": false
}
```

#### Generate Image
```http
POST /api/message/image
Authorization: Bearer <token>
Content-Type: application/json

{
  "prompt": "Image description",
  "chatId": "chat_id",
  "isPublished": true
}
```

### Credits Endpoints

#### Get Plans
```http
GET /api/credits/plans
```

#### Purchase Credits
```http
POST /api/credits/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "planId": "pro"
}
```

### Webhook Endpoints

#### Stripe Webhook
```http
POST /api/stripe/webhook
Content-Type: application/json
Stripe-Signature: <signature>
```

---

## 📁 Project Structure

```
QuickGPT/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/          # Images, icons, CSS
│   │   ├── components/      # React components
│   │   │   ├── ChatBox.tsx
│   │   │   ├── Message.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── context/         # React context
│   │   │   └── AppContext.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── Login.tsx
│   │   │   ├── Credits.tsx
│   │   │   ├── Community.tsx
│   │   │   └── Loading.tsx
│   │   ├── types/           # TypeScript types
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   └── vite.config.ts
│
├── server/                    # Backend Node.js application
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   │   └── db.ts        # MongoDB connection
│   │   ├── controllers/     # Route controllers
│   │   │   ├── creditsController.ts
│   │   │   ├── webhooks.ts
│   │   │   └── testWebhookController.ts
│   │   ├── middleware/      # Express middleware
│   │   │   └── auth.ts      # JWT verification
│   │   ├── models/          # Mongoose models
│   │   │   ├── userModel.ts
│   │   │   ├── chatModel.ts
│   │   │   ├── messageModel.ts
│   │   │   └── transactionModel.ts
│   │   ├── routes/          # API routes
│   │   │   ├── userRoutes.ts
│   │   │   ├── chatRoutes.ts
│   │   │   ├── messageRoutes.ts
│   │   │   └── creditsRoutes.ts
│   │   └── server.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## 🖼️ Screenshots

### Chat Interface
![Chat Interface](https://via.placeholder.com/800x400?text=Chat+Interface+Screenshot)

### Image Generation
![Image Generation](https://via.placeholder.com/800x400?text=Image+Generation+Screenshot)

### Credit Purchase
![Credit Purchase](https://via.placeholder.com/800x400?text=Credit+Purchase+Screenshot)

### Community Gallery
![Community Gallery](https://via.placeholder.com/800x400?text=Community+Gallery+Screenshot)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style Guidelines

- Use TypeScript for type safety
- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly

---

## 🐛 Known Issues

- Stripe webhooks require ngrok or Stripe CLI for local testing
- Image generation consumes 2 credits per request
- Text generation consumes 1 credit per request

---

## 🔮 Future Enhancements

- [ ] Real-time chat with WebSockets
- [ ] Voice input/output support
- [ ] Multiple AI model selection
- [ ] Chat export functionality
- [ ] Advanced image editing features
- [ ] User profile customization
- [ ] Social features (likes, comments)
- [ ] Mobile app (React Native)

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 📞 Contact

**Shaik Abdul Munawar**

- 💼 LinkedIn: [www.linkedin.com/in/shaik-abdul-munawar-b35821284](https://www.linkedin.com/in/shaik-abdul-munawar-b35821284)
- 🐱 GitHub: [@S-Munawar](https://github.com/S-Munawar)
- 📧 Email: [Your Email] (optional)

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) - For GPT and DALL-E APIs
- [Stripe](https://stripe.com/) - For payment processing
- [MongoDB](https://www.mongodb.com/) - For database solutions
- [React](https://reactjs.org/) - For the amazing UI library
- [TailwindCSS](https://tailwindcss.com/) - For beautiful styling

---

<div align="center">

**Made with ❤️ by Shaik Abdul Munawar**

⭐ Star this repository if you found it helpful!

</div>
