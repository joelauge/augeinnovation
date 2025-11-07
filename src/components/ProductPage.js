import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

import InvoiceRequestModal from './InvoiceRequestModal';
import BookingCalendar from './BookingCalendar';
import InvoiceCart from './InvoiceCart';
import { useInvoice } from '../contexts/InvoiceContext';
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
  Plus
} from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToInvoice } = useInvoice();

  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedDates, setSelectedDates] = useState([]);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const products = {
    'engineering-consulting': {
      id: 'engineering-consulting',
      title: 'Engineering Consulting Services',
      price: 1000,
      period: 'per day',
      bgVideo: process.env.PUBLIC_URL + "/images/robotinside.webm",
      description: 'Expert engineering consulting services for complex design challenges. Our team provides cutting-edge solutions with advanced analysis and innovative problem-solving approaches.',
      longDescription: `Our Engineering Consulting Services represent the pinnacle of technical expertise, designed specifically for companies facing complex engineering challenges. These services combine advanced engineering principles with sophisticated analysis tools to deliver innovative solutions.

Our engineering team features real-time problem-solving capabilities, allowing them to respond dynamically to project requirements. They can handle various engineering challenges, from product development to system optimization, providing comprehensive solutions that meet the highest industry standards.

Each engagement includes comprehensive project management and reporting features, allowing clients to track progress metrics and identify areas for improvement. Our modular approach allows for easy customization to meet specific project requirements.`,
      features: [
        'Real-time engineering analysis and solutions',
        'Advanced CAD and simulation capabilities',
        'Comprehensive project documentation and reporting',
        'Performance optimization and efficiency analysis',
        'Modular design approaches for various applications',
        'Multi-industry expertise and knowledge',
        'Remote collaboration and monitoring systems',
        'Integration with existing engineering workflows'
      ],
      specifications: [
        { label: 'Response Time', value: '< 24 hours' },
        { label: 'Service Availability', value: '24/7 support' },
        { label: 'Team Size', value: '2-5 engineers per project' },
        { label: 'Communication Channels', value: 'Video, Email, Phone' },
        { label: 'Project Duration', value: 'Flexible timelines' },
        { label: 'Documentation', value: 'Comprehensive deliverables' },
        { label: 'Support Level', value: 'Full project lifecycle' },
        { label: 'Warranty', value: '2 years post-project support' }
      ],
      icon: <Target className="w-16 h-16" />,
      category: 'engineering',
      color: 'from-cyber-blue to-cyber-purple',
      images: ['engineering1.jpg', 'engineering2.jpg', 'engineering3.jpg'],
      reviews: [
        { rating: 5, comment: 'Exceptional engineering solutions that significantly improved our product development process.', author: 'Sarah Chen, TechCorp Industries' },
        { rating: 5, comment: 'The engineering expertise is incredible. Our team is more efficient and innovative.', author: 'Michael Rodriguez, Advanced Manufacturing Co.' }
      ]
    },
    'design-services': {
      id: 'design-services',
      title: 'Industrial Design Services',
      price: 1000,
      period: 'per day',
      bgVideo: process.env.PUBLIC_URL + "/images/aerial.webm",
      description: 'Professional industrial design services for product development and innovation. Designed for the most demanding design challenges.',
      longDescription: `Our Industrial Design Services are engineered for the most challenging product development scenarios. These services are designed to deliver innovative solutions while maintaining the highest design standards.

Our design team features advanced creative processes that simulate real-world product requirements, including user experience optimization, material selection, and manufacturing feasibility. The design system can coordinate multiple design elements to create complex, multi-faceted products that test design boundaries and market effectiveness.

Built to professional specifications, our design services can operate across various industries, from consumer products to industrial equipment. They feature comprehensive design documentation and can deliver significant value while maintaining design integrity and manufacturability.`,
      features: [
        'Advanced 3D modeling and visualization',
        'User-centered design methodologies',
        'Multi-disciplinary design coordination',
        'Manufacturing feasibility analysis',
        'Rapid prototyping capabilities',
        'Professional design documentation',
        'Advanced material and finish selection',
        'Comprehensive design review processes'
      ],
      specifications: [
        { label: 'Design Iteration Time', value: '< 48 hours' },
        { label: 'Service Availability', value: 'Business hours + emergency' },
        { label: 'Design Team Size', value: '2-4 designers per project' },
        { label: 'Communication Range', value: 'Global collaboration' },
        { label: 'Prototype Delivery', value: '2-4 weeks' },
        { label: 'Design Revisions', value: 'Unlimited during project' },
        { label: 'File Formats', value: 'All major CAD formats' },
        { label: 'Warranty', value: '3 years design support' }
      ],
      icon: <Shield className="w-16 h-16" />,
      category: 'design',
      color: 'from-cyber-red to-cyber-orange',
      images: ['design1.jpg', 'design2.jpg', 'design3.jpg'],
      reviews: [
        { rating: 5, comment: 'Outstanding design services that have improved our product line significantly.', author: 'Jennifer Martinez, Product Innovations Inc.' },
        { rating: 5, comment: 'The most advanced design capabilities we\'ve ever experienced.', author: 'David Thompson, Creative Solutions Ltd.' }
      ]
    },
    'manufacturing-systems': {
      id: 'manufacturing-systems',
      title: 'Modular Manufacturing Systems',
      price: 50000,
      period: 'one-time',
      bgVideo: process.env.PUBLIC_URL + "/images/robot1.webm",
      description: 'Heavy-duty modular manufacturing systems for industrial applications. Versatile platforms designed for multiple production environments.',
      longDescription: `Our Modular Manufacturing Systems represent a new generation of versatile production platforms designed for industrial manufacturing applications. These systems feature a modular design that allows for rapid reconfiguration to meet specific production requirements.

The systems are equipped with advanced automation capabilities that enable operation in diverse manufacturing environments, from precision assembly to heavy fabrication. They feature modular tooling systems that can be quickly swapped to match production requirements, from precision components to large-scale assemblies.

Built with industrial-grade components and electronics, these systems can operate in demanding conditions while providing reliable performance. The modular design allows for easy maintenance and upgrades, ensuring long-term production capability.`,
      features: [
        'All-environment operation capability',
        'Modular tooling system integration',
        'Advanced automation and control',
        'Remote monitoring and autonomous operation',
        'Customizable production configurations',
        'Industrial-grade reliability and durability',
        'Extended production capacity',
        'Real-time monitoring and quality control'
      ],
      specifications: [
        { label: 'Production Speed', value: 'Up to 1000 units/hour' },
        { label: 'Operating Range', value: '24/7 continuous operation' },
        { label: 'Payload Capacity', value: '150 kg' },
        { label: 'Uptime', value: '95%+ availability' },
        { label: 'Weight', value: '450 kg' },
        { label: 'Dimensions', value: '200cm x 120cm x 100cm' },
        { label: 'Precision Rating', value: '±0.01mm accuracy' },
        { label: 'Warranty', value: '5 years comprehensive' }
      ],
      icon: <Bot className="w-16 h-16" />,
      category: 'manufacturing',
      color: 'from-cyber-green to-cyber-blue',
      images: ['manufacturing1.jpg', 'manufacturing2.jpg', 'manufacturing3.jpg'],
      reviews: [
        { rating: 5, comment: 'Incredible versatility and reliability. Perfect for our diverse production requirements.', author: 'Robert Davis, Industrial Solutions Group' },
        { rating: 5, comment: 'The modular design makes it incredibly adaptable to different production scenarios.', author: 'Lisa Rodriguez, Precision Manufacturing Co.' }
      ]
    },
    'advanced-manufacturing': {
      id: 'advanced-manufacturing',
      title: 'Advanced Manufacturing Solutions',
      price: 200000,
      period: 'one-time',
      bgVideo: process.env.PUBLIC_URL + "/images/robotinside.webm",
      description: 'Ultra-advanced manufacturing platforms designed for extreme production environments. The most sophisticated manufacturing systems available.',
      longDescription: `Our Advanced Manufacturing Solutions represent the pinnacle of manufacturing technology. These ultra-advanced platforms are designed for the most demanding production environments, featuring advanced automation systems that can handle complex manufacturing processes.

These systems are equipped with sophisticated AI and control systems that enable autonomous operation in complex production scenarios. They feature advanced sensor suites that provide comprehensive quality monitoring, allowing for effective operation in challenging manufacturing environments.

The advanced capabilities are achieved through a combination of cutting-edge technology and innovative engineering. The systems feature multiple layers of automation, including robotic integration and intelligent quality control, while maintaining operational efficiency and productivity.`,
      features: [
        'Advanced automation and robotics integration',
        'Intelligent quality control systems',
        'High-capacity production capabilities',
        'Extended operational range and endurance',
        'Multi-product manufacturing capability',
        'Advanced AI production optimization',
        'Comprehensive monitoring and analytics systems',
        'Modular production-specific configurations'
      ],
      specifications: [
        { label: 'Production Speed', value: 'Up to 5000 units/hour' },
        { label: 'Operating Range', value: '24/7 continuous operation' },
        { label: 'Payload Capacity', value: '300 kg' },
        { label: 'Uptime', value: '98%+ availability' },
        { label: 'Weight', value: '1200 kg' },
        { label: 'Dimensions', value: '300cm x 180cm x 150cm' },
        { label: 'Precision Rating', value: '±0.001mm accuracy' },
        { label: 'Warranty', value: '10 years comprehensive' }
      ],
      icon: <Zap className="w-16 h-16" />,
      category: 'manufacturing',
      color: 'from-cyber-purple to-cyber-red',
      images: ['advanced1.jpg', 'advanced2.jpg', 'advanced3.jpg'],
      reviews: [
        { rating: 5, comment: 'The most advanced manufacturing system we\'ve ever deployed. Exceptional performance.', author: 'James Anderson, Global Manufacturing Corp' },
        { rating: 5, comment: 'Revolutionary technology that has transformed our production capabilities.', author: 'Patricia Chen, Advanced Production Systems' }
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
        if (product.period === 'per day') {
          const dateList = selectedDates.map(date => 
            date.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })
          ).join(', ');
          alert(`Checkout process initiated for ${selectedDates.length} days: ${dateList}! In production, this would redirect to Stripe checkout.`);
        } else {
          alert('Checkout process initiated! In production, this would redirect to Stripe checkout.');
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      alert('Error initiating checkout. Please try again.');
      setLoading(false);
    }
  };

  const handleAddToInvoice = () => {
    if (product.period === 'per day' && selectedDates.length === 0) {
      alert('Please select at least one date before adding to invoice.');
      return;
    }

    addToInvoice(product, quantity, selectedDates);
    
    // Show success message
    const message = product.period === 'per day' 
      ? `Added ${selectedDates.length} days of ${product.title} to invoice`
      : `Added ${quantity} ${product.title} to invoice`;
    
    alert(message);
    
    // Reset form
    if (product.period === 'per day') {
      setSelectedDates([]);
    } else {
      setQuantity(1);
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
              
              {/* Invoice Cart */}
              <InvoiceCart onRequestInvoice={() => setShowInvoiceModal(true)} />
              
              {/* Calendar for per-day products */}
              {product.period === 'per day' && (
                <div className="mb-6">
                  <BookingCalendar
                    selectedDates={selectedDates}
                    onDateSelect={setSelectedDates}
                    maxDays={10}
                    googleCalendarEmail="bookings@augeinnovation.com"
                  />
                </div>
              )}
              
              {/* Quantity selector for non-per-day products */}
              {product.period !== 'per day' && (
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
              )}
              
              <div className="mb-6">
                <div className="flex justify-between items-center py-2 border-b border-cyber-blue/20">
                  <span className="text-titanium">Unit Price</span>
                  <span className="text-cyber-blue font-cyber">${product.price.toLocaleString()}</span>
                </div>
                
                {product.period === 'per day' ? (
                  <>
                    <div className="flex justify-between items-center py-2 border-b border-cyber-blue/20">
                      <span className="text-titanium">Days Selected</span>
                      <span className="text-cyber-blue font-cyber">{selectedDates.length}</span>
                    </div>
                    {selectedDates.length > 0 && (
                      <div className="py-2 border-b border-cyber-blue/20">
                        <span className="text-titanium text-sm">Selected Dates:</span>
                        <div className="mt-1 space-y-1">
                          {selectedDates.map((date, index) => (
                            <div key={index} className="text-xs text-cyber-blue font-tech">
                              {date.toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex justify-between items-center py-2 border-b border-cyber-blue/20">
                    <span className="text-titanium">Quantity</span>
                    <span className="text-cyber-blue font-cyber">{quantity}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-white font-cyber font-bold text-lg">Total</span>
                  <span className="text-cyber-blue font-cyber font-bold text-xl">
                    ${product.period === 'per day' 
                      ? (product.price * selectedDates.length).toLocaleString()
                      : (product.price * quantity).toLocaleString()
                    }
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={loading || (product.period === 'per day' && selectedDates.length === 0)}
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
                  onClick={handleAddToInvoice}
                  disabled={product.period === 'per day' && selectedDates.length === 0}
                  className="w-full px-6 py-4 border border-cyber-blue/30 text-cyber-blue hover:border-cyber-blue/50 hover:bg-cyber-blue/10 transition-all duration-300 rounded-lg font-cyber font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="inline mr-2 w-5 h-5" />
                  ADD TO INVOICE
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-titanium mb-2">Need assistance?</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <a href="tel:+1-555-0123" className="text-cyber-blue hover:text-cyber-purple transition-colors">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Call
                  </a>
                  <a href="mailto:sales@augeinnovation.com" className="text-cyber-blue hover:text-cyber-purple transition-colors">
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