import React, { useState } from "react";
import PropTypes from "prop-types";
import { MenuItem, TextField, Typography } from "@mui/material";
import { useField } from "formik";
import {
  useStyles,
  style,
} from "components/CustomSelectTextField/CustomSelectTextField.style";

const CustomSelectTextField = ({ label, name, roles }) => {
  const classes = useStyles();
  const [role, setRole] = useState("Please Select");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    console.log(event.target.value);
  };

  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    variant: "outlined",
  };
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <div className={classes.field}>
      <Typography sx={{ ...style.label }}>{label}</Typography>
      <TextField
        select
        fullWidth
        defaultValue={role}
        onChange={handleRoleChange}
        {...configTextField}
        sx={{ ...style.textField }}
      >
        {roles.map((role, idx) => (
          <MenuItem key={idx} value={role} sx={{ ...style.menuItem }}>
            {role}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default CustomSelectTextField;
CustomSelectTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
};
