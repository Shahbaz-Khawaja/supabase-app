import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { Divider, Box } from "@mui/material";
import CustomTextField from "components/CustomTextField/CustomTextField";
import { updatePasswordSchema } from "utils/schemas/update_password_schema";
import { style } from "components/Forms/PasswordRecoveryForm/PasswordRecoveryForm.style";
import CustomProgressButton from "components/CustomProgressButton/CustomProgressButton";

const UpdatePasswordForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const initialValues = { password: "", confirmPassword: "" };

  const submitHandler = async (values) => {
    onSubmit(values.password, setLoading);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updatePasswordSchema}
      onSubmit={submitHandler}
    >
      {() => (
        <Form>
          <Box sx={{ ...style.form }}>
            <CustomTextField
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
            />
            <CustomTextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password"
            />
          </Box>
          <Divider />

          <Box sx={{ ...style.resetPassword }}>
            <CustomProgressButton
              type="submit"
              title="Update Password"
              loading={loading}
              style={style.updateBtn}
              size="small"
              variant="contained"
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePasswordForm;

UpdatePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
