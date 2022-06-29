import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Appbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>Invite User by Email</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
