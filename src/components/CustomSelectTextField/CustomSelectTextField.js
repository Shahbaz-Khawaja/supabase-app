import PropTypes from "prop-types";
import { useField } from "formik";
import React from "react";
import { MenuItem, TextField, Typography, Box } from "@mui/material";
import { style } from "components/CustomSelectTextField/CustomSelectTextField.style";

const CustomSelectTextField = ({ label, name, items, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <Box sx={{ ...style.field }}>
      <Typography sx={{ ...style.label }}>{label}</Typography>
      <TextField
        select
        fullWidth
        {...configTextField}
        sx={{ ...style.textField }}
      >
        {items.map((item, idx) => (
          <MenuItem key={idx} value={item} sx={{ ...style.menuItem }}>
            {item}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default CustomSelectTextField;
CustomSelectTextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};
