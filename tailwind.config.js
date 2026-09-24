/** @type {import('tailwindcss').Config} */
export default {
  // Scan both: index.html carries the boot shell and page chrome, src/app.jsx
  // carries everything React renders.
  content: ['./index.html', './src/**/*.{js,jsx}'],

  // An explicit class/attribute strategy is not needed: theming happens
  // entirely through the CSS variables declared in src/tailwind.css, so a
  // utility like `text-ink` is correct in both themes without a dark: variant.
  theme: {
    extend: {
      colors: {
        ground: 'var(--ground)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        sunk: 'var(--sunk)',

        ink: 'var(--ink)',
        'body-strong': 'var(--body-strong)',
        body: 'var(--body)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',

        rule: 'var(--rule)',
        'rule-strong': 'var(--rule-strong)',

        inverse: 'var(--inverse)',
        'on-inverse': 'var(--on-inverse)',
        panel: 'var(--panel)',
        'panel-hover': 'var(--panel-hover)',

        focusring: 'var(--focus)'
      }
    }
  },

  plugins: []
};
