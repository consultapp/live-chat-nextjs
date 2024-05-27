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
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)", transformOrigin: "center" },
          "100%": { transform: "rotate(360deg)", transformOrigin: "center" },
        },
      },
      animation: {
        rotate: "rotate 1s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
