import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { 
  Shield, 
  Target, 
  Zap, 
  ArrowRight, 
  ChevronDown,
  Bot
} from 'lucide-react';
import Footer from './Footer';

// Animated Text Component for individual character hover effects
const AnimatedText = ({ text, className, animationProps = {} }) => {
  const words = text.split(' ');
  
  return (
    <div className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block"
              whileHover={{
                scale: 1.1,
                y: -5,
                rotate: [0, 5, -5, 0],
                transition: { 
                  duration: 0.3, 
                  ease: "easeInOut",
                  delay: charIndex * 0.02 
                }
              }}
              style={{ 
                animationDelay: `${charIndex * 0.1}s`,
                marginRight: charIndex === word.length - 1 ? '0.2em' : '0.05em'
              }}
              {...animationProps}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
};

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isSignedIn } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  // Check if Clerk is properly configured
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
  const isClerkConfigured = clerkPubKey && clerkPubKey !== 'pk_test_your_clerk_key_here';

  // Use Clerk authentication if configured, otherwise fallback to demo mode
  const isAuthenticated = isClerkConfigured ? isSignedIn : false;

  const handleSignOut = async () => {
    try {
      if (isClerkConfigured && signOut) {
        await signOut();
      }
      // Always navigate to home page after sign out
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      // Still navigate to home page even if sign out fails
      navigate('/');
    }
  };

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Engineering Excellence",
      description: "Advanced engineering solutions with real-time analysis and innovative problem-solving"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Professional Design",
      description: "Industrial-grade design services for product development and innovation"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Manufacturing Solutions",
      description: "Cutting-edge manufacturing systems for efficient production and quality control"
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Modular Systems",
      description: "Customizable configurations for diverse industrial and commercial applications"
    }
  ];

  const heroSlides = [
    {
      title: "NEXT-GENERATION",
      subtitle: "ENGINEERING",
      description: "Revolutionary engineering solutions for complex design challenges and innovation",
      bgVideo: process.env.PUBLIC_URL + "/images/aerial.webm"
    },
    {
      title: "INDUSTRIAL GRADE",
      subtitle: "MANUFACTURING",
      description: "Advanced manufacturing systems for extreme production environments",
      bgVideo: process.env.PUBLIC_URL + "/images/robotinside.webm"
    },
    {
      title: "INNOVATIVE DESIGN",
      subtitle: "SOLUTIONS",
      description: "Intelligent design processes and dynamic development capabilities",
      bgVideo: process.env.PUBLIC_URL + "/images/robot1.webm"
    },
    {
      title: "PRECISION ENGINEERING",
      subtitle: "TECHNOLOGY",
      description: "Advanced engineering systems with real-time analysis and optimization",
      bgVideo: process.env.PUBLIC_URL + "/images/aerial.webm"
    },
    {
      title: "FUTURE OF MANUFACTURING",
      subtitle: "INNOVATION",
      description: "State-of-the-art production environments for modern industry",
      bgVideo: process.env.PUBLIC_URL + "/images/training.webm"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-carbon overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 grid-background opacity-20"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <img 
                            src={process.env.PUBLIC_URL + "/images/augeinnovation_logo_512px.png"} 
            alt="Auge Innovation Logo" 
            className="w-20 h-20 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => navigate('/')}
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex space-x-4"
        >
          {isAuthenticated ? (
            <button 
              onClick={handleSignOut}
              className="cyber-button"
            >
              SIGN OUT
            </button>
          ) : (
            <>
              <button 
                onClick={() => window.open('https://accounts.augeinnovation.com/sign-in?redirect_url=' + encodeURIComponent(window.location.origin + '/#/dashboard'), '_self')}
                className="cyber-button"
              >
                SIGN IN
              </button>
              <button 
                onClick={() => window.open('https://accounts.augeinnovation.com/sign-up?redirect_url=' + encodeURIComponent(window.location.origin + '/#/dashboard'), '_self')}
                className="cyber-button"
              >
                SIGN UP
              </button>
            </>
          )}
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 flex items-center justify-center">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
            >
              {/* Background Image or Video */}
              {slide.bgVideo ? (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source 
                    src={slide.bgVideo} 
                    type={slide.bgVideo.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} 
                  />
                </video>
              ) : (
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${slide.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}
              
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </motion.div>
          ))}
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedText
              text={heroSlides[currentSlide].title}
              className="text-6xl md:text-8xl font-cyber font-black neon-text mb-4 text-shadow-lg cursor-default"
            />
            <AnimatedText
              text={heroSlides[currentSlide].subtitle}
              className="text-4xl md:text-6xl font-cyber font-bold text-white mb-6 text-shadow cursor-default"
            />
            <p className="text-xl md:text-2xl text-titanium mb-8 max-w-2xl mx-auto">
              {heroSlides[currentSlide].description}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => isAuthenticated ? navigate('/dashboard') : window.open('https://accounts.augeinnovation.com/sign-up?redirect_url=' + encodeURIComponent(window.location.origin + '/#/dashboard'), '_self')}
              className="cyber-button text-base px-6 py-3"
            >
              {isAuthenticated ? 'GO TO DASHBOARD' : 'GET STARTED'} <ArrowRight className="inline ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-cyber-blue animate-bounce" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <AnimatedText
              text="ADVANCED CAPABILITIES"
              className="text-4xl md:text-5xl font-cyber font-bold neon-text mb-4 cursor-default"
            />
            <p className="text-xl text-titanium max-w-3xl mx-auto">
              Cutting-edge technology designed for the most demanding engineering, design, and manufacturing challenges
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="cyber-card group"
              >
                <div className="text-cyber-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <AnimatedText
                  text={feature.title}
                  className="text-xl font-cyber font-bold text-white mb-2 cursor-default"
                />
                <p className="text-titanium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage; 