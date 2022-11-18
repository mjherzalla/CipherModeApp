import * as React from "react";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Logo from "./logo.jpg";
import GridViewIcon from "@mui/icons-material/GridView";
import { ListItemIcon } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <img src={Logo} alt="logo" className="logo" />
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "transparent",
          color: "white",
        }}
        style={{ color: "grey" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton>
          <ListItemIcon>
            <GridViewIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="NODES" />
        </ListItemButton>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <AccountTreeIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="COMPUTATIONS" />
        </ListItemButton>

        <List component="div" disablePadding style={{ marginLeft: 43 }}>
          <ListItemButton sx={{ pl: 4 }} style={{ color: "white" }}>
            <ListItemText primary="PENDING REQUESTS" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="IN PROGRESS" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="COMPLETED" />
          </ListItemButton>
        </List>

        <ListItemButton>
          <ListItemIcon>
            <PeopleOutlineIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="USERS & ORGS" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <SettingsApplicationsIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="PREFERENCES" />
        </ListItemButton>
      </List>
    </>
  );
}
