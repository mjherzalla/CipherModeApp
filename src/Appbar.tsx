import * as React from "react";
import UserImg from "./user.jpg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <NotificationsActiveOutlinedIcon color="primary" />
          <Avatar alt="Remy Sharp" src={UserImg} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
