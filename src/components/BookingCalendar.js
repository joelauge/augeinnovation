import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

const BookingCalendar = ({ 
  selectedDates, 
  onDateSelect, 
  maxDays = 10, 
  googleCalendarEmail = 'bookings@augeinnovation.com' 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Generate calendar days for current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  // Check if date is available (not booked)
  const isDateAvailable = (date) => {
    if (!date) return false;
    
    // For demo purposes, simulate Google Calendar integration
    // In production, this would fetch from Google Calendar API
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Only allow future dates
    if (date < today) return false;
    
    // Simulate some booked dates (weekends and some weekdays)
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    
    // Book weekends (Saturday = 6, Sunday = 0)
    if (dayOfWeek === 0 || dayOfWeek === 6) return false;
    
    // Book some random weekdays for demo
    const bookedDays = [5, 12, 19, 26]; // Example booked days
    if (bookedDays.includes(dayOfMonth)) return false;
    
    return true;
  };

  // Check if date is selected
  const isDateSelected = (date) => {
    if (!date) return false;
    return selectedDates.some(selectedDate => 
      selectedDate.toDateString() === date.toDateString()
    );
  };

  // Handle date selection
  const handleDateClick = (date) => {
    if (!date || !isDateAvailable(date)) return;
    
    if (isDateSelected(date)) {
      // Remove date from selection
      onDateSelect(selectedDates.filter(selectedDate => 
        selectedDate.toDateString() !== date.toDateString()
      ));
    } else {
      // Add date to selection (if under max days)
      if (selectedDates.length < maxDays) {
        onDateSelect([...selectedDates, date].sort((a, b) => a - b));
      }
    }
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const days = getDaysInMonth(currentMonth);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    // Simulate loading available dates from Google Calendar
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-6 h-6 border-2 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-titanium">Loading calendar...</span>
      </div>
    );
  }

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-cyber font-bold text-white">Select Dates</h3>
        <div className="text-sm text-titanium">
          {selectedDates.length}/{maxDays} days selected
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 text-cyber-blue hover:text-cyber-purple transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <h4 className="text-lg font-cyber font-bold text-white">
          {getMonthName(currentMonth)}
        </h4>
        
        <button
          onClick={goToNextMonth}
          className="p-2 text-cyber-blue hover:text-cyber-purple transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-tech text-titanium py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <motion.button
            key={index}
            onClick={() => handleDateClick(date)}
            disabled={!date || !isDateAvailable(date)}
            className={`
              relative p-2 text-sm font-tech rounded-lg transition-all duration-200
              ${!date 
                ? 'invisible' 
                : !isDateAvailable(date)
                ? 'text-gray-500 cursor-not-allowed bg-gray-800/30'
                : isDateSelected(date)
                ? 'text-white bg-cyber-blue hover:bg-cyber-purple cursor-pointer'
                : 'text-titanium hover:text-white hover:bg-cyber-blue/20 cursor-pointer'
              }
            `}
            whileHover={date && isDateAvailable(date) ? { scale: 1.05 } : {}}
            whileTap={date && isDateAvailable(date) ? { scale: 0.95 } : {}}
          >
            {date && date.getDate()}
            {isDateSelected(date) && (
              <Check className="absolute top-0 right-0 w-3 h-3 text-white" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Selected Dates Display */}
      {selectedDates.length > 0 && (
        <div className="mt-4 p-3 bg-cyber-dark/50 rounded-lg border border-cyber-blue/30">
          <h5 className="text-sm font-cyber font-bold text-cyber-blue mb-2">
            Selected Dates:
          </h5>
          <div className="flex flex-wrap gap-2">
            {selectedDates.map((date, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-1 px-2 py-1 bg-cyber-blue/20 rounded text-sm text-white"
              >
                <span>{formatDate(date)}</span>
                <button
                  onClick={() => handleDateClick(date)}
                  className="text-cyber-blue hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar; 