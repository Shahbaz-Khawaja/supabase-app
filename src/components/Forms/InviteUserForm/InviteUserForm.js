import { inviteUser } from "store";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { roles } from "utils/constants/constants";
import { supabase } from "supabase/supabase_client";
import { useSelector, useDispatch } from "react-redux";
import { Button, Divider, Box, Typography } from "@mui/material";
import { inviteUserSchema } from "utils/schemas/invite_user_schema";
import CustomTextField from "components/CustomTextField/CustomTextField";
import { style } from "components/Forms/InviteUserForm/InviteUserForm.style";
import CustomSelectTextField from "components/CustomSelectTextField/CustomSelectTextField";

const InviteUserForm = ({ handleCloseDialog, handleOpenSnackBar }) => {
  const [emailExist, setEmailExist] = useState(false);
  const initialValues = { email: "", selectRole: roles[0] };
  const usersList = useSelector((state) => state.userReducer.allUsers);
  const users = usersList.map((user) => {
    return user.email;
  });
  const dispatch = useDispatch();

  const handleFocus = () => {
    setEmailExist(false);
  };

  const submitHandler = (values) => {
    const handleUserInvite = async () => {
      try {
        const { data } = await supabase.functions.invoke("invite-user", {
          body: JSON.stringify({
            email: values.email,
            role: values.selectRole,
          }),
        });
        const userData = {
          id: data.id,
          email: data.email,
          role: data.user_metadata.role,
          status: data.email_confirmed_at ? "Confirmed" : "In-Progress",
        };
        handleOpenSnackBar();
        dispatch(inviteUser(userData));
      } catch (error) {
        console.error(error.message);
      } finally {
        handleCloseDialog();
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
              items={roles}
            />
          </Box>
          <Divider />
          {emailExist ? (
            <Box
              sx={{
                ...style.errorInvite,
              }}
            >
              <Typography variant="body2" color="error.main" fontWeight="bold">
                Email already Existed.
              </Typography>
            </Box>
          ) : null}

          <Box sx={{ ...style.invite }}>
            <Button
              disabled={emailExist}
              variant="contained"
              type="submit"
              size="small"
              endIcon={<SendIcon />}
            >
              send Invite
            </Button>
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
