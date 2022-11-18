import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Avatar, Button, Checkbox, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
function createData(
  name: string,
  inputs: string[],
  results: string,
  requestor: { name: string; Pic: string },
  submitted: string
) {
  return { name, inputs, results, requestor, submitted };
}

const rows = [
  createData(
    "Budgetting 2023",
    ["Employee salaries 2021", "Demographics data", "Benefits number 2021"],
    "New dataset",
    { name: "Kristin Watson", Pic: "https://i.pravatar.cc/100" },
    "12:57 pm 08/04"
  ),
  createData(
    "Budgetting 2023",
    ["Employee salaries 2021", "Demographics data", "Benefits number 2021"],
    "New dataset",
    { name: "Kristin Watson", Pic: "https://i.pravatar.cc/100" },
    "12:57 pm 08/04"
  ),
  createData(
    "Budgetting 2023",
    ["Employee salaries 2021", "Demographics data", "Benefits number 2021"],
    "New dataset",
    { name: "Kristin Watson", Pic: "https://i.pravatar.cc/100" },
    "12:57 pm 08/04"
  ),
  createData(
    "Budgetting 2023",
    ["Employee salaries 2021", "Demographics data", "Benefits number 2021"],
    "New dataset",
    { name: "Kristin Watson", Pic: "https://i.pravatar.cc/100" },
    "12:57 pm 08/04"
  ),
  createData(
    "Budgetting 2023",
    ["Employee salaries 2021", "Demographics data", "Benefits number 2021"],
    "New dataset",
    { name: "Kristin Watson", Pic: "https://i.pravatar.cc/100" },
    "12:57 pm 08/04"
  ),
];

export default function RequestsTable() {
  return (
    <div style={{ margin: 20 }}>
      <Typography
        variant="h3"
        component="div"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        Pending requests
      </Typography>
      <div
        style={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}
      >
        <Button
          style={{ color: "black" }}
          variant="text"
          startIcon={<CheckCircleIcon />}
        >
          APPROVE REQUEST
        </Button>
        <Button
          style={{ color: "black" }}
          variant="text"
          startIcon={<InfoOutlinedIcon />}
        >
          MORE INFO NEEDED
        </Button>
        <Button
          style={{ color: "black" }}
          variant="text"
          startIcon={<DoDisturbOnOutlinedIcon />}
        >
          DENY REQUEST
        </Button>
        <Button
          style={{ color: "black" }}
          variant="text"
          startIcon={<DeleteOutlinedIcon />}
        >
          DELETE REQUEST
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
            <TableRow>
              <TableCell>
                <IndeterminateCheckBoxOutlinedIcon style={{ marginLeft: 10 }} />
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>NAME</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>INPUTS</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>RESULTS</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>REQUESTOR</TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                }}
              >
                SUBMITTED
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  {row.inputs.map((x: any) => {
                    return (
                      <>
                        {x}
                        <br />
                      </>
                    );
                  })}
                </TableCell>
                <TableCell>{row.results}</TableCell>
                <TableCell>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={row.requestor.Pic}
                      style={{ marginRight: 5 }}
                    />
                    {row.requestor.name}
                  </div>
                </TableCell>
                <TableCell>{row.submitted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
