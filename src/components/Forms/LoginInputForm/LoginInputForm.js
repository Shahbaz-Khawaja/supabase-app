import React from "react";
import { supabase } from "supabase/supabase_cient";
import { Formik, Form } from "formik";
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
import CustomTextField from "components/CustomTextField/CustomTextField";
import { PASSWORD_RECOVERY_URL } from "utils/constants/constants";

const LoginInputForm = () => {
  const initialValues = { email: "", password: "" };
  const classes = useStyles();
  // supabase.auth.onAuthStateChange(async (event, session) => {
  //   const { user, error } = await supabase.auth.api.getUser(
  //     session.access_token
  //   );
  //   console.log(user, error);
  // });

  const submitHandler = async (values) => {
    console.log(values);
    try {
      const response = await supabase.auth.signIn({
        email: values.email,
        password: values.password,
      });
      if (response.error) throw response.error;
      alert("Email sent successfully");
    } catch (error) {
      alert(error.message);
    } finally {
      values.email = "";
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
          <div className={classes.form}>
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

            <div className={classes.forgotPassword}>
              <Link to={PASSWORD_RECOVERY_URL} className={classes.link}>
                Forgot password?
              </Link>
            </div>
            <Divider />
          </div>

          <div className={classes.loginActions}>
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
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginInputForm;
