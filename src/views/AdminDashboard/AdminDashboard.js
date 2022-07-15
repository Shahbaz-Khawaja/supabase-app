import AddIcon from "@mui/icons-material/Add";
import Profile from "components/Profile/Profile";
import { setUsersList, setLoading } from "store";
import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { supabase } from "supabase/supabase_client";
import SnackBar from "components/SnackBar/SnackBar";
import UsersList from "components/UsersList/UsersList";
import { useDispatch, useSelector } from "react-redux";
import InviteDialog from "components/InviteDialog/InviteDialog";
import DeleteDialog from "components/DeleteDialog/DeleteDialog";
import { useStyles } from "views/AdminDashboard/AdminDashboard.style";

const AdminDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);

  const handleOpenProfileDialog = () => {
    setOpenProfileDialog(true);
  };

  const handleCloseProfileDialog = () => {
    setOpenProfileDialog(false);
  };

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

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("list-users");
        if (error) throw error;
        const userData = data.map((user) => ({
          id: user.id,
          email: user.email,
          role: user.user_metadata.role,
          status: user.confirmed_at ? "Confirmed" : "In-Progress",
        }));
        dispatch(setUsersList(userData));
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error.message);
      }
    };

    getAllUsers();
  }, [dispatch, user.id]);

  return (
    <>
      <div className={classes.mainContent}>
        <div className={classes.user}>
          <Typography variant="h2" color="primary.main">
            Users
          </Typography>
          {user.role === "Admin" ? (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenInviteDialog}
            >
              Invite Employee
            </Button>
          ) : null}
          <InviteDialog
            openDialog={openInviteDialog}
            handleCloseDialog={handleCloseInviteDialog}
            handleOpenSnackBar={handleOpenSnackBar}
          />
        </div>
      </div>
      <div className={classes.usersList}>
        <UsersList
          handleOpenDeleteDialog={handleOpenDeleteDialog}
          handleOpenProfileDialog={handleOpenProfileDialog}
        />
      </div>
      <DeleteDialog
        openDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
      />
      <Profile
        openProfileDialog={openProfileDialog}
        handleCloseProfileDialog={handleCloseProfileDialog}
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

export default AdminDashboard;
