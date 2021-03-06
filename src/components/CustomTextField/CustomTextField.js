import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import { TextField, Typography, Box } from "@mui/material";
import { style } from "components/CustomTextField/CustomTextField.style";

const CustomTextField = ({ label, name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    variant: "outlined",
    ...field,
    ...otherProps,
    inputProps: { style: { ...style.textField } },
  };
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <Box sx={{ ...style.field }}>
      <Typography sx={{ ...style.label }}>{label}</Typography>
      <TextField
        sx={{
          ...style.helperText,
        }}
        {...configTextField}
      />
    </Box>
  );
};

export default CustomTextField;
CustomTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
