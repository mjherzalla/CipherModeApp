import * as React from "react";
import "./App.css";
import Appbar from "./Appbar";
import RequestsTable from "./RequestsTable";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Sidenav from "./SideNav";

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid
            xs={6}
            md={2}
            style={{ backgroundColor: "black", height: "100vh" }}
          >
            <Sidenav />
          </Grid>
          <Grid xs={6} md={10}>
            <Appbar />

            <RequestsTable />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
