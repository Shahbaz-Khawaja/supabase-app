import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import FaceIcon from "@mui/icons-material/Face";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { style } from "components/UsersList/UsersList.style";
import ProgressBar from "components/ProgressBar/ProgressBar";

const UsersList = ({ handleOpenDeleteDialog, handleOpenProfileDialog }) => {
  const currentUser = useSelector((state) => state.authReducer.user);
  const users = useSelector((state) => state.userReducer.allUsers);
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  if (isLoading) {
    return <ProgressBar />;
  }

  return (
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
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {user.status === "In-Progress" ? (
                  <Card elevation={1} sx={{ ...style.invitesStatusCard }}>
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="h4" sx={{ ml: "5px" }}>
                      {user.status}
                    </Typography>
                  </Card>
                ) : (
                  <Card elevation={1} sx={{ ...style.confirmedStatusCard }}>
                    <DoneIcon fontSize="small" />
                    <Typography variant="h4" sx={{ ml: "5px" }}>
                      {user.status}
                    </Typography>
                  </Card>
                )}
              </TableCell>
              <TableCell>
                {currentUser.role === "Admin" ? (
                  <Box>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={handleOpenDeleteDialog}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<FaceIcon />}
                      sx={{ ml: "1rem" }}
                      onClick={handleOpenProfileDialog}
                    >
                      View Profile
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<FaceIcon />}
                    onClick={handleOpenProfileDialog}
                  >
                    View Profile
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersList;

UsersList.propTypes = {
  handleOpenDeleteDialog: PropTypes.func,
  handleOpenProfileDialog: PropTypes.func,
};
