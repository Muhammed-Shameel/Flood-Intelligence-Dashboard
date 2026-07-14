module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0B0F14',
        'dark-surface': '#111827',
        'dark-card': '#1a202c',
        'light-bg': '#F8FAFC',
        'light-surface': '#FFFFFF',
        'light-card': '#F1F5F9',
        'border-dark': '#1F2937',
        'border-light': '#E5E7EB',
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        'text-primary-light': '#0F172A',
        'text-secondary-light': '#64748B',
        'blue': '#2563EB',
        'green': '#16A34A',
        'amber': '#F59E0B',
        'red': '#DC2626',
        'neutral': '#94A3B8',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
}
