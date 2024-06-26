/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:["Poppins","sans-serif"],
      },
      colors:{
        primary:"#8b5cf6",
        secondary:"#6d28d9",
        violet_300:"#c4b5fd",
        bege:"#e6ccb2",
        golden:"#FFD700",
        green:"#556B2F",
        golden1:"#FFD700",
        brown:"#9c6644",
        gray:"#f8fafc",
        gray800:"#334155",
        grayLight:"#d4d4d8",
        stone950:"#0c0a09"

      },
      container:{
        center:true,
        padding:{
          DEFAULT:"1rem",
          sm:"3rem"
        }
      }
    },
    
  },
  plugins: [],
}

