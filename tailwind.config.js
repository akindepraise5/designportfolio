/** @type {import('tailwindcss').Config} */
export default {
  // Scan both: index.html carries the boot shell and page chrome, src/app.jsx
  // carries everything React renders.
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: []
};
