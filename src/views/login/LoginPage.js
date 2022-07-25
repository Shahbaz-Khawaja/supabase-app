import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import PATH from "utils/constants/path.constant";
import { supabase } from "supabase/supabase_client";
import { useStyles } from "views/login/LoginPage.style";
import LoginInputForm from "components/Forms/LoginInputForm/LoginInputForm";

const LoginPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const updateStatus = async () => {
    try {
      const { error } = await supabase.auth.update({
        data: {
          previousStatus: "Email Confirmed",
          currentStatus: "Email Confirmed",
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const getAcessToken = (hash_URL) => {
    const parts = hash_URL.split("&");
    const params = parts.reduce((map, part) => {
      const pieces = part.split("=");
      map[pieces[0]] = pieces[1];
      return map;
    }, {});
    return params["#access_token"];
  };

  useEffect(() => {
    const accessToken = getAcessToken(location.hash);
    if (location.hash) {
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN" && accessToken === session.access_token) {
          updateStatus();
        }
      });
    } else if (!location.hash || location.hash.includes("error_code=401")) {
      navigate(PATH.BASE_URL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={classes.loginContent}>
        <Typography variant="h1">Log in</Typography>
        <Typography variant="h6" sx={{ mt: "1rem" }}>
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

          <Link to={PATH.REGISTRATION_URL} className={classes.link}>
            Create Account
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
