import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        "300": "300px",
      },
      maxWidth: {
        "70": "70%",
        half1: "calc(100% - 300px)",
      },
    },
  },
  plugins: [],
};
export default config;
