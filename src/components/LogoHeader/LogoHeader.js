import React from "react";
import { SvgIcon, Box } from "@mui/material";
import { style } from "components/LogoHeader/LogoHeader.style";
import { ReactComponent as Logo } from "assets/jetic-logo.svg";

function LogoHeader() {
  return (
    <Box sx={{ ...style.logoHeader }}>
      <SvgIcon inheritViewBox sx={{ ...style.icon }}>
        <Logo />
      </SvgIcon>
    </Box>
  );
}

export default LogoHeader;
