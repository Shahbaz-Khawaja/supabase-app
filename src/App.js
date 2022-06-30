import React from "react";
import LoginPage from "views/login/LoginPage";
import PasswordRecoveryPage from "views/passwordRecovery/PasswordRecoveryPage";
import LoginLayout from "layouts/LoginLayout/LoginLayout";
import { createTheme, ThemeProvider } from "@mui/material";
import SignUpPage from "views/signup/SignUpPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BASE_URL } from "utils/constants/constants";
import { REGISTRATION_URL } from "utils/constants/constants";
import { PASSWORD_RECOVERY_URL } from "utils/constants/constants";

const theme = createTheme({
  overrides: {},
  palette: {
    primary: {
      main: "#88367F",
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
    h1: { fontWeight: "bold", fontSize: "30px" },
    h5: { fontSize: "0.85rem", opacity: "0.75" },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LoginLayout>
        <Router>
          <Routes>
            <Route exact path={BASE_URL} element={<LoginPage />} />
            <Route exact path={REGISTRATION_URL} element={<SignUpPage />} />
            <Route
              exact
              path={PASSWORD_RECOVERY_URL}
              element={<PasswordRecoveryPage />}
            />
          </Routes>
        </Router>
      </LoginLayout>
    </ThemeProvider>
  );
};

export default App;
