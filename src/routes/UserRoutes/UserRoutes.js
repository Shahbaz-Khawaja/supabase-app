import { logInUser } from "store";
import { useDispatch } from "react-redux";
import ErrorPage from "views/error/ErrorPage";
import LoginPage from "views/login/LoginPage";
import SignUpPage from "views/signup/SignUpPage";
import PATH from "utils/constants/path.constant";
import React, { useState, useEffect } from "react";
import { supabase } from "supabase/supabase_client";
import LoginLayout from "layouts/LoginLayout/LoginLayout";
import CustomRoutes from "routes/CustomRoutes/CustomRoutes";
import ProgressBar from "components/ProgressBar/ProgressBar";
import UserDashboard from "views/userDashboard/UserDashboard";
import UserProfilePage from "views/userProfile/UserProfilePage";
import DashboardLayout from "layouts/dashboardLayout/DashboardLayout";
import UpdatePasswordPage from "views/updatePassword/UpdatePasswordPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPasswordPage from "views/resetPassword/ResetPasswordPage";
import PasswordRecoveryPage from "views/passwordRecovery/PasswordRecoveryPage";
import ConfirmationPage from "views/confirmation/ConfirmationPage";

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
            avatarURL: user.user_metadata.avatarURL,
            priority: user.user_metadata.priority,
            previousStatus: user.user_metadata.previousStatus,
            currentStatus: user.user_metadata.currentStatus,
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
          path={PATH.BASE_URL}
          element={
            <LoginLayout>
              <LoginPage />
            </LoginLayout>
          }
        />
        <Route
          exact
          path={PATH.REGISTRATION_URL}
          element={
            <LoginLayout>
              <SignUpPage />
            </LoginLayout>
          }
        />
        <Route
          exact
          path={PATH.PASSWORD_RECOVERY_URL}
          element={
            <LoginLayout>
              <PasswordRecoveryPage />
            </LoginLayout>
          }
        />
        <Route
          path={PATH.UPDATE_PASSWORD}
          element={
            <LoginLayout>
              <UpdatePasswordPage />
            </LoginLayout>
          }
        />

        <Route
          path={PATH.RESET_PASSWORD}
          element={
            <LoginLayout>
              <ResetPasswordPage />
            </LoginLayout>
          }
        />

        <Route
          path={PATH.CONFIRMATION}
          element={
            <LoginLayout>
              <ConfirmationPage />
            </LoginLayout>
          }
        />

        <Route element={<CustomRoutes />}>
          <Route
            path={PATH.USER_DASHBOARD}
            element={
              <DashboardLayout>
                <UserDashboard />
              </DashboardLayout>
            }
          />
          <Route
            path={`${PATH.USER_PROFILE}/:id`}
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
