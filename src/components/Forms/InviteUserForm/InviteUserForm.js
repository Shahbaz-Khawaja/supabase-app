import { inviteUser } from "store";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ROLES from "utils/constants/roles.constant";
import { supabase } from "supabase/supabase_client";
import { useSelector, useDispatch } from "react-redux";
import { Divider, Box, Alert } from "@mui/material";
import { inviteUserSchema } from "utils/schemas/invite_user_schema";
import CustomTextField from "components/CustomTextField/CustomTextField";
import { style } from "components/Forms/InviteUserForm/InviteUserForm.style";
import CustomSelectTextField from "components/CustomSelectTextField/CustomSelectTextField";
import CustomProgressButton from "components/CustomProgressButton/CustomProgressButton";

const InviteUserForm = ({ handleCloseDialog, handleOpenSnackBar }) => {
  const [emailExist, setEmailExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = { email: "", selectRole: ROLES[0].role };
  const usersList = useSelector((state) => state.userReducer.allUsers);
  const users = usersList.map((user) => {
    return user.email;
  });
  const dispatch = useDispatch();

  const handleFocus = () => {
    setEmailExist(false);
  };

  const submitHandler = (values) => {
    const data = ROLES.filter((row) => {
      return row.role === values.selectRole;
    });
    const priority = data[0].priority;

    const handleUserInvite = async () => {
      try {
        setLoading(true);
        const { data } = await supabase.functions.invoke("invite-user", {
          body: JSON.stringify({
            email: values.email,
            role: values.selectRole,
            priority: priority,
          }),
        });
        const userData = {
          id: data.id,
          email: data.email,
          role: data.user_metadata.role,
          previousStatus: data.user_metadata.previousStatus,
          currentStatus: data.user_metadata.currentStatus,
        };
        dispatch(inviteUser(userData));
        setLoading(false);
        handleOpenSnackBar();
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      } finally {
        handleCloseDialog();
        setLoading(false);
      }
    };

    if (users.includes(values.email)) {
      setEmailExist(true);
    } else {
      setEmailExist(false);
      handleUserInvite();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={inviteUserSchema}
      onSubmit={submitHandler}
    >
      {() => (
        <Form>
          <Box sx={{ ...style.form }}>
            <CustomTextField
              name="email"
              placeholder="E-mail"
              label="E-mail"
              onFocus={handleFocus}
            />
            <CustomSelectTextField
              name="selectRole"
              label="Role"
              items={ROLES.map((row) => {
                return row.role;
              })}
            />
          </Box>
          <Divider />
          {emailExist && <Alert severity="error">Email already Existed.</Alert>}

          <Box sx={{ ...style.invite }}>
            <CustomProgressButton
              type="submit"
              title="send Invite"
              icon={<SendIcon />}
              loading={loading}
              size="small"
              variant="contained"
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default InviteUserForm;

InviteUserForm.propTypes = {
  handleCloseDialog: PropTypes.func,
  handleOpenSnackBar: PropTypes.func,
};
