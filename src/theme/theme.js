import { createTheme } from "@mui/material";

const theme = {
  button: {
    fontFamily: ["Nunito Sans", "sans-serif"].join(","),
  },
  typography: {
    fontFamily: ["Nunito Sans", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
    h1: { fontWeight: "bold", fontSize: "30px", letterSpacing: "1px" },
    h2: { fontSize: "20px", fontWeight: "bold", letterSpacing: "1px" },
    h3: { fontSize: "14px", fontWeight: "bold", letterSpacing: "1px" },
    h4: { fontSize: "12px", fontWeight: "bold", letterSpacing: "1px" },
    h5: { fontSize: "11px", fontWeight: "bold", letterSpacing: "1px" },
    h6: { fontSize: "0.85rem", opacity: "0.65" },
  },
};

const lightTheme = createTheme({
  ...theme,
  palette: {
    mode: "light",
    primary: {
      main: "#2571CB",
      light: "#E3ECF5",
    },
    error: {
      main: "#d32f2f",
      light: "#ffe0e0",
    },
  },
});

const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: "dark",
    primary: {
      main: "#2571CB",
      light: "#2D3F55",
    },
    error: {
      main: "#d32f2f",
      light: "#422b28",
    },
  },
});

const THEME = {
  lightTheme,
  darkTheme,
};

export default THEME;
