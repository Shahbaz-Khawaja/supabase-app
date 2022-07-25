import React from "react";
import { ThemeProvider } from "@mui/material";
import THEME from "theme/theme";
import { CssBaseline } from "@mui/material";
import UserRoutes from "routes/UserRoutes/UserRoutes";
import { useSelector } from "react-redux";

const App = () => {
  const lightTheme = useSelector((state) => state.toggleReducer.lightTheme);
  return (
    <ThemeProvider theme={lightTheme ? THEME.lightTheme : THEME.darkTheme}>
      <UserRoutes />
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
