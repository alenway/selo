# Selo - Notes App 📝

A modern, full-stack notes application built with React, TypeScript, and NestJS. Organize your thoughts with tags, archive important notes, and keep your workspace clean.

**Live Demo:** (https://selo-khaki.vercel.app/)

![Selo Notes App](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![NestJS](https://img.shields.io/badge/NestJS-Backend-red)

## ✨ Features

-   📝 **Create & Edit Notes** - Rich text notes with markdown support
-   🏷️ **Tag System** - Organize notes with custom tags
-   📁 **Categorization** - Archive, trash, and pin important notes
-   🔍 **Quick Search** - Find notes instantly
-   📱 **Responsive Design** - Works on all devices
-   🚀 **Fast Performance** - Built with Vite and modern React
-   💾 **Persistent Storage** - MongoDB database with NestJS backend

## 🛠️ Tech Stack

### Frontend

-   **React 19** with TypeScript
-   **Vite** for fast development and building
-   **Tailwind CSS** for styling
-   **React Router** for navigation
-   **Axios** for API communication

### Backend

-   **NestJS** framework
-   **MongoDB** database
-   **Mongoose** ODM
-   **CORS** enabled for cross-origin requests

## 🚀 Quick Start

### Prerequisites

-   Node.js (v18 or higher)
-   npm, yarn, or pnpm
-   MongoDB database

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/alenway/selo.git
cd selo/client

# Install dependencies
pnpm install  # or npm install / yarn install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Backend Setup

cd ../server

# Install dependencies

pnpm install

# Start development server

pnpm start:dev

# Build for production

pnpm build

### Project Structure

alenway-selo/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Route pages
│ │ ├── hooks/ # Custom React hooks
│ │ ├── services/ # API services
│ │ └── types/ # TypeScript definitions
│ └── vite.config.ts # Vite configuration
└── server/ # NestJS backend
├── src/
│ ├── notes/ # Notes module
│ │ ├── dto/ # Data transfer objects
│ │ └── \*.ts # Controller, service, schema
│ └── main.ts # Application entry point
└── package.json

👨‍💻 Author
Alenway

GitHub: @alenway

Project: Selo Notes App
