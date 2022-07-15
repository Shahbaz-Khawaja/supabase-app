import { createTheme } from "@mui/material";

export const theme = createTheme({
  overrides: {},
  palette: {
    primary: {
      main: "#88367F",
      light: "#F1E7EF",
    },
    secondary: {
      main: "rgb(249 249 251)",
    },
  },
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
    h5: { fontSize: "10px", fontWeight: "bold" },
    h6: { fontSize: "0.85rem", opacity: "0.65" },
  },
});
