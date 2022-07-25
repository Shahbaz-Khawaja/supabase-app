import { Formik, Form } from "formik";
import { supabase } from "supabase/supabase_client";
import { loginSchema } from "utils/schemas/login_schema";
import {
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import {
  useStyles,
  style,
} from "components/Forms/LoginInputForm/LoginInputForm.style";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomTextField from "components/CustomTextField/CustomTextField";
import { logInUser } from "store";
import { useNavigate } from "react-router-dom";
import PATH from "utils/constants/path.constant";
import { useEffect, useState } from "react";
import STATUS from "utils/constants/status.constant";
import { logOutUser } from "store";

const LoginInputForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userAllowed, setUserAllowed] = useState(true);
  const initialValues = { email: "", password: "" };
  const user = useSelector((state) => state.authReducer.user);
  const classes = useStyles();

  useEffect(() => {
    if (user.id) {
      navigate(PATH.USER_DASHBOARD);
    } else {
      navigate(PATH.BASE_URL);
    }
  }, [user, navigate]);

  const submitHandler = async (values) => {
    try {
      const { data, error } = await supabase.auth.signIn({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;
      dispatch(
        logInUser({
          id: data.user.id,
          email: data.user.email,
          role: data.user.user_metadata.role,
          priority: data.user.user_metadata.priority,
          currentStatus: data.user.user_metadata.currentStatus,
          previousStatus: data.user.user_metadata.previousStatus,
        })
      );
      if (data.user.user_metadata.currentStatus === STATUS.deactivated) {
        supabase.auth.signOut();
        dispatch(logOutUser());
        setUserAllowed(false);
      } else {
        navigate(PATH.USER_DASHBOARD);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={submitHandler}
    >
      {() => (
        <Form>
          <Box sx={{ ...style.form }}>
            <CustomTextField
              autoFocus
              name="email"
              label="E-mail"
              placeholder="E-mail"
            />

            <CustomTextField
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
            />

            <Box sx={{ ...style.forgotPassword }}>
              <Link to={PATH.PASSWORD_RECOVERY_URL} className={classes.link}>
                Forgot password?
              </Link>
            </Box>
            <Divider />
            {!userAllowed && (
              <Box
                sx={{
                  ...style.errorLogin,
                }}
              >
                <Typography
                  variant="body2"
                  color="error.main"
                  fontWeight="bold"
                >
                  User not Allowed, Please contact Admin.
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ ...style.loginActions }}>
            <FormControlLabel
              control={<Checkbox sx={{ color: "#EEEFEF" }} />}
              label={<Typography variant="body2">Remember me</Typography>}
            />
            <Box>
              <Button
                variant="contained"
                type="submit"
                size="small"
                sx={{ ...style.loginBtn }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginInputForm;
