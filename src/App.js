import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "theme/theme";
import { CssBaseline } from "@mui/material";
import UserRoutes from "routes/UserRoutes/UserRoutes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserRoutes />
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
