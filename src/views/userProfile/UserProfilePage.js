import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  Breadcrumbs,
  Badge,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "assets/profile.jpg";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { supabase } from "supabase/supabase_client";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import PATH from "utils/constants/path.constant";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { style } from "views/userProfile/UserProfilePage.style";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import UserInformation from "components/UserInformation/UserInformation";
import STATUS from "utils/constants/status.constant";
import UpdateUserProfileForm from "components/Forms/UpdateUserProfileForm/UpdateUserProfileForm";
import { getUserDetails } from "store";
import { setUsersList } from "store";

const UserProfilePage = () => {
  const inputRef = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [viewProfile, setViewProfile] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const userDetails = useSelector((state) => state.userReducer.userDetails);
  const currentUser = useSelector((state) => state.authReducer.user);
  const user = useSelector((state) =>
    state.userReducer.allUsers.filter((user) => {
      return user.id === id;
    })
  );

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const setColor = (status) => {
    if (status === STATUS.invited) return "warning.main";
    else if (status === STATUS.registered) return "primary.main";
    else if (status === STATUS.emailConfirmed) return "primary.main";
    else if (status === STATUS.onBoarded) return "success.main";
    else return "error.main";
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await supabase.functions.invoke("list-users");
        const userData = data?.map((user) => ({
          id: user.id,
          email: user.email,
          role: user.user_metadata.role,
          priority: user.user_metadata.priority,
          previousStatus: user.user_metadata.previousStatus,
          currentStatus: user.user_metadata.currentStatus,
        }));

        dispatch(setUsersList(userData));
      } catch (error) {
        console.error(error.message);
      }
    };

    getAllUsers();
  }, [dispatch, user.id]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data: userDetails } = await supabase
        .from("Employees")
        .select()
        .match({ user_id: id });
      const { data: userBankingDetails } = await supabase
        .from("Banking Info")
        .select(`bank_account_name, bank_account_no`)
        .match({ user_id: id });

      const userInformation = { ...userDetails[0], ...userBankingDetails[0] };
      dispatch(getUserDetails(userInformation));
      setLoading(false);
    };
    fetchUserDetails();
  }, [dispatch, id]);

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <div>
      <Box sx={{ ...style.userDetails }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link to={PATH.USER_DASHBOARD} style={{ ...style.link }}>
            <HomeIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="primary">
              View Dashboard
            </Typography>
          </Link>
          <Box sx={{ ...style.profileLink }}>
            <PersonIcon fontSize="small" />
            <Typography variant="body2">User Profile</Typography>
          </Box>
        </Breadcrumbs>
      </Box>

      <Card elevation={4} sx={{ ...style.userDetails }}>
        <CardContent sx={{ ...style.center }}>
          {id === currentUser.id ? (
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  sx={{ ...style.editIconBtn }}
                  onClick={() => inputRef.current.click()}
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    ref={inputRef}
                    onChange={handleImageChange}
                  />
                  <EditIcon fontSize="small" />
                </IconButton>
              }
            >
              <Avatar
                alt="user-profile"
                sx={{ ...style.avatar }}
                src={profileImage}
              />
            </Badge>
          ) : (
            <Avatar
              alt="user-profile"
              sx={{ ...style.avatar }}
              src={profileImg}
            />
          )}

          <Box sx={{ ml: "2rem" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {userDetails.full_name && (
                <Typography variant="h2" sx={{ mr: "8px" }}>
                  {userDetails.full_name}
                </Typography>
              )}
              <Typography variant="h5" color={setColor(user[0].currentStatus)}>
                {user[0]?.currentStatus}
              </Typography>
            </Box>
            <Typography variant="h4">{user[0]?.role}</Typography>
            <Typography variant="body2">{user[0]?.email}</Typography>
            {id === currentUser.id && (
              <Typography
                variant="h4"
                color="primary.main"
                onClick={() =>
                  viewProfile ? setViewProfile(false) : setViewProfile(true)
                }
                sx={{ ...style.editProfileBtn }}
              >
                {viewProfile ? "Edit Profile" : "View Profile"}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
      <div style={{ ...style.userDetails }}>
        {id === currentUser.id ? (
          <>
            {viewProfile ? (
              <UserInformation userDetails={userDetails} />
            ) : (
              <UpdateUserProfileForm />
            )}
          </>
        ) : (
          <UserInformation userDetails={userDetails} />
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
