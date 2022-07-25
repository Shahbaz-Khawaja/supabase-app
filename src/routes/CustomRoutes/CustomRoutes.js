import React from "react";
import { useSelector } from "react-redux";
import PATH from "utils/constants/path.constant";
import { Navigate, Outlet } from "react-router-dom";

const CustomRoutes = () => {
  const userId = useSelector((state) => state.authReducer.user.id);
  return userId ? <Outlet /> : <Navigate to={PATH.BASE_URL} replace />;
};

export default CustomRoutes;
