import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PATH from "utils/constants/path.constant";
import { useStyles } from "views/signup/SignUpPage.style";
import SignUpForm from "components/Forms/SignupForm/SignUpForm";

const SignUpPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContent}>
      <Typography variant="h1">Create Account</Typography>
      <Typography variant="h6">
        Creating an account is free of charge and no credit card information
        will be needed.
      </Typography>
      <div className={classes.inputForm}>
        <SignUpForm />
      </div>
      <div className={classes.action}>
        <Typography variant="body2" sx={{ mr: "6px" }}>
          Already have an account?
        </Typography>
        <Link to={PATH.BASE_URL} className={classes.link}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
