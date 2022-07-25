import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  DialogActions,
  Button,
} from "@mui/material";
import { deleteUser } from "store";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { supabase } from "supabase/supabase_client";
import { style } from "components/DeleteDialog/DeleteDialog.style";

const DeleteDialog = ({
  deleteUserId,
  openDialog,
  handleCloseDeleteDialog,
}) => {
  const dispatch = useDispatch();
  const handleDeleteUser = async () => {
    try {
      await supabase
        .from("Employees")
        .delete()
        .match({ user_id: deleteUserId });
      await supabase
        .from("Banking Info")
        .delete()
        .match({ user_id: deleteUserId });
      await supabase.functions.invoke("delete-user", {
        body: JSON.stringify({
          id: deleteUserId,
        }),
      });
      dispatch(deleteUser(deleteUserId));
      handleCloseDeleteDialog();
    } catch (error) {
      console.error(error);
    }
  };
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
        <Typography variant="body2">
          Do you really want to delete this Employee, please Confirm?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ ...style.actions }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CloseIcon />}
          onClick={handleCloseDeleteDialog}
          sx={{ ...style.actionBtn }}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          startIcon={<DoneIcon />}
          onClick={handleDeleteUser}
          sx={{ ...style.actionBtn }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
DeleteDialog.propTypes = {
  deleteUserId: PropTypes.string,
  openDialog: PropTypes.bool.isRequired,
  handleCloseDeleteDialog: PropTypes.func,
};
