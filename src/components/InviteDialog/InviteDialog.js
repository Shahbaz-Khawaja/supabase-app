import PropTypes from "prop-types";
import { style } from "components/InviteDialog/InviteDialog.style";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  DialogActions,
} from "@mui/material";
import InviteUserForm from "components/Forms/InviteUserForm/InviteUserForm";
import CloseIcon from "@mui/icons-material/Close";

const InviteDialog = ({
  openDialog,
  handleCloseDialog,
  handleOpenSnackBar,
}) => {
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      sx={{ ...style.dialog }}
    >
      <DialogTitle
        variant="h3"
        sx={{
          ...style.dialogHead,
        }}
      >
        <Typography>Invite an Employee</Typography>
        <IconButton
          size="small"
          onClick={handleCloseDialog}
          sx={{
            ...style.closeIcon,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <InviteUserForm
          handleCloseDialog={handleCloseDialog}
          handleOpenSnackBar={handleOpenSnackBar}
        />
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default InviteDialog;
InviteDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func,
  handleOpenSnackBar: PropTypes.func,
};
