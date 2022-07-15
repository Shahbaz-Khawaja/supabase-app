import React from "react";
import { CircularProgress, Box } from "@mui/material";
import { style } from "components/ProgressBar/ProgressBar.style";

const ProgressBar = () => {
  return (
    <Box sx={{ ...style.center }}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default ProgressBar;
