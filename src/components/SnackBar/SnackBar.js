import React from "react";
import { Alert, Snackbar } from "@mui/material";
import PropTypes from "prop-types";
import { style } from "components/SnackBar/SnackBar.style";
const SnackBar = ({ message, open, severity, handleClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ ...style.snackbar }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;

SnackBar.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

SnackBar.defaultProps = {
  msg: "Error!",
  open: false,
  handleClose: () => {},
};
