import { Form, Formik } from "formik";
import React from "react";
import {
  Divider,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
} from "@mui/material";
import { signup_schema } from "utils/schemas/signup_schema";
import { useStyles, style } from "components/Forms/SignupForm/SignUpForm.style";
import CustomTextField from "components/CustomTextField/CustomTextField";

const SignUpForm = () => {
  const classes = useStyles();
  const initialValues = {
    name: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signup_schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div className={classes.form}>
            <CustomTextField
              autoFocus
              name="name"
              label="Name"
              placeholder="Name"
            />

            <CustomTextField
              name="companyName"
              label="Company Name"
              placeholder="Company Name"
            />

            <CustomTextField
              type="email"
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

            <CustomTextField
              type="password"
              name="confirmPassword"
              label="Repeat Password"
              placeholder="Repeat Password"
            />
          </div>
          <Divider />

          <div className={classes.terms}>
            <div className={classes.action}>
              <FormControlLabel
                control={<Checkbox checked={true} sx={{ color: "#EEEFEF" }} />}
                label={
                  <div className={classes.action}>
                    <Typography variant="body2" sx={{ mr: "6px" }}>
                      I&apos;ve read and accept the
                    </Typography>
                    <Link href="#" underline="none" sx={{ ...style.link }}>
                      Terms of Service
                    </Link>
                  </div>
                }
              />
            </div>
            <div className={classes.action}>
              <FormControlLabel
                control={<Checkbox checked={true} sx={{ color: "#EEEFEF" }} />}
                label={
                  <Typography variant="body2">
                    Subscribe to the newsletter to stay up to date
                  </Typography>
                }
              />
            </div>
            <Box className={classes.createAccountBtn}>
              <Button
                variant="contained"
                type="submit"
                size="small"
                sx={{ ...style.loginBtn }}
              >
                Create Account
              </Button>
            </Box>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
