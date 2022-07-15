import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { BASE_URL } from "utils/constants/constants";
import { useSelector } from "react-redux";

const CustomRoutes = () => {
  const userId = useSelector((state) => state.authReducer.user.id);
  return userId ? <Outlet /> : <Navigate to={BASE_URL} replace />;
};

export default CustomRoutes;
