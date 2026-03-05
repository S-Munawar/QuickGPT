# 🚀 QuickGPT - AI-Powered Chat & Image Generation Platform

<div align="center">

<p>
    <a href="https://quick-gpt-1-six.vercel.app">
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


**A modern, full-stack AI chat application with text and image generation capabilities**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation)

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
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🌟 Overview

**QuickGPT** is a full-stack AI platform that combines text chat and image generation capabilities. It uses Google's Gemini model (via the OpenAI SDK) for text conversations and ImageKit's AI image generation for creating images. The platform includes a credit-based system with Stripe payment integration and a community feature to share AI-generated images.

---

## ✨ Features

### 🤖 AI Capabilities
- **Text Generation**: Powered by Google's Gemini 2.0 Flash model (via OpenAI-compatible SDK)
- **Image Generation**: AI-generated images using ImageKit's generative image API
- **Markdown Support**: Rich text formatting with syntax highlighting (Prism.js)
- **Real-time Responses**: Instant AI responses with loading indicators

### 💳 Payment & Credits
- **Stripe Integration**: Secure payment processing for credit purchases
- **Multiple Plans**: Basic ($10 / 100 credits), Pro ($20 / 500 credits), and Premium ($25 / 1000 credits)
- **Webhook Support**: Automated credit allocation after successful payment
- **Credit Costs**: Text generation costs 1 credit, image generation costs 2 credits
- **Free Starter Credits**: New users receive 20 credits on sign-up

### 🎨 User Experience
- **Dark/Light Mode**: Seamless theme switching with persistent preference
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Community Gallery**: Share and discover AI-generated images from other users
- **Chat Management**: Create, view, and delete multiple chat sessions
- **Google Sign-In**: One-click authentication with Google OAuth 2.0
- **User Authentication**: Secure JWT-based authentication (email/password or Google)
- **Toast Notifications**: Real-time feedback via React Hot Toast

### 🔒 Security & Performance
- **Secure Authentication**: BCrypt password hashing with JWT tokens + Google OAuth
- **Protected Routes**: Middleware-based route protection
- **Environment Variables**: Secure configuration management
- **CORS Configuration**: Properly configured cross-origin resource sharing

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3** — UI library
- **TypeScript** — Type-safe JavaScript
- **Vite 7** — Lightning-fast build tool
- **TailwindCSS 4** (with `@tailwindcss/vite` plugin) — Utility-first CSS framework
- **React Router 7** — Client-side routing
- **Axios** — HTTP client
- **React Hot Toast** — Toast notifications
- **React Markdown** — Markdown rendering
- **Prism.js** — Syntax highlighting
- **Moment.js** — Date formatting
- **@react-oauth/google** — Google Sign-In integration

### Backend
- **Node.js** — JavaScript runtime
- **Express 5** — Web framework
- **TypeScript** — Type safety
- **Mongoose 8** — MongoDB ODM
- **MongoDB** — NoSQL database

### APIs & Services
- **OpenAI SDK** — Used with Gemini 2.0 Flash model for text generation
- **ImageKit** — AI image generation (`ik-genimg`) + image hosting/CDN
- **Stripe** — Payment processing & webhooks
- **Google Auth Library** — Server-side Google OAuth token verification
- **JWT (jsonwebtoken)** — Authentication tokens
- **BCrypt** — Password hashing

### Development & Deployment
- **TSX** — TypeScript execution for dev server
- **ESLint** — Code linting
- **Nodemon** — Auto-restart server (available)
- **Vercel** — Deployment platform (server configured with `vercel.json`)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

