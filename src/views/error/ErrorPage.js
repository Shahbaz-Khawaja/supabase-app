import React from "react";
import { useNavigate } from "react-router-dom";
import { style } from "views/error/ErrorPage.style";
import { Button, Box, Typography } from "@mui/material";
import PATH from "utils/constants/path.constant";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ ...style.error }}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h2" color="error">
        page not found
      </Typography>
      <Button
        sx={{ ...style.btn }}
        varinat="text"
        color="inherit"
        onClick={() => navigate(PATH.BASE_URL)}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default ErrorPage;
