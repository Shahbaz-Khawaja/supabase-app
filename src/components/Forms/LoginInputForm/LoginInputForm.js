import { Formik, Form } from "formik";
import { supabase } from "supabase/supabase_client";
import { loginSchema } from "utils/schemas/login_schema";
import {
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Box,
  Alert,
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
import CustomProgressButton from "components/CustomProgressButton/CustomProgressButton";

const LoginInputForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userAllowed, setUserAllowed] = useState(true);
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
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
          avatarURL: data.user.user_metadata.avatarURL,
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
        setLoading(false);
        navigate(PATH.USER_DASHBOARD);
      }
    } catch (error) {
      setLoading(false);
      setIsError(error.message);
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
          {!userAllowed && (
            <Alert severity="error" sx={{ mt: "1rem" }}>
              User not Allowed, Please contact Admin.
            </Alert>
          )}
          {isError && (
            <Alert severity="error" sx={{ mt: "1rem" }}>
              {isError}
            </Alert>
          )}
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
          </Box>

          <Box sx={{ ...style.loginActions }}>
            <FormControlLabel
              control={<Checkbox sx={{ color: "#EEEFEF" }} />}
              label={<Typography variant="body2">Remember me</Typography>}
            />
            <Box>
              <CustomProgressButton
                type="submit"
                title="Login"
                loading={loading}
                style={style.loginBtn}
                size="small"
                variant="contained"
              />
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginInputForm;
