import React from "react";
import { Formik, Form } from "formik";
import { updatePasswordSchema } from "utils/schemas/update_password_schema";
import { Button, Divider, Box } from "@mui/material";
import { style } from "components/Forms/PasswordRecoveryForm/PasswordRecoveryForm.style";
import CustomTextField from "components/CustomTextField/CustomTextField";
import { supabase } from "supabase/supabase_client";
import { useNavigate } from "react-router-dom";
import STATUS from "utils/constants/status.constant";
import PATH from "utils/constants/path.constant";

const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const initialValues = { password: "", confirmPassword: "" };

  const submitHandler = async (values) => {
    const userRole = supabase.auth.user().user_metadata.role;
    try {
      const { user } = await supabase.auth.update({
        password: values.password,
        data: {
          previousStatus: userRole !== "Candidate" && STATUS.registered,
          currentStatus: userRole !== "Candidate" && STATUS.registered,
        },
      });
      await supabase.from("Employees").insert({ user_id: user.id });
      await supabase.from("Banking Info").insert({ user_id: user.id });

      alert("updated password successfully.");
      navigate(PATH.BASE_URL);
    } catch (error) {
      console.error(error);
    }
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
            <Button
              variant="contained"
              type="submit"
              size="small"
              sx={{ ...style.updateBtn }}
            >
              Update Password
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePasswordForm;
