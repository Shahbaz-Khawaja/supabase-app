import React from "react";
import PropTypes from "prop-types";
import { Divider } from "@mui/material";
import Footer from "components/Footer/Footer";
import LogoHeader from "components/LogoHeader/LogoHeader";
import CarouselSlider from "components/Carousel/Carousel";
import { useStyles } from "layouts/LoginLayout/LoginLayout.style";

const LoginLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.loginPage}>
      <div className={classes.login}>
        <div className={classes.headerLogo}>
          <LogoHeader />
          <Divider />
        </div>
        {children}
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
      <div className={classes.slider}>
        <CarouselSlider />
      </div>
    </div>
  );
};

export default LoginLayout;
LoginLayout.propTypes = {
  children: PropTypes.element,
};
