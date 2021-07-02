const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      lato: ["Lato", ...defaultTheme.fontFamily.sans],
      roboto: ["Roboto", ...defaultTheme.fontFamily.serif],
      sumana: ["Sumana", ...defaultTheme.fontFamily.serif],
    },
    extend: {
      colors: {
        gray: {
          dark: "#6D6E71",
          DEFAULT: "#797D88",
          light: "#E3E5EC",
          lightest: "#EFF1F5",
          message: "#EBEBEB",
        },
        blue: {
          dark: "#0A2533",
          facebook: "#2F80ED",
        },
        alert: "#A71326",
        success: "#69C787",
        warning: {
          highlight: "#FFAC33",
          background: "#FBEAD1",
        },
        action: {
          secondary: {
            DEFAULT: "#325E7C",
            inactive: "#9BB9CE",
          },
          primary: {
            DEFAULT: "#B4336A",
            inactive: "#DDB0C3",
          },
        },
        status: {
          on: "#69C787",
          off: "#FFAC33",
        },
        "modal-overlay": "rgba(0, 0, 0, 0.4)",
      },
      spacing: {
        90: "22.5rem",
        106: "26.5rem",
        112: "28rem",
        128: "32rem",
      },
      maxWidth: {
        215: "860px",
      },
      boxShadow: {
        drop: "0px 1px 10px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      textColor: ["disabled"],
      overflow: ["hover"],
      whitespace: ["hover"],
      cursor: ["focus", "disabled"],
    },
  },
  plugins: [],
};
