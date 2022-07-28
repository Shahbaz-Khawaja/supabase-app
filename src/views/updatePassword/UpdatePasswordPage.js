import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import PATH from "utils/constants/path.constant";
import { supabase } from "supabase/supabase_client";
import { useLocation, useNavigate } from "react-router-dom";
import { useStyles } from "views/updatePassword/UpdatePasswordPage.style";
import UpdatePasswordForm from "components/Forms/UpdatePasswordForm/UpdatePasswordForm";
import STATUS from "utils/constants/status.constant";

const UpdatePasswordPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const getAcessToken = (hash_URL) => {
    const parts = hash_URL.split("&");
    const params = parts.reduce((map, part) => {
      const pieces = part.split("=");
      map[pieces[0]] = pieces[1];
      return map;
    }, {});
    return params["#access_token"];
  };

  const handleUpdatePassword = async (password, setLoading) => {
    try {
      setLoading(true);
      const { user } = await supabase.auth.update({
        password: password,
        data: {
          previousStatus: STATUS.registered,
          currentStatus: STATUS.registered,
        },
      });
      await supabase.from("Employees").insert({ user_id: user.id });
      await supabase.from("Banking Info").insert({ user_id: user.id });
      navigate(PATH.BASE_URL);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (location.hash) {
      const accessToken = getAcessToken(location.hash);
      if (!accessToken) {
        navigate(PATH.BASE_URL);
      }
      supabase.auth.onAuthStateChange((event, session) => {
        if (event !== "SIGNED_IN" && accessToken !== session?.access_token) {
          navigate(PATH.BASE_URL);
        }
      });
    } else if (!location.hash || location.hash.includes("error_code=401")) {
      navigate(PATH.BASE_URL);
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
        <UpdatePasswordForm onSubmit={handleUpdatePassword} />
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
