import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Send } from 'lucide-react';
import Footer from './Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    // Validate all fields are filled
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError('All fields are required. Please fill in all information.');
      setIsLoading(false);
      return;
    }

    try {
      // For demo purposes, simulate email sending
      // In production, this would integrate with a backend service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      setFormData({ name: '', phone: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-carbon">
      {/* Header */}
      <header className="cyber-gradient border-b border-cyber-blue/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate('/')}
              className="cyber-button"
            >
              <ArrowLeft className="inline mr-2 w-4 h-4" />
              BACK TO HOME
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
              <p className="text-sm text-titanium">Contact Us</p>
            </div>
            
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Service Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl font-cyber font-bold neon-text mb-6">
                CONTACT AUGÉ INNOVATIONS
              </h1>
              <p className="text-xl text-titanium leading-relaxed">
                Ready to revolutionize your training capabilities? Get in touch with our team of experts.
              </p>
            </div>

            <div className="cyber-card">
              <h2 className="text-2xl font-cyber font-bold text-white mb-4">
                OUR SERVICES
              </h2>
              <div className="space-y-4 text-titanium">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></div>
                  <p>Advanced AI-powered training targets for law enforcement and military applications</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></div>
                  <p>Heavy weapons resistant robotic platforms for extreme combat environments</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></div>
                  <p>Modular armored robots for versatile mission requirements</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></div>
                  <p>Comprehensive training analytics and performance tracking systems</p>
                </div>
              </div>
            </div>

            <div className="cyber-card">
              <h2 className="text-2xl font-cyber font-bold text-white mb-4">
                WHY CHOOSE US
              </h2>
              <div className="space-y-3 text-titanium">
                <p>• Cutting-edge AI technology with real-time threat assessment</p>
                <p>• Military-grade durability and reliability</p>
                <p>• Customizable solutions for specific training needs</p>
                <p>• Comprehensive support and maintenance services</p>
                <p>• Proven track record with law enforcement and military clients</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="cyber-card"
          >
            <h2 className="text-2xl font-cyber font-bold neon-text mb-6">
              SEND US A MESSAGE
            </h2>

            {success && (
              <div className="mb-6 p-4 bg-cyber-green/20 border border-cyber-green/30 rounded-lg">
                <p className="text-cyber-green font-cyber font-bold">
                  Message sent successfully! We'll get back to you soon.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg">
                <p className="text-red-400 font-cyber font-bold">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-titanium font-cyber font-bold mb-2">
                  FULL NAME *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="cyber-input w-full text-white placeholder-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-titanium font-cyber font-bold mb-2">
                  PHONE NUMBER *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="cyber-input w-full text-white placeholder-gray-400"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-titanium font-cyber font-bold mb-2">
                  MESSAGE *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="cyber-input w-full text-white placeholder-gray-400 resize-none"
                  placeholder="Tell us about your training needs and requirements..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="cyber-button w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    SENDING...
                  </div>
                ) : (
                  <>
                    <Send className="inline mr-2 w-5 h-5" />
                    SEND MESSAGE
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-cyber-blue/30">
              <p className="text-sm text-titanium mb-4">
                Your message will be sent to our team at:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-cyber-blue">
                  <Mail className="w-4 h-4" />
                  <span className="font-cyber">pierre@augeinnovation.com</span>
                </div>
                <div className="flex items-center space-x-2 text-cyber-blue">
                  <Mail className="w-4 h-4" />
                  <span className="font-cyber">joel@augeinnovation.com</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage; 