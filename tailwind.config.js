/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00d4ff',
        'cyber-purple': '#8b5cf6',
        'cyber-green': '#10b981',
        'cyber-red': '#ef4444',
        'cyber-orange': '#f97316',
        'cyber-gray': '#1f2937',
        'cyber-dark': '#111827',
        'cyber-light': '#f3f4f6',
        'neon-blue': '#00ffff',
        'neon-purple': '#ff00ff',
        'neon-green': '#00ff00',
        'neon-red': '#ff0000',
        'steel': '#64748b',
        'carbon': '#0f172a',
        'titanium': '#e2e8f0'
      },
      fontFamily: {
        'cyber': ['Quantico', 'monospace'],
        'tech': ['Rajdhani', 'sans-serif'],
        'futura': ['Futura', 'Arial', 'sans-serif'],
        'button': ['Rajdhani', 'sans-serif']
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'cyber-pulse': 'cyberPulse 2s ease-in-out infinite'
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 15px #00d4ff' },
          '100%': { boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #00d4ff' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        cyberPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 15px #00d4ff',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px #00d4ff, 0 0 30px #00d4ff, 0 0 40px #00d4ff',
            transform: 'scale(1.05)'
          }
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'neon-gradient': 'linear-gradient(45deg, #00d4ff, #8b5cf6, #10b981)',
        'carbon-fiber': 'repeating-linear-gradient(45deg, #1f2937, #1f2937 10px, #374151 10px, #374151 20px)',
        'grid-pattern': 'linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)'
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} 