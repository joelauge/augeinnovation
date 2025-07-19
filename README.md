# 🚀 Auge Innovation - Advanced Firearms Training Client Portal

A cutting-edge React application showcasing next-generation AI-powered firearms training technology with immersive video backgrounds, professional authentication, and a sophisticated user interface.

## 🎯 **Project Overview**

Auge Innovation's client portal demonstrates advanced robotic systems designed for law enforcement and military training. The application features dynamic video backgrounds, secure authentication, and a professional design that reflects the high-tech nature of the technology.

## ✨ **Key Features**

### 🎬 **Immersive Video Experience**
- **Dynamic Video Backgrounds**: 5 slides with high-quality WebM video backgrounds
- **Aerial Footage**: Showcases scale and scope of operations
- **Robot Interior**: Demonstrates technical sophistication
- **Training Scenarios**: Realistic combat simulation environments
- **Smooth Transitions**: Professional slide transitions with video sync

### 🔐 **Professional Authentication**
- **Clerk Integration**: Secure, modern authentication system
- **Custom Sign-In/Sign-Up Pages**: Branded authentication experience
- **Large Logo Display**: Prominent company branding
- **Responsive Design**: Works perfectly on all devices
- **Error Handling**: Graceful fallback for logo loading issues

### 🎨 **Sophisticated Design**
- **Monochromatic Product Cards**: Clean, professional appearance
- **Cyberpunk Theme**: Futuristic design language
- **Animated Text**: Interactive character animations
- **Futuristic Buttons**: Glowing button effects
- **Responsive Layout**: Perfect display across all screen sizes

### 🛡️ **Advanced Features**
- **Product Catalog**: Detailed product information and pricing
- **Invoice System**: Integrated invoice request functionality
- **Mock Mode**: Development-friendly authentication simulation
- **Loading States**: Professional loading animations
- **Error Handling**: Comprehensive error management

## 🚀 **Live Demo**

Visit the application: [Auge Innovation Client Portal](https://augeinnovation.netlify.app)

## 🛠️ **Technology Stack**

- **Frontend**: React 18 with functional components and hooks
- **Routing**: React Router v6 for navigation
- **Authentication**: Clerk.dev for secure user management
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Animations**: Framer Motion for smooth interactions
- **Video**: HTML5 video with WebM format for optimal performance
- **Deployment**: Netlify for hosting and serverless functions

## 📦 **Installation & Setup**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### **Local Development**

1. **Clone the repository**
   ```bash
   git clone https://github.com/joelauge/augeinnovation.git
   cd augeinnovation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env.local
   ```
   
   Add your Clerk publishable key to `.env.local`:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3003
   ```

## 🎬 **Video Assets**

The application uses high-quality WebM video backgrounds:

- **aerial.webm**: Aerial footage for scale and scope
- **robotinside.webm**: Robot interior technical details
- **robot1.webm**: Robot capabilities demonstration
- **training.webm**: Training environment simulation

## 🔧 **Project Structure**

```
src/
├── components/
│   ├── LandingPage.js          # Main landing page with video backgrounds
│   ├── Dashboard.js            # Product catalog and dashboard
│   ├── ProductPage.js          # Individual product details
│   ├── SignInPage.js           # Custom sign-in page
│   ├── SignUpPage.js           # Custom sign-up page
│   ├── InvoiceRequestModal.js  # Invoice request functionality
│   └── LoadingSpinner.js       # Loading animations
├── hooks/
│   └── useAuth.js              # Authentication hook
├── App.js                      # Main application component
├── App.css                     # Custom styles and animations
└── index.js                    # Application entry point
```

## 🎨 **Design System**

### **Color Palette**
- **Carbon**: Dark background (#0a0a0a)
- **Cyber Blue**: Primary accent (#00d4ff)
- **Cyber Purple**: Secondary accent (#8b5cf6)
- **Titanium**: Text color (#9ca3af)
- **White**: Primary text (#ffffff)

### **Typography**
- **Cyber Font**: Futuristic display font
- **Tech Font**: Monospace for technical elements
- **Responsive Sizing**: Scales appropriately across devices

### **Animations**
- **Character Hover**: Interactive text animations
- **Slide Transitions**: Smooth video background transitions
- **Button Effects**: Glowing hover states
- **Loading States**: Professional loading animations

## 🔐 **Authentication**

The application uses Clerk.dev for secure authentication:

- **Sign-In**: Custom branded sign-in page
- **Sign-Up**: Custom branded sign-up page
- **Session Management**: Automatic session handling
- **Protected Routes**: Dashboard and product pages require authentication
- **Mock Mode**: Development-friendly authentication simulation

## 📱 **Responsive Design**

- **Desktop**: Full-featured experience with video backgrounds
- **Tablet**: Optimized layout for touch interaction
- **Mobile**: Touch-friendly interface with responsive video scaling
- **Cross-Browser**: Compatible with all modern browsers

## 🚀 **Deployment**

### **Netlify Deployment**
The application is configured for Netlify deployment with:

- **Build Command**: `npm run build`
- **Publish Directory**: `build`
- **Environment Variables**: Configured for Clerk integration
- **Serverless Functions**: Invoice request functionality

### **Environment Variables**
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is proprietary software developed for Auge Innovation.

## 📞 **Contact**

For questions or support, contact the development team.

---

**Status**: ✅ **PRODUCTION READY**
**Last Updated**: December 2024 