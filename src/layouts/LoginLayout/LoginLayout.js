import React from "react";
import PropTypes from "prop-types";
import { Divider, Box } from "@mui/material";
import Footer from "components/Footer/Footer";
import LogoHeader from "components/LogoHeader/LogoHeader";
import CarouselSlider from "components/Carousel/Carousel";
import { style } from "layouts/LoginLayout/LoginLayout.style";

const LoginLayout = ({ children }) => {
  return (
    <Box sx={{ ...style.loginPage }}>
      <Box sx={{ ...style.login }}>
        <Box sx={{ ...style.headerLogo }}>
          <LogoHeader />
          <Divider />
        </Box>
        {children}
        <Box sx={{ ...style.footer }}>
          <Footer />
        </Box>
      </Box>
      <Box sx={{ ...style.slider }}>
        <CarouselSlider />
      </Box>
    </Box>
  );
};

export default LoginLayout;
LoginLayout.propTypes = {
  children: PropTypes.element,
};
