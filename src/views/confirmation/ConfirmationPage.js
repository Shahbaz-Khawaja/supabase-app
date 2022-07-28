import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import PATH from "utils/constants/path.constant";
import { style } from "views/confirmation/ConfirmationPage.style";

const ConfirmationPage = () => {
  return (
    <Box sx={{ ...style.mainContent }}>
      <Typography variant="h1">Confirm your Email</Typography>
      <Box sx={{ ...style.inputForm }}>
        <Typography variant="body2">
          A Confirmation email has been sent to you. Please confirm your Email
        </Typography>
      </Box>
      <Box sx={{ ...style.center }}>
        <Link to={PATH.BASE_URL} style={{ ...style.link }}>
          <Typography variant="body2" sx={{ color: "primary.main" }}>
            Back to Login
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default ConfirmationPage;
