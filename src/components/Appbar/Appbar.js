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
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { logOutUser } from "store";
import { useNavigate } from "react-router-dom";
import { supabase } from "supabase/supabase_client";
import LogoutIcon from "@mui/icons-material/Logout";
import { style } from "components/Appbar/Appbar.style";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PATH from "utils/constants/path.constant";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { toggleTheme } from "store";
import { SUPABASE_STORAGE_URL } from "utils/constants/path.constant";

const Appbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.authReducer.user);
  const lightTheme = useSelector((state) => state.toggleReducer.lightTheme);

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
      navigate(PATH.BASE_URL);
    }
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar>
        <Typography variant="h2">{currentUser.role}</Typography>
        <div style={{ ...style.actions }}>
          <Tooltip title={lightTheme ? "Dark Mode" : "Light Mode"}>
            <IconButton size="large" onClick={() => dispatch(toggleTheme())}>
              {lightTheme ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>

          <Box onClick={handleClick} sx={{ ...style.row }}>
            <Avatar
              src={
                currentUser?.avatarURL &&
                `${SUPABASE_STORAGE_URL}${currentUser?.avatarURL}`
              }
            />
            <ArrowDropDownIcon />
          </Box>

          <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
            <MenuItem
              sx={{ ...style.menuItem }}
              onClick={() => {
                handleClose();
                navigate(PATH.USER_DASHBOARD);
              }}
            >
              <Box sx={{ ...style.flex }}>
                <HomeIcon fontSize="small" />
                <Typography variant="body2" sx={{ ml: "5px" }}>
                  View Dashboard
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem
              sx={{ ...style.menuItem }}
              onClick={() => {
                handleClose();
                navigate(`${PATH.USER_PROFILE}/${currentUser.id}`);
              }}
            >
              <Box sx={{ ...style.flex }}>
                <PersonIcon fontSize="small" />
                <Typography variant="body2" sx={{ ml: "5px" }}>
                  View Profile
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem
              sx={{ ...style.menuItem }}
              onClick={() => {
                handleClose();
                handleLogout();
              }}
            >
              <Box sx={{ ...style.flex }}>
                <LogoutIcon fontSize="small" />
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
      <Divider />
    </AppBar>
  );
};

export default Appbar;
