import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#761529",
        "primary-darker": "#4d0f1f",
        "primary-lighter": "#a32d4f",
        "primary-saturated": "#8b0f2a",
        "primary-desaturated": "#6b3a4a",
        "primary-tinted-white": "#ba8a94",
        "primary-faded": "#76152966",
        secondary: "#a8d3f5",
        "secondary-darker": "#5ba8e0",
        "secondary-lighter": "#d4e8f9",
        "secondary-vibrant": "#9bd0f7",
        "secondary-golden": "#7bb3d7",
        "secondary-warm": "#a8c8f5",
        "secondary-faded": "#a8d3f566",
      },
    },
  },
  plugins: [],
};
export default config;
