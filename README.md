# AI Innovation - Firearms Training Robots Client Portal

A stunning, sci-fi themed client portal for AI Innovation's firearms training robots business. Built with React, Clerk.dev authentication, and Stripe checkout integration.

## 🚀 Features

- **Stunning Sci-Fi Design**: Cyberpunk-inspired UI with neon effects and animations
- **Clerk.dev Authentication**: Secure user registration and login
- **Stripe Checkout**: Integrated payment processing for all products
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Product Catalog**: Detailed product pages with specifications and reviews
- **GitHub Pages Ready**: Easy deployment to GitHub Pages

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router, Framer Motion
- **Styling**: Tailwind CSS with custom cyber theme
- **Authentication**: Clerk.dev
- **Payments**: Stripe
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ainnovation-client-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Clerk.dev Setup

1. Create an account at [clerk.dev](https://clerk.dev)
2. Create a new application
3. Copy your publishable key to the `.env` file
4. Configure your authentication settings in the Clerk dashboard

### Stripe Setup

1. Create an account at [stripe.com](https://stripe.com)
2. Get your publishable key from the Stripe dashboard
3. Add it to the `.env` file
4. Set up your products in Stripe (optional - the app includes demo products)

### GitHub Pages Deployment

1. **Update the homepage URL** in `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/ainnovation-client-portal"
   }
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages** in your repository settings to use the `gh-pages` branch

## 🎨 Customization

### Colors and Theme

The app uses a custom cyber theme defined in `tailwind.config.js`. You can modify:

- **Colors**: Update the `colors` section with your brand colors
- **Fonts**: Change the `fontFamily` settings
- **Animations**: Customize the `animation` and `keyframes` sections

### Products

Update the products in `src/components/Dashboard.js` and `src/components/ProductPage.js`:

```javascript
const products = [
  {
    id: 'your-product-id',
    title: 'Your Product Name',
    price: 1000,
    period: 'per day',
    description: 'Product description',
    // ... other properties
  }
];
```

### Styling

The app includes custom CSS classes in `src/index.css`:

- `.cyber-button`: Styled buttons with hover effects
- `.cyber-card`: Card components with glass morphism
- `.cyber-input`: Form inputs with cyber styling
- `.neon-text`: Gradient text effects

## 📱 Pages and Routes

- `/` - Landing page with authentication
- `/dashboard` - Authenticated user dashboard with products
- `/product/:id` - Individual product pages with checkout

## 🔒 Security

- All authentication is handled by Clerk.dev
- Stripe handles all payment processing securely
- No sensitive data is stored in the frontend

## 🚀 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Run `npm run deploy`
3. Configure GitHub Pages to use the `gh-pages` branch

### Other Platforms

The app can be deployed to any static hosting service:

- **Netlify**: Connect your GitHub repository
- **Vercel**: Import your project
- **AWS S3**: Upload the `build` folder
- **Firebase Hosting**: Use Firebase CLI

## 📞 Support

For support or questions:

- **Email**: sales@aiinnovation.com
- **Phone**: +1-555-0123
- **Documentation**: Check the code comments for detailed explanations

## 📄 License

This project is proprietary software for AI Innovation. All rights reserved.

## 🔄 Updates

To update the application:

1. Pull the latest changes: `git pull origin main`
2. Install new dependencies: `npm install`
3. Test locally: `npm start`
4. Deploy: `npm run deploy`

## 🎯 Product Catalog

The portal includes the following products:

1. **Law Enforcement - Live Fire AI Targets** - $1,000/day
2. **Military - Live Fire AI Targets** - $1,000/day
3. **Armored Modular Indoor/Outdoor Robots** - $50,000
4. **Heavy Weapons Resistant Robot** - $200,000

Each product includes detailed specifications, features, and client testimonials. 