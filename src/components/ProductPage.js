import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';


import InvoiceRequestModal from './InvoiceRequestModal';
import { 
  ArrowLeft, 
  Target, 
  Shield, 
  Bot, 
  Zap,
  Check,
  Star,
  Phone,
  Mail,
  DollarSign,
  FileText
} from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const products = {
    'law-enforcement-targets': {
      id: 'law-enforcement-targets',
      title: 'Law Enforcement - Live Fire AI Targets',
      price: 1000,
      period: 'per day',
      bgVideo: process.env.PUBLIC_URL + "/images/training.webm",
      description: 'Advanced AI-powered targets designed specifically for law enforcement training scenarios. These cutting-edge systems provide realistic threat simulation while maintaining the highest safety standards.',
      longDescription: `Our Law Enforcement AI Targets represent the pinnacle of training technology, designed specifically for police departments and law enforcement agencies. These systems combine advanced robotics with sophisticated AI algorithms to create the most realistic training scenarios possible.

The targets feature real-time threat assessment capabilities, allowing them to respond dynamically to trainee actions. They can simulate various threat levels, from passive suspects to active shooters, providing officers with comprehensive training experiences that prepare them for real-world situations.

Each system includes comprehensive analytics and reporting features, allowing training supervisors to track performance metrics and identify areas for improvement. The modular design allows for easy customization to meet specific training requirements.`,
      features: [
        'Real-time threat assessment and response',
        'Adaptive AI algorithms that learn from training sessions',
        'Safe live fire environment with bullet-resistant materials',
        'Comprehensive training analytics and performance tracking',
        'Modular target configurations for various scenarios',
        'Weather-resistant outdoor operation capability',
        'Remote control and monitoring systems',
        'Integration with existing training infrastructure'
      ],
      specifications: [
        { label: 'Target Response Time', value: '< 50ms' },
        { label: 'Operating Temperature', value: '-20°C to +50°C' },
        { label: 'Power Requirements', value: '110V/220V AC or Battery' },
        { label: 'Communication Range', value: 'Up to 500m' },
        { label: 'Target Movement Speed', value: '0-15 m/s' },
        { label: 'Weight', value: '45 kg' },
        { label: 'Dimensions', value: '120cm x 80cm x 60cm' },
        { label: 'Warranty', value: '2 years comprehensive' }
      ],
      icon: <Target className="w-16 h-16" />,
      category: 'law-enforcement',
      color: 'from-cyber-blue to-cyber-purple',
      images: ['target1.jpg', 'target2.jpg', 'target3.jpg'],
      reviews: [
        { rating: 5, comment: 'Revolutionary training system that significantly improved our department\'s readiness.', author: 'Sgt. Johnson, LAPD' },
        { rating: 5, comment: 'The AI capabilities are incredible. Our officers are more confident and prepared.', author: 'Chief Williams, NYPD' }
      ]
    },
    'military-targets': {
      id: 'military-targets',
      title: 'Military - Live Fire AI Targets',
      price: 1000,
      period: 'per day',
      bgVideo: process.env.PUBLIC_URL + "/images/aerial.webm",
      description: 'Military-grade AI targets for advanced combat training and tactical scenarios. Designed for the most demanding training environments.',
      longDescription: `Our Military AI Targets are engineered for the most challenging combat training scenarios. These systems are designed to withstand extreme conditions while providing realistic threat simulation for military personnel.

The targets feature advanced tactical movement patterns that simulate real combat situations, including cover and concealment tactics, flanking maneuvers, and coordinated attacks. The AI system can coordinate multiple targets to create complex, multi-threat scenarios that test tactical decision-making and combat effectiveness.

Built to military specifications, these targets can operate in extreme weather conditions, from desert heat to arctic cold. They feature heavy-duty construction and can withstand significant environmental stress while maintaining operational reliability.`,
      features: [
        'Heavy weapons simulation and resistance',
        'Advanced tactical movement patterns',
        'Multi-threat scenario coordination',
        'Combat readiness assessment algorithms',
        'Extreme weather operation capability',
        'Military-grade durability and reliability',
        'Advanced AI threat simulation',
        'Comprehensive after-action reporting'
      ],
      specifications: [
        { label: 'Target Response Time', value: '< 30ms' },
        { label: 'Operating Temperature', value: '-40°C to +60°C' },
        { label: 'Power Requirements', value: '24V DC or Solar' },
        { label: 'Communication Range', value: 'Up to 1km' },
        { label: 'Target Movement Speed', value: '0-20 m/s' },
        { label: 'Weight', value: '75 kg' },
        { label: 'Dimensions', value: '150cm x 100cm x 80cm' },
        { label: 'Warranty', value: '3 years military grade' }
      ],
      icon: <Shield className="w-16 h-16" />,
      category: 'military',
      color: 'from-cyber-red to-cyber-orange',
      images: ['military1.jpg', 'military2.jpg', 'military3.jpg'],
      reviews: [
        { rating: 5, comment: 'Exceptional training system that has improved our unit\'s combat effectiveness.', author: 'Col. Martinez, US Army' },
        { rating: 5, comment: 'The most advanced training technology we\'ve ever used.', author: 'Maj. Thompson, USMC' }
      ]
    },
    'armored-robots': {
      id: 'armored-robots',
      title: 'Armored Modular Indoor/Outdoor Robots',
      price: 50000,
      period: 'one-time',
      bgVideo: process.env.PUBLIC_URL + "/images/robot1.webm",
      description: 'Heavy-duty modular robots for both military and law enforcement applications. Versatile platforms designed for multiple operational environments.',
      longDescription: `Our Armored Modular Robots represent a new generation of versatile robotic platforms designed for both military and law enforcement applications. These systems feature a modular design that allows for rapid reconfiguration to meet specific mission requirements.

The robots are equipped with advanced mobility systems that enable operation in diverse environments, from urban settings to rough terrain. They feature modular weapon systems that can be quickly swapped to match mission requirements, from less-lethal options to heavy weapons platforms.

Built with military-grade armor and electronics, these robots can operate in extreme conditions while providing reliable performance. The modular design allows for easy maintenance and upgrades, ensuring long-term operational capability.`,
      features: [
        'All-weather operation capability',
        'Modular weapon system integration',
        'Advanced mobility and navigation',
        'Remote control and autonomous operation',
        'Customizable configurations',
        'Military-grade armor protection',
        'Extended operational range',
        'Real-time video and sensor feeds'
      ],
      specifications: [
        { label: 'Maximum Speed', value: '25 km/h' },
        { label: 'Operating Range', value: 'Up to 10km' },
        { label: 'Payload Capacity', value: '150 kg' },
        { label: 'Battery Life', value: '8-12 hours' },
        { label: 'Weight', value: '450 kg' },
        { label: 'Dimensions', value: '200cm x 120cm x 100cm' },
        { label: 'Armor Rating', value: 'Level III+ protection' },
        { label: 'Warranty', value: '5 years comprehensive' }
      ],
      icon: <Bot className="w-16 h-16" />,
      category: 'robots',
      color: 'from-cyber-green to-cyber-blue',
      images: ['robot1.jpg', 'robot2.jpg', 'robot3.jpg'],
      reviews: [
        { rating: 5, comment: 'Incredible versatility and reliability. Perfect for our diverse mission requirements.', author: 'Capt. Davis, Special Forces' },
        { rating: 5, comment: 'The modular design makes it incredibly adaptable to different scenarios.', author: 'Lt. Rodriguez, SWAT Team' }
      ]
    },
    'heavy-weapons-robots': {
      id: 'heavy-weapons-robots',
      title: 'Heavy Weapons Resistant Robot',
      price: 200000,
      period: 'one-time',
      bgVideo: process.env.PUBLIC_URL + "/images/robotinside.webm",
      description: 'Ultra-resistant robotic platforms designed for extreme combat environments. The most advanced robotic systems available.',
      longDescription: `Our Heavy Weapons Resistant Robots represent the pinnacle of robotic combat technology. These ultra-resistant platforms are designed for the most extreme combat environments, featuring advanced armor systems that can withstand heavy weapons fire.

These robots are equipped with sophisticated AI systems that enable autonomous operation in complex combat scenarios. They feature advanced sensor suites that provide comprehensive situational awareness, allowing for effective operation in challenging environments.

The heavy weapons resistance is achieved through a combination of advanced materials science and innovative design. The robots feature multiple layers of protection, including reactive armor and composite materials, while maintaining operational mobility and effectiveness.`,
      features: [
        'Heavy weapons resistance and protection',
        'Advanced armor systems and materials',
        'High-capacity weapon mounts and integration',
        'Extended operational range and endurance',
        'Multi-environment deployment capability',
        'Advanced AI autonomous operation',
        'Comprehensive sensor and communication systems',
        'Modular mission-specific configurations'
      ],
      specifications: [
        { label: 'Maximum Speed', value: '35 km/h' },
        { label: 'Operating Range', value: 'Up to 25km' },
        { label: 'Payload Capacity', value: '300 kg' },
        { label: 'Battery Life', value: '16-24 hours' },
        { label: 'Weight', value: '1200 kg' },
        { label: 'Dimensions', value: '300cm x 180cm x 150cm' },
        { label: 'Armor Rating', value: 'Level IV+ protection' },
        { label: 'Warranty', value: '10 years comprehensive' }
      ],
      icon: <Zap className="w-16 h-16" />,
      category: 'robots',
      color: 'from-cyber-purple to-cyber-red',
      images: ['heavy1.jpg', 'heavy2.jpg', 'heavy3.jpg'],
      reviews: [
        { rating: 5, comment: 'The most advanced robotic system we\'ve ever deployed. Exceptional performance.', author: 'Gen. Anderson, Joint Chiefs' },
        { rating: 5, comment: 'Revolutionary technology that has changed how we approach combat operations.', author: 'Adm. Chen, Naval Operations' }
      ]
    }
  };

  const product = products[id];

  if (!product) {
    return (
      <div className="min-h-screen bg-carbon flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-cyber font-bold text-white mb-4">PRODUCT NOT FOUND</h2>
          <button onClick={() => navigate('/dashboard')} className="cyber-button">
            <ArrowLeft className="inline mr-2 w-4 h-4" />
            BACK TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // For demo purposes, show a success message
      // In production, this would integrate with Stripe
      setTimeout(() => {
        alert('Checkout process initiated! In production, this would redirect to Stripe checkout.');
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      alert('Error initiating checkout. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-carbon">
      {/* Header */}
      <header className="cyber-gradient border-b border-cyber-blue/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="cyber-button"
            >
              <ArrowLeft className="inline mr-2 w-4 h-4" />
              BACK TO DASHBOARD
            </button>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <img 
                  src={process.env.PUBLIC_URL + "/images/augeinnovation_logo_512px.png"} 
                  alt="Auge Innovation Logo" 
                  className="w-16 h-16 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => navigate('/')}
                  onError={(e) => {
                    console.error('Logo failed to load:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <p className="text-sm text-titanium">Product Details</p>
            </div>
            
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="cyber-card mb-8 relative overflow-hidden"
            >
              {/* Video Background */}
              {product.bgVideo && (
                <div className="absolute inset-0 z-0">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source 
                      src={product.bgVideo} 
                      type="video/webm" 
                    />
                  </video>
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/70"></div>
                </div>
              )}
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-20 h-20 bg-cyber-dark border border-cyber-blue/30 rounded-lg flex items-center justify-center text-cyber-blue">
                    {product.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-cyber font-bold text-white">
                      ${product.price.toLocaleString()}
                    </div>
                    <div className="text-lg text-titanium">{product.period}</div>
                  </div>
                </div>
                
                <h1 className="text-3xl font-cyber font-bold text-white mb-4">
                  {product.title}
                </h1>
                
                <p className="text-titanium text-lg mb-6">
                  {product.description}
                </p>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-titanium leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="cyber-card mb-8"
            >
              <h2 className="text-2xl font-cyber font-bold neon-text mb-6">
                KEY FEATURES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-cyber-green mt-0.5 flex-shrink-0" />
                    <span className="text-titanium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="cyber-card mb-8"
            >
              <h2 className="text-2xl font-cyber font-bold neon-text mb-6">
                TECHNICAL SPECIFICATIONS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-cyber-blue/20">
                    <span className="text-titanium font-tech">{spec.label}</span>
                    <span className="text-cyber-blue font-cyber font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="cyber-card"
            >
              <h2 className="text-2xl font-cyber font-bold neon-text mb-6">
                CLIENT TESTIMONIALS
              </h2>
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border border-cyber-blue/20 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-cyber-orange fill-current" />
                      ))}
                    </div>
                    <p className="text-titanium mb-2">"{review.comment}"</p>
                    <p className="text-sm text-cyber-blue font-tech">- {review.author}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="cyber-card sticky top-8"
            >
              <h2 className="text-2xl font-cyber font-bold neon-text mb-6">
                PURCHASE
              </h2>
              
              <div className="mb-6">
                <label className="block text-titanium font-tech mb-2">Quantity</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="cyber-input w-full"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center py-2 border-b border-cyber-blue/20">
                  <span className="text-titanium">Unit Price</span>
                  <span className="text-cyber-blue font-cyber">${product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-cyber-blue/20">
                  <span className="text-titanium">Quantity</span>
                  <span className="text-cyber-blue font-cyber">{quantity}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-white font-cyber font-bold text-lg">Total</span>
                  <span className="text-cyber-blue font-cyber font-bold text-xl">
                    ${(product.price * quantity).toLocaleString()}
                  </span>
                </div>
              </div>
              
                             <div className="space-y-3">
                 <button
                   onClick={handleCheckout}
                   disabled={loading}
                   className="cyber-button w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {loading ? (
                     <div className="flex items-center justify-center">
                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                       PROCESSING...
                     </div>
                   ) : (
                     <>
                       <DollarSign className="inline mr-2 w-5 h-5" />
                       PROCEED TO CHECKOUT
                     </>
                   )}
                 </button>
                 
                 <div className="text-center">
                   <span className="text-sm text-titanium">or</span>
                 </div>
                 
                 <button
                   onClick={() => setShowInvoiceModal(true)}
                   className="w-full px-6 py-4 border border-cyber-blue/30 text-cyber-blue hover:border-cyber-blue/50 hover:bg-cyber-blue/10 transition-all duration-300 rounded-lg font-cyber font-bold"
                 >
                   <FileText className="inline mr-2 w-5 h-5" />
                   REQUEST INVOICE
                 </button>
               </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-titanium mb-2">Need assistance?</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <a href="tel:+1-555-0123" className="text-cyber-blue hover:text-cyber-purple transition-colors">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Call
                  </a>
                  <a href="mailto:sales@aiinnovation.com" className="text-cyber-blue hover:text-cyber-purple transition-colors">
                    <Mail className="inline w-4 h-4 mr-1" />
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
                 </div>
       </main>
       
       {/* Invoice Request Modal */}
       <InvoiceRequestModal
         isOpen={showInvoiceModal}
         onClose={() => setShowInvoiceModal(false)}
         product={product}
       />
     </div>
   );
 };

export default ProductPage; 