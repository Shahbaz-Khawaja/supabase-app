import { logInUser } from "store";
import { useDispatch } from "react-redux";
import LoginPage from "views/login/LoginPage";
import SignUpPage from "views/signup/SignUpPage";
import React, { useState, useEffect } from "react";
import { supabase } from "supabase/supabase_client";
import LoginLayout from "layouts/LoginLayout/LoginLayout";
import ProgressBar from "components/ProgressBar/ProgressBar";
import AdminDashboard from "views/AdminDashboard/AdminDashboard";
import DashboardLayout from "layouts/dashboardLayout/DashboardLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasswordRecoveryPage from "views/passwordRecovery/PasswordRecoveryPage";
import {
  BASE_URL,
  REGISTRATION_URL,
  ADMINDASHBOARD,
  PASSWORD_RECOVERY_URL,
} from "utils/constants/constants";
import ErrorPage from "views/error/ErrorPage";
import { PROFILE } from "utils/constants/constants";
import { UPDATE_PASSWORD } from "utils/constants/constants";
import CustomRoutes from "routes/CustomRoutes/CustomRoutes";
import UserProfilePage from "views/UserProfile/UserProfilePage";
import UpdatePasswordPage from "views/updatePassword/UpdatePasswordPage";

const UserRoutes = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const user = supabase.auth.user();
      if (user.id) {
        dispatch(
          logInUser({
            id: user.id,
            email: user.email,
            role: user.user_metadata.role,
          })
        );
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <Router>
      <Routes>
        <Route
          exact
          path={BASE_URL}
          element={
            <LoginLayout>
              <LoginPage />
            </LoginLayout>
          }
        />
        <Route
          exact
          path={REGISTRATION_URL}
          element={
            <LoginLayout>
              <SignUpPage />
            </LoginLayout>
          }
        />
        <Route
          exact
          path={PASSWORD_RECOVERY_URL}
          element={
            <LoginLayout>
              <PasswordRecoveryPage />
            </LoginLayout>
          }
        />
        <Route
          path={UPDATE_PASSWORD}
          element={
            <LoginLayout>
              <UpdatePasswordPage />
            </LoginLayout>
          }
        />

        <Route element={<CustomRoutes />}>
          <Route
            path={ADMINDASHBOARD}
            element={
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            }
          />
          <Route
            path={PROFILE}
            element={
              <DashboardLayout>
                <UserProfilePage />
              </DashboardLayout>
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};
export default UserRoutes;
