import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useStyles } from "views/AdminDashboard/AdminDashboard.style";
import InviteDialog from "components/InviteDialog/InviteDialog";

const AdminDashboard = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className={classes.mainContent}>
      <div className={classes.user}>
        <Typography variant="h2">Users</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Invite Employee
        </Button>
        <InviteDialog open={openDialog} handleCloseDialog={handleCloseDialog} />
      </div>
    </div>
  );
};

export default AdminDashboard;
