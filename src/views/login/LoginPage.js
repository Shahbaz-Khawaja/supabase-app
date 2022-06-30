import React from "react";
import { useStyles, style } from "views/login/LoginPage.style";
import LoginInputForm from "components/Forms/LoginInputForm/LoginInputForm";
import { Typography, Link } from "@mui/material";
import { REGISTRATION_URL } from "utils/constants/constants";

const LoginPage = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.loginContent}>
        <Typography variant="h1">Log in</Typography>
        <Typography variant="h5" sx={{ mt: "1rem" }}>
          Welcome to the jetic platform, please enter your login credentials
          below to start using the application
        </Typography>
        <div className={classes.LoginInputForm}>
          <LoginInputForm />
        </div>
        <div className={classes.action}>
          <Typography variant="body2" sx={{ mr: "6px" }}>
            Don&apos;t have an account?
          </Typography>
          <Link href={REGISTRATION_URL} underline="none" sx={{ ...style.link }}>
            Create Account
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
