import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { supabase } from "supabase/supabaseClient";
import { validationSchema } from "utils/schema";

function InputForm(props) {
  // const [loading, setLoading] = useState(false);
  // const [email, setEmail] = useState("");

  const initialValues = {
    email: '',
  };

  // const emailChangeHandler = (e) => {
  //   setEmail(e.target.value);
  // };

  const submitHandler = async (e, values) => {
    e.preventDefault();
    try {
      // setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        email: values.email,
        // email: email,
      });
      console.log(user);
      console.log(session);
      if (error) throw error;
      alert("check your email for magic link");
      // setEmail("");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      // setLoading(false);
    }

    console.log(values.email);
  };

  return (
    <div>
      <h1>Formik form</h1>
      <TextField label='Outlined' variant="outlined"/>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {() => {
          <Form>
            {/* <TextField label='Outlined' variant="outlined"/> */}
            <Field type='email' name='email'/>
            <ErrorMessage name="email" component='div'/>
            <Button type="submit">Submit</Button>
          </Form>
        }}
      </Formik>
      {/* {loading ? (
        <h2>sending magic link</h2>
      ) : (
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={emailChangeHandler}
          />
          <button type="submit">submit</button>{loading ? (
        <h2>sending magic link</h2>
      ) : (
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={emailChangeHandler}
          />
          <button type="submit">submit</button>
        </form>
      )}
        </form>
      )} */}
    </div>
  );
}

export default InputForm;
