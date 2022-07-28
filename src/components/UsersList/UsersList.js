import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
  CardMedia,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { style } from "components/UsersList/UsersList.style";
import ProgressBar from "components/ProgressBar/ProgressBar";
import { useNavigate } from "react-router-dom";
import PATH from "utils/constants/path.constant";
import notFoundImg from "assets/notFound.png";
import STATUS from "utils/constants/status.constant";
import { supabase } from "supabase/supabase_client";
import { updateUserStatusFromList } from "store";
import { SUPABASE_STORAGE_URL } from "utils/constants/path.constant";

const UsersList = ({ handleOpenDeleteDialog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.allUsers);
  const currentUser = useSelector((state) => state.authReducer.user);
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  const handleUpdateUserStatus = async (id, status) => {
    await supabase.functions.invoke("update-user-status", {
      body: JSON.stringify({
        id: id,
        currentStatus: status,
      }),
    });
    dispatch(updateUserStatusFromList({ id, status }));
  };

  const getUserResumeURL = async (id) => {
    const { data, error } = await supabase
      .from("Candidate")
      .select("resume_url")
      .match({ user_id: id });
    if (error) throw error;
    return data[0].resume_url;
  };

  const setColor = (status) => {
    if (status === STATUS.invited) return "warning.main";
    else if (status === STATUS.registered) return "primary.main";
    else if (status === STATUS.emailConfirmed) return "primary.main";
    else if (status === STATUS.onBoarded) return "success.main";
    else return "error.main";
  };

  if (isLoading) {
    return <ProgressBar />;
  }

  if (!users.length) {
    return (
      <div style={{ ...style.notFound }}>
        <CardMedia
          sx={{ height: "220px", width: "310px" }}
          image={notFoundImg}
          alt="users-not-found"
        />
        <Typography variant="h2" color="primary.main">
          Users not added yet.
        </Typography>
      </div>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ ...style.head }}>
              <TableCell>
                <Typography variant="h3">E-mail</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h3">Role</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h3">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h3">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <Avatar
                      src={
                        user.avatarURL
                          ? `${SUPABASE_STORAGE_URL}${user.avatarURL}`
                          : null
                      }
                    />
                    {user.email}
                  </Box>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Typography
                    variant="h4"
                    sx={{ ml: "5px" }}
                    color={setColor(user.currentStatus)}
                  >
                    {user.currentStatus}
                  </Typography>
                </TableCell>
                <TableCell>
                  {currentUser.role === "Admin" ? (
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      {currentUser.id !== user.id && (
                        <Tooltip title="Delete">
                          <IconButton
                            size="large"
                            onClick={() => {
                              if (user.role === "Candidate") {
                                getUserResumeURL(user.id)
                                  .then((value) => {
                                    handleOpenDeleteDialog(user, value);
                                  })
                                  .catch((error) => console.error(error));
                              } else {
                                handleOpenDeleteDialog(user);
                              }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}

                      {user.currentStatus !== STATUS.invited &&
                        user.currentStatus !== STATUS.emailNotConfirmed && (
                          <>
                            <Tooltip title="View Profile">
                              <IconButton
                                size="large"
                                sx={{ "&:hover": { color: "primary.main" } }}
                                onClick={() =>
                                  navigate(`${PATH.USER_PROFILE}/${user.id}`)
                                }
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>

                            {currentUser.id !== user.id && (
                              <Tooltip
                                title={
                                  user.currentStatus === STATUS.deactivated
                                    ? "Activate"
                                    : "DeActivate"
                                }
                              >
                                <IconButton
                                  size="large"
                                  onClick={() =>
                                    user.currentStatus === STATUS.deactivated
                                      ? handleUpdateUserStatus(
                                          user.id,
                                          user.previousStatus
                                        )
                                      : handleUpdateUserStatus(
                                          user.id,
                                          STATUS.deactivated
                                        )
                                  }
                                >
                                  {user.currentStatus === STATUS.deactivated ? (
                                    <ToggleOffIcon color="error" />
                                  ) : (
                                    <ToggleOnIcon color="success" />
                                  )}
                                </IconButton>
                              </Tooltip>
                            )}
                          </>
                        )}
                    </Box>
                  ) : (
                    user.currentStatus !== STATUS.invited &&
                    user.currentStatus !== STATUS.emailNotConfirmed && (
                      <>
                        {currentUser.priority >= user.priority && (
                          <Tooltip title="View Profile">
                            <IconButton
                              size="large"
                              sx={{ "&:hover": { color: "primary.main" } }}
                              onClick={() =>
                                navigate(`${PATH.USER_PROFILE}/${user.id}`)
                              }
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </>
                    )
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersList;

UsersList.propTypes = {
  handleOpenDeleteDialog: PropTypes.func,
};
