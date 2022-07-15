import PropTypes from "prop-types";
import { style } from "components/DeleteDialog/DeleteDialog.style";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DeleteDialog = ({ openDialog, handleCloseDeleteDialog }) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDeleteDialog} maxWidth="xs">
      <DialogTitle
        variant="h3"
        sx={{
          ...style.dialogHead,
        }}
      >
        <Typography color="primary" fontWeight="bold">
          Delete an Employee
        </Typography>
        <IconButton
          size="small"
          onClick={handleCloseDeleteDialog}
          sx={{
            ...style.closeIcon,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        Do you really want to delete this Employee, please Confirm?
      </DialogContent>
      <DialogActions sx={{ mb: "10px", mr: "10px" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleCloseDeleteDialog}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
DeleteDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  handleCloseDeleteDialog: PropTypes.func,
};
