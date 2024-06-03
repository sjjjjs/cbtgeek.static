/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./docs/**/*.md"
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'tech-team-bg': '/assets/tech-team-bg.png'
      }
    },
  },
  daisyui: {
    themes: ["corporate"],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}

