import React from "react";
import { useStyles } from "./LogoHeader.style";
import { SvgIcon } from "@mui/material";
import { ReactComponent as Logo } from "assets/jetic-logo.svg";

function LogoHeader() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.logoHeader}>
        <SvgIcon inheritViewBox sx={{ height: "25px", width: "180px" }}>
          <Logo />
        </SvgIcon>
      </div>
    </>
  );
}

export default LogoHeader;
