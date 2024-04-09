/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
		  colors: {
        fondo: '#F9FAFB',
        fondoDark: '#121826',
        fondoV2Dark: '#212936',
        grayBorder: '#E5E7EB',
        grayBorderDark: '#4d5562',
        blueBTN: '#3662E3'
		  }
    },
    fontFamily: { inter: ['inter', 'sans-serif'] }
	  },
  plugins: [],
  darkMode: 'class'
}
