import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      sm: '0.8rem',
      normal: '20px',
      md: '24px',
      lg: '32px',
      xl: '40px',
      xxl: '48px',
      xxxl: '64px'
    },
    colors: {
      white: "#FFFFFF",
      black: '#1E1E1E',
      blue: "#2F7AEA",
      green: "#5ECC8B",
      gray: "#8B8D8F",
      lightGray: "#F8F9FB",
      darkGray: "#53585B",
      red: "#E60000",
    },
    extend: {
      screens: {
        'sm': '200px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
export default config
