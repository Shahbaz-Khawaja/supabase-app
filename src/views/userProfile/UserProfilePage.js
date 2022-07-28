import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  Breadcrumbs,
  Badge,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
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
import STATUS from "utils/constants/status.constant";
import { getUserDetails } from "store";
import { SUPABASE_STORAGE_URL } from "utils/constants/path.constant";
import UserInformation from "components/UserInformation/UserInformation";
import UpdateUserProfileForm from "components/Forms/UpdateUserProfileForm/UpdateUserProfileForm";
import SnackBar from "components/SnackBar/SnackBar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import CandidateInformation from "components/CandidateInformation/CandidateInformation";
import UpdateCadidateProfileForm from "components/Forms/UpdateCadidateProfileForm/UpdateCadidateProfileForm";
import { updateUserProfile } from "store";

const UserProfilePage = () => {
  const inputRef = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [viewProfile, setViewProfile] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const currentUser = useSelector((state) => state.authReducer.user);
  const userDetails = useSelector((state) => state.userReducer.userDetails);
  const [user, setUser] = useState(null);
  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const handleImageChange = (event) => {
    const image = event.target.files[0] && event.target.files[0];
    setProfileImage(image);
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
    }
  };

  const handleImageUpload = async () => {
    try {
      let avatarURL = "";
      if (profileImage) {
        if (currentUser.avatarURL) {
          setImageUploading(true);
          const avatarURI = currentUser.avatarURL.replace("avatars/", "");
          const { error } = await supabase.storage
            .from("avatars")
            .remove([avatarURI]);
          if (error) throw error;
        }
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(`${Date.now()}${profileImage.name}`, profileImage);
        if (error) throw error;
        avatarURL = data.Key;
        await supabase.auth.update({
          data: { avatarURL: avatarURL },
        });
      }
      dispatch(updateUserProfile(avatarURL));
      setImageUploading(false);
      setPreviewImage(null);
    } catch (error) {
      console.error(error);
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
    const getDesiredUser = async () => {
      try {
        setLoading(true);
        const { data } = await supabase.functions.invoke("list-users");
        const viewedUser = data?.find((user) => user.id === id);
        const userData = {
          id: viewedUser.id,
          email: viewedUser.email,
          role: viewedUser.user_metadata.role,
          avatarURL: viewedUser.user_metadata.avatarURL,
          priority: viewedUser.user_metadata.priority,
          previousStatus: viewedUser.user_metadata.previousStatus,
          currentStatus: viewedUser.user_metadata.currentStatus,
        };
        setUser(userData);
        return userData;
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchUserDetails = async () => {
      try {
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
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCandidateDetails = async () => {
      try {
        const { data: candidateDetails } = await supabase
          .from("Candidate")
          .select(`*`)
          .match({ user_id: id });
        dispatch(getUserDetails(candidateDetails[0]));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getDesiredUser()
      .then((user) => {
        if (user?.role === "Candidate") {
          fetchCandidateDetails();
        } else {
          fetchUserDetails();
        }
      })
      .catch((error) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <CardContent sx={{ ...style.cardContent }}>
          {id === currentUser.id ? (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                  src={
                    previewImage
                      ? previewImage
                      : currentUser?.avatarURL
                      ? `${SUPABASE_STORAGE_URL}${currentUser?.avatarURL}`
                      : null
                  }
                ></Avatar>
              </Badge>

              {previewImage && (
                <Box sx={{ ...style.profileActions }}>
                  <Tooltip title="cancel">
                    <IconButton onClick={() => setPreviewImage(null)}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="upload">
                    <IconButton onClick={handleImageUpload}>
                      {imageUploading ? (
                        <CircularProgress
                          sx={{
                            height: "1rem !important",
                            width: "1rem !important",
                          }}
                        />
                      ) : (
                        <CloudUploadIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
          ) : (
            <Avatar
              alt="user-profile"
              sx={{ ...style.avatar }}
              src={
                user?.avatarURL
                  ? `${SUPABASE_STORAGE_URL}${user?.avatarURL}`
                  : null
              }
            />
          )}

          <Box sx={{ ml: "2rem" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {userDetails?.full_name && (
                <Typography variant="h2" sx={{ mr: "8px" }}>
                  {userDetails?.full_name}
                </Typography>
              )}
              <Typography variant="h5" color={setColor(user?.currentStatus)}>
                {user?.currentStatus}
              </Typography>
            </Box>
            <Typography variant="h4">{user?.role}</Typography>
            <Typography variant="body2">{user?.email}</Typography>
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
              <>
                {currentUser.role === "Candidate" ? (
                  <CandidateInformation userDetails={userDetails} />
                ) : (
                  <UserInformation userDetails={userDetails} />
                )}
              </>
            ) : (
              <>
                {currentUser.role === "Candidate" ? (
                  <UpdateCadidateProfileForm
                    userDetails={userDetails}
                    setMessage={setMessage}
                    handleOpenSnackBar={handleOpenSnackBar}
                  />
                ) : (
                  <UpdateUserProfileForm
                    userDetails={userDetails}
                    setMessage={setMessage}
                    handleOpenSnackBar={handleOpenSnackBar}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <>
            {user?.role === "Candidate" ? (
              <CandidateInformation userDetails={userDetails} />
            ) : (
              <UserInformation userDetails={userDetails} />
            )}
          </>
        )}
      </div>
      <SnackBar
        open={openSnackBar}
        handleClose={handleCloseSnackBar}
        message={message}
        severity="success"
      />
    </div>
  );
};

export default UserProfilePage;
