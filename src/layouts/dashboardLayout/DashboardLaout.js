import React from "react";
import PropTypes from "prop-types";
import Appbar from "components/Appbar/Appbar";

const DashboardLaout = ({ children }) => {
  return (
    <div>
      <Appbar />
      {children}
    </div>
  );
};

export default DashboardLaout;

DashboardLaout.propTypes = {
  children: PropTypes.element,
};
