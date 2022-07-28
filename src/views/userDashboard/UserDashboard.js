import AddIcon from "@mui/icons-material/Add";
import { setUsersList, setLoading } from "store";
import React, { useEffect, useState } from "react";
import { supabase } from "supabase/supabase_client";
import SnackBar from "components/SnackBar/SnackBar";
import UsersList from "components/UsersList/UsersList";
import { useDispatch, useSelector } from "react-redux";
import DeleteDialog from "components/DeleteDialog/DeleteDialog";
import InviteDialog from "components/InviteDialog/InviteDialog";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useStyles, style } from "views/userDashboard/UserDashboard.style";

const UserDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletedUser, setDeletedUser] = useState(null);
  const [resumeURL, setResumeURL] = useState("");
  const currentUser = useSelector((state) => state.authReducer.user);
  const allUsers = useSelector((state) => state.userReducer.allUsers);

  const usersStatus = (users) => {
    const status = [...new Set(users.map((user) => user.currentStatus))];
    const noOfusers = status.map((status) => {
      let count = 0;
      users.forEach((user) => {
        if (status === user.currentStatus) {
          count++;
        }
      });
      return { status: status, noOfUsers: count };
    });
    return noOfusers;
  };
  const allStatus = usersStatus(allUsers);

  const handleOpenInviteDialog = () => {
    setOpenInviteDialog(true);
  };

  const handleCloseInviteDialog = () => {
    setOpenInviteDialog(false);
  };

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const handleOpenDeleteDialog = (user, resumeURL) => {
    setDeletedUser(user);
    setResumeURL(resumeURL);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("list-users");
        const userData = data?.map((user) => ({
          id: user.id,
          email: user.email,
          role: user.user_metadata.role,
          avatarURL: user.user_metadata.avatarURL,
          priority: user.user_metadata.priority,
          previousStatus: user.user_metadata.previousStatus,
          currentStatus: user.user_metadata.currentStatus,
        }));
        if (error) throw error;
        dispatch(setUsersList(userData));
        dispatch(setLoading(false));
      } catch (error) {
        console.error(error.message);
      }
    };

    getAllUsers();
  }, [dispatch, currentUser.id]);

  return (
    <>
      <div className={classes.mainContent}>
        <div className={classes.user}>
          <Typography variant="h2" color="primary.main">
            Users
          </Typography>
          {currentUser.role === "Admin" && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenInviteDialog}
            >
              Invite Employee
            </Button>
          )}
          <InviteDialog
            openDialog={openInviteDialog}
            handleCloseDialog={handleCloseInviteDialog}
            handleOpenSnackBar={handleOpenSnackBar}
          />
        </div>
      </div>

      <div className={classes.statistics}>
        {allStatus.map(({ status, noOfUsers }) => (
          <Card key={status} elevation={2} sx={{ ...style.statusCard }}>
            <Typography variant="h3" color="primary">
              {status}
            </Typography>
            <CardContent sx={{ ...style.noOfUsers }}>
              <Typography variant="h2">{noOfUsers}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className={classes.usersList}>
        <UsersList handleOpenDeleteDialog={handleOpenDeleteDialog} />
      </div>
      <DeleteDialog
        deletedUser={deletedUser}
        resumeURL={resumeURL}
        openDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
      />

      <SnackBar
        open={openSnackBar}
        handleClose={handleCloseSnackBar}
        message="Invite Sent Successfully!"
        severity="success"
      />
    </>
  );
};

export default UserDashboard;
