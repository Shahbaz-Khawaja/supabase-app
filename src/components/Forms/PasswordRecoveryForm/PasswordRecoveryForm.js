import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Divider, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PATH from "utils/constants/path.constant";
import { supabase } from "supabase/supabase_client";
import CustomTextField from "components/CustomTextField/CustomTextField";
import { passwordRecoverySchema } from "utils/schemas/password_recovery_schema";
import CustomProgressButton from "components/CustomProgressButton/CustomProgressButton";
import { style } from "components/Forms/PasswordRecoveryForm/PasswordRecoveryForm.style";
import { NETLIFY_URL } from "utils/constants/path.constant";

const PasswordRecoveryForm = () => {
  const initialValues = { email: "" };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.api.resetPasswordForEmail(
        values.email,
        { redirectTo: `${NETLIFY_URL}/reset_password` }
      );
      if (error) throw error;
      navigate(PATH.CONFIRMATION);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
            <CustomProgressButton
              type="submit"
              title="Reset Password"
              loading={loading}
              style={style.resetBtn}
              size="small"
              variant="contained"
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordRecoveryForm;