You'll also need accounts for:
- [Google AI Studio](https://aistudio.google.com/) (for Gemini API key)
- [Google Cloud Console](https://console.cloud.google.com/) (for OAuth 2.0 Client ID)
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

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:{PORT}

---

## 🔐 Environment Variables

### Server (`server/.env`)

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# Gemini API (via OpenAI SDK)
GEMINI_API_KEY=your_gemini_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# ImageKit
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
```

### Client (`client/.env.local`)

```env
# API Configuration
VITE_SERVER_URL=http://localhost:3000

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 💻 Usage

### Creating an Account

1. Open the app — you'll see the login screen
2. **Option A**: Click **"Sign Up"**, enter your name, email, and password, then click **"Create Account"**
3. **Option B**: Click the **"Sign in with Google"** button to sign up instantly with your Google account
4. You'll receive **20 free credits** to start

### Starting a Chat

1. Click **"New Chat"** in the sidebar
2. Type your prompt in the chat box
3. Toggle between **Text** or **Image** mode
4. Press Enter or click the send button

### Purchasing Credits

1. Click on **"Credits"** in the sidebar
2. Choose a plan (Basic, Pro, or Premium)
3. Complete the Stripe checkout process
4. Credits are automatically added to your account via webhook

### Community Features

1. When generating images, check **"Upload to Community"**
2. Navigate to **"Community"** to view shared images
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

#### Get User Data
```http
GET /api/user/data
Authorization: <token>
```

#### Google Sign-In
```http
POST /api/user/google
Content-Type: application/json

{
  "credential": "google_id_token"
}
```
> Verifies the Google ID token, finds or creates the user, and returns a JWT.

#### Get Published Community Images
```http
GET /api/user/published-images
```

### Chat Endpoints

#### Create Chat
```http
GET /api/chat/create
Authorization: <token>
```

#### Get All User Chats
```http
GET /api/chat/gets
Authorization: <token>
```

#### Get Specific Chat
```http
GET /api/chat/get
Authorization: <token>
Content-Type: application/json

{
  "chatId": "chat_id"
}
```

#### Delete Chat
```http
DELETE /api/chat/delete
Authorization: <token>
Content-Type: application/json

{
  "chatId": "chat_id"
}
```

### Message Endpoints

#### Send Text Message
```http
POST /api/message/text
Authorization: <token>
Content-Type: application/json

{
  "prompt": "Your question here",
  "chatId": "chat_id"
}
```
> Costs **1 credit** per request.

#### Generate Image
```http
POST /api/message/image
Authorization: <token>
Content-Type: application/json

{
  "prompt": "Image description",
  "chatId": "chat_id",
  "isPublished": true
}
```
> Costs **2 credits** per request. Set `isPublished` to `true` to share in the community gallery.

### Credits Endpoints

#### Get Plans
```http
GET /api/credits/plans
```

#### Purchase Credits
```http
POST /api/credits/purchase
Authorization: <token>
Content-Type: application/json

{
  "planId": "pro"
}
```
> Returns a Stripe checkout session URL.

### Webhook Endpoint

#### Stripe Webhook
```http
POST /api/stripe/webhook
Content-Type: application/json
Stripe-Signature: <signature>
```
> Handles `payment_intent.succeeded` events to allocate purchased credits.

---

## 📁 Project Structure

```
QuickGPT/
├── client/                        # Frontend React application
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/               # Images, icons, SVGs, CSS
│   │   │   ├── assets.ts         # Asset exports
│   │   │   ├── prism.css         # Syntax highlighting theme
│   │   │   ├── *.svg             # UI icons
│   │   │   └── *.jpg             # AI sample images
│   │   ├── components/
│   │   │   ├── ChatBox.tsx       # Main chat interface
│   │   │   ├── Message.tsx       # Individual message component
│   │   │   └── Sidebar.tsx       # Navigation sidebar
│   │   ├── context/
│   │   │   └── AppContext.tsx     # Global app state & API calls
│   │   ├── pages/
│   │   │   ├── Login.tsx         # Login/Register page (with Google Sign-In)
│   │   │   ├── Credits.tsx       # Credit purchase page
│   │   │   ├── Community.tsx     # Community gallery page
│   │   │   └── Loading.tsx       # Loading screen
│   │   ├── types/
│   │   │   └── index.d.ts        # TypeScript type definitions
│   │   ├── App.tsx               # Main app with routing
│   │   ├── main.tsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── eslint.config.js
│   └── package.json
│
├── server/                        # Backend Node.js application
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts             # MongoDB connection
│   │   │   ├── imagekit.ts       # ImageKit client setup
│   │   │   └── openai.ts         # OpenAI SDK client setup
│   │   ├── controllers/
│   │   │   ├── userController.ts         # Auth: register, login, profile
│   │   │   ├── googleAuthController.ts   # Google OAuth authentication
│   │   │   ├── chatController.ts         # CRUD operations for chats
│   │   │   ├── messageController.ts      # Text & image message handling
│   │   │   ├── creditsController.ts      # Plans & Stripe checkout
│   │   │   └── webhooks.ts           # Stripe webhook handler
│   │   ├── middleware/
│   │   │   └── auth.ts           # JWT verification middleware
│   │   ├── models/
│   │   │   ├── userModel.ts      # User schema (name, email, password, googleId, credits)
│   │   │   ├── chatModel.ts      # Chat schema (with embedded messages)
│   │   │   └── transactionModel.ts   # Payment transaction schema
│   │   ├── routes/
│   │   │   ├── userRoutes.ts
│   │   │   ├── chatRoutes.ts
│   │   │   ├── messageRoutes.ts
│   │   │   └── creditsRoutes.ts
│   │   ├── types/
│   │   │   └── global.d.ts       # Global type declarations
│   │   └── server.ts             # Express server entry point
│   ├── vercel.json               # Vercel deployment config
│   ├── tsconfig.json
│   └── package.json
│
├── .gitignore
└── ReadMe.md
```

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

---

## 🐛 Known Issues

- Stripe webhooks require ngrok or Stripe CLI for local testing
- Image generation consumes 2 credits per request
- Text generation consumes 1 credit per request
- Image prompts are limited to 1000 characters

---

## 🔮 Future Enhancements

- [ ] Real-time chat with WebSockets
- [ ] Voice input/output support
- [ ] Multiple AI model selection
- [ ] Chat export functionality
- [ ] Advanced image editing features
- [ ] User profile customization
- [ ] Social features (likes, comments on community images)
- [ ] Mobile app (React Native)

---

## 📞 Contact

**Shaik Abdul Munawar**

- 💼 LinkedIn: [www.linkedin.com/in/shaik-abdul-munawar-b35821284](https://www.linkedin.com/in/shaik-abdul-munawar-b35821284)
- 🐱 GitHub: [@S-Munawar](https://github.com/S-Munawar)
- 📧 Email: shaikmunawar907@gmail.com

---

## 🙏 Acknowledgments

- [Google Gemini](https://deepmind.google/technologies/gemini/) — For the Gemini 2.0 Flash AI model
- [ImageKit](https://imagekit.io/) — For AI image generation and CDN hosting
- [Stripe](https://stripe.com/) — For payment processing
- [MongoDB](https://www.mongodb.com/) — For database solutions
- [React](https://reactjs.org/) — For the UI library
- [TailwindCSS](https://tailwindcss.com/) — For utility-first styling

---

<div align="center">

**Made with ❤️ by Shaik Abdul Munawar**

⭐ Star this repository if you found it helpful!

</div>
