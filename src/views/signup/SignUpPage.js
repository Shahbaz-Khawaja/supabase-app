import React from "react";
import { Typography, Link } from "@mui/material";
import { useStyles, style } from "views/signup/SignUpPage.style";
import SignUpForm from "components/Forms/SignupForm/SignUpForm";
import { BASE_URL } from "utils/constants/constants";

const SignUpPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContent}>
      <Typography variant="h1">Create Account</Typography>
      <Typography variant="h5">
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
        <Link href={BASE_URL} underline="none" sx={{ ...style.link }}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
