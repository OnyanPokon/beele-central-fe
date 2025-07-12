/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Plus Jakarta Sans', 'arial', 'halvetica', ...defaultTheme.fontFamily.sans],

    },
    extend: {
      animation: {
        scroll: 'scroll 10s linear infinite',
        scroll2: 'scroll2 10s linear infinite'
      },
      colors: {
        "primary-100": "#97bbe6",
        "primary-200": "#85b0e2",
        "primary-300": "#74a5de",
        "primary-400": "#6299da",
        "primary-500": "#518ed6",
        "primary-600": "#4980c1",
        "primary-700": "#4172ab",
        "primary-800": "#396396",
        "danger-100": "#f1738f",
        "danger-200": "#ee5b7c",
        "danger-300": "#ec4469",
        "danger-400": "#e92c57",
        "danger-500": "#e71544",
        "danger-600": "#d0133d",
        "danger-700": "#b91136",
        "danger-800": "#a20f30",
        "success-100": "#a6dda1",
        "success-200": "#97d791",
        "success-300": "#88d181",
        "success-400": "#79cc72",
        "success-500": "#6ac662",
        "success-600": "#5fb258",
        "success-700": "#559e4e",
        "success-800": "#4a8b45",
        "info-100": "#85caec",
        "info-200": "#70c1e9",
        "info-300": "#5cb8e5",
        "info-400": "#47afe2",
        "info-500": "#33a6df",
        "info-600": "#2e95c9",
        "info-700": "#2985b2",
        "info-800": "#24749c",
        "warning-100": "#fde489",
        "warning-200": "#fce075",
        "warning-300": "#fcdb61",
        "warning-400": "#fbd74e",
        "warning-500": "#fbd23a",
        "warning-600": "#e2bd34",
        "warning-700": "#c9a82e",
        "warning-800": "#b09329"
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        scroll2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      },
    }
  },
  plugins: [],
}

