import {
  Divider,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { Form, Formik } from "formik";
import { supabase } from "supabase/supabase_client";
import { signup_schema } from "utils/schemas/signup_schema";
import { style } from "components/Forms/SignupForm/SignUpForm.style";
import CustomTextField from "components/CustomTextField/CustomTextField";
import { useNavigate } from "react-router-dom";
import PATH from "utils/constants/path.constant";
import CustomProgressButton from "components/CustomProgressButton/CustomProgressButton";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp(
        {
          email: values.email,
          password: values.password,
        },
        {
          data: {
            name: values.name,
            role: "Candidate",
            priority: 1,
            previousStatus: "Email not Confirmed",
            currentStatus: "Email not Confirmed",
          },
          redirectTo: "http://localhost:3000/",
        }
      );
      if (error) throw error;
      setLoading(false);
      navigate(PATH.CONFIRMATION);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    } finally {
      values.name = "";
      values.email = "";
      values.password = "";
      values.confirmPassword = "";
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signup_schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Box sx={{ ...style.form }}>
            <CustomTextField
              autoFocus
              name="name"
              label="Name"
              placeholder="Name"
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
          </Box>
          <Divider />

          <Box sx={{ ...style.terms }}>
            <Box sx={{ ...style.action }}>
              <FormControlLabel
                control={<Checkbox checked={true} sx={{ color: "#EEEFEF" }} />}
                label={
                  <Box sx={{ ...style.action }}>
                    <Typography variant="body2" sx={{ mr: "6px" }}>
                      I&apos;ve read and accept the
                    </Typography>
                    <Link href="#" underline="none" sx={{ ...style.link }}>
                      Terms of Service
                    </Link>
                  </Box>
                }
              />
            </Box>
            <Box sx={{ ...style.action }}>
              <FormControlLabel
                control={<Checkbox checked={true} sx={{ color: "#EEEFEF" }} />}
                label={
                  <Typography variant="body2">
                    Subscribe to the newsletter to stay up to date
                  </Typography>
                }
              />
            </Box>
            <Box sx={{ ...style.createAccountBtn }}>
              <CustomProgressButton
                type="submit"
                title="Create Account"
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

export default SignUpForm;
