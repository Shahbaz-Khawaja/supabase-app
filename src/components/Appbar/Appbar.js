import {
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { logOutUser } from "store";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { PROFILE } from "utils/constants/constants";
import { supabase } from "supabase/supabase_client";
import LogoutIcon from "@mui/icons-material/Logout";
import { BASE_URL } from "utils/constants/constants";
import { style } from "components/Appbar/Appbar.style";
import { useDispatch, useSelector } from "react-redux";
import { ADMINDASHBOARD } from "utils/constants/constants";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Appbar = () => {
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    dispatch(logOutUser());
    if (error) {
      throw error;
    } else {
      navigate(BASE_URL);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Tooltip title="Main Menu">
          <IconButton
            edge="start"
            size="large"
            aria-label="menu"
            color="secondary"
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h2">{user.role}</Typography>
        <div style={{ ...style.actions }}>
          <Typography variant="body2" fontSize={15.5} fontWeight={600}>
            {user.email}
          </Typography>

          <Box onClick={handleClick} sx={{ ...style.row }}>
            <Avatar>{user.email[0]}</Avatar>
            <ArrowDropDownIcon />
          </Box>

          <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(ADMINDASHBOARD);
              }}
            >
              <Typography variant="body2">View Dashboard</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(PROFILE);
              }}
            >
              <Typography variant="body2">Your Profile</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleLogout();
              }}
            >
              <Box sx={{ ...style.flex }}>
                <LogoutIcon fontSize="small" color="primary" />
                <Typography
                  variant="body2"
                  sx={{
                    ...style.logoutBtn,
                  }}
                >
                  Log Out
                </Typography>
              </Box>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
