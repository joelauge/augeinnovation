import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';
import { useInvoice } from '../contexts/InvoiceContext';

const InvoiceCart = ({ onRequestInvoice }) => {
  const { invoiceItems, removeFromInvoice, getInvoiceTotal, getInvoiceItemCount } = useInvoice();

  if (invoiceItems.length === 0) {
    return null;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="bg-cyber-dark/50 rounded-lg border border-cyber-blue/30 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-cyber font-bold text-white flex items-center">
            <FileText className="w-5 h-5 mr-2 text-cyber-blue" />
            Invoice Items ({getInvoiceItemCount()})
          </h3>
          <div className="text-sm text-titanium">
            Total: <span className="text-cyber-blue font-bold">${getInvoiceTotal().toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-3 max-h-48 overflow-y-auto">
          <AnimatePresence>
            {invoiceItems.map((item, index) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start justify-between p-3 bg-cyber-dark/30 rounded border border-cyber-blue/20"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-cyber font-bold text-white truncate">
                    {item.title}
                  </h4>
                  <div className="text-xs text-titanium mt-1">
                    {item.period === 'per day' ? (
                      <div>
                        <span className="text-cyber-blue">{item.quantity} days</span>
                        {item.selectedDates.length > 0 && (
                          <div className="mt-1 text-xs text-gray-400">
                            {item.selectedDates.slice(0, 3).map(date => formatDate(date)).join(', ')}
                            {item.selectedDates.length > 3 && ` +${item.selectedDates.length - 3} more`}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-cyber-blue">Qty: {item.quantity}</span>
                    )}
                  </div>
                  <div className="text-xs text-cyber-blue font-bold mt-1">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
                
                <button
                  onClick={() => removeFromInvoice(item.productId)}
                  className="ml-2 p-1 text-gray-400 hover:text-red-400 transition-colors"
                  title="Remove from invoice"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-4 pt-3 border-t border-cyber-blue/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white font-cyber font-bold">Invoice Total:</span>
            <span className="text-cyber-blue font-cyber font-bold text-xl">
              ${getInvoiceTotal().toLocaleString()}
            </span>
          </div>
          
          <button
            onClick={onRequestInvoice}
            className="w-full px-4 py-2 bg-cyber-blue hover:bg-cyber-purple text-white font-cyber font-bold rounded transition-colors"
          >
            REQUEST FINAL INVOICE
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoiceCart; 