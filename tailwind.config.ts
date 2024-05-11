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
        "400": "400px",
        "500": "500px",
        "600": "600px",
      },
      maxWidth: {
        "70": "70%",
        half1: "calc(100% - 300px)",
      },
      maxHeight: {
        screen1: "calc(100vh - 2.5rem)",
      },
    },
  },
  plugins: [],
};
export default config;
