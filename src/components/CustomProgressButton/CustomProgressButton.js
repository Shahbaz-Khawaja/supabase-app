import React from "react";
import PropTypes from "prop-types";
import { Button, CircularProgress } from "@mui/material";

const CustomProgressButton = ({
  loading,
  title,
  icon,
  style,
  ...otherProps
}) => {
  return (
    <Button
      {...otherProps}
      startIcon={
        loading ? (
          <CircularProgress
            sx={{
              height: "14px !important",
              width: "14px !important",
              ml: "0.3rem",
            }}
          />
        ) : (
          icon
        )
      }
      disabled={loading}
      sx={{ ...style }}
    >
      {title}
    </Button>
  );
};

export default CustomProgressButton;
CustomProgressButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string,
  icon: PropTypes.element,
  style: PropTypes.shape({}),
};
