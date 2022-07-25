import React from "react";
import { Formik, Form } from "formik";
import { passwordRecoverySchema } from "utils/schemas/password_recovery_schema";
import { Button, Divider, Box } from "@mui/material";
import { style } from "components/Forms/PasswordRecoveryForm/PasswordRecoveryForm.style";
import CustomTextField from "components/CustomTextField/CustomTextField";
// import { supabase } from "supabase/supabase_client";

const PasswordRecoveryForm = () => {
  const initialValues = { email: "" };

  const submitHandler = async (values) => {
    //   try {
    //     const { data, error } = await supabase.auth.api.resetPasswordForEmail(
    //       values.email,
    //       { redirectTo: "http://localhost:3000/update_password" }
    //     );
    //     if (error) throw error;
    //     alert("plz confirm your Email");
    //   } catch (error) {
    //     console.error(error);
    //   }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={passwordRecoverySchema}
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
          </Box>
          <Divider />

          <Box sx={{ ...style.resetPassword }}>
            <Button
              variant="contained"
              type="submit"
              size="small"
              sx={{ ...style.resetBtn }}
            >
              Reset my password
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordRecoveryForm;
