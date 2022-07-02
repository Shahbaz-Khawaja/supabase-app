import React from "react";
import { Formik, Form } from "formik";
import { inviteUserSchema } from "utils/schemas/invite_user_schema";
import {
  Button,
  Divider,
  Box,
  // MenuItem,
  // FormControl,
  // Select,
  // InputLabel,
} from "@mui/material";
import { useStyles } from "components/Forms/InviteUserForm/InviteUserForm.style";
import CustomTextField from "components/CustomTextField/CustomTextField";
import CustomSelectTextField from "components/CustomSelectTextField/CustomSelectTextField";

const InviteUserForm = () => {
  // const [role, setRole] = useState();
  const initialValues = { email: "", selectRole: "" };
  const classes = useStyles();
  const roles = ["Admin", "Manager", "Member", "Trainee", "Candidate"];

  const submitHandler = async (values) => {
    console.log(values);
  };

  // const handleRoleChange = (event) => {
  //   console.log(role);
  //   console.log(event.target.value);
  //   setRole(event.target.value);
  // };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={inviteUserSchema}
      onSubmit={submitHandler}
    >
      {() => (
        <Form>
          <div className={classes.form}>
            <CustomTextField name="email" placeholder="E-mail" label="E-mail" />
            <CustomSelectTextField
              value="Please Select"
              name="selectRole"
              label="Role"
              roles={roles}
            />
            {/* <FormControl variant="outlined" style={{ minWidth: 244 }}>
              <InputLabel id="demo-simple-select-label">
                Calendar to Add Event
              </InputLabel>
              <Select
                // key="select"
                // id="demo-simple-select"
                label="Please Select"
                labelWidth={150}
                labelId="demo-simple-select-label"
                value={role}
                onChange={handleRoleChange}
                fullWidth
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </div>
          <Divider />

          <Box className={classes.invite}>
            <Button variant="contained" type="submit" size="small">
              send Invite
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default InviteUserForm;
