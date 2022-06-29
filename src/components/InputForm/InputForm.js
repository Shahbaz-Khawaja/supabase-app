import React from "react";
import { supabase } from "supabase/supabaseClient";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "utils/schema";
import { Button, FormControlLabel, Checkbox } from "@mui/material";

const InputForm = () => {
  const initialValues = { email: "" };
  // supabase.auth.onAuthStateChange(async (event, session) => {
  //   const { user, error } = await supabase.auth.api.getUser(
  //     session.access_token
  //   );
  //   console.log(user, error);
  // });

  const submitHandler = async (values) => {
    try {
      const response = await supabase.auth.signIn({
        email: values.email,
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
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {() => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="span" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="span" />
            <Button>Forgot password?</Button>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default InputForm;
