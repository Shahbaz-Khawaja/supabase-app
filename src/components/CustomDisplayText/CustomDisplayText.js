import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";

const CustomDisplayText = ({ label, value }) => {
  return (
    <>
      <Grid item xs={4}>
        <Typography variant="h3">{label}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body2">{value || "Not Set"}</Typography>
      </Grid>
    </>
  );
};

export default CustomDisplayText;
CustomDisplayText.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};
