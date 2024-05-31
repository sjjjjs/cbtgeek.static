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
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}

