import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { BASE_URL } from "utils/constants/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useStyles } from "views/updatePassword/UpdatePasswordPage.style";
import UpdatePasswordForm from "components/Forms/UpdatePasswordForm/UpdatePasswordForm";

const UpdatePasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    if (!location.hash || location.hash.includes("error_code=401")) {
      navigate(BASE_URL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.mainContent}>
      <Typography variant="h1">Update Password</Typography>
      <Typography variant="h6" sx={{ mt: "1rem" }}>
        Please fill in the password you want to use for furthur Logins. and we
        will make this password available for you.
      </Typography>
      <div className={classes.inputForm}>
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
