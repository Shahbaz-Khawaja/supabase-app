import React from "react";
import { supabase } from "supabase/supabaseClient";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "utils/schema";

const InputForm = () => {
  const initialValues = { email: "" };

  const submitHandler = async (values) => {
    try {
      const { error } = await supabase.auth.signIn({
        email: values.email,
      });

      if (error) throw error;
      alert("check your email for magic link");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };
  return (
    <>
      <h1>Input Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {() => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="span" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default InputForm;
