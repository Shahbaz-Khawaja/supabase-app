import React from "react";
import { SvgIcon } from "@mui/material";
import { useStyles, style } from "components/LogoHeader/LogoHeader.style";
import { ReactComponent as Logo } from "assets/jetic-logo.svg";

function LogoHeader() {
  const classes = useStyles();
  return (
    <div className={classes.logoHeader}>
      <SvgIcon inheritViewBox sx={{ ...style }}>
        <Logo />
      </SvgIcon>
    </div>
  );
}

export default LogoHeader;
