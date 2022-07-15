import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import { style } from "components/Profile/Profile.style";
import CloseIcon from "@mui/icons-material/Close";

const Profile = ({ openProfileDialog, handleCloseProfileDialog }) => {
  return (
    <Dialog
      open={openProfileDialog}
      onClose={handleCloseProfileDialog}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle
        variant="h3"
        sx={{
          ...style.dialogHead,
        }}
      >
        <Typography color="primary" fontWeight="bold">
          User Profile
        </Typography>
        <IconButton
          size="small"
          onClick={handleCloseProfileDialog}
          sx={{
            ...style.closeIcon,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>User Profile</Typography>
      </DialogContent>
    </Dialog>
  );
};
export default Profile;
Profile.propTypes = {
  openProfileDialog: PropTypes.bool.isRequired,
  handleCloseProfileDialog: PropTypes.func,
};
