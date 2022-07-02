import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Appbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h2">Admin</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
