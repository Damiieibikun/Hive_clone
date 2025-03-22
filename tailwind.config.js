/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      fontFamily: {
        sansRegularPro: ['SansRegularPro', 'sans-serif'],
        sansSemiBoldPro: ['SansSemiBoldPro', 'sans-serif'],
        sansOther: ['SansOther', 'sans-serif'],
      }
    },
  },
  plugins: [],
  darkMode: 'class',
};
