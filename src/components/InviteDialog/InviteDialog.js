import PropTypes from "prop-types";
// import { useStyles } from "components/Forms/InviteUserForm/InviteUserForm.style";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import InviteUserForm from "components/Forms/InviteUserForm/InviteUserForm";

const InviteDialog = ({ open, handleCloseDialog }) => {
  // const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      sx={{ width: "100%", minWidth: "400px" }}
    >
      <DialogTitle variant="h3">Invite an Employee</DialogTitle>
      <DialogContent>
        <InviteUserForm />
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
InviteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func,
};
