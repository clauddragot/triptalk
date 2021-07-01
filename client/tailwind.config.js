module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ["Nunito"],
    },
    extend: {
      colors: {
        blue: {
          100: "#b1e1fb",
          200: "#7ecef7",
          300: "#4abbf3",
          400: "#22adf1",
          500: "#009fed",
          600: "#0091de",
          700: "#017eca",
          800: "#016eb6",
          900: "#034e94",
        },
        primary: {
          100: "#a8dfd8",
          200: "#6bcbbe",
          300: "#01b6a4",
          400: "#00a691",
          500: "#00957d",
          600: "#008870",
          700: "#007861",
          800: "#006852",
          900: "#004c36",
        },
        secondary: {
          100: "#e4bce9",
          200: "#d38fdb",
          300: "#c060cc",
          400: "#b23ac1",
          500: "#a401b6",
          600: "#9501b1",
          700: "#8100a9",
          800: "#6f00a2",
          900: "#4d0097",
        },
        alice: {
          100: "#e32c2d",
          200: "#afc2cb",
          300: "#1287A8",
          400: "#107896",
          500: "#F2F3F4",
        },
      },
      spacing: {
        70: "17.5rem",
        160: "40rem",
      },
      container: false,
    },
  },

  variants: {
    extend: {
      backgroundColor: ["disabled"],
      borderColor: ["disabled"],
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          "@screen sm": { maxWidth: "80%" },
          "@screen md": { maxWidth: "65%" },
          "@screen lg": { maxWidth: "65%" },
        },
      });
    },
  ],
};
