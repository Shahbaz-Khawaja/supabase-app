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
import { useState } from "react";
import CustomProgressButton from "components/CustomProgressButton/CustomProgressButton";

const DeleteDialog = ({
  deletedUser,
  resumeURL,
  openDialog,
  handleCloseDeleteDialog,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      if (deletedUser.avatarURL) {
        const avatarURI = deletedUser.avatarURL.replace("avatars/", "");
        const { error } = await supabase.storage
          .from("avatars")
          .remove([avatarURI]);
        if (error) throw error;
      }
      if (deletedUser.role === "Candidate") {
        if (resumeURL) {
          const resumeURI = resumeURL.replace("resumes/", "");
          const { error } = await supabase.storage
            .from("resumes")
            .remove([resumeURI]);
          if (error) throw error;
        }

        await supabase
          .from("Candidate")
          .delete()
          .match({ user_id: deletedUser.id });
      } else {
        await supabase
          .from("Employees")
          .delete()
          .match({ user_id: deletedUser.id });
        await supabase
          .from("Banking Info")
          .delete()
          .match({ user_id: deletedUser.id });
      }

      await supabase.functions.invoke("delete-user", {
        body: JSON.stringify({
          id: deletedUser.id,
        }),
      });
      dispatch(deleteUser(deletedUser.id));
      setLoading(false);
      handleCloseDeleteDialog();
    } catch (error) {
      console.error(error);
      setLoading(false);
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
        <Typography color="primary">Delete an Employee</Typography>
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
        <CustomProgressButton
          type="submit"
          title="Delete"
          loading={loading}
          icon={<DoneIcon />}
          style={style.actionBtn}
          size="small"
          variant="contained"
          onClick={handleDeleteUser}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
DeleteDialog.propTypes = {
  deletedUser: PropTypes.object,
  openDialog: PropTypes.bool.isRequired,
  resumeURL: PropTypes.string,
  handleCloseDeleteDialog: PropTypes.func,
};
