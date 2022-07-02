import React from "react";
import LoginPage from "views/login/LoginPage";
import PasswordRecoveryPage from "views/passwordRecovery/PasswordRecoveryPage";
import LoginLayout from "layouts/LoginLayout/LoginLayout";
import SignUpPage from "views/signup/SignUpPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BASE_URL } from "utils/constants/constants";
import { REGISTRATION_URL } from "utils/constants/constants";
import { PASSWORD_RECOVERY_URL } from "utils/constants/constants";
import { createTheme, ThemeProvider } from "@mui/material";
import DashboardLaout from "layouts/dashboardLayout/DashboardLaout";
import AdminDashboard from "views/AdminDashboard/AdminDashboard";
import { ADMINDASHBOARD } from "utils/constants/constants";

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
    h1: { fontWeight: "bold", fontSize: "30px", letterSpacing: "1px" },
    h2: { fontSize: "20px", fontWeight: "bold", letterSpacing: "1px" },
    h3: { fontSize: "16px", fontWeight: "bold", letterSpacing: "1px" },
    h4: { fontSize: "12px", fontWeight: "bold" },
    h5: { fontSize: "10px", fontWeight: "bold" },
    h6: { fontSize: "0.85rem", opacity: "0.65" },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            exact
            path={BASE_URL}
            element={
              <LoginLayout>
                <LoginPage />
              </LoginLayout>
            }
          />
          <Route
            exact
            path={REGISTRATION_URL}
            element={
              <LoginLayout>
                <SignUpPage />
              </LoginLayout>
            }
          />
          <Route
            exact
            path={PASSWORD_RECOVERY_URL}
            element={
              <LoginLayout>
                <PasswordRecoveryPage />
              </LoginLayout>
            }
          />
          <Route
            exact
            path={ADMINDASHBOARD}
            element={
              <DashboardLaout>
                <AdminDashboard />
              </DashboardLaout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
