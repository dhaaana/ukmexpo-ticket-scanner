const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", ...fontFamily.sans],
        magic: ["Letter Magic"],
      },
      colors: {
        dark: "#222222",
        cgreen: "#62B497",
        ccream: "#FAD0B6",
        cgreenb: "#CDDD91",
        cblack: "#3C3C3B",
        cpurple: "#A967A3",
        cpurpleb: "#F4B2F5",
        cyellow: "#FCCC81",
        corange: "#F18E3E",
        cred: "#E63B2B",
        cpeach: "#EE7F80",
        cgreenc: "#F5EFB2",
        cwhite: "#FBF8F3",
        cgrey: "#6A6A6A",
        // Light
        clightorange: "#FBF8F3",
        clightgreen: "#F5FBF3",
        clightpurple: "#F9F3FB",
        clightred: "#FBF3F3",
        clightpink: "#FBF3FB",
      },
      keyframes: {
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
            opacity: 0.99,
            filter:
              "drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))",
          },
          "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
            opacity: 0.4,
            filter: "none",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-700px 0",
          },
          "100%": {
            backgroundPosition: "700px 0",
          },
        },
        wiggle: {
          "0%": {
            transform: "translateY(-0.25rem)",
          },
          "40%": {
            transform: "translateY(-0.15rem)",
          },
          "100%": {
            transform: "translateY(0rem)",
          },
        },
      },
      animation: {
        flicker: "flicker 3s linear infinite",
        shimmer: "shimmer 1.3s linear infinite",
        wiggle: "wiggle 0.25s ease-out",
      },
    },
  },
  plugins: [],
};
