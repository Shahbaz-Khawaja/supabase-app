import React from "react";
import PropTypes from "prop-types";
import Appbar from "components/Appbar/Appbar";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Appbar />
      {children}
    </>
  );
};

export default DashboardLayout;

DashboardLayout.propTypes = {
  children: PropTypes.element,
};
