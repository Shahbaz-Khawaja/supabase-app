import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useStyles } from "views/passwordRecovery/PasswordRecoveryPage.style";
import PasswordRecoveryForm from "components/Forms/PasswordRecoveryForm/PasswordRecoveryForm";
import { BASE_URL } from "utils/constants/constants";

const PasswordRecoveryPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.mainContent}>
      <Typography variant="h1">Password Recovery</Typography>
      <Typography variant="h6" sx={{ mt: "1rem" }}>
        Please fill in the email you have used to create your jetic account and
        we will send you a link to reset your password
      </Typography>
      <div className={classes.inputForm}>
        <PasswordRecoveryForm />
      </div>
      <div className={classes.center}>
        <Link to={BASE_URL} className={classes.link}>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;
