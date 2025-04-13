import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      fontFamily: {
        conthrax: ["Conthrax", "sans-serif"],
      },
      colors: {
        "dark-ocean": "#00161D",
        "cyan-neon": "#03FAFA"
      },
      backgroundImage: {
        'header': "url('/images/bg-header.svg')",
      }
    }
  },
};
export default config;
