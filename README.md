JobHub - Modern Job Search Platform 

A sleek, modern job search application built with React, TypeScript, and Tailwind CSS. Find your dream job with an intuitive interface and powerful search capabilities.


## ✨ Features

- **🔍 Smart Job Search** - Advanced filtering by location, job type, and skills
- **💼 Job Management** - Save jobs, track applications, and manage your pipeline
- **📅 Interview Scheduler** - Built-in calendar for managing interviews
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **🎨 Modern UI** - Clean, professional interface with smooth animations
- **⚡ Fast Performance** - Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: Redux Toolkit, Redux Persist
- **Routing**: React Router v6
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 8+ or yarn

### Installation

1. **Clone the repository**
   git clone https://github.com/muhammadanasafzaal/react-job-portal-demo.git

2. **Install dependencies**
   npm install
   or
   yarn install

3. **Start development server**
   npm run dev
   or
   yarn dev

4. **Open your browser**
   http://localhost:5173

> **Note**: This application currently uses mock data for demonstration purposes. In a production environment, you would integrate with a real job search API.

## 📁 Project Structure

src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── jobs/           # Job-specific components
├── pages/              # Page components
├── store/              # Redux store and slices
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── types/              # TypeScript type definitions
└── styles/             # Global styles and Tailwind config

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

VITE_APP_NAME=
VITE_API_URL=
VITE_ENABLE_ANALYTICS=

### Customization

- **Colors**: Update the color scheme in `tailwind.config.js`
- **Fonts**: Modify font settings in `src/index.css`
- **Components**: Customize shadcn/ui components in `src/components/ui/`

## 📱 Features Overview

### Job Search & Discovery
- Advanced search with multiple filters
- Featured job listings
- Company profiles and ratings
- Skill-based job matching

### Application Management
- Save jobs for later review
- Track application status
- Application history and analytics
- Interview scheduling

### User Profile
- Professional profile management
- Resume builder integration
- Skills and experience tracking
- Profile visibility settings

### Communication
- In-app messaging with recruiters
- Interview scheduling
- Notification system
- Email integration

## 🎨 Design System

This project uses a custom design system built on top of Tailwind CSS and shadcn/ui:

- **Primary Color**: `#0154aa`
- **Typography**: Neue Haas Grotesk Display Pro (with fallbacks)
- **Components**: Fully accessible, customizable UI components
- **Responsive**: Mobile-first design approach
