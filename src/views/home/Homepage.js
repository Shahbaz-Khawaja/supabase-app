import React from "react";
import { Typography, Button, Divider } from "@mui/material";
import InputForm from "components/InputForm/InputForm";
import LogoHeader from "components/LogoHeader/LogoHeader";
import { useStyles } from "./Homepage.style";

const Homepage = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.loginPage}>
        <div className={classes.login}>
          <LogoHeader />
          <Divider />
          <div className={classes.loginContent}>
            <Typography
              style={{ fontWeight: "bold", fontSize: "30px" }}
              className={classes.textLogin}
            >
              Log in
            </Typography>
            <Typography>
              Welcome to the jetic platform, please enter your login credentials
              below to start using the application
            </Typography>
            <InputForm />
            <Typography>Don&apos;t have an account?</Typography>
            <Button>Create Account</Button>
          </div>
        </div>
        <div className={classes.sladder}></div>
      </div>
    </>
  );
};

export default Homepage;
