import React, { createContext, useContext, useState, useEffect } from 'react';

const InvoiceContext = createContext();

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};

export const InvoiceProvider = ({ children }) => {
  const [invoiceItems, setInvoiceItems] = useState([]);

  // Load invoice items from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem('auge-invoice-items');
    if (savedItems) {
      try {
        setInvoiceItems(JSON.parse(savedItems));
      } catch (error) {
        console.error('Error loading invoice items:', error);
      }
    }
  }, []);

  // Save invoice items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('auge-invoice-items', JSON.stringify(invoiceItems));
  }, [invoiceItems]);

  const addToInvoice = (product, quantity = 1, selectedDates = []) => {
    const existingItemIndex = invoiceItems.findIndex(
      item => item.productId === product.id
    );

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...invoiceItems];
      const existingItem = updatedItems[existingItemIndex];
      
      if (product.period === 'per day') {
        // For per-day products, merge dates
        const allDates = [...existingItem.selectedDates, ...selectedDates];
        const uniqueDates = allDates.filter((date, index, self) => 
          index === self.findIndex(d => d.toDateString() === date.toDateString())
        );
        updatedItems[existingItemIndex] = {
          ...existingItem,
          selectedDates: uniqueDates,
          quantity: uniqueDates.length
        };
      } else {
        // For one-time products, add quantities
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity
        };
      }
      
      setInvoiceItems(updatedItems);
    } else {
      // Add new item
      const newItem = {
        productId: product.id,
        title: product.title,
        price: product.price,
        period: product.period,
        quantity: product.period === 'per day' ? selectedDates.length : quantity,
        selectedDates: selectedDates,
        addedAt: new Date().toISOString()
      };
      
      setInvoiceItems([...invoiceItems, newItem]);
    }
  };

  const removeFromInvoice = (productId) => {
    setInvoiceItems(invoiceItems.filter(item => item.productId !== productId));
  };

  const updateInvoiceItem = (productId, updates) => {
    setInvoiceItems(invoiceItems.map(item => 
      item.productId === productId ? { ...item, ...updates } : item
    ));
  };

  const clearInvoice = () => {
    setInvoiceItems([]);
  };

  const getInvoiceTotal = () => {
    return invoiceItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getInvoiceItemCount = () => {
    return invoiceItems.length;
  };

  const value = {
    invoiceItems,
    addToInvoice,
    removeFromInvoice,
    updateInvoiceItem,
    clearInvoice,
    getInvoiceTotal,
    getInvoiceItemCount
  };

  return (
    <InvoiceContext.Provider value={value}>
      {children}
    </InvoiceContext.Provider>
  );
}; 