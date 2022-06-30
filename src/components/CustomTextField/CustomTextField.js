import React from "react";
import PropTypes from "prop-types";
import { TextField, Typography } from "@mui/material";
import { useField } from "formik";
import {
  useStyles,
  style,
} from "components/CustomTextField/CustomTextField.style";

const CustomTextField = ({ label, name, ...otherProps }) => {
  const classes = useStyles();
  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    variant: "outlined",
    inputProps: { style: { ...style.textField } },
  };
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <div className={classes.field}>
      <Typography sx={{ ...style.label }}>{label}</Typography>
      <TextField {...configTextField} sx={{ ...style.helperText }} />
    </div>
  );
};

export default CustomTextField;
CustomTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
