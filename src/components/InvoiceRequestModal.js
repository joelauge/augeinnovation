import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Building, 
  Calendar,
  Send,
  CheckCircle
} from 'lucide-react';

const InvoiceRequestModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    quantity: 1,
    deliveryDate: '',
    specialRequirements: '',
    billingAddress: '',
    shippingAddress: '',
    purchaseOrder: '',
    contactPerson: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Calculate total based on product price and quantity
      const total = product.price * formData.quantity;
      
      // In production, this data would be sent to the Netlify function
      // For demo purposes, we simulate successful submission
      console.log('Invoice request data:', {
        ...formData,
        productId: product.id,
        productTitle: product.title,
        productPrice: product.price,
        total: total,
        requestDate: new Date().toISOString(),
        status: 'pending'
      });

      // For demo purposes, simulate successful submission
      // In production, this would call the Netlify function
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          organization: '',
          quantity: 1,
          deliveryDate: '',
          specialRequirements: '',
          billingAddress: '',
          shippingAddress: '',
          purchaseOrder: '',
          contactPerson: ''
        });
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting invoice request:', error);
      alert('Error submitting request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    return (product.price * formData.quantity).toLocaleString();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="cyber-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <img 
                  src={process.env.PUBLIC_URL + "/images/augeinnovation_logo_512px.png"} 
                  alt="Auge Innovation Logo" 
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h2 className="text-2xl font-cyber font-bold neon-text">
                    REQUEST INVOICE
                  </h2>
                  <p className="text-sm text-titanium">We'll create a professional invoice in Xero</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-cyber-gray hover:text-cyber-blue transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Success Message */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="cyber-border-glow bg-cyber-green/10 border-cyber-green/50 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-cyber-green" />
                  <div>
                    <h3 className="text-cyber-green font-cyber font-bold">REQUEST SUBMITTED!</h3>
                    <p className="text-titanium text-sm">
                      Your invoice request has been sent. We'll create the invoice in Xero and email it to you within 24 hours.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Product Summary */}
            <div className="cyber-border rounded-lg p-4 mb-6">
              <h3 className="text-lg font-cyber font-bold text-white mb-2">Product Details</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-titanium font-tech">{product.title}</p>
                  <p className="text-sm text-cyber-gray">Quantity: {formData.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-cyber font-bold neon-text">
                    ${calculateTotal()}
                  </p>
                  <p className="text-sm text-titanium">{product.period}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-cyber font-bold text-white mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-cyber-blue" />
                  CONTACT INFORMATION
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-titanium font-tech mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="cyber-input w-full"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-titanium font-tech mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="cyber-input w-full"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="block text-titanium font-tech mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="cyber-input w-full"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-titanium font-tech mb-2">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="cyber-input w-full"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div>
                <h3 className="text-lg font-cyber font-bold text-white mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2 text-cyber-blue" />
                  ORGANIZATION DETAILS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-titanium font-tech mb-2">Organization *</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                      className="cyber-input w-full"
                      placeholder="Enter organization name"
                    />
                  </div>
                  <div>
                    <label className="block text-titanium font-tech mb-2">Contact Person</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                      placeholder="Primary contact person"
                    />
                  </div>
                  <div>
                    <label className="block text-titanium font-tech mb-2">Purchase Order #</label>
                    <input
                      type="text"
                      name="purchaseOrder"
                      value={formData.purchaseOrder}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                      placeholder="PO number (if applicable)"
                    />
                  </div>
                  <div>
                    <label className="block text-titanium font-tech mb-2">Quantity *</label>
                    <select
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      className="cyber-input w-full"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div>
                <h3 className="text-lg font-cyber font-bold text-white mb-4">ADDRESSES</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-titanium font-tech mb-2">Billing Address *</label>
                    <textarea
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="cyber-input w-full"
                      placeholder="Enter complete billing address"
                    />
                  </div>
                  <div>
                    <label className="block text-titanium font-tech mb-2">Shipping Address</label>
                    <textarea
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      rows="3"
                      className="cyber-input w-full"
                      placeholder="Enter shipping address (if different from billing)"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <h3 className="text-lg font-cyber font-bold text-white mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-cyber-blue" />
                  DELIVERY & REQUIREMENTS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-titanium font-tech mb-2">Desired Delivery Date</label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      className="cyber-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-titanium font-tech mb-2">Special Requirements</label>
                    <textarea
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleInputChange}
                      rows="3"
                      className="cyber-input w-full"
                      placeholder="Any special requirements or notes"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-cyber-blue/30">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-cyber-blue/30 text-titanium hover:border-cyber-blue/50 transition-colors rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cyber-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      SUBMITTING...
                    </div>
                  ) : (
                    <>
                      <Send className="inline mr-2 w-4 h-4" />
                      REQUEST INVOICE
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InvoiceRequestModal; 